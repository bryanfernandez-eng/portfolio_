import { useState, useEffect } from 'react'

export function useActiveSection(ids) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY + 80
      let current = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollY) current = id
      }
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids])

  return active
}
