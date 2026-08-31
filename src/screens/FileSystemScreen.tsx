import { useGame } from '../game/GameContext'
import { getLevel } from '../game/levels'
import { LevelId } from '../game/types'
import { ScreenShell } from '../components/ScreenShell'
import { LevelAnswerForm } from '../components/LevelAnswerForm'
import { FileTree, type FileNode } from '../components/FileTree'

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

export function FileSystemScreen() {
  const { state } = useGame()
  const level = getLevel(LevelId.FileSystem)

  return (
    <ScreenShell title={level.title}>
      <p>{level.narrative(state)}</p>
      <FileTree node={ROOT} />
      <LevelAnswerForm placeholder="Clé de sauvegarde" />
    </ScreenShell>
  )
}
