type AnswerBoxProps = {
    english: string;
    japanese: string;
    romanji: string;
    kanji: string;
};

export default function AnswerBox({
    props,
    next,
}: {
    props: AnswerBoxProps;
    next: () => void;
}) {
    return (
        <div className="bg-slate-50 w-[250px] py-4 px-2 rounded-md mt-2">
            <p>Japanese: {props.japanese}</p>
            <p>Romanji: {props.romanji}</p>
            <p>Kanji: {props.kanji}</p>
            <button
                onClick={next}
                className="bg-amber-500 px-4 py-2 rounded-md cursor-pointer w-full mt-4"
            >
                Next
            </button>
        </div>
    );
}