import { useState } from 'react'

export function useTabs(initialId) {
  const [openTabIds, setOpenTabIds] = useState([initialId])
  const [activeId, setActiveId] = useState(initialId)

  function openTab(id) {
    if (!openTabIds.includes(id)) setOpenTabIds(prev => [...prev, id])
    setActiveId(id)
  }

  function closeTab(id) {
    const idx = openTabIds.indexOf(id)
    const next = openTabIds.filter(t => t !== id)
    setOpenTabIds(next)
    if (activeId === id) setActiveId(next[Math.min(idx, next.length - 1)] ?? null)
  }

  return { openTabIds, activeId, openTab, closeTab, setActiveId }
}
