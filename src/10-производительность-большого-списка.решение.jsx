import React from 'react';

import './style.css';

const MailStateContext = React.createContext(null);
const MailActionsContext = React.createContext(null);

const letters = Array.from({ length: 100 }, (_, i) => ({
    id: String(i + 1),
    subject: `Письмо ${i + 1}`,
    from: `Отправитель ${i + 1}`,
}));

const LetterRow = React.memo(function LetterRow({ letter, isActive, onSelect }) {
    return (
        <div
            className={'listItem ' + (isActive ? 'listItemActive' : '')}
            onClick={() => onSelect(letter.id)}
        >
            <div className="listItemTitle">{letter.subject}</div>
            <div className="listItemMeta">{letter.from}</div>
        </div>
    );
});

function LetterRowWithContext({ letter }) {
    const selectedId = React.useContext(MailStateContext);
    const setSelectedId = React.useContext(MailActionsContext);
    const isActive = letter.id === selectedId;
    const onSelect = setSelectedId;

    return (
        <LetterRow
            letter={letter}
            isActive={isActive}
            onSelect={onSelect}
        />
    );
}

function App() {
    const [selectedId, setSelectedId] = React.useState('1');
    const stateValue = React.useMemo(() => selectedId, [selectedId]);
    const actionsValue = React.useMemo(() => setSelectedId, []);

    return (
        <MailStateContext.Provider value={stateValue}>
            <MailActionsContext.Provider value={actionsValue}>
                <div className="container">
                    <div className="topBar">
                        <h1 className="title">Почта</h1>
                    </div>
                    <p className="subtitle">
                        Два контекста: состояние меняется часто, действия — стабильны. LetterRow
                        мемоизирован, перерисовывается только активная строка.
                    </p>
                    <div className="panel">
                        <div className="panelBody">
                            <div className="list">
                                {letters.map((l) => (
                                    <LetterRowWithContext
                                        key={l.id}
                                        letter={l}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </MailActionsContext.Provider>
        </MailStateContext.Provider>
    );
}

export default App;
