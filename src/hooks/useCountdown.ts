import { useEffect, useState } from 'react'

export function useCountdown(startSeconds: number): number {
  const [remaining, setRemaining] = useState(startSeconds)

  useEffect(() => {
    if (remaining <= 0) return
    const timeout = window.setTimeout(() => setRemaining((value) => value - 1), 1000)
    return () => window.clearTimeout(timeout)
  }, [remaining])

  return remaining
}
