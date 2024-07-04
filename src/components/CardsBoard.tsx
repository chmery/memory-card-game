import { Card } from "../App";
import { CardItem } from "./CardItem";

interface Props {
    cards: Card[];
    onFlip: (id: string) => void;
}

export const CardsBoard = ({ cards, onFlip }: Props) => {
    return (
        <div className="bg-secondary700 rounded-xl mb-4 p-4 grid-rows-4 grid grid-flow-col gap-3">
            {cards.map((card, i) => (
                <CardItem key={i} card={card} onFlip={onFlip} />
            ))}
        </div>
    );
};
