function calculateDays(lastAttempt: Date, retryAfter: number): number {
    if (lastAttempt == null || retryAfter == null || retryAfter <= 0) {
        return -999
    }

    const day = 24 * 60 * 60 * 1000
    const today = new Date()
    const diffInDays = Math.ceil(today.getTime() - lastAttempt.getTime() / day)
    return (retryAfter - diffInDays) + 1
}
