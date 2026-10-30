import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const revealOnScroll = (selector, vars = {}) => {
  const els = gsap.utils.toArray(selector);
  if (!els.length) return;

  gsap.set(els, { opacity: 0, y: 36, scale: 0.94 });

  ScrollTrigger.batch(els, {
    start: "top 85%",
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        overwrite: true,
        ...vars,
      }),
  });
};

// Projetos entram de baixo para cima no desktop e alternando de lado no mobile.
// Exportado pra ser reaproveitado pelos cards que o botão "Ver mais" revela.
export const revealProjectItems = (items) => {
  const els = gsap.utils.toArray(items);
  if (!els.length) return;

  const isDesktop = window.matchMedia("(min-width: 992px)").matches;

  if (isDesktop) {
    gsap.set(els, { opacity: 0, y: 45 });

    gsap.to(els, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.12,
      overwrite: true,
    });
    return;
  }

  els.forEach((el, i) => {
    gsap.set(el, { opacity: 0, x: i % 2 === 0 ? -60 : 60 });
  });

  gsap.to(els, {
    opacity: 1,
    x: 0,
    duration: 0.7,
    ease: "power3.out",
    stagger: 0.12,
    overwrite: true,
  });
};

// --- Entrada do hero (roda uma vez, ao carregar) ---
gsap
  .timeline({ defaults: { ease: "power3.out" } })
  .from(".home__title", { opacity: 0, y: 30, duration: 0.8 })
  .from(".home__link", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
  .from(".home__figure", { opacity: 0, scale: 0.92, duration: 0.9 }, "-=0.7");

// --- Títulos de seção: sobem + o acento roxo "estoura" em seguida ---
gsap.utils
  .toArray(
    ".about__title, .experience__title, .projects__title, .skills__title",
  )
  .forEach((title) => {
    const dot = title.querySelector("span");
    const tl = gsap.timeline({
      scrollTrigger: { trigger: title, start: "top 85%" },
    });
    tl.from(title, { opacity: 0, y: 24, duration: 0.7, ease: "power2.out" });
    if (dot)
      tl.from(dot, { scale: 0, duration: 0.45, ease: "back.out(3)" }, "-=0.2");
  });

// --- Linha da timeline de Experiência "desenhando" conforme rola ---
gsap.to(".experience__line", {
  scaleY: 1,
  ease: "none",
  scrollTrigger: {
    trigger: ".experience__timeline",
    start: "top 70%",
    end: "bottom 70%",
    scrub: 0.6,
  },
});

// --- Cards de projetos: desktop entra de baixo para cima, mobile continua lateral ---
{
  const items = gsap.utils.toArray(".projects__item");
  const isDesktop = () => window.matchMedia("(min-width: 992px)").matches;

  if (isDesktop()) {
    gsap.set(items, { opacity: 0, y: 45 });
  } else {
    items.forEach((el, i) =>
      gsap.set(el, { opacity: 0, x: i % 2 === 0 ? -60 : 60 }),
    );
  }

  ScrollTrigger.batch(items, {
    start: "top 85%",
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: isDesktop() ? 0 : undefined,
        x: isDesktop() ? undefined : 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        overwrite: true,
      }),
  });
}

// --- Demais blocos (about, cards de skills/experiência) ---
revealOnScroll(".about__container");
revealOnScroll(
  ".delaySmallReveal, .delayMediumReveal, .delayLargeReveal, .delayExtraBigReveal, .intervalCardReveal",
);
