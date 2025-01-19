export const getGreeting = (): string => {
    const hours = new Date().getHours();

    if (hours >= 5 && hours < 12) {
        return 'Good morning';
    } else if (hours >= 12 && hours < 18) {
        return 'Good afternoon';
    } else if (hours >= 18 && hours < 22) {
        return 'Good evening';
    } else {
        return 'Good night';
    }
};
