enum Patterns {
    Array = "Array",
    Matrix = "Matrix",
    TwoPointer = "Two Pointer",
    BinarySearch = "Binary Search",
    DynamicProgramming = "DP",
    SlidingWindow = "Sliding Window",
    Sorting = "Sorting",
    LinkedList = "Linked List",
    DepthFirstSearch = "DFS",
    BreadthFirstSearch = "BFS",
    PatternRecognizer = "Pattern Recognizer",
}


function validatePatterns(values: string[]): boolean {
    return values.filter(value => {
        const patterns = Object.values(Patterns).map(p => trimSpace(p).toString())
        return patterns.includes(value)
    }).length == values.length
}

function createPatternStr(values: Set<string>): string {
    return Array.from(values.values())
        .sort((a, b) => b.localeCompare(a))
        .map(v => Object.values(Patterns).filter(p => trimSpace(p).toString() == v)[0].toString())
        .join(", ")
}

function getPatterns(s: string): string[] {
    return trimSpace(s).replace(/\s/g, "").split(",")
}

function trimSpace(s: string): string {
    return s.replace(/\s/g, "")
}


function onEditPattern(e: GoogleAppsScript.Events.SheetsOnEdit) {
    if (!(e.value && trimSpace(e.value) != "")) {
        return
    }
    if (validatePatterns(getPatterns(e.value))) {
        const x = getPatterns(e.value)
        x.push(...getPatterns(e.oldValue))

        const patterns = new Set(x)
        e.range.setValue(createPatternStr(patterns))
    } else {
        e.range.setValue(e.oldValue)
        SpreadsheetApp.getUi().alert("Invalid patterns inserted")
    }
}
