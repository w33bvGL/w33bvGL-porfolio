export function useAge(): number {
  const { global } = useAppConfig()
  return calcAge(global.birthday)
}
