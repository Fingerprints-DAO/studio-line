import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export enum Interval {
  CanMove = dayjs.duration(5, 'minutes').asMilliseconds(),
  Price = dayjs.duration(20, 'seconds').asMilliseconds(),
  TokenId = dayjs.duration(20, 'seconds').asMilliseconds(),
  // Timer = dayjs.duration(1, 'minute').asMilliseconds(),
}
