import React from 'react';

import './style.css';

const ThemeContext = React.createContext(null);
const UserContext = React.createContext(null);

function ThemeBadge() {
    const { theme, setTheme } = React.useContext(ThemeContext);
    const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

    return (
        <span className="badge">
            <span className="dot" />
            Тема: {theme}
            <button
                type="button"
                className="btn btnSmall"
                onClick={toggleTheme}
                style={{ marginLeft: 8 }}
            >
                переключить
            </button>
        </span>
    );
}

function UserBadge() {
    const user = React.useContext(UserContext);

    return (
        <span className="badge">
            <span className="dot dotGreen" />
            {user.name}
        </span>
    );
}

function App() {
    const [theme, setTheme] = React.useState('dark');
    const user = { name: 'Аня' };
    const themeValue = React.useMemo(() => ({ theme, setTheme }), [theme]);

    React.useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        return () => document.body.removeAttribute('data-theme');
    }, [theme]);

    return (
        <ThemeContext.Provider value={themeValue}>
            <UserContext.Provider value={user}>
                <div className="container">
                    <div className="topBar">
                        <h1 className="title">Почта</h1>
                        <ThemeBadge />
                        <UserBadge />
                    </div>
                    <p className="subtitle">
                        Два контекста — два провайдера. ThemeBadge и UserBadge читают из своих
                        контекстов; тему можно переключить в бейдже.
                    </p>
                </div>
            </UserContext.Provider>
        </ThemeContext.Provider>
    );
}
