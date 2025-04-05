export const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    const remainingAfterHours = totalSeconds % 3600
    const minutes = Math.floor(remainingAfterHours / 60)
    const remainingAfterMinutes = remainingAfterHours % 60
    const seconds = Math.floor(remainingAfterMinutes)
    const tenths = Math.floor((remainingAfterMinutes - seconds) * 10)

    const pad = (n: number) => n.toString().padStart(2, '0')
    return hours > 0
        ? `${hours}:${pad(minutes)}:${pad(seconds)}`
        : `${pad(minutes)}:${pad(seconds)}.${tenths}`
}
