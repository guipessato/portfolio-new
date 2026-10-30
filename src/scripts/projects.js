import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { revealProjectItems } from './animations.js'

const items = Array.from(document.querySelectorAll('.projects__item'))
const moreBtn = document.querySelector('.projects__more')

const desktopQuery = window.matchMedia('(min-width: 992px)')
const limitFor = () => (desktopQuery.matches ? 12 : 9)

let expanded = false

const applyLimit = () => {
    if (expanded) return
    const limit = limitFor()
    items.forEach((item, i) => {
        item.hidden = i >= limit
    })
    if (moreBtn) moreBtn.hidden = items.length <= limit
}

const expand = () => {
    expanded = true
    const hiddenItems = items.filter((item) => item.hidden)
    hiddenItems.forEach((item) => (item.hidden = false))
    if (moreBtn) moreBtn.hidden = true
    revealProjectItems(hiddenItems)
}

applyLimit()
ScrollTrigger.refresh()
desktopQuery.addEventListener('change', applyLimit)
moreBtn?.addEventListener('click', expand)
