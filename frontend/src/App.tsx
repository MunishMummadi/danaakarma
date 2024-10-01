import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import SearchPage from "@/pages/search";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import FundraiserPage from "@/pages/fundraiser";
function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<SearchPage />} path="/search" />
      <Route element={<FundraiserPage />} path="/fundraiser/:id" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />
    </Routes>
  );
}

export default App;
