function onEditTitle(e: GoogleAppsScript.Events.SheetsOnEdit) {
    const editRowIdx = e.range.getRow()
    const editColIdx = e.range.getColumn()
    const title = e.value
    const titleRangeValues= getRange(NamedRange.Title).getValues()

    titleRangeValues.forEach((row: string[], rowIdx: number) => {
        row.forEach((col: string, colIdx: number) => {
            if (editRowIdx != rowIdx && editColIdx != colIdx && title == col) {
                e.range.setValue(e.oldValue)
                SpreadsheetApp.getUi().alert("Problem with this name has already been added")
            }
        })
    })
}
