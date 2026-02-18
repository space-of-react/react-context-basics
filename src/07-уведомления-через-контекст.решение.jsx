import React from 'react';

import './style.css';

const NotificationsContext = React.createContext(null);

function useNotifications() {
    const value = React.useContext(NotificationsContext);

    if (!value) throw new Error('useNotifications только внутри NotificationsProvider');

    return value;
}

function NotificationsProvider({ children }) {
    const [toasts, setToasts] = React.useState([]);
    const addToast = React.useCallback((text) => {
        setToasts((prev) => [...prev, { id: Date.now(), text }]);
    }, []);
    const value = React.useMemo(() => ({ toasts, addToast }), [toasts, addToast]);

    return (
        <NotificationsContext.Provider value={value}>
            {children}
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
        </NotificationsContext.Provider>
    );
}

function App() {
    return (
        <NotificationsProvider>
            <div className="container">
                <div className="topBar">
                    <h1 className="title">Почта</h1>
                </div>
                <ShowToastButton />
                <p className="subtitle">
                    Уведомления в контексте — кнопка вызывает addToast из useNotifications().
                </p>
            </div>
        </NotificationsProvider>
    );
}

function ShowToastButton() {
    const { addToast } = useNotifications();

    return (
        <button
            className="btn"
            onClick={() => addToast('Письмо отправлено')}
        >
            Показать уведомление
        </button>
    );
}

export default App;
