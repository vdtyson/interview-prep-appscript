function init() {
    setPatternDropdown()
    setDaysTillNextAttempt()
}

function setPatternDropdown() {
    let range = SpreadsheetApp.getActive().getSheetByName(Sheet.Problems).getRange(NamedRange.Patterns)
    range.setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(Object.values(Patterns)).setAllowInvalid(true))
}
