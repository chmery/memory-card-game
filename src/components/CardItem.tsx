import { Card } from "../App";
import { cn } from "../utils/cn";

interface Props {
    card: Card;
    onFlip: (id: string) => void;
}

export const CardItem = ({ card, onFlip }: Props) => {
    const canFlip = !card.isGuessed && !card.isFlipped;
    const isValueVisible = card.isFlipped || card.isGuessed;

    const handleFlip = (id: string) => {
        if (!canFlip) return;
        onFlip(id);
    };

    return (
        <div className="[perspective:1000px]" onClick={() => handleFlip(card.id)}>
            <div
                className={cn(
                    "relative [transform-style:preserve-3d] transition-all duration-500 filter flex items-center justify-center bg-primary600 aspect-square text-3xl sm:text-6xl rounded-lg",
                    isValueVisible && "[transform:rotateY(180deg)] bg-primary300",
                    canFlip && "cursor-pointer",
                    card.isGuessed && "animate-match"
                )}
            >
                <div className="absolute [backface-visibility:hidden] [transform:rotateX(0deg)] font-black text-primary300">
                    ?
                </div>
                <div
                    className={cn(
                        "absolute [backface-visibility:hidden] [transform:rotateY(180deg)]",
                        card.isGuessed && "[backface-visibility:visible] [transform:rotateY(0deg)]"
                    )}
                >
                    {card.value}
                </div>
            </div>
        </div>
    );
};
