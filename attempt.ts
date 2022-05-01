function calculateDays(lastAttempt: Date, retryAfter: number): number {
    Logger.log("last attempt: " + lastAttempt + " retryAfter: " + retryAfter)
    if (lastAttempt == null || retryAfter == null || retryAfter <= 0) {
        return null
    }

    const day = 24 * 60 * 60 * 1000
    const today = new Date()
    const diffInDays = Math.ceil((today.getTime() - lastAttempt.getTime()) / day)
    return (retryAfter - diffInDays) + 1
}

function setDaysTillNextAttempt() {
    const range = getRange(NamedRange.TimedAttemptData)
    const rangeValues = range.getValues()
    rangeValues.forEach((row) => {
        const lastAttempted: Date = row[0]
        const reattemptAfterDays: number = row[1]
        const daysLeft = calculateDays(lastAttempted, reattemptAfterDays)
        let noun = () : string => {
            if (daysLeft === 1) {
                return "day"
            }  else {
                return "days"
            }
        }
        if (daysLeft && daysLeft > 0) {
            row[2] = `${daysLeft} ${noun()} remaining`
        } else if (daysLeft && daysLeft < 0) {
            row[2] = `${-daysLeft} ${noun()} behind`
        } else if (daysLeft == 0) {
          row[2] = "Due Today"
        } else {
            row[2] = ""
        }
    })
    range.setValues(rangeValues)
}
