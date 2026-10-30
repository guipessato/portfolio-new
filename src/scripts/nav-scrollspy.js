import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

ScrollTrigger.create({
    start: 'top -10',
    end: 99999,
    toggleClass: { targets: '.header', className: 'is-scrolled' },
})

const links = gsap.utils.toArray('.navigation__link')
const currentLabel = document.querySelector('.navigation__current')

links.forEach((link) => {
    const section = document.querySelector(link.getAttribute('href'))
    if (!section) return

    ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActive(link),
        onEnterBack: () => setActive(link),
    })
})

function setActive(activeLink) {
    links.forEach((link) => link.classList.toggle('is-active', link === activeLink))
    if (currentLabel) currentLabel.textContent = activeLink.textContent
}
