export function declOfNum(number: number, words: [string, string, string]): string {
  const cases: [number, number, number, number, number, number] = [2, 0, 1, 1, 1, 2]
  const mod100 = number % 100
  const mod10 = number % 10
  const index: 0 | 1 | 2 = mod100 > 4 && mod100 < 20
    ? 2
    : cases[mod10 < 5 ? mod10 : 5] as 0 | 1 | 2

  return words[index]
}
