export function caesarShift(text: string, shift: number): string {
  const normalizedShift = ((shift % 26) + 26) % 26
  return text.replace(/[a-zA-Z]/g, (char) => {
    const base = char <= 'Z' ? 65 : 97
    return String.fromCharCode(
      ((char.charCodeAt(0) - base + normalizedShift) % 26) + base,
    )
  })
}
