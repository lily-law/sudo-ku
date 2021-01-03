import Grid from '@lilylaw/grid'

export default function Level(difficulty) {
    this.cells = this.generate(difficulty)
}
Level.prototype.generate = function (template) {
    function unpack(template) {
        const cells = []
        // seed = <sequence of n<column>n<row>...> - values
        const [colRowsStr, valuesStr] = template.split('-')
        if (colRowsStr && valuesStr) {
            const values = valuesStr.split('')
            values.forEach((value, i) => {
                const colIndex = i * 2
                cells.push({
                    value: {
                        value: Number.parseInt(value),
                        locked: true,
                    },
                    column: colRowsStr[colIndex],
                    row: colRowsStr[colIndex + 1],
                })
            })
        }
        return cells
    }

    return unpack(template)
}

export async function initLevel({ newLevelTemplate, levelData }: { newLevelTemplate?; levelData? }) {
    const grid = new Grid({ columns: 9, rows: 9, blockSize: { width: 3 } })
    const level = newLevelTemplate ? new Level(newLevelTemplate) : levelData ? levelData : null
    if (level) {
        grid.updateCells(level.cells)
    }
    grid.updateCells(
        grid.cells.map((cell) => {
            let borderClass = ''
            if (cell.column % 3 === 0) {
                borderClass += 'block--left '
            }
            if (cell.column % 3 === 2) {
                borderClass += 'block--right '
            }
            if (cell.row % 3 === 0) {
                borderClass += 'block--top '
            }
            if (cell.row % 3 === 2) {
                borderClass += 'block--bottom '
            }
            return {
                borderClass,
                value: null,
                active: false,
                highlightClass: '',
                ...cell,
            }
        })
    )
    return grid
}
