export type BoardSize = `${number}x${number}`;

const BOARD_SIZES: BoardSize[] = ["4x4", "4x5", "4x6"];

interface Props {
    selectedSize: string;
    onSelect: (selectedSize: BoardSize) => void;
}

export const BoardSizeSelect = ({ selectedSize, onSelect }: Props) => {
    return (
        <div className="bg-secondary700 rounded-xl flex items-center justify-center p-3 sm:p-4 flex-wrap text-nowrap gap-3 sm:gap-6">
            <p className="font-semibold">Board size:</p>
            <div className="flex flex-1 gap-3 sm:gap-4">
                {BOARD_SIZES.map((size, i) => (
                    <button
                        key={i}
                        onClick={() => onSelect(size)}
                        className={`text-center px-5 py-2 bg-secondary400 rounded-lg font-semibold hover:bg-secondary200 transition flex-1 ${
                            selectedSize === size && "bg-[#79798E]"
                        }`}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>
    );
};
