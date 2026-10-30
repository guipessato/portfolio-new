const toggle = document.querySelector('.navigation__theme-toggle')
const root = document.documentElement

toggle.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light'
    if (isLight) {
        root.removeAttribute('data-theme')
        localStorage.setItem('theme', 'dark')
    } else {
        root.setAttribute('data-theme', 'light')
        localStorage.setItem('theme', 'light')
    }
})
