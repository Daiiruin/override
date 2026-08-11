export function caesarShift(text: string, shift: number): string {
  const normalizedShift = ((shift % 26) + 26) % 26
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char <= 'Z' ? 65 : 97
    return String.fromCharCode(
      ((char.charCodeAt(0) - base + normalizedShift) % 26) + base,
    )
  })
}

export function textToBinary(text: string): string {
  return text
    .split('')
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ')
}

export function binaryToText(binary: string): string {
  return binary
    .trim()
    .split(/\s+/)
    .map((byte) => String.fromCharCode(parseInt(byte, 2)))
    .join('')
}
