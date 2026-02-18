import React from 'react';

import './style.css';

const MailContext = React.createContext(null);

function InboxCount() {
    const { letters, selectedId } = React.useContext(MailContext);
    const unread = letters.filter((l) => l.id !== selectedId).length;

    return (
        <span className="badge">
            <span className="dot dotAmber" />
            Непрочитанных: {unread}
        </span>
    );
}

function App() {
    const [selectedId, setSelectedId] = React.useState('1');
    const letters = [
        { id: '1', subject: 'Письмо 1' },
        { id: '2', subject: 'Письмо 2' },
    ];

    return (
        <MailContext.Provider value={{ letters, selectedId, setSelectedId }}>
            <div className="container">
                <div className="topBar">
                    <h1 className="title">Почта</h1>
                    <InboxCount />
                </div>
                <p className="subtitle">Счётчик непрочитанных писем в шапке.</p>
            </div>
        </MailContext.Provider>
    );
}

export default App;
