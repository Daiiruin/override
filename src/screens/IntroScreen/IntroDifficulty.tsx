import { Skull } from 'lucide-react'
import { Wrapper, Label, Icons, Icon } from './IntroDifficulty.styles'

const DIFFICULTY_LEVEL = 1
const DIFFICULTY_MAX = 5

export function IntroDifficulty() {
  return (
    <Wrapper>
      <Label>DIFFICULTÉ DE LA MISSION</Label>
      <Icons>
        {Array.from({ length: DIFFICULTY_MAX }, (_, index) => (
          <Icon key={index} $active={index < DIFFICULTY_LEVEL}>
            <Skull size={18} />
          </Icon>
        ))}
      </Icons>
    </Wrapper>
  )
}
