import React from 'react';

import './style.css';

function App() {
    const [theme, setTheme] = React.useState('dark');
    const user = { name: 'Аня' };

    const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

    React.useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        return () => document.body.removeAttribute('data-theme');
    }, [theme]);

    return (
        <div className="container">
            <div className="topBar">
                <h1 className="title">Почта</h1>
                <span className="badge">Тема: {theme}</span>
                <span className="badge">{user.name}</span>
            </div>
            <p className="subtitle">В шапке отображаются текущая тема и имя пользователя.</p>
            <button
                className="btn btnSmall"
                onClick={toggleTheme}
            >
                Тема: {theme === 'dark' ? 'тёмная' : 'светлая'} → переключить
            </button>
        </div>
    );
}

export default App;
