import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollToTopOnNav from "@/components/ScrollToTopOnNav";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Treatments from "./pages/Treatments";
import Fees from "./pages/Fees";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";
import CryptoExperience from "./pages/CryptoExperience";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import AuthModal from "@/components/AuthModal";

import { HelmetProvider } from "react-helmet-async";

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(
    localStorage.getItem("sessionToken")
  );
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [checkingSession, setCheckingSession] = useState(!!sessionToken);

  useEffect(() => {
    const verifySession = async () => {
      if (!sessionToken) {
        setCheckingSession(false);
        return;
      }
      try {
        const res = await fetch("/api/auth/session", {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          // Token expired or invalid
          localStorage.removeItem("sessionToken");
          setUser(null);
          setSessionToken(null);
        }
      } catch (err) {
        console.error("Session verification failed", err);
      } finally {
        setCheckingSession(false);
      }
    };

    verifySession();
  }, [sessionToken]);

  const handleLoginSuccess = (token: string, userData: any) => {
    localStorage.setItem("sessionToken", token);
    setSessionToken(token);
    setUser(userData);
  };

  const handleLogout = async () => {
    if (sessionToken) {
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        });
      } catch (err) {
        console.error("Logout request failed", err);
      }
    }
    localStorage.removeItem("sessionToken");
    setSessionToken(null);
    setUser(null);
  };

  return (
    <HelmetProvider>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <ScrollToTopOnNav />
            <Navbar
              user={user}
              onLogout={handleLogout}
              onOpenAuth={() => setAuthModalOpen(true)}
            />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/team" element={<Team />} />
                <Route path="/treatments" element={<Treatments />} />
                <Route path="/fees" element={<Fees />} />
                <Route
                  path="/contact"
                  element={<Contact user={user} />}
                />
                <Route path="/booking" element={<Booking />} />
                <Route
                  path="/dashboard"
                  element={
                    checkingSession ? (
                      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
                        Verifying session...
                      </div>
                    ) : user ? (
                      <CryptoExperience user={user} />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <ScrollToTop />
          </div>

          <AuthModal
            isOpen={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
            onSuccess={handleLoginSuccess}
          />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  );
};

export default App;
