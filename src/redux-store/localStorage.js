export const getState = (item) => {
    try {
        const localState = localStorage.getItem(item);
        if (localState === null) {
            return undefined;
        }
        return JSON.parse(localState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (item, state) => {
    try {
        const localState = JSON.stringify(state);
        localStorage.setItem(item, localState);
    } catch {
        // ignore write errors
    }
};
