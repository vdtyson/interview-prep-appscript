enum NamedRange {
    Patterns = "Patterns",
    DaysLeft = "DaysLeft",
    LastAttempted = "LastAttempted",
    ReattemptAfter = "ReattemptAfter",
    Title = "Title",
    TimedAttemptData = "TimedAttemptData"
}

enum Sheet {
    Problems = "Problems"
}

function jumpToFirst(r: NamedRange, value: any) {
    const range = getRange(r)
    const rows = range.getValues()
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < range[i].length; j++) {
            if (range[i][j] == value) {
                range.getCell(i, j).activateAsCurrentCell()
                break;
            }
        }
    }
}

function getRange(r: NamedRange): GoogleAppsScript.Spreadsheet.Range {
    return SpreadsheetApp.getActive().getSheetByName(Sheet.Problems).getRange(r)
}

function rangeContains(r: NamedRange, compareTo: GoogleAppsScript.Spreadsheet.Range): boolean {
    const range = getRange(r)
    if (compareTo.getRow() < range.getRow() || compareTo.getLastRow() > range.getLastRow()) {
        return false
    }
    return !(compareTo.getColumn() < range.getColumn() || compareTo.getLastColumn() > range.getLastColumn());

}
