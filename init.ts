function init() {
    setPatternDropdown()
    setDaysTillNextAttempt()
}

function setPatternDropdown() {
    let range = SpreadsheetApp.getActive().getSheetByName(Sheet.Problems).getRange(NamedRange.Patterns)
    range.setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(Object.values(Patterns)).setAllowInvalid(true))
}

function setDaysTillNextAttempt() {
    const ss = SpreadsheetApp.getActive().getSheetByName(Sheet.Problems)
    const daysTillNextAttemptRange = ss.getRange(NamedRange.DaysLeft)
    const reattemptRange = ss.getRange(NamedRange.ReattemptAfter)
    const lastAttemptRange = ss.getRange(NamedRange.LastAttempted)

    const n = daysTillNextAttemptRange.getNumRows()
    for (let i = 0; i < n; i++) {
        const reattemptAfter = reattemptRange.getCell(reattemptRange.getRow() + i, reattemptRange.getColumn()).getValue() as number
        const lastAttempt = lastAttemptRange.getCell(lastAttemptRange.getRow() + i, lastAttemptRange.getColumn()).getValue() as Date
        daysTillNextAttemptRange.getCell(daysTillNextAttemptRange.getRow() + i, daysTillNextAttemptRange.getColumn()).setValue(calculateDays(lastAttempt, reattemptAfter))
    }
}
