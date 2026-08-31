import { caesarShift } from '../game/cipher'
import './CipherDecoderTable.css'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

interface CipherDecoderTableProps {
  shift: number
}

export function CipherDecoderTable({ shift }: CipherDecoderTableProps) {
  return (
    <div className="cipher-decoder">
      {ALPHABET.map((letter) => (
        <div key={letter} className="cipher-decoder__pair">
          <span className="cipher-decoder__received">{letter}</span>
          <span className="cipher-decoder__real">{caesarShift(letter, -shift)}</span>
        </div>
      ))}
    </div>
  )
}
