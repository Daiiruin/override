import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import './ScreenShell.css'

interface ScreenShellProps {
  title: string
  children: ReactNode
}

export function ScreenShell({ title, children }: ScreenShellProps) {
  return (
    <motion.div
      className="screen-shell"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.4 }}
    >
      <div className="screen-shell__scanlines" aria-hidden="true" />
      <h1 className="screen-shell__title">{title}</h1>
      <div className="screen-shell__content">{children}</div>
    </motion.div>
  )
}
