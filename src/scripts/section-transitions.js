import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const links = document.querySelectorAll('a[href^="#s-"]');

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    history.replaceState(null, "", link.getAttribute("href"));

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      window.scrollTo({ top: target.offsetTop - 70, behavior: "auto" });
      return;
    }

    gsap.to(window, {
      duration: 0.35,
      ease: "power2.out",
      scrollTo: { y: target, offsetY: 70 },
      onComplete: () => {
        const heading = target.querySelector("h1, h2");
        if (!heading) return;
        gsap.fromTo(
          heading,
          { scale: 1.05 },
          { scale: 1, duration: 0.25, ease: "power2.out" },
        );
      },
    });
  });
});

const scrollTopButton = document.querySelector(".scroll-top");

if (scrollTopButton) {
  const toggleScrollTopButton = () => {
    const shouldShow = window.scrollY > 240;
    scrollTopButton.classList.toggle("is-visible", shouldShow);
  };

  toggleScrollTopButton();
  window.addEventListener("scroll", toggleScrollTopButton, { passive: true });

  scrollTopButton.addEventListener("click", () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    gsap.to(window, {
      duration: 0.5,
      ease: "power2.out",
      scrollTo: { y: 0 },
    });
  });
}
