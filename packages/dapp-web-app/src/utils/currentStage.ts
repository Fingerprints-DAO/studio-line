import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

export enum PageState {
  Soon = 'Soon',
  PreAuction = 'PreAuction',
  Auction = 'Auction',
  Ended = 'Ended',
}

const ET = 'America/New_York'
const currentDate = dayjs().tz(ET)

const stageDates: Record<PageState, dayjs.Dayjs | undefined> = {
  [PageState.Soon]: dayjs.tz('2023-08-10 22:00:00', ET),
  [PageState.PreAuction]: dayjs.tz('2023-08-15 11:00:00', ET),
  [PageState.Auction]: dayjs.tz('2023-08-16 11:00:00', ET),
  [PageState.Ended]: undefined,
}

const getStageFromEnv = (): PageState | undefined => {
  return process.env.NEXT_PUBLIC_STAGE as PageState
}

const getCurrentStage = (): PageState => {
  for (let stage of Object.values(PageState)) {
    if (currentDate.isBefore(stageDates[stage])) {
      return stage
    }
  }
  return PageState.Ended
}

export const getEffectiveStage = (): PageState => {
  return getStageFromEnv() || getCurrentStage()
}

const compareStages = (current: PageState, target: PageState): number => {
  return (
    Object.values(PageState).indexOf(current) -
    Object.values(PageState).indexOf(target)
  )
}

export const isBeforeStage = (targetStage: PageState): boolean => {
  return compareStages(getEffectiveStage(), targetStage) < 0
}

export const isAfterStage = (targetStage: PageState): boolean => {
  return compareStages(getEffectiveStage(), targetStage) > 0
}
