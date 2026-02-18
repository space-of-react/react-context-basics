import React from 'react';

import './style.css';

const letters = [
    { id: '1', subject: 'Привет', from: 'Команда' },
    { id: '2', subject: 'Квитанция', from: 'Биллинг' },
    { id: '3', subject: 'Напоминание', from: 'Сервис' },
];

const MailContext = React.createContext(null);

function MarkReadButton({ id }) {
    const { onMarkRead } = React.useContext(MailContext);

    return (
        <button
            className="btn btnSmall"
            onClick={() => onMarkRead(id)}
        >
            Отметить прочитанным
        </button>
    );
}

function LetterRow({ letter, isSelected, isRead, onSelect }) {
    return (
        <div
            className={'listItem ' + (isSelected ? 'listItemActive' : '')}
            onClick={() => onSelect(letter.id)}
        >
            <div className="listItemTitle">{letter.subject}</div>
            <div className="listItemMeta">
                {isRead ? (
                    <span
                        className="badge"
                        style={{ margin: 0, padding: '2px 8px', fontSize: 11 }}
                    >
                        прочитано
                    </span>
                ) : (
                    letter.from
                )}
            </div>
        </div>
    );
}

function LetterView({ letter, isRead }) {
    return (
        <div className="panel">
            <div className="panelHeader">
                <div className="panelTitle">{letter.subject}</div>
                {isRead ? (
                    <span
                        className="badge"
                        style={{ margin: 0 }}
                    >
                        <span className="dot dotGreen" /> Прочитано
                    </span>
                ) : (
                    <MarkReadButton id={letter.id} />
                )}
            </div>
            <div className="panelBody">
                <div className="emailBody">{letter.from}</div>
            </div>
        </div>
    );
}

function App() {
    const [readIds, setReadIds] = React.useState([]);
    const [selectedId, setSelectedId] = React.useState(letters[0].id);

    const onMarkRead = React.useCallback((id) => {
        setReadIds((prev) => [...prev, id]);
    }, []);

    const value = React.useMemo(() => ({ onMarkRead }), [onMarkRead]);
    const selectedLetter = letters.find((l) => l.id === selectedId) || letters[0];

    return (
        <MailContext.Provider value={value}>
            <div className="container">
                <div className="topBar">
                    <h1 className="title">Почта</h1>
                    <span className="badge">
                        <span className="dot dotGreen" /> Прочитано: {readIds.length}
                    </span>
                </div>
                <p className="subtitle">Callback в контексте — кнопка получает его из Context.</p>
                <div className="grid">
                    <div className="panel">
                        <div className="panelHeader">
                            <div className="panelTitle">Входящие</div>
                        </div>
                        <div className="panelBody">
                            <div className="list">
                                {letters.map((l) => (
                                    <LetterRow
                                        key={l.id}
                                        letter={l}
                                        isSelected={l.id === selectedId}
                                        isRead={readIds.includes(l.id)}
                                        onSelect={setSelectedId}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <LetterView
                        letter={selectedLetter}
                        isRead={readIds.includes(selectedLetter.id)}
                    />
                </div>
            </div>
        </MailContext.Provider>
    );
}

export default App;
