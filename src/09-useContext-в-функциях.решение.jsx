import React from 'react';

import './style.css';

const ThemeContext = React.createContext('light');

function ThemeBadge() {
    const theme = React.useContext(ThemeContext);

    return <span className="badge">Тема: {theme}</span>;
}

function App() {
    return (
        <ThemeContext.Provider value="dark">
            <div className="container">
                <div className="topBar">
                    <h1 className="title">Почта</h1>
                    <ThemeBadge />
                </div>
                <p className="subtitle">
                    В функциональных компонентах контекст удобнее читать через useContext.
                </p>
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
