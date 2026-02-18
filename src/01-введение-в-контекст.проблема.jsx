import React from 'react';

import './style.css';

function UserMenu({ user }) {
    return (
        <div className="badge">
            <span className="dot dotGreen" />
            {user.name} · {user.plan}
        </div>
    );
}

function Header({ user }) {
    return (
        <div className="topBar">
            <h1 className="title">Почта</h1>
            <UserMenu user={user} />
        </div>
    );
}

function App() {
    const user = { name: 'Аня', plan: 'Pro' };

    return (
        <div className="container">
            <Header user={user} />
            <p className="subtitle">Шапка приложения: заголовок и меню пользователя.</p>
        </div>
    );
}

export default App;
