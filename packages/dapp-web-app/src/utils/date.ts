import dayjs from 'dayjs'

const handleMultiplesAnd = (text: string) => {
  const array = text.split('and').map((item) => item.trim())

  if (array.length === 1) {
    return array[0]
  }

  if (array.length === 2) {
    return `${array[0]} and ${array[1]}`
  }

  return `${array.slice(0, -1).join(', ')}, and ${array.slice(-1)}`
}

export const formatTime = (timeInSeconds: number) => {
  let time = ''

  // If time is less than an hour, display in second
  if (timeInSeconds < 60) {
    return `${timeInSeconds} second${timeInSeconds > 1 ? 's' : ''}`
  }

  // If time is less than an hour, display in minutes
  if (timeInSeconds < 3600) {
    const minutes = dayjs.duration(timeInSeconds, 'seconds').minutes()

    return `${minutes} minute${minutes > 1 ? 's' : ''}`
  }

  // If time is less than a day, display in hours
  if (timeInSeconds < 86400) {
    const hours = dayjs.duration(timeInSeconds, 'seconds').hours()

    time = `${hours} hour${hours > 1 ? 's' : ''}`

    if (timeInSeconds % 3600) {
      time += ` and ${formatTime(timeInSeconds % 3600)}`
    }

    return handleMultiplesAnd(time)
  }

  // If time is more than a day, display in days
  const days = dayjs.duration(timeInSeconds, 'seconds').days()

  time = `${days} day${days > 1 ? 's' : ''}`

  if (timeInSeconds % 86400) {
    time += ` and ${formatTime(timeInSeconds % 86400)}`
  }

  return handleMultiplesAnd(time)
}
