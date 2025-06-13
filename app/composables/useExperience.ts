import { useI18n } from '#imports'

export function useExperienceString() {
  const { global } = useAppConfig()
  const { t, tm } = useI18n()

  const experience = getExperience(global.experienceStartDate)

  const experienceString = computed(() => {
    const y = experience.years
    const m = experience.months

    const yearsWords = tm('experience.years') as [string, string, string]
    const monthsWords = tm('experience.months') as [string, string, string]

    const yearsWord = declOfNum(y, yearsWords)
    const monthsWord = declOfNum(m, monthsWords)

    let result = ''
    if (y > 0) result += `${y} ${yearsWord}`
    if (m > 0) result += (result ? ' ' : '') + `${m} ${monthsWord}`
    if (!result) result = t('experience.lessThanMonth')

    return result
  })

  return {
    experience,
    experienceString
  }
}
