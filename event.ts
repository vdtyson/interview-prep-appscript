function onEdit(e: GoogleAppsScript.Events.SheetsOnEdit) {
   if (rangeContains(NamedRange.Patterns, e.range)) {
       onEditPattern(e)
   }
   if (rangeContains(NamedRange.Title, e.range)) {
       onEditTitle(e)
   }
   if (rangeContains(NamedRange.TimedAttemptData, e.range)) {
       setDaysTillNextAttempt()
   }
}

function onOpen(e: GoogleAppsScript.Events.SheetsOnOpen) {
    init()
}
