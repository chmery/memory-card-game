import { Card } from "../App";

interface Props {
    card: Card;
    onFlip: (id: string) => void;
}

export const CardItem = ({ card, onFlip }: Props) => {
    return (
        <div
            onClick={() => onFlip(card.id)}
            className={`bg-primary600 text-6xl aspect-square rounded-lg flex items-center justify-center ${
                !card.isFlipped && "font-black text-primary300 cursor-pointer"
            }`}
        >
            {card.isFlipped || card.isGuessed ? card.value : "?"}
        </div>
    );
};
