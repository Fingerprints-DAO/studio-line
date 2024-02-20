import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export enum Interval {
  CanMove = dayjs.duration(5, 'minutes').asMilliseconds(),
  Price = dayjs.duration(20, 'seconds').asMilliseconds(),
  TokenId = dayjs.duration(20, 'seconds').asMilliseconds(),
  StarTokenMinted = dayjs.duration(2, 'minutes').asMilliseconds(),
  GetGrid = dayjs.duration(1, 'minutes').asMilliseconds(),
  GetTokens = dayjs.duration(1, 'minutes').asMilliseconds(),
  Timer = dayjs.duration(1, 'minute').asMilliseconds(),
}
