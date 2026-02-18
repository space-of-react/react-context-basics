import React from 'react';

import './style.css';

function App() {
    const [toasts, setToasts] = React.useState([]);
    const addToast = (text) => setToasts((prev) => [...prev, { id: Date.now(), text }]);

    return (
        <div className="container">
            <div className="topBar">
                <h1 className="title">Почта</h1>
            </div>
            <p className="subtitle">Кнопка показывает уведомление в правом нижнем углу.</p>
            <button
                className="btn"
                onClick={() => addToast('Письмо отправлено')}
            >
                Показать уведомление
            </button>
            <div className="toastHost">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className="toast"
                    >
                        <div className="toastTitle">{t.text}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
