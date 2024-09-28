// src/utils/localStorageUtil.ts
export const saveToLocalStorage = (key: string, value: unknown) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const getFromLocalStorage = (key: string) => {
    if (typeof window !== 'undefined') {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : null;
    }
    return null;
};

export const removeFromLocalStorage = (key: string) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
};