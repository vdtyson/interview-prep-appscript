function onEdit(e: GoogleAppsScript.Events.SheetsOnEdit) {
   if (rangeContains(NamedRange.Patterns, e.range)) {
       onEditPattern(e)
   }
   if (rangeContains(NamedRange.Title, e.range)) {
       onEditTitle(e)
   }
}

function onOpen(e: GoogleAppsScript.Events.SheetsOnOpen) {
    init()
}
