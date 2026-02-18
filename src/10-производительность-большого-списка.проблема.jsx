import React from 'react';

import './style.css';

const MailContext = React.createContext(null);

const letters = Array.from({ length: 100 }, (_, i) => ({
    id: String(i + 1),
    subject: `Письмо ${i + 1}`,
    from: `Отправитель ${i + 1}`,
}));

function LetterRow({ letter }) {
    const { selectedId, setSelectedId } = React.useContext(MailContext);
    const active = letter.id === selectedId;

    return (
        <div
            className={'listItem ' + (active ? 'listItemActive' : '')}
            onClick={() => setSelectedId(letter.id)}
        >
            <div className="listItemTitle">{letter.subject}</div>
            <div className="listItemMeta">{letter.from}</div>
        </div>
    );
}

function App() {
    const [selectedId, setSelectedId] = React.useState('1');
    const value = { selectedId, setSelectedId };

    return (
        <MailContext.Provider value={value}>
            <div className="container">
                <div className="topBar">
                    <h1 className="title">Почта</h1>
                </div>
                <p className="subtitle">
                    Список из 100 писем — при выборе строки перерисовывается весь список.
                </p>
                <div className="panel">
                    <div className="panelBody">
                        <div className="list">
                            {letters.map((l) => (
                                <LetterRow
                                    key={l.id}
                                    letter={l}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MailContext.Provider>
    );
}

export default App;
