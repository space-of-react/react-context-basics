// ⚙️ АВТОГЕНЕРАЦИЯ — не редактируй вручную.
// Это копия соседнего теста задания с импортом решения вместо проблемы.
// Правь исходный tests/NN.test.jsx и запусти: npm run play:generate

import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/03-callback-через-контекст.решение.jsx';
import { renderTree, namesWithProp } from './helpers/structure.jsx';

// Задание: через контекст раздаётся не только состояние, но и callback —
// кнопке «Отметить прочитанным» он больше не приходит пропсом.
describe('03 — callback через контекст', () => {
    test('сначала не прочитано ни одного письма', () => {
        render(<App />);

        expect(screen.getByText(/Прочитано:\s*0/)).toBeInTheDocument();
    });

    test('кнопка отмечает открытое письмо прочитанным', async () => {
        const user = userEvent.setup();
        render(<App />);

        await user.click(screen.getByRole('button', { name: /Отметить прочитанным/ }));

        expect(screen.getByText(/Прочитано:\s*1/)).toBeInTheDocument();
    });

    test('после отметки кнопка пропадает', async () => {
        const user = userEvent.setup();
        render(<App />);

        await user.click(screen.getByRole('button', { name: /Отметить прочитанным/ }));

        expect(screen.queryByRole('button', { name: /Отметить прочитанным/ })).toBeNull();
    });

    test('отмечается именно выбранное письмо, а не первое попавшееся', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(screen.getByText('Напоминание'));
        await user.click(screen.getByRole('button', { name: /Отметить прочитанным/ }));

        const active = container.querySelector('.listItemActive');
        expect(active).toHaveTextContent('прочитано');
    });

    test('callback не передают пропсом', () => {
        const root = renderTree(<App />);
        const got = namesWithProp(root, 'onMarkRead');

        expect(got, `проп onMarkRead всё ещё передают: ${got.join(', ')}`).toEqual([]);
    });
});
