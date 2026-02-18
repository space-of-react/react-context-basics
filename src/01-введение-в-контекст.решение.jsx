import React from 'react';

import './style.css';

const UserContext = React.createContext(null);

function UserMenu() {
    const user = React.useContext(UserContext);

    return (
        <div className="badge">
            <span className="dot dotGreen" />
            {user.name} · {user.plan}
        </div>
    );
}

function Header() {
    return (
        <div className="topBar">
            <h1 className="title">Почта</h1>
            <UserMenu />
        </div>
    );
}

function App() {
    const user = { name: 'Аня', plan: 'Pro' };

    return (
        <UserContext.Provider value={user}>
            <div className="container">
                <Header />
                <p className="subtitle">User читается из контекста — проброс пропсов не нужен.</p>
            </div>
        </UserContext.Provider>
    );
}

export default App;
