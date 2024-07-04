import { Card } from "../App";

interface Props {
    card: Card;
}

export const CardItem = ({ card }: Props) => {
    return (
        <div
            className={`bg-primary600 rounded-lg aspect-square flex items-center justify-center ${
                !card.isFlipped && "text-6xl font-black text-primary300 cursor-pointer"
            }`}
        >
            {card.isFlipped || card.isGuessed ? card.value : "?"}
        </div>
    );
};
