import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/10-производительность-большого-списка.проблема.jsx';
import { readSource } from './helpers/structure.jsx';

// Задание: развести часто меняющееся состояние и стабильные действия по разным
// контекстам и мемоизировать строку списка. Экран прежний — оптимизацию видно
// только в коде, поэтому к поведенческим проверкам добавлен разбор исходника.
describe('10 — производительность большого списка', () => {
    const SOURCE = 'src/10-производительность-большого-списка.проблема.jsx';

    test('список из 100 писем отрисован', () => {
        const { container } = render(<App />);

        expect(container.querySelectorAll('.listItem')).toHaveLength(100);
    });

    test('сначала выбрано первое письмо', () => {
        const { container } = render(<App />);

        expect(container.querySelector('.listItemActive')).toHaveTextContent('Письмо 1');
    });

    test('клик по строке выбирает её', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(screen.getByText('Письмо 5'));

        const active = container.querySelectorAll('.listItemActive');
        expect(active).toHaveLength(1);
        expect(active[0]).toHaveTextContent('Письмо 5');
    });

    test('строка списка мемоизирована', () => {
        expect(readSource(SOURCE), 'строку списка не обернули в React.memo').toMatch(
            /(React\.)?memo\s*\(/
        );
    });

    test('состояние и действия разведены по разным контекстам', () => {
        const contexts = readSource(SOURCE).match(/createContext\s*\(/g) ?? [];

        expect(
            contexts.length,
            'контекст всё ещё один: сеттер меняется вместе с состоянием и перерисовывает весь список'
        ).toBeGreaterThanOrEqual(2);
    });
});
