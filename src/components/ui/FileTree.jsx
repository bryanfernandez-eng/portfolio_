import { useState } from 'react'
import FileDot from './FileDot'

function FileTree({ files, activeId, openTabIds, onOpen, isCollapsed, onToggleCollapse }) {
  const [openFolders, setOpenFolders] = useState({ experience: true, education: true })

  function toggleFolder(folder) {
    setOpenFolders(prev => ({ ...prev, [folder]: !prev[folder] }))
  }

  const folders = [
    { key: 'experience', items: files.filter(f => f.folder === 'experience') },
    { key: 'education',  items: files.filter(f => f.folder === 'education') },
  ]

  return (
    <div className="flex flex-col h-full select-none">
      {/* Collapse toggle */}
      <button
        onClick={onToggleCollapse}
        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="flex items-center justify-center w-full border-b border-[#2d2d2d] hover:bg-white/[0.04] transition-colors duration-150"
        style={{ height: 39 }}
      >
        <span className="font-mono text-xs text-[#30363d] hover:text-[#8b949e] transition-colors">
          {isCollapsed ? '»' : '«'}
        </span>
      </button>

      <div
        className="flex flex-col py-3 overflow-hidden transition-all duration-200"
        style={{
          opacity: isCollapsed ? 0 : 1,
          transform: isCollapsed ? 'translateX(-8px)' : 'translateX(0)',
          pointerEvents: isCollapsed ? 'none' : 'auto',
          maxHeight: isCollapsed ? 0 : '1000px',
        }}
      >
          {folders.map(({ key, items }) => (
            <div key={key}>
              <button
                onClick={() => toggleFolder(key)}
                className="w-full flex items-center gap-1.5 px-3 py-1 text-left hover:bg-white/[0.04] transition-colors duration-150"
              >
                <span className="font-mono text-xs text-[#8b949e]">{openFolders[key] ? '▾' : '▸'}</span>
                <span className="font-mono text-xs text-[#8b949e]">{key}/</span>
              </button>
              {openFolders[key] && items.map(file => (
                <button
                  key={file.id}
                  onClick={() => onOpen(file.id)}
                  className="w-full flex items-center gap-2 pl-7 pr-3 py-1.5 text-left transition-colors duration-150"
                  style={{ background: activeId === file.id ? 'rgba(255,255,255,0.07)' : 'transparent' }}
                >
                  <FileDot color={file.color.replace('0.35', '1')} />
                  <span
                    className="font-mono text-xs truncate transition-colors duration-150"
                    style={{ color: activeId === file.id ? '#e6edf3' : openTabIds.includes(file.id) ? '#c9d1d9' : '#8b949e' }}
                  >
                    {file.filename}
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
    </div>
  )
}

export default FileTree
