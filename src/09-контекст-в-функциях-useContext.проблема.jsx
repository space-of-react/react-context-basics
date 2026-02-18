import React from 'react';

import './style.css';

const ThemeContext = React.createContext('light');

function ThemeBadge() {
    return (
        <ThemeContext.Consumer>
            {(theme) => <span className="badge">Тема: {theme}</span>}
        </ThemeContext.Consumer>
    );
}

function App() {
    return (
        <ThemeContext.Provider value="dark">
            <div className="container">
                <div className="topBar">
                    <h1 className="title">Почта</h1>
                    <ThemeBadge />
                </div>
                <p className="subtitle">Текущая тема отображается в бейдже.</p>
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
