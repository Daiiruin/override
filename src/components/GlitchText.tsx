import './GlitchText.css'

interface GlitchTextProps {
  text: string
  as?: 'h1' | 'h2' | 'p' | 'span'
}

export function GlitchText({ text, as: Tag = 'span' }: GlitchTextProps) {
  return (
    <Tag className="glitch-text" data-text={text}>
      {text}
    </Tag>
  )
}
