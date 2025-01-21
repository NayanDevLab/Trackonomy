import { useState } from 'react';

// Define the shape of the modal state.
// Each modal name will map to a boolean value indicating whether it's open or closed.
interface ModalState {
    [key: string]: boolean;
}

const useModalState = () => {
    const [modalState, setModalState] = useState<ModalState>({});

    // Open a specific modal
    const openModal = (modalName: string) => {
        setModalState((prevState) => ({
            ...prevState,
            [modalName]: true,
        }));
    };

    // Close a specific modal
    const closeModal = (modalName: string) => {
        setModalState((prevState) => ({
            ...prevState,
            [modalName]: false,
        }));
    };

    // Ensure all modals are closed when the component mounts
    const resetModals = () => {
        setModalState({});
    };

    return {
        modalState,
        openModal,
        closeModal,
        resetModals, // For resetting all modals if needed
    };
};

export default useModalState;
