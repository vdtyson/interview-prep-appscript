enum NamedRange {
    Patterns = "Patterns",
    DaysLeft = "DaysLeft",
    LastAttempted = "LastAttempted",
    ReattemptAfter = "ReattemptAfter",
    Title = "Title"
}

class Sheet {
    static Problems = "Problems"
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
