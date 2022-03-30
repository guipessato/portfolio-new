const st = ScrollReveal({
    origin: "top",
    distance: "30px",
    duration: 1500,
});

if (jQuery(window).width() > 991) {
    st.reveal(".delaySmallReveal", { delay: 200 });
    st.reveal(".delayMediumReveal", { delay: 250 });
    st.reveal(".delayLargeReveal", { delay: 400 });
    st.reveal(".delayExtraBigReveal", { delay: 600 });
    st.reveal(".intervalCardReveal", { interval: 280 });
} else {
    ScrollReveal().reveal('.projects__list');
    ScrollReveal().reveal('.skills__cards');
}

ScrollReveal().reveal('.home__container');
ScrollReveal().reveal('.about__container');
