import React from 'react';

import './style.css';

const UserContext = React.createContext(null);

function UserBadge() {
    const user = React.useContext(UserContext);

    return (
        <span className="badge">
            <span className={user ? 'dot dotGreen' : 'dot dotAmber'} />
            {user ? user.name : 'Гость'}
        </span>
    );
}

function App() {
    return (
        <div className="container">
            <div className="topBar">
                <h1 className="title">Почта</h1>
                <UserBadge />
            </div>
            <p className="subtitle">
                Бейдж пользователя в шапке — если пользователя нет, показываем «Гость».
            </p>
        </div>
    );
}

export default App;
