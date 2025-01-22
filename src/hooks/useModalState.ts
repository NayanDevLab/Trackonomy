import { useState, useCallback } from 'react';

/**
 * useModal is a simple custom hook for managing a modal’s open/closed state.
 * @param initialState - Whether the modal should be initially open or closed.
 */
export function useModal(initialState: boolean = false) {
    const [isOpen, setIsOpen] = useState(initialState);

    // We use useCallback here to ensure the same function reference
    // is returned between renders, improving performance in certain cases.
    const open = useCallback(() => {
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
    }, []);

    const toggle = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return {
        isOpen,
        open,
        close,
        toggle,
    };
}
