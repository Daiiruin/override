import './FileTree.css'

export interface FileNode {
  name: string
  type: 'folder' | 'file'
  content?: string
  children?: FileNode[]
}

export function FileTree({ node }: { node: FileNode }) {
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
          <FileTree key={child.name} node={child} />
        ))}
      </div>
    </details>
  )
}
