import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const links = document.querySelectorAll('a[href^="#s-"]')

links.forEach((link) => {
    link.addEventListener('click', (event) => {
        const target = document.querySelector(link.getAttribute('href'))
        if (!target) return

        event.preventDefault()

        gsap.to(window, {
            duration: 1,
            ease: 'power2.inOut',
            scrollTo: { y: target, offsetY: 70 },
            onComplete: () => {
                const heading = target.querySelector('h1, h2')
                if (!heading) return
                gsap.fromTo(
                    heading,
                    { scale: 1.05 },
                    { scale: 1, duration: 0.4, ease: 'power2.out' }
                )
            },
        })
    })
})
