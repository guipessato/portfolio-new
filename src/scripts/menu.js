const nav = document.querySelector('.navigation')
const toggle = document.querySelector('.navigation__toggle')
const backdrop = document.querySelector('.navigation__backdrop')
const links = document.querySelectorAll('.navigation__link')

const openMenu = () => {
    nav.classList.add('is-open')
    document.body.classList.add('nav-open')
    toggle.setAttribute('aria-expanded', 'true')
}

const closeMenu = () => {
    nav.classList.remove('is-open')
    document.body.classList.remove('nav-open')
    toggle.setAttribute('aria-expanded', 'false')
}

toggle.addEventListener('click', () => {
    nav.classList.contains('is-open') ? closeMenu() : openMenu()
})

backdrop.addEventListener('click', closeMenu)
links.forEach((link) => link.addEventListener('click', closeMenu))
