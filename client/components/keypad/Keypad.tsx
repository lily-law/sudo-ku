export default function Keypad({ activeKey, handleClick }) {
    return (<>
        <style jsx>{`
        div {
        display: grid;
        place-items: center center;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 16px;
        margin: 24px;
        }
        button {
        width: 8vw;
        height: 8vw;
        font-size: 18px;
        background: linear-gradient(to right, #999999, #cccccc);
        border-radius: 15% 15%;
        outline: none;
        color: #ffffff;
        }
        button:active {
        background: linear-gradient(to right, #777777, #aaaaaa);
        }
        button.active {
        background: linear-gradient(to right, #cccccc, #eeeeee);
        }
        @media only screen and (orientation: landscape) {
            div {
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: repeat(4, 1fr);
                margin: 0;
            }
            .keyx {
                grid-column-start: 2;
            }
            button {
                width: 5vh;
                height: 5vh;
            }
        }
        `}</style>
        <div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, null].map((value) => (
                <button key={`key${value}${activeKey === value ? 'active' : ''}`} onClick={() => handleClick(value)} className={`key${!value ? 'x' : value}`}>
                    {value || 'X'}
                </button>
            ))}
        </div>
    </>)
}
