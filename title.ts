function onEditTitle(e: GoogleAppsScript.Events.SheetsOnEdit) {
    const title = e.value
    if (getRange(NamedRange.Title).getValues().map(v => v[0].toString()).includes(title)) {
        e.range.setValue(e.oldValue)
        SpreadsheetApp.getUi().alert("Problem has already been added")
    }
}
