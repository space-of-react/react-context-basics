import React from 'react';

import './style.css';

const MailContext = React.createContext(null);

function useMail() {
    const value = React.useContext(MailContext);

    if (!value) throw new Error('useMail только внутри MailProvider');

    return value;
}

function MailProvider({ children }) {
    const [selectedId, setSelectedId] = React.useState('1');

    const letters = React.useMemo(
        () => [
            { id: '1', subject: 'Письмо 1' },
            { id: '2', subject: 'Письмо 2' },
        ],
        []
    );

    const value = React.useMemo(() => ({ letters, selectedId, setSelectedId }), [selectedId]);

    return <MailContext.Provider value={value}>{children}</MailContext.Provider>;
}

function InboxCount() {
    const { letters, selectedId } = useMail();
    const unread = letters.filter((l) => l.id !== selectedId).length;

    return (
        <span className="badge">
            <span className="dot dotAmber" />
            Непрочитанных: {unread}
        </span>
    );
}

function App() {
    return (
        <MailProvider>
            <div className="container">
                <div className="topBar">
                    <h1 className="title">Почта</h1>
                    <InboxCount />
                </div>
                <p className="subtitle">
                    Детали контекста скрыты в MailProvider, снаружи — только useMail().
                </p>
            </div>
        </MailProvider>
    );
}

export default App;
