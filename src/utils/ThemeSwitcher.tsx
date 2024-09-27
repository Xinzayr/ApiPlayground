import { useState, useEffect } from 'react'
import checkDarkTheme from './checkDarkTheme'

export default function ThemeSwitcher() {
    const [isDark, setDark] = useState(false)

    useEffect(() => {
        setDark(checkDarkTheme())
    }, [])

    const toggleDarkTheme = () => {
        document.documentElement.classList.toggle('dark')
        localStorage.theme = isDark ? 'light' : 'dark'
        setDark(!isDark)
    }

    return (
        <button
            onClick={toggleDarkTheme}
            className="px-3 py-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
            {isDark ? '☀️' : '🌑'}
        </button>
    )
}