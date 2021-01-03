import Cell from '../cell'

export default function Board({ cells, handleBoardPress }) {
    const getBoarderClassNames = cell => {
        let className = ''
        if (cell.column % 3 === 0) {
            className += 'block--left ';
        }
        if (cell.column % 3 === 2) {
            className += 'block--right ';
        }
        if (cell.row % 3 === 0) {
            className += 'block--top ';
        }
        if (cell.row % 3 === 2) {
            className += 'block--bottom ';
        }
        return className
    }
    return (<>
        <style jsx>{`
            div {
                display: grid;
                background: #ffffff;
                grid-template-columns: repeat(9, 1fr);
                grid-template-rows: repeat(9, 1fr);
                margin: 24px;
                overflow: hidden;
            }
        `}</style>
        <div>
            {cells?.map((cell) => (
                <Cell key={'cellIndex'+cell.index} {...{ cell, handleCellPress: () => handleBoardPress(cell), borderClassName: getBoarderClassNames(cell) }} />
            ))}
        </div>
    </>)
}
