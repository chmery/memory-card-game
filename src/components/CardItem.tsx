import { Card } from "../App";

interface Props {
    card: Card;
    onFlip: (id: string) => void;
}

export const CardItem = ({ card, onFlip }: Props) => {
    const canFlip = !card.isGuessed && !card.isFlipped;
    const isValueVisible = card.isFlipped || card.isGuessed;

    return (
        <div className="[perspective:1000px]" onClick={() => onFlip(card.id)}>
            <div
                className={`${isValueVisible && "[transform:rotateY(180deg)]"} ${
                    canFlip && "cursor-pointer"
                }    
                relative [transform-style:preserve-3d] transition-all duration-500 flex items-center justify-center bg-primary600 aspect-square text-3xl sm:text-6xl rounded-lg`}
            >
                <div className="absolute [backface-visibility:hidden] font-black text-primary300">
                    ?
                </div>
                <div className="absolute [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    {card.value}
                </div>
            </div>
        </div>
    );
};
