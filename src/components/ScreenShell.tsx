import type { ReactNode } from 'react'
import './ScreenShell.css'

interface ScreenShellProps {
  title: string
  children: ReactNode
}

export function ScreenShell({ title, children }: ScreenShellProps) {
  return (
    <div className="screen-shell">
      <div className="screen-shell__scanlines" aria-hidden="true" />
      <h1 className="screen-shell__title">{title}</h1>
      <div className="screen-shell__content">{children}</div>
    </div>
  )
}
