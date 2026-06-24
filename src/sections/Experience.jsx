import { useState, useRef } from 'react'
import { EXPERIENCE, EDUCATION } from '../constants/experience'
import { useTabs } from '../hooks/useTabs'
import FileTree from '../components/ui/FileTree'
import FilePane from '../components/ui/FilePane'
import MobileFilePicker from '../components/ui/MobileFilePicker'
import AlignmentGuides from '../components/ui/AlignmentGuides'

const FILES = [
  ...EXPERIENCE.map(e => ({ ...e, folder: 'experience', filename: `${e.company.toLowerCase().replace(/\s/g, '-')}-${e.id}.md` })),
  ...EDUCATION.map(e => ({ ...e, folder: 'education', filename: `${e.company.toLowerCase()}.md` })),
]

function Experience() {
  const { openTabIds, activeId, openTab, closeTab, setActiveId } = useTabs(FILES[0].id)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const sectionRef = useRef(null)
  const editorRef = useRef(null)

  const openTabs  = openTabIds.map(id => FILES.find(f => f.id === id)).filter(Boolean)
  const activeFile = FILES.find(f => f.id === activeId)

  return (
    <section ref={sectionRef} id="experience" className="crt-scanlines relative bg-[#212121] z-20 overflow-hidden border-t-purple-800 border-t-3">
      <img
        src={`${import.meta.env.BASE_URL}gradient-bg.png`}
        alt=""
        aria-hidden="true"
        className="animated-gradient-bg absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{ zIndex: 0, animation: 'glow-pulse 3s ease-in-out infinite' }}
      />

      <AlignmentGuides sectionRef={sectionRef} editorRef={editorRef} />

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: '160px', background: 'linear-gradient(to bottom, transparent, #212121)', zIndex: 4 }} />

      <div className="relative z-10 px-6 md:px-16 lg:px-24 py-28 md:py-32 max-w-6xl mx-auto">
        <div ref={editorRef} className="overflow-hidden flex flex-col" style={{ background: '#161616', minHeight: 'clamp(400px, 80vh, 600px)' }}>

          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2d2d2d] bg-[#1a1a1a] shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="font-mono text-xs text-[#8b949e] ml-3">~/portfolio/background</span>
            <span className="font-mono text-xs text-[#30363d] ml-auto hidden sm:block">// experience & education</span>
          </div>

          <div className="md:hidden bg-[#1a1a1a]">
            <MobileFilePicker files={FILES} activeId={activeId} onSelect={openTab} />
          </div>

          <div className="flex flex-1">
            <div className="hidden md:flex flex-col shrink-0 border-r border-[#2d2d2d] bg-[#1a1a1a] self-stretch transition-all duration-200" style={{ width: isSidebarCollapsed ? '32px' : '208px' }}>
              {!isSidebarCollapsed && (
                <div className="px-3 py-2 border-b border-[#2d2d2d]">
                  <span className="font-mono text-xs text-[#30363d] uppercase tracking-widest">Explorer</span>
                </div>
              )}
              <FileTree
                files={FILES}
                activeId={activeId}
                openTabIds={openTabIds}
                onOpen={openTab}
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed(p => !p)}
              />
            </div>

            <div className="flex-1 min-w-0">
              <FilePane file={activeFile} openTabs={openTabs} activeId={activeId} onTabSelect={setActiveId} onTabClose={closeTab} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
