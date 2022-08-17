import {useEffect} from "react";

// TODO: Refactor, usar otro metodo
export const useClickOutside = (
    insideRefs: React.MutableRefObject<any>[],
    isVisible: boolean,
    onClose?: () => void,
) => {
    useEffect(() => {
        const handleWindowClick = (event: { target: any; }) => {
            const someRefContainTarget = insideRefs
                .filter((ref) => ref.current)
                .some((ref) => ref.current.contains(event.target));

            if (someRefContainTarget) {
                return;
            }

            if (!isVisible) {
                return;
            }

            if (onClose) {
                onClose();
            }
        };

        if (isVisible) {
            window.addEventListener("click", handleWindowClick);
        }

        return () => {
            if (isVisible) {
                window.removeEventListener("click", handleWindowClick);
            }
        };
    }, [isVisible, onClose]);
};
