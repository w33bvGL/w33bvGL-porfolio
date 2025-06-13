const { global } = useAppConfig()

export function getAge() {
  const birthday = new Date(global.birthday)
  const today = new Date()

  return today.getFullYear() - birthday.getFullYear() - (
    today.getMonth() < birthday.getMonth()
    || (today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDate())
      ? 1
      : 0
  )
}
