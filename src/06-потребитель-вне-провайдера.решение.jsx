import React from 'react';

import './style.css';

const UserContext = React.createContext({ user: null });

function UserBadge() {
    const { user } = React.useContext(UserContext);

    return (
        <span className="badge">
            <span className={user ? 'dot dotGreen' : 'dot dotAmber'} />
            {user ? user.name : 'Гость'}
        </span>
    );
}

function App() {
    const defaultValue = { user: null };

    return (
        <UserContext.Provider value={defaultValue}>
            <div className="container">
                <div className="topBar">
                    <h1 className="title">Почта</h1>
                    <UserBadge />
                </div>
                <p className="subtitle">
                    Вне провайдера Consumer получает defaultValue — показываем «Гость».
                </p>
            </div>
        </UserContext.Provider>
    );
}

export default App;
