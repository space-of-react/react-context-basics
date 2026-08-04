import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/08-контекст-в-классовом-компоненте-contextType.проблема.jsx';
import { renderTree, namesWithProp, readSource } from './helpers/structure.jsx';

// Задание: классовый ThemeLabel читает тему через static contextType и
// this.context вместо пропса.
describe('08 — контекст в классовом компоненте (contextType)', () => {
    test('сначала тема тёмная', () => {
        render(<App />);

        expect(screen.getByText(/Тема:\s*тёмная/)).toBeInTheDocument();
    });

    test('кнопка переключает тему', async () => {
        const user = userEvent.setup();
        render(<App />);

        await user.click(screen.getByRole('button', { name: /Переключить тему/ }));

        expect(screen.getByText(/Тема:\s*светлая/)).toBeInTheDocument();
    });

    test('индикатор меняется вместе с темой', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        expect(container.querySelector('.dotAmber')).toBeNull();
        await user.click(screen.getByRole('button', { name: /Переключить тему/ }));
        expect(container.querySelector('.dotAmber')).not.toBeNull();
    });

    test('тему больше не передают пропсом', () => {
        const root = renderTree(<App />);
        const got = namesWithProp(root, 'theme');

        expect(got, `проп theme всё ещё передают: ${got.join(', ')}`).toEqual([]);
    });

    test('класс объявляет static contextType', () => {
        const source = readSource(
            'src/08-контекст-в-классовом-компоненте-contextType.проблема.jsx'
        );

        expect(source, 'в классе нет static contextType').toMatch(/static\s+contextType\s*=/);
    });
});
