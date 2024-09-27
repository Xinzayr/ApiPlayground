// checkDarkTheme.ts
const checkDarkTheme = (): boolean => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export default checkDarkTheme;
