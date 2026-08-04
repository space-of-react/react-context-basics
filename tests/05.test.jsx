import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/05-несколько-провайдеров-контекста.проблема.jsx';
import { renderTree, components } from './helpers/structure.jsx';

// Задание: развести тему и пользователя по двум контекстам и вынести их
// потребителей в отдельные компоненты — App перестаёт рисовать всё сам.
describe('05 — несколько провайдеров контекста', () => {
    test('сначала тема тёмная', () => {
        render(<App />);

        expect(screen.getByText(/Тема:\s*dark/)).toBeInTheDocument();
        expect(document.body.getAttribute('data-theme')).toBe('dark');
    });

    test('имя пользователя видно в шапке', () => {
        const { container } = render(<App />);
        const badges = [...container.querySelectorAll('.badge')];

        expect(
            badges.some((b) => /\S/.test(b.textContent.replace(/Тема:\s*\w+/, ''))),
            'в шапке нет бейджа с именем пользователя'
        ).toBe(true);
    });

    test('кнопка переключает тему', async () => {
        const user = userEvent.setup();
        render(<App />);

        await user.click(screen.getByRole('button'));

        expect(screen.getByText(/Тема:\s*light/)).toBeInTheDocument();
        expect(document.body.getAttribute('data-theme')).toBe('light');
    });

    test('тема и пользователь вынесены в отдельные компоненты', () => {
        const root = renderTree(<App />);
        const inner = components(root);

        // В «проблеме» App рисует шапку целиком сам — вложенных компонентов нет.
        expect(
            inner.length,
            `ожидались отдельные компоненты для темы и пользователя, а в дереве их ${inner.length}`
        ).toBeGreaterThanOrEqual(2);
    });
});
