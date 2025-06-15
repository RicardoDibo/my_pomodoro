import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "../../pages/Home";
import { AboutPomodoro } from "../../pages/AboutPomodoro";
import { NotFound } from "../../pages/NotFound";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = window.location;
  
  useEffect(() => {
    window.scrollTo({top: 0});
  }, [pathname]);

  return null;
}

export function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-pomodoro/" element={<AboutPomodoro />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ScrollToTop />
    </BrowserRouter>
  );
}