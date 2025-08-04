export default function AnswerBox({props, next}: any) {
    return(
        <div className="bg-amber-100 py-4 px-2">
            <p>Japanese: {props.japanese}</p>
            <p>Romanji: {props.romanji}</p>
            <p>Kanji: {props.kanji}</p>
            <button onClick={next} className="bg-amber-700 px-4 py-2 rounded-md cursor-pointer w-full mt-4">Next</button>
        </div>
    )
}