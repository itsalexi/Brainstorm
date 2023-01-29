import { formatRelative } from 'date-fns';
const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatTime = (dateString) => {
    const date = new Date(dateString);

    return capitalize(formatRelative(date, Date.now()));
};
