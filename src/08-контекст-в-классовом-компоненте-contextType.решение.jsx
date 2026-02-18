import React from 'react';

import './style.css';

const ThemeContext = React.createContext('dark');

// В классовых компонентах контекст читается через static contextType и this.context.
class ThemeLabel extends React.Component {
    static contextType = ThemeContext;

    render() {
        const theme = this.context;

        return (
            <span className="badge">
                <span className={theme === 'dark' ? 'dot' : 'dot dotAmber'} />
                Тема: {theme === 'dark' ? 'тёмная' : 'светлая'}
            </span>
        );
    }
}

function App() {
    const [theme, setTheme] = React.useState('dark');

    React.useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        return () => document.body.removeAttribute('data-theme');
    }, [theme]);

    const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

    return (
        <ThemeContext.Provider value={theme}>
            <div className="container">
                <div className="topBar">
                    <h1 className="title">Урок 08 — contextType</h1>
                    <ThemeLabel />
                </div>
                <p className="subtitle">
                    В классовых компонентах контекст доступен через static contextType и this.context.
                </p>
                <button className="btn" onClick={toggleTheme}>
                    Переключить тему
                </button>
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
