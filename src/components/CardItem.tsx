import { Card } from "../App";

interface Props {
    card: Card;
    onFlip: (id: string) => void;
}

export const CardItem = ({ card, onFlip }: Props) => {
    const canFlip = !card.isGuessed && !card.isFlipped;
    const isValueVisible = card.isFlipped || card.isGuessed;

    return (
        <div
            onClick={() => canFlip && onFlip(card.id)}
            className={`bg-primary600 relative text-3xl sm:text-6xl  aspect-square rounded-lg flex items-center justify-center ${
                canFlip && "font-black text-primary300 cursor-pointer"
            }`}
        >
            <span className="absolute">{isValueVisible ? card.value : "?"}</span>
        </div>
    );
};
