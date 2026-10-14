"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function AosInitializer() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true, // Keep content permanently visible after animated into view
      easing: "ease-out-cubic",
      offset: 30,
      delay: 0,
    });

    // Immediate and delayed refresh to prevent empty sections
    AOS.refresh();
    const t1 = setTimeout(() => AOS.refresh(), 300);
    const t2 = setTimeout(() => AOS.refresh(), 800);

    const handleResize = () => AOS.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return null;
}
