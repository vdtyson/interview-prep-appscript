function onEditTitle(e: GoogleAppsScript.Events.SheetsOnEdit) {
    const title = e.value
    const titleRangeValues= getRange(NamedRange.Title).getValues()

    let frequency = 0
    titleRangeValues.forEach((row: string[]) => {
        row.forEach((col: string) => {
            if (col == title) {
                frequency++
            }
        })
    })

    if (frequency > 1) {
        e.range.setValue(e.oldValue)
        SpreadsheetApp.getUi().alert("Problem with this name has already been added")
    }
}
