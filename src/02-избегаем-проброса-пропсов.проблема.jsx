import React from 'react';

import './style.css';

const letters = [
    { id: '1', from: 'Команда', subject: 'Добро пожаловать', preview: '…' },
    { id: '2', from: 'Биллинг', subject: 'Квитанция', preview: '…' },
];

function LetterRow({ letter, selectedId, onSelect }) {
    const active = letter.id === selectedId;

    return (
        <div
            className={'listItem ' + (active ? 'listItemActive' : '')}
            onClick={() => onSelect(letter.id)}
        >
            <div className="listItemTitle">{letter.subject}</div>
            <div className="listItemMeta">{letter.from}</div>
        </div>
    );
}

function Sidebar({ letters, selectedId, onSelect }) {
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
                            selectedId={selectedId}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function Viewer({ selectedId }) {
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

    return (
        <div className="container">
            <div className="topBar">
                <h1 className="title">Почта</h1>
            </div>
            <p className="subtitle">Список писем слева, просмотр выбранного справа.</p>
            <div className="grid">
                <Sidebar
                    letters={letters}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                />
                <Viewer selectedId={selectedId} />
            </div>
        </div>
    );
}

export default App;
