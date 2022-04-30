function calculateDays(lastAttempt: Date, retryAfter: number): number {
    if (lastAttempt == null || retryAfter == null || retryAfter <= 0) {
        return -999
    }

    const day = 24 * 60 * 60 * 1000
    const today = new Date()
    const diffInDays = Math.ceil(today.getTime() - lastAttempt.getTime() / day)
    return (retryAfter - diffInDays) + 1
}

function setDaysTillNextAttempt() {
    const ss = SpreadsheetApp.getActive().getSheetByName(Sheet.Problems)
    const daysTillNextAttemptRange = ss.getRange(NamedRange.DaysLeft)
    const reattemptRange = ss.getRange(NamedRange.ReattemptAfter).getValues()
    const lastAttemptRange = ss.getRange(NamedRange.LastAttempted).getValues()

    const n = daysTillNextAttemptRange.getNumRows()
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const reattemptAfter: number = reattemptRange[i][j]
            const lastAttemptDate: Date = lastAttemptRange[i][j]
            const daysLeft = calculateDays(lastAttemptDate, reattemptAfter)
            daysTillNextAttemptRange.getCell(i, j).setValue(daysLeft)
        }
    }
}

function onEditLastAttempt(e: GoogleAppsScript.Events.SheetsOnEdit) {
    setDaysTillNextAttempt()
    const previousAttemptDate = new Date(e.oldValue)
    const currDate = new Date()
    if (previousAttemptDate.getTime() < currDate.getTime()) {
       e.range.offset
    }
}
