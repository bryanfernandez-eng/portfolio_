import { useState, useRef, useCallback, useEffect } from 'react'
import { BREAKPOINTS } from '../constants/breakpoints'
import { smoothScrollTo } from '../utils/scroll'

export function useCarousel(totalItems) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [cardsPerPage, setCardsPerPage] = useState(3)
  const scrollRef = useRef(null)

  useEffect(() => {
    function update() {
      if (window.innerWidth >= BREAKPOINTS.lg) setCardsPerPage(3)
      else if (window.innerWidth >= BREAKPOINTS.sm) setCardsPerPage(2)
      else setCardsPerPage(1)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setActiveIndex(Math.round(el.scrollLeft / el.offsetWidth))
  }, [])

  const totalPages = Math.ceil(totalItems / cardsPerPage)

  function scrollToPage(page) {
    const el = scrollRef.current
    if (!el) return
    const clamped = Math.max(0, Math.min(totalPages - 1, page))
    setActiveIndex(clamped)
    smoothScrollTo(el, clamped * el.offsetWidth)
  }

  function handlePrev() { scrollToPage(activeIndex - 1) }
  function handleNext() { scrollToPage(activeIndex + 1) }

  return { scrollRef, activeIndex, cardsPerPage, totalPages, handleScroll, handlePrev, handleNext, scrollToPage }
}
