import { useEffect, useState, useRef } from 'react'

function CellNotes({ notes }) {
    return (
        <div>
            {notes?.map((note) => (
                <span>{note}</span>
            ))}
        </div>
    )
}

export default function Cell({ cell, handleCellPress, borderClassName }) {
    const [value, setValue] = useState(cell.value?.value)
    const [notes, setNotes] = useState(cell.value?.notes)
    const highlightClassArrayRef = useRef(cell.value.highlightClassArray || [])
    const [highlightClassArray, setHighlightClassArray] = useState(highlightClassArrayRef.current)

    function handleUpdateValue(val) {
        !cell.value?.locked && setValue(val)
    }
    function handleSetHighlight(className, removeClassName) {
        let newHighlightClassArray = highlightClassArrayRef.current
        if (removeClassName) {
            newHighlightClassArray = highlightClassArrayRef.current.filter(name => name.trim() !== className)
        }
        else if (!highlightClassArrayRef.current.includes(className)) {
            newHighlightClassArray = [...highlightClassArrayRef.current, className]
        }
        highlightClassArrayRef.current = newHighlightClassArray
        setHighlightClassArray(highlightClassArrayRef.current.join(' '))
    }
    function handleUpdateNotes(notesArr) {
        setNotes(notesArr)
    }

    useEffect(() => {
        cell.value?.subscribe({
            valueUpdater: handleUpdateValue,
            highlightUpdater: handleSetHighlight,
            notesUpdater: handleUpdateNotes
        })
    }, [])

    return (<>
    <style jsx>{`
        div {
            background: #ffffff;
            border: 1px solid black;
            position: relative;
            width: 8vw;
            height: 8vw;
            font-size: 4vw;
            box-sizing: border-box;
            display: grid;
            grid-template-columns: 1fr 1fr;
        }
        div.tint {
            background: rgba(120, 170, 238, 0.2);
        }
        div.illuminate {
            background: rgb(120, 170, 238, 0.5);
        }
        div.invalid:not(.locked) {
            background: rgb(255, 204, 204);
        }
        div.active {
            background: rgb(120, 170, 238);
        }
        div.locked::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: #1b1b1b;
            opacity: 0.2;
        }
        div.lockeddiv.highlight {
            background: #bbbbff;
        }
        
        .block--left {
            border-left-width: 2px;
        }
        .block--top {
            border-top-width: 2px;
        }
        .block--right {
            border-right-width: 2px;
        }
        .block--bottom {
            border-bottom-width: 2px;
        }
        @media only screen and (orientation: landscape) {
            div {
            width: 5vh;
            height: 5vh;
            font-size: 2.5vh;
            }
        }
    `}</style>
        <div onClick={handleCellPress} className={`${borderClassName || ''} ${cell.value?.locked ? 'locked' : ''} ${highlightClassArray}`}>
            <span>{value}</span>
            <CellNotes notes={notes} />
        </div>
    </>)
}
