import { useState } from 'react'
import { EXPERIENCE, EDUCATION } from '../constants/experience'
import FileTree from '../components/ui/FileTree'
import FilePane from '../components/ui/FilePane'
import MobileFilePicker from '../components/ui/MobileFilePicker'

const FILES = [
  ...EXPERIENCE.map(e => ({ ...e, folder: 'experience', filename: `${e.company.toLowerCase().replace(/\s/g, '-')}.md` })),
  ...EDUCATION.map(e => ({ ...e, folder: 'education', filename: `${e.company.toLowerCase()}.md` })),
]

function Experience() {
  const [activeId, setActiveId] = useState(FILES[0].id)
  const activeFile = FILES.find(f => f.id === activeId)

  return (
    <section
      id="experience"
      className="relative bg-[#212121] z-20 overflow-hidden min-h-screen"
    >
      <img
        src="/gradient-bg.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        style={{ zIndex: 0, opacity: 0.5 }}
      />

      <div className="relative z-10 px-4 md:px-16 lg:px-24 py-16 md:py-24 max-w-6xl mx-auto">
        <div
          className="rounded-2xl border border-[#2d2d2d] overflow-hidden flex flex-col"
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
            <MobileFilePicker files={FILES} activeId={activeId} onSelect={setActiveId} />
          </div>

          <div className="flex flex-1">
            {/* Sidebar — desktop only */}
            <div className="hidden md:block w-44 md:w-52 shrink-0 border-r border-[#2d2d2d] bg-[#1a1a1a] self-stretch">
              <div className="px-3 py-2 border-b border-[#2d2d2d]">
                <span className="font-mono text-xs text-[#30363d] uppercase tracking-widest">Explorer</span>
              </div>
              <FileTree files={FILES} activeId={activeId} onSelect={setActiveId} />
            </div>

            {/* File content pane */}
            <div className="flex-1 min-w-0">
              <FilePane file={activeFile} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
