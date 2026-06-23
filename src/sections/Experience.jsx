import { useState, useRef } from 'react'
import { EXPERIENCE, EDUCATION } from '../constants/experience'
import FileTree from '../components/ui/FileTree'
import FilePane from '../components/ui/FilePane'
import MobileFilePicker from '../components/ui/MobileFilePicker'
import AlignmentGuides from '../components/ui/AlignmentGuides'

const FILES = [
  ...EXPERIENCE.map(e => ({ ...e, folder: 'experience', filename: `${e.company.toLowerCase().replace(/\s/g, '-')}-${e.id}.md` })),
  ...EDUCATION.map(e => ({ ...e, folder: 'education', filename: `${e.company.toLowerCase()}.md` })),
]

function Experience() {
  const [openTabIds, setOpenTabIds] = useState([FILES[0].id])
  const [activeId, setActiveId] = useState(FILES[0].id)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const sectionRef = useRef(null)
  const editorRef = useRef(null)

  const openTabs = openTabIds.map(id => FILES.find(f => f.id === id)).filter(Boolean)
  const activeFile = FILES.find(f => f.id === activeId)

  function handleOpenFile(id) {
    if (!openTabIds.includes(id)) setOpenTabIds(prev => [...prev, id])
    setActiveId(id)
  }

  function handleCloseTab(id) {
    const idx = openTabIds.indexOf(id)
    const next = openTabIds.filter(t => t !== id)
    setOpenTabIds(next)
    if (activeId === id) {
      setActiveId(next[Math.min(idx, next.length - 1)] ?? null)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="crt-scanlines relative bg-[#212121] z-20 overflow-hidden min-h-screen border-t-purple-800 border-t-3"
    >


      <img
        src={`${import.meta.env.BASE_URL}gradient-bg.png`}
        alt=""
        aria-hidden="true"
        className="animated-gradient-bg absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{ zIndex: 0, opacity: 0.7 }}
      />

      <AlignmentGuides sectionRef={sectionRef} editorRef={editorRef} />

      {/* Fade gradient-bg colors at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '160px', background: 'linear-gradient(to bottom, transparent, #212121)', zIndex: 4 }} />

      <div className="relative z-10 px-4 md:px-16 lg:px-24 pt-28 md:pt-32 pb-16 md:pb-24 max-w-6xl mx-auto">
        <div
          ref={editorRef}
          className="overflow-hidden flex flex-col"
          style={{ background: '#161616', minHeight: '720px' }}
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2d2d2d] bg-[#1a1a1a] shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="font-mono text-xs text-[#8b949e] ml-3">~/portfolio/background</span>
            <span className="font-mono text-xs text-[#30363d] ml-auto hidden sm:block">// experience & education</span>
          </div>

          {/* Mobile file picker */}
          <div className="md:hidden bg-[#1a1a1a]">
            <MobileFilePicker files={FILES} activeId={activeId} onSelect={handleOpenFile} />
          </div>

          <div className="flex flex-1">
            {/* Sidebar — desktop only */}
            <div
              className="hidden md:flex flex-col shrink-0 border-r border-[#2d2d2d] bg-[#1a1a1a] self-stretch transition-all duration-200"
              style={{ width: isSidebarCollapsed ? '32px' : '208px' }}
            >
              {!isSidebarCollapsed && (
                <div className="px-3 py-2 border-b border-[#2d2d2d]">
                  <span className="font-mono text-xs text-[#30363d] uppercase tracking-widest">Explorer</span>
                </div>
              )}
              <FileTree
                files={FILES}
                activeId={activeId}
                openTabIds={openTabIds}
                onOpen={handleOpenFile}
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed(p => !p)}
              />
            </div>

            {/* File content pane */}
            <div className="flex-1 min-w-0">
              <FilePane
                file={activeFile}
                openTabs={openTabs}
                activeId={activeId}
                onTabSelect={setActiveId}
                onTabClose={handleCloseTab}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
