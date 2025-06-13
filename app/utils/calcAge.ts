export function calcAge(birthdayString: string): number {
  const birthday = new Date(birthdayString)
  const today = new Date()

  return today.getFullYear() - birthday.getFullYear() - (
    today.getMonth() < birthday.getMonth()
    || (today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDate())
      ? 1
      : 0
  )
}
