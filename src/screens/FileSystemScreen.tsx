import { useGame } from '../game/GameContext'
import { getLevel } from '../game/levels'
import { LevelId } from '../game/types'
import { ScreenShell } from '../components/ScreenShell'
import { LevelAnswerForm } from '../components/LevelAnswerForm'
import './FileSystemScreen.css'

interface FileNode {
  name: string
  type: 'folder' | 'file'
  content?: string
  children?: FileNode[]
}

const ROOT: FileNode = {
  name: '/nexus_core',
  type: 'folder',
  children: [
    {
      name: 'logs',
      type: 'folder',
      children: [{ name: 'access.log', type: 'file', content: "Rien d'intéressant ici." }],
    },
    {
      name: '.sys',
      type: 'folder',
      children: [
        {
          name: 'backup',
          type: 'folder',
          children: [
            { name: 'keyfile.txt', type: 'file', content: 'CLE_SAUVEGARDE: REDLOTUS' },
          ],
        },
      ],
    },
    {
      name: 'readme.txt',
      type: 'file',
      content: 'NEXUS protège ses secrets dans les dossiers cachés.',
    },
  ],
}

function FolderNode({ node }: { node: FileNode }) {
  if (node.type === 'file') {
    return (
      <details className="file-node">
        <summary>{node.name}</summary>
        <p>{node.content}</p>
      </details>
    )
  }
  return (
    <details className="folder-node">
      <summary>{node.name}/</summary>
      <div className="folder-node__children">
        {node.children?.map((child) => (
          <FolderNode key={child.name} node={child} />
        ))}
      </div>
    </details>
  )
}

export function FileSystemScreen() {
  const { state } = useGame()
  const level = getLevel(LevelId.FileSystem)

  return (
    <ScreenShell title={level.title}>
      <p>{level.narrative(state)}</p>
      <FolderNode node={ROOT} />
      <LevelAnswerForm placeholder="Clé de sauvegarde" />
    </ScreenShell>
  )
}
