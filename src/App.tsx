import { useCallback, useEffect, useRef, useState } from "react";
import { CardsBoard } from "./components/CardsBoard";
import { UpperPanel } from "./components/UpperPanel";

export interface Card {
    id: string;
    value: string;
    isFlipped: boolean;
    isGuessed: boolean;
}

const CARD_VALUES = ["😇", "👾", "🤖", "🤠", "👻", "😸", "🧠", "🧤", "🦴", "🥳", "👽", "💍"];

function App() {
    const getCardObjects = () => {
        return CARD_VALUES.map((value) => {
            return {
                id: crypto.randomUUID(),
                value,
                isFlipped: false,
                isGuessed: false,
            };
        });
    };

    const getDuplicatedCards = (cards: Card[]) => {
        const duplicated = [];
        for (const card of cards) {
            duplicated.push(card, { ...card, id: crypto.randomUUID() });
        }
        return duplicated;
    };

    const getShuffledCards = (cards: Card[]) => {
        const cardsCopy = structuredClone(cards);

        for (let i = cardsCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cardsCopy[i], cardsCopy[j]] = [cardsCopy[j], cardsCopy[i]];
        }

        return cardsCopy;
    };

    const getNewBoard = () => {
        return getShuffledCards(getDuplicatedCards(getCardObjects()));
    };

    const [cards, setCards] = useState<Card[]>(() => getNewBoard());
    const [movesCount, setMovesCount] = useState(0);
    const [time, setTime] = useState(0);
    const flippedCards = useRef<Card[] | []>([]);

    const handleCardFlip = (id: string) => {
        const updatedCards = cards.map((prevCard) =>
            prevCard.id === id ? { ...prevCard, isFlipped: true } : prevCard
        );

        setCards(updatedCards);
        flippedCards.current = updatedCards.filter((card) => card.isFlipped === true);

        if (flippedCards.current.length === 2 && isMatch(flippedCards.current)) {
            const matchedValue = flippedCards.current[0].value;
            handleCardsMatch(matchedValue);
        }

        if (flippedCards.current.length === 3) {
            setMovesCount((prevMovesCount) => ++prevMovesCount);

            setCards((prevCards) =>
                prevCards.map((prevCard) => {
                    return prevCard.id === id
                        ? { ...prevCard, isFlipped: true }
                        : { ...prevCard, isFlipped: false };
                })
            );
        }
    };

    const handleCardsMatch = useCallback((matchedValue: string) => {
        setCards((prevCards) =>
            prevCards.map((prevCard) =>
                prevCard.value === matchedValue ? { ...prevCard, isGuessed: true } : prevCard
            )
        );
    }, []);

    const isMatch = (flippedCards: Card[]) => {
        return flippedCards[0].value === flippedCards[1].value ? true : false;
    };

    const handleReset = () => {
        setCards(getNewBoard);
        setMovesCount(0);
        setTime(0);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prevTime) => ++prevTime);
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    return (
        <main className="max-w-[45rem] m-auto mt-4 px-2">
            <h1 className="text-3xl italic font-black text-center mb-4">MEMORY CARD GAME</h1>
            <UpperPanel onReset={handleReset} movesCount={movesCount} time={time} />
            <CardsBoard cards={cards} onFlip={handleCardFlip} />
            <div className="bg-secondary700 rounded-xl">content</div>
        </main>
    );
}

export default App;
