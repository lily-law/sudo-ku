import { useEffect, useRef, useState } from 'react'
import { initLevel } from '../../utils/Level'
import Keypad from '../../components/keypad'
import Board from '../../components/board'
import HighlightHelper from './helpers/highlightHelper'

export default function Game({gameData}) {   
    const [loaded, setLoaded] = useState(false);
    const board: any = useRef()
    const highlightHelper = useRef<any>({})
    let activeKey = false
    let activeCell: any = false
    
    const setCell = (cell, value) => {
        cell.value.valueUpdater(value)
        board.current.cells[cell.index].value.value = (value)
    }
    const updateActiveCell = cell => {
        const newActiveCell = cell.index !== activeCell?.index ? cell : false
        activeCell = newActiveCell 
        highlightHelper.current.handleHighlightingCellSectors?.(newActiveCell ? cell : null)
    } 
    const updateActiveKey = value => {
        const newActiveKey = activeKey !== value ? value : false
        highlightHelper.current.handleChangeHighlightClass?.('illuminate', { values: newActiveKey !== false ? [value] : [] })
        activeKey = newActiveKey
    }

    function handleKeypadPress(value) {
        if (!activeCell) {
            updateActiveKey(value)
        } else {
            setCell(activeCell, value)
        }
    }
    function handleBoardPress(cell) {
        if (activeKey !== false) {
            const newValue = board.current.cells[cell.index].value.value !== activeKey ? activeKey : null
            setCell(cell, newValue)
            cell.value.highlightUpdater('illuminate', !newValue)
        } else {
            updateActiveCell(cell)
        }
    }
    // sequence of n<column>n<row>...
    const templates = {
        easy: '2050314161810212226282031333437383142444054565751626364666073757670838485878-93629482763213645967741962453176439826',
        medium: '004070011141812333538304145464745575162656074757677728485868-438169737456892469458743151523',
        hard: '00107080114102426243536304243405758506364676860757772888-7692169754926255313215416249',
        expert: '1020601171813223336314345405357585067647385888-31445256121367291976985',
        empty: '',
    }
    useEffect(() => {
        (async () => {
            const gridData = await initLevel(gameData)
            gridData.cells.forEach(cell => cell.value = {
                ...cell.value, 
                subscribe: subscribers => {
                    const updateCell = update => {
                        gridData.cells[cell.index].value = {...cell.value, ...update}
                    }
                    updateCell({
                        ...subscribers
                    })
                }
            })
            board.current = gridData
            highlightHelper.current = HighlightHelper(gridData)

            setLoaded(true)
        })()
    }, [])
    return (<>
        <style jsx>{`
            div {
                display: grid;
                place-items: center center;
                min-height: 100vh;
                background: #555555;
                grid-template-rows: auto 1fr;
            }
            @media only screen and (orientation: landscape) {
                div {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
        `}</style>
        <div>
            <Keypad {...{activeKey, handleClick: handleKeypadPress}} />
            <Board key={loaded ? 'boardHasData' : 'noBoard'} {...{ cells: board.current?.cells, handleBoardPress }} />
        </div>
    </>)
}


    