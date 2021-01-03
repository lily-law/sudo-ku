export default function HighlightHelper(board) {
    const highlights = {}
    function handleHighlightingCellSectors(cell) {
        handleChangeHighlightClass('active', { indexes: [cell?.index] })
        handleChangeHighlightClass('illuminate', { values: cell?.value?.value ? [cell.value.value] : [] })
        handleChangeHighlightClass('tint', { columns: [cell?.column], rows: [cell?.row], blocks: [cell?.block] })
    }
    function handleChangeHighlightClass(className, locations) {
        const addHighlightClass = (className, locations) => handleHighlightUpdates(className, locations, false)
        const removeHighlightClass = (className, locations) => handleHighlightUpdates(className, locations, true)
        highlights[className] && removeHighlightClass(className, highlights[className])
        addHighlightClass(className, locations)
        highlights[className] = locations
    }
    function handleHighlightUpdates(className, locations, unhighlight) {
        const cellsToUpdate = [];
        Object.entries(locations).forEach(([locationType, indexArray]: [string, number[]]) => {
            if (locationType === 'indexes') {
                cellsToUpdate.push(board.cells.filter(cell => indexArray.includes(cell.index)))
            }
            else if (locationType === 'values') {
                cellsToUpdate.push(board.cells.filter(cell => indexArray.includes(cell.value.value)))
            }
            else if (['columns', 'rows', 'blocks'].includes(locationType)) {
                indexArray?.forEach(ref => {
                    cellsToUpdate.push(board[locationType]?.[ref])
                })
            }
        })
        cellsToUpdate.flat().forEach(cell => cell && cell.value.highlightUpdater(className, unhighlight))
    }
    return {handleChangeHighlightClass, handleHighlightingCellSectors}
}