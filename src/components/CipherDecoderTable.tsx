import { caesarShift } from '../game/cipher'
import { Grid, Pair, Received, Real } from './CipherDecoderTable.styles'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

interface CipherDecoderTableProps {
  shift: number
}

export function CipherDecoderTable({ shift }: CipherDecoderTableProps) {
  return (
    <Grid>
      {ALPHABET.map((letter) => (
        <Pair key={letter}>
          <Received>{letter}</Received>
          <Real>{caesarShift(letter, -shift)}</Real>
        </Pair>
      ))}
    </Grid>
  )
}
