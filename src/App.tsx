interface Card {
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
            duplicated.push(card, card);
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

    return (
        <main className="max-w-[50rem] m-auto mt-4 px-2">
            <h1 className="text-3xl italic font-black text-center mb-4">MEMORY CARD GAME</h1>
            <div className="bg-secondary700 rounded-xl mb-4">content</div>
            <div className="bg-secondary700 rounded-xl mb-4">content</div>
            <div className="bg-secondary700 rounded-xl">content</div>
        </main>
    );
}

export default App;
