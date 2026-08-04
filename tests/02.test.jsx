import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/02-избегаем-передачи-пропсов.проблема.jsx';
import { renderTree, namesWithProp } from './helpers/structure.jsx';

// Задание: состояние выбора (selectedId + сеттер) уходит в контекст, а не
// пробрасывается через Sidebar в каждую строку списка.
describe('02 — избегаем передачи пропсов', () => {
    test('сначала открыто первое письмо', () => {
        const { container } = render(<App />);

        expect(container.querySelector('.emailBody')).toHaveTextContent('Команда');
    });

    test('клик по письму открывает его в правой панели', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(screen.getByText('Квитанция'));

        expect(container.querySelector('.emailBody')).toHaveTextContent('Биллинг');
    });

    test('выбранное письмо подсвечено в списке', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(screen.getByText('Квитанция'));

        const active = container.querySelector('.listItemActive');
        expect(active, 'нет подсвеченной строки списка').not.toBeNull();
        expect(active).toHaveTextContent('Квитанция');
    });

    test('selectedId не передают пропсом', () => {
        const root = renderTree(<App />);
        const got = namesWithProp(root, 'selectedId');

        expect(got, `проп selectedId всё ещё передают: ${got.join(', ')}`).toEqual([]);
    });

    test('обработчик выбора не передают пропсом', () => {
        const root = renderTree(<App />);
        const got = namesWithProp(root, 'onSelect');

        expect(got, `проп onSelect всё ещё передают: ${got.join(', ')}`).toEqual([]);
    });
});
