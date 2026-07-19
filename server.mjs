import express from "express";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs/promises";
import compression from "compression";
import crypto from "crypto";
import { put, list, del } from "@vercel/blob";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 1. Extreme PageSpeed Core Web Vitals Optimization (Crucial for Google SEO Ranking)
app.use(compression());

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082', 'http://localhost:5173'],
  credentials: true
}));

// Set proper MIME types and aggressive caching for static assets
app.use(express.static(path.join(__dirname, "dist"), {
  maxAge: '365d',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (filePath.endsWith('.mjs')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (filePath.endsWith('.json')) {
      res.setHeader('Content-Type', 'application/json');
    } else if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

// Explicit manifest.json route
app.get('/manifest.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(path.join(__dirname, 'dist', 'manifest.json'));
});

app.use(express.json({ limit: "200kb" }));

// Server logger helper
function logAction(action, data) {
  console.log(`[SERVER LOG] [${new Date().toISOString()}] [${action}]`, JSON.stringify(data, null, 2));
}

// Vercel Blob helpers with filesystem fallback
async function writeBlob(pathname, dataString) {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const result = await put(pathname, dataString, {
        access: 'private',
        addRandomSuffix: false,
        token: process.env.BLOB_READ_WRITE_TOKEN
      });
      logAction("Blob Write (Vercel)", { pathname, url: result.url });
      return result;
    } catch (err) {
      logAction("Blob Write Error (Vercel)", { pathname, error: err.message });
    }
  }
  // Local fallback
  const localPath = path.join(__dirname, '.blob_storage', pathname);
  await fs.mkdir(path.dirname(localPath), { recursive: true });
  await fs.writeFile(localPath, dataString, 'utf-8');
  logAction("Blob Write (Local Fallback)", { pathname, localPath });
  return { url: `local://${pathname}` };
}

async function readBlob(pathname) {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { blobs } = await list({
        prefix: pathname,
        token: process.env.BLOB_READ_WRITE_TOKEN
      });
      const found = blobs.find(b => b.pathname === pathname);
      if (found) {
        const res = await fetch(found.url);
        if (res.ok) {
          const text = await res.text();
          logAction("Blob Read (Vercel)", { pathname, size: text.length });
          return text;
        }
      }
    } catch (err) {
      logAction("Blob Read Error (Vercel)", { pathname, error: err.message });
    }
  }
  // Local fallback
  const localPath = path.join(__dirname, '.blob_storage', pathname);
  try {
    const text = await fs.readFile(localPath, 'utf-8');
    logAction("Blob Read (Local Fallback)", { pathname, size: text.length });
    return text;
  } catch (err) {
    return null;
  }
}

async function deleteBlob(pathname) {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { blobs } = await list({
        prefix: pathname,
        token: process.env.BLOB_READ_WRITE_TOKEN
      });
      const found = blobs.find(b => b.pathname === pathname);
      if (found) {
        await del(found.url, { token: process.env.BLOB_READ_WRITE_TOKEN });
        logAction("Blob Delete (Vercel)", { pathname });
      }
    } catch (err) {
      logAction("Blob Delete Error (Vercel)", { pathname, error: err.message });
    }
  }
  const localPath = path.join(__dirname, '.blob_storage', pathname);
  try {
    await fs.unlink(localPath);
    logAction("Blob Delete (Local Fallback)", { pathname });
  } catch (err) {}
}

// CRM Lead Integration helper
async function submitToCRM(payload) {
  const crmUrl = process.env.CRM_URL || process.env.CRM_ENDPOINT || "https://api.myinvesttrade.com/api/lead_management/api/affiliates";
  const crmToken = process.env.CRM_TOKEN || "AFF_1_697ac63e6f88cac9f990b1a5c4beaefd";

  const headers = {
    "Content-Type": "application/json",
    "Token": crmToken,
    "Authorization": `Bearer ${crmToken}`,
    "X-Affiliate-Token": crmToken,
    "x-token": crmToken
  };

  logAction("CRM Request Payload", { url: crmUrl, payload });

  // Disable SSL check immediately before the CRM request
  const originalRejectUnauthorized = process.env.NODE_TLS_REJECT_UNAUTHORIZED;
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  try {
    const res = await fetch(crmUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
    });

    // Revert SSL check configuration
    if (originalRejectUnauthorized !== undefined) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = originalRejectUnauthorized;
    } else {
      delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
    }

    const status = res.status;
    let responseText = "";
    let responseJson = null;
    try {
      responseText = await res.text();
      responseJson = JSON.parse(responseText);
    } catch (e) {
      responseJson = { raw: responseText };
    }

    logAction("CRM Response", { status, body: responseJson });

    // Handle responses
    // Check if status is success or if the payload says it already exists
    // Duplicate detection:
    // If responseJson has duplicate: true OR message/error suggests account already exists
    const responseStr = JSON.stringify(responseJson).toLowerCase();
    const isDuplicate = responseJson && (
      responseJson.duplicate === true ||
      responseJson.is_duplicate === true ||
      responseJson.status === "duplicate" ||
      responseStr.includes("already exists") ||
      responseStr.includes("duplicate email") ||
      responseStr.includes("duplicate lead") ||
      responseStr.includes("already contacted")
    );

    const isSuccess = status >= 200 && status < 300 && !isDuplicate;

    if (isDuplicate) {
      return { success: true, alreadyExists: true, status };
    }

    if (isSuccess) {
      return { success: true, alreadyExists: false, status };
    }

    // Lead is not valid or other failure
    return { success: false, alreadyExists: false, status, message: responseJson?.message || responseJson?.error || "Lead is not valid" };
  } catch (error) {
    logAction("CRM Request Failed", { error: error.message });
    return { success: false, alreadyExists: false, status: 500, error: error.message };
  }
}

// Increment Lead Dashboard Helper
async function incrementDashboard(type, name, email) {
  const url = "https://lead-dashboard-orcin.vercel.app/api/increment";
  const payload = {
    website: "Asset Circle",
    type,
    name,
    email
  };

  logAction("Dashboard Request Payload", { url, payload });

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const status = res.status;
    const responseText = await res.text();
    logAction("Dashboard Response", { status, body: responseText });
    return { status, success: res.ok };
  } catch (error) {
    logAction("Dashboard Request Failed", { error: error.message });
    return { success: false, error: error.message };
  }
}

// Backend Auth Signup Route
app.post("/api/auth/signup", async (req, res) => {
  logAction("Incoming Signup Request", { body: req.body });
  const { name, email, phone, country } = req.body ?? {};

  if (!name || !email || !phone || !country) {
    return res.status(400).json({ ok: false, error: "Missing required fields" });
  }

  // 1. Submit lead to CRM first
  // Format phone number for CRM (e.g. 0041791234567)
  const crmPhone = phone.replace("+", "00").replace(/\D/g, "");
  const crmPayload = {
    country_name: country.toLowerCase(),
    description: "",
    phone: crmPhone,
    email,
    first_name: name.split(" ")[0] || name,
    last_name: name.split(" ").slice(1).join(" ") || "",
    custom_fields: {
      Source_ID: "Website",
      Outline_Your_Case: ""
    }
  };

  const crmResult = await submitToCRM(crmPayload);

  if (!crmResult.success) {
    return res.status(400).json({
      ok: false,
      errorType: "invalid_lead",
      message: "We couldn't process your enquiry with the information provided. Please review your details and try again."
    });
  }

  // If successfully accepted, increment Lead Dashboard
  if (!crmResult.alreadyExists) {
    await incrementDashboard("signup", name, email);
  }

  // 2. Blob Signup/Login
  // Create / Retrieve User
  const userFilename = `users/${email.toLowerCase()}.json`;
  let existingUser = await readBlob(userFilename);
  let userObj;

  if (existingUser) {
    userObj = JSON.parse(existingUser);
  } else {
    // Create new Blob account
    userObj = { name, email, phone, country, createdAt: new Date().toISOString() };
    await writeBlob(userFilename, JSON.stringify(userObj));
  }

  // Create session
  const sessionToken = crypto.randomBytes(32).toString("hex");
  const sessionFilename = `sessions/${sessionToken}.json`;
  const sessionObj = { email: email.toLowerCase(), createdAt: new Date().toISOString() };
  await writeBlob(sessionFilename, JSON.stringify(sessionObj));

  return res.json({
    ok: true,
    alreadyExists: crmResult.alreadyExists,
    sessionToken,
    user: userObj
  });
});

// Backend Auth Login Route
app.post("/api/auth/login", async (req, res) => {
  logAction("Incoming Login Request", { body: req.body });
  const { email } = req.body ?? {};

  if (!email) {
    return res.status(400).json({ ok: false, error: "Email is required" });
  }

  const userFilename = `users/${email.toLowerCase()}.json`;
  const userJson = await readBlob(userFilename);

  if (!userJson) {
    return res.status(400).json({ ok: false, errorType: "user_not_found", message: "Account not found. Please sign up first." });
  }

  const userObj = JSON.parse(userJson);

  // Create Session (never call CRM during login)
  const sessionToken = crypto.randomBytes(32).toString("hex");
  const sessionFilename = `sessions/${sessionToken}.json`;
  const sessionObj = { email: email.toLowerCase(), createdAt: new Date().toISOString() };
  await writeBlob(sessionFilename, JSON.stringify(sessionObj));

  return res.json({
    ok: true,
    sessionToken,
    user: userObj
  });
});

// Backend Auth Session validation Route
app.get("/api/auth/session", async (req, res) => {
  const authHeader = req.headers.authorization ?? "";
  const token = authHeader.replace("Bearer ", "").trim();

  if (!token) {
    return res.status(401).json({ ok: false, error: "No token provided" });
  }

  const sessionFilename = `sessions/${token}.json`;
  const sessionJson = await readBlob(sessionFilename);

  if (!sessionJson) {
    return res.status(401).json({ ok: false, error: "Session invalid or expired" });
  }

  const sessionObj = JSON.parse(sessionJson);
  const userFilename = `users/${sessionObj.email}.json`;
  const userJson = await readBlob(userFilename);

  if (!userJson) {
    return res.status(404).json({ ok: false, error: "User not found" });
  }

  return res.json({
    ok: true,
    user: JSON.parse(userJson)
  });
});

// Logout Route
app.post("/api/auth/logout", async (req, res) => {
  const authHeader = req.headers.authorization ?? "";
  const token = authHeader.replace("Bearer ", "").trim();

  if (token) {
    await deleteBlob(`sessions/${token}.json`);
  }

  return res.json({ ok: true });
});

// Contact Route
app.post("/api/contact", async (req, res) => {
  logAction("Incoming Contact Enquiry", { body: req.body });
  const { name, phone, email, message, country } = req.body ?? {};

  if (!name || !phone || !email || !country) {
    return res.status(400).json({ ok: false, error: "Missing required fields" });
  }

  // Format phone number for CRM (e.g. 0041791234567)
  const crmPhone = phone.replace("+", "00").replace(/\D/g, "");
  const crmPayload = {
    country_name: country.toLowerCase(),
    description: message || "",
    phone: crmPhone,
    email,
    first_name: name.split(" ")[0] || name,
    last_name: name.split(" ").slice(1).join(" ") || "",
    custom_fields: {
      Source_ID: "Website",
      Outline_Your_Case: message || ""
    }
  };

  const crmResult = await submitToCRM(crmPayload);

  if (!crmResult.success) {
    return res.status(400).json({
      ok: false,
      errorType: "invalid_lead",
      message: "We couldn't process your enquiry with the information provided. Please review your details and try again."
    });
  }

  if (crmResult.alreadyExists) {
    return res.json({
      ok: true,
      alreadyExists: true,
      message: "It looks like you've already contacted us. We've recognized your details and will continue with your request."
    });
  }

  // Increment Lead Dashboard
  await incrementDashboard("contact", name, email);

  // Optional: send local SMTP email if SMTP configured, else just skip
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    ADMIN_EMAIL,
    FROM_EMAIL,
  } = process.env;

  if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: SMTP_SECURE === "true",
        auth: { user: SMTP_USER, pass: SMTP_PASS },
        tls: { rejectUnauthorized: false }
      });
      const to = ADMIN_EMAIL || "info@orchiddental.co.uk";
      const from = FROM_EMAIL || SMTP_USER;

      await transporter.sendMail({
        to,
        from,
        replyTo: email,
        subject: `Website enquiry from ${name}`,
        text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`,
      });
    } catch (e) {
      logAction("Nodemailer Error", { error: e.message });
    }
  }

  return res.json({ ok: true, alreadyExists: false });
});

// Backend SEO Setup
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send("User-agent: *\nAllow: /\nSitemap: https://orchiddental.co.uk/sitemap.xml");
});

app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  const baseUrl = "https://orchiddental.co.uk";
  const routes = ['', '/booking', '/contact', '/fees', '/team', '/treatments', '/dashboard', '/privacy-policy', '/terms'];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  routes.forEach(route => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${route}</loc>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>${route === '' ? '1.0' : '0.8'}</priority>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  res.send(xml);
});

const SEO_MAP = {
  '/': { title: 'Asset Circle | Next-Generation Digital Asset Platform', desc: 'Institutional-grade AI yield optimization and cold-storage custody for your digital asset portfolio.' },
  '/contact': { title: 'Contact Asset Circle | Digital Asset Enquiries', desc: 'Get in touch with Asset Circle for digital asset custody, yield optimization, and investment enquiries.' },
  '/booking': { title: 'Asset Circle | Client Onboarding', desc: 'Begin your Asset Circle onboarding journey.' },
  '/team': { title: 'Our Team | Asset Circle Specialists', desc: 'Meet the institutional-grade digital asset specialists behind Asset Circle.' },
  '/fees': { title: 'Platform Fees | Asset Circle', desc: 'Transparent fee structure for Asset Circle digital asset services.' },
  '/treatments': { title: 'Services | Asset Circle', desc: 'Explore Asset Circle digital asset management and AI yield services.' },
  '/dashboard': { title: 'Client Portal | Asset Circle', desc: 'Access your personalized Asset Circle crypto education and investment portal.' },
  '/privacy-policy': { title: 'Privacy Policy | Asset Circle', desc: 'Read the Asset Circle Privacy Policy to understand how we protect your data.' },
  '/terms': { title: 'Terms & Conditions | Asset Circle', desc: 'Review Asset Circle Terms & Conditions before using our digital asset platform.' }
};

// SPA fallback: serve index.html for non-static routes, injecting SEO dynamically
app.get("*", async (req, res) => {
  try {
    const indexPath = path.join(__dirname, "dist", "index.html");
    let html = await fs.readFile(indexPath, 'utf-8');

    // Backend SEO Injection
    const route = req.path;
    const seo = SEO_MAP[route] || SEO_MAP['/'];
    
    // Enhanced JSON-LD Schema
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "Asset Circle",
      "url": "https://Asset Circle.com",
      "description": "Next-generation digital asset custody and AI yield optimization platform.",
      "areaServed": "Worldwide",
      "serviceType": "Digital Asset Management"
    };

    const misspelledKeywords = "Asset Circle, Asset Circle, crypto yield platform, digital asset management, bitcoin custody, ai crypto trading";

    const metaTags = `
    <!-- Asset Circle Backend SEO -->
    <title>${seo.title}</title>
    <meta name="description" content="${seo.desc}">
    <meta name="keywords" content="cryptocurrency, digital assets, bitcoin, ethereum, ai yield, cold storage, ${misspelledKeywords}">
    <link rel="canonical" href="https://Asset Circle.com${route}" />
    <meta http-equiv="Content-Language" content="en">
    
    <meta property="og:title" content="${seo.title}">
    <meta property="og:description" content="${seo.desc}">
    <meta property="og:url" content="https://Asset Circle.com${route}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Asset Circle">
    
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${seo.title}">
    <meta name="twitter:description" content="${seo.desc}">
    
    <script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>
    <!-- End Asset Circle Backend SEO -->
    `;

    html = html.replace('</head>', `${metaTags}\n</head>`);
    
    res.send(html);
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.status(404).send("Frontend build not found (run npm run build).");
    } else {
      console.error("Error serving index.html:", err);
      res.status(500).send("Server Error");
    }
  }
});

let port = Number(process.env.PORT) || 6000;

function startServer(p) {
  const server = app.listen(p, () => {
    console.log(`Server running on http://localhost:${p}`);
  });

  server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      console.log(`Port ${p} is in use, trying ${p + 1}...`);
      startServer(p + 1);
    } else {
      console.error('Server error:', e);
      process.exit(1);
    }
  });
}

startServer(port);
