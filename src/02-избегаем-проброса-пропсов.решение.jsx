import React from 'react';

import './style.css';

const letters = [
    { id: '1', from: 'Команда', subject: 'Добро пожаловать', preview: '…' },
    { id: '2', from: 'Биллинг', subject: 'Квитанция', preview: '…' },
];

const MailContext = React.createContext(null);

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

function Sidebar({ letters }) {
    return (
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
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function Viewer() {
    const { selectedId } = React.useContext(MailContext);

    const letter = letters.find((e) => e.id === selectedId) || letters[0];

    return (
        <div className="panel">
            <div className="panelHeader">
                <div className="panelTitle">{letter.subject}</div>
            </div>
            <div className="panelBody">
                <div className="emailBody">
                    {letter.from}: {letter.preview}
                </div>
            </div>
        </div>
    );
}

function App() {
    const [selectedId, setSelectedId] = React.useState(letters[0].id);
    const value = React.useMemo(() => ({ selectedId, setSelectedId }), [selectedId]);

    return (
        <MailContext.Provider value={value}>
            <div className="container">
                <div className="topBar">
                    <h1 className="title">Почта</h1>
                </div>
                <p className="subtitle">Состояние выбора — в контексте, пропсы не тащим вглубь.</p>
                <div className="grid">
                    <Sidebar letters={letters} />
                    <Viewer />
                </div>
            </div>
        </MailContext.Provider>
    );
}

export default App;
