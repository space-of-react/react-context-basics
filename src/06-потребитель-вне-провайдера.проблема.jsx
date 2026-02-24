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
    const user = { name: 'Макс' };

    return (
        <div className="container">
            <UserContext.Provider value={{ user }}>
                <div className="topBar">
                    <h1 className="title">Почта</h1>
                    <UserBadge />
                </div>
            </UserContext.Provider>
        </div>
    );
}

export default App;
