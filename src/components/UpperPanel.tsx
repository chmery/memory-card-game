import { ResetArrow } from "../assets/ResetArrow";

interface Props {
    onReset: () => void;
    movesCount: number;
}

export const UpperPanel = ({ onReset, movesCount }: Props) => {
    return (
        <div className="bg-secondary700 rounded-xl mb-4 flex gap-4 justify-between p-4">
            <div className="p-2 bg-secondary500 px-5 rounded-lg flex-1 text-center">time</div>
            <div className="p-2 bg-secondary500 px-5 rounded-lg flex-1 font-semibold text-center">
                Moves: <span className="font-bold">{movesCount}</span>
            </div>
            <button
                onClick={onReset}
                className="bg-secondary400 font-semibold gap-2 flex-1 flex justify-center items-center rounded-lg hover:bg-secondary200 transition px-5"
            >
                <ResetArrow className="size-6" /> Restart
            </button>
        </div>
    );
};
