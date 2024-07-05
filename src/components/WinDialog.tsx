import * as Dialog from "@radix-ui/react-dialog";
import { ResetArrow } from "../assets/ResetArrow";
import { getFormattedTime } from "../utils/getFormattedTime";

interface Props {
    isOpen: boolean;
    onOpenChange: () => void;
    onReset: () => void;
    time: number;
    movesCount: number;
}

export const WinDialog = ({ isOpen, onOpenChange, onReset, time, movesCount }: Props) => {
    return (
        <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-[#121213d2] fixed inset-0" />
                <Dialog.Content className="bg-secondary500 px-8 py-6 max-w-[25rem] min-w-[15rem] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl">
                    <Dialog.Title className="text-center font-black text-2xl">
                        You won! 🥳
                    </Dialog.Title>
                    <Dialog.Description className="text-center mt-2 font-medium">
                        You completed the game in
                        <span className="font-semibold"> {movesCount}</span> moves and your final
                        time is
                        <span className="font-semibold"> {getFormattedTime(time)}</span>.
                    </Dialog.Description>
                    <Dialog.Close asChild>
                        <button
                            onClick={onReset}
                            className="bg-secondary400 font-semibold gap-2 flex justify-center items-center rounded-lg hover:bg-secondary200 transition px-5 m-auto mt-4 py-2"
                        >
                            <ResetArrow className="size-6" /> Restart
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};
