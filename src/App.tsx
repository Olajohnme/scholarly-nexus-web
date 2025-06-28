
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import EditorialBoard from "./pages/EditorialBoard";
import Archives from "./pages/Archives";
import Submit from "./pages/Submit";
import Article from "./pages/Article";
import AdminAuth from "./pages/AdminAuth";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Routes>
            <Route path="/admin-auth" element={<AdminAuth />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={
              <>
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/editorial-board" element={<EditorialBoard />} />
                    <Route path="/archives" element={<Archives />} />
                    <Route path="/submit" element={<Submit />} />
                    <Route path="/article/:id" element={<Article />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
