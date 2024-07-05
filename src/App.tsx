import { useCallback, useEffect, useRef, useState } from "react";
import { CardsBoard } from "./components/CardsBoard";
import { UpperPanel } from "./components/UpperPanel";
import { WinDialog } from "./components/WinDialog";
import { BoardSize, BoardSizeSelect } from "./components/BoardSizeSelect";

export interface Card {
    id: string;
    value: string;
    isFlipped: boolean;
    isGuessed: boolean;
}

const CARD_VALUES = ["😇", "👾", "🤖", "🤠", "👻", "😸", "🧠", "🧤", "🦴", "🥳", "👽", "💍"];

function App() {
    const [boardSize, setBoardSize] = useState<BoardSize>("4x4");

    const calcCardsNeeded = useCallback(() => {
        const [x, y] = boardSize.split("x");
        return (+x * +y) / 2;
    }, [boardSize]);

    const getCardObjects = useCallback(() => {
        const trimmedArray = CARD_VALUES.slice(0, calcCardsNeeded());

        return trimmedArray.map((value) => {
            return {
                id: crypto.randomUUID(),
                value,
                isFlipped: false,
                isGuessed: false,
            };
        });
    }, [calcCardsNeeded]);

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

    const getNewBoard = useCallback(() => {
        return getShuffledCards(getDuplicatedCards(getCardObjects()));
    }, [getCardObjects]);

    const [cards, setCards] = useState<Card[]>(() => getNewBoard());
    const [movesCount, setMovesCount] = useState(0);
    const [time, setTime] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const flippedCards = useRef<Card[] | null>(null);
    const guessedCount = useRef(0);

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

        if (flippedCards.current.length === 2) {
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

    const handleCardsMatch = useCallback(
        (matchedValue: string) => {
            const isLastPairMatch = guessedCount.current === cards.length / 2 - 1;

            if (isLastPairMatch) {
                setMovesCount((prevMovesCount) => ++prevMovesCount);
            }

            guessedCount.current++;
            setCards((prevCards) =>
                prevCards.map((prevCard) =>
                    prevCard.value === matchedValue ? { ...prevCard, isGuessed: true } : prevCard
                )
            );
        },
        [cards.length]
    );

    const isMatch = (flippedCards: Card[]) => flippedCards[0].value === flippedCards[1].value;

    const handleReset = useCallback(() => {
        setCards(getNewBoard);
        setMovesCount(0);
        setTime(0);
        setIsTimerRunning(true);
        guessedCount.current = 0;
    }, [getNewBoard]);

    const handleDialogOpenChange = () => {
        setIsDialogOpen((prevIsDialogOpen) => !prevIsDialogOpen);
        handleReset();
    };

    const handleBoardSizeSelect = (selectedSize: BoardSize) => setBoardSize(selectedSize);

    useEffect(() => {
        handleReset();
    }, [boardSize, handleReset]);

    useEffect(() => {
        if (!isTimerRunning) return;

        const interval = setInterval(() => {
            setTime((prevTime) => ++prevTime);
        }, 1000);

        return () => clearInterval(interval);
    }, [time, isTimerRunning]);

    useEffect(() => {
        if (guessedCount.current === cards.length / 2) {
            setIsTimerRunning(false);
            setIsDialogOpen(true);
        }
    }, [cards]);

    return (
        <>
            <main className="max-w-[45rem] m-auto mt-4 px-2">
                <h1 className="text-3xl italic font-black text-center mb-4">MEMORY CARD GAME</h1>
                <UpperPanel onReset={handleReset} movesCount={movesCount} time={time} />
                <CardsBoard cards={cards} onFlip={handleCardFlip} />
                <BoardSizeSelect selectedSize={boardSize} onSelect={handleBoardSizeSelect} />
            </main>
            <WinDialog
                movesCount={movesCount}
                time={time}
                onReset={handleReset}
                isOpen={isDialogOpen}
                onOpenChange={handleDialogOpenChange}
            />
        </>
    );
}

export default App;
