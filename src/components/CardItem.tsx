import { Card } from "../App";

interface Props {
    card: Card;
    onFlip: (id: string) => void;
}

export const CardItem = ({ card, onFlip }: Props) => {
    const canFlip = !card.isGuessed && !card.isFlipped;

    return (
        <div
            onClick={() => canFlip && onFlip(card.id)}
            className={`bg-primary600 text-6xl aspect-square rounded-lg flex items-center justify-center ${
                !card.isFlipped && !card.isGuessed && "font-black text-primary300 cursor-pointer"
            }`}
        >
            {card.isFlipped || card.isGuessed ? card.value : "?"}
        </div>
    );
};
