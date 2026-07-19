import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollToTopOnNav from "@/components/ScrollToTopOnNav";
import Home from "./pages/Home";
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
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("signup");
  const [checkingSession, setCheckingSession] = useState(!!sessionToken);

  useEffect(() => {
    const verifySession = async () => {
      if (!sessionToken) { setCheckingSession(false); return; }
      try {
        const res = await fetch("/api/auth/session", {
          headers: { Authorization: `Bearer ${sessionToken}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
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
          headers: { Authorization: `Bearer ${sessionToken}` },
        });
      } catch (err) {
        console.error("Logout request failed", err);
      }
    }
    localStorage.removeItem("sessionToken");
    setSessionToken(null);
    setUser(null);
  };

  const openAuth = (tab: "login" | "signup" = "signup") => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
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
              onOpenAuth={openAuth}
            />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home onOpenAuth={openAuth} user={user} />} />
                <Route
                  path="/dashboard"
                  element={
                    checkingSession ? (
                      <div className="min-h-screen flex items-center justify-center bg-background">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                          <p className="text-muted-foreground text-sm">Verifying session...</p>
                        </div>
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
            <Footer onOpenAuth={openAuth} />
            <ScrollToTop />
          </div>

          <AuthModal
            isOpen={authModalOpen}
            onClose={() => setAuthModalOpen(false)}
            onSuccess={handleLoginSuccess}
            initialTab={authModalTab}
          />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  );
};

export default App;
