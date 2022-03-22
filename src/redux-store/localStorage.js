export const getState = (item) => {
    try {
        const serializedState = localStorage.getItem(item);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (item, state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(item, serializedState);
    } catch {
        // ignore write errors
    }
};
