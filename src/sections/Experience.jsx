import { useState, useRef } from 'react'
import { EXPERIENCE, EDUCATION } from '../constants/experience'
import { useTabs } from '../hooks/useTabs'
import FileTree from '../components/ui/FileTree'
import FilePane from '../components/ui/FilePane'
import MobileFilePicker from '../components/ui/MobileFilePicker'
import AlignmentGuides from '../components/ui/AlignmentGuides'
import WindowChrome from '../components/ui/WindowChrome'
import { COLORS } from '../constants/colors'

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
    <section ref={sectionRef} id="experience" className="relative z-20 overflow-hidden" style={{ background: COLORS.surfaceDark }}>
      <AlignmentGuides sectionRef={sectionRef} editorRef={editorRef} />

      <div className="relative z-10 px-6 md:px-16 lg:px-24 py-[clamp(5rem,10vw,8rem)] max-w-6xl mx-auto">
        <div ref={editorRef} className="overflow-hidden flex flex-col" style={{ background: COLORS.surface, minHeight: 'clamp(400px, 80vh, 600px)' }}>

          <WindowChrome title="~/portfolio/background" rightLabel="// experience & education" />

          <div className="md:hidden" style={{ background: COLORS.surfaceAlt }}>
            <MobileFilePicker files={FILES} activeId={activeId} onSelect={openTab} />
          </div>

          <div className="flex flex-1">
            <div className="hidden md:flex flex-col shrink-0 border-r self-stretch transition-all duration-200" style={{ width: isSidebarCollapsed ? '32px' : '208px', borderColor: COLORS.border, background: COLORS.surfaceAlt }}>
              {!isSidebarCollapsed && (
                <div className="px-3 py-2 border-b" style={{ borderColor: COLORS.border }}>
                  <span className="font-mono text-xs uppercase tracking-widest" style={{ color: COLORS.dimText }}>Explorer</span>
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
