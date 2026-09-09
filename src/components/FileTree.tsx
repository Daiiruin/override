import { Node, Children } from './FileTree.styles'

export interface FileNode {
  name: string
  type: 'folder' | 'file'
  content?: string
  children?: FileNode[]
}

export function FileTree({ node }: { node: FileNode }) {
  if (node.type === 'file') {
    return (
      <Node>
        <summary>{node.name}</summary>
        <p>{node.content}</p>
      </Node>
    )
  }
  return (
    <Node>
      <summary>{node.name}/</summary>
      <Children>
        {node.children?.map((child) => (
          <FileTree key={child.name} node={child} />
        ))}
      </Children>
    </Node>
  )
}
