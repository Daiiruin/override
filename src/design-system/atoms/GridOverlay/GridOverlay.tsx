import { Wrapper, Inner, Line } from './GridOverlay.styles'

const COLUMN_COUNT = 6

export function GridOverlay() {
  const positions = Array.from({ length: COLUMN_COUNT + 1 }, (_, i) => (i / COLUMN_COUNT) * 100)

  return (
    <Wrapper aria-hidden="true">
      <Inner>
        {positions.map((pct) => (
          <Line key={pct} style={{ left: `${pct}%` }} />
        ))}
      </Inner>
    </Wrapper>
  )
}
