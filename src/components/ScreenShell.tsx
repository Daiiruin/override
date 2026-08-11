import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import './ScreenShell.css'

interface ScreenShellProps {
  title: string
  children: ReactNode
}

const glitchVariants: Variants = {
  initial: {
    opacity: 0,
    x: -10,
    clipPath: 'inset(20% 0 55% 0)',
    filter: 'hue-rotate(90deg) saturate(3)',
  },
  animate: {
    opacity: [0, 1, 1],
    x: [-10, 8, -4, 0],
    clipPath: [
      'inset(20% 0 55% 0)',
      'inset(65% 0 8% 0)',
      'inset(0 0 0 0)',
      'inset(0 0 0 0)',
    ],
    filter: ['hue-rotate(90deg) saturate(3)', 'none', 'none'],
    transition: { duration: 0.35 },
  },
  exit: {
    opacity: [1, 1, 0],
    x: [0, 8, -10],
    clipPath: ['inset(0 0 0 0)', 'inset(45% 0 15% 0)', 'inset(0 0 0 0)'],
    filter: ['none', 'hue-rotate(-90deg) saturate(3)', 'none'],
    transition: { duration: 0.25 },
  },
}

export function ScreenShell({ title, children }: ScreenShellProps) {
  return (
    <motion.div
      className="screen-shell"
      variants={glitchVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="screen-shell__scanlines" aria-hidden="true" />
      <h1 className="screen-shell__title">{title}</h1>
      <div className="screen-shell__content">{children}</div>
    </motion.div>
  )
}
