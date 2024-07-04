import { ResetArrow } from "../assets/ResetArrow";
import { getFormattedTime } from "../utils/getFormattedTime";

interface Props {
    onReset: () => void;
    movesCount: number;
    time: number;
}

export const UpperPanel = ({ onReset, movesCount, time }: Props) => {
    return (
        <div className="bg-secondary700 rounded-xl mb-4 flex gap-3 sm:gap-4 justify-between p-3 sm:p-4 flex-wrap text-nowrap">
            <div className="p-2 bg-secondary500 px-5 rounded-lg flex-1 text-center font-semibold">
                Time: <span className="font-bold">{getFormattedTime(time)}</span>
            </div>
            <div className="p-2 bg-secondary500 px-5 rounded-lg flex-1 font-semibold text-center">
                Moves: <span className="font-bold">{movesCount}</span>
            </div>
            <button
                onClick={onReset}
                className="bg-secondary400 font-semibold gap-2 p-2 flex-1 flex justify-center items-center rounded-lg hover:bg-secondary200 transition px-5"
            >
                <ResetArrow className="size-6" /> Restart
            </button>
        </div>
    );
};
