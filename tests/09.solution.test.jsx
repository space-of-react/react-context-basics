// ⚙️ АВТОГЕНЕРАЦИЯ — не редактируй вручную.
// Это копия соседнего теста задания с импортом решения вместо проблемы.
// Правь исходный tests/NN.test.jsx и запусти: npm run play:generate

import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/09-контекст-в-функциях-useContext.решение.jsx';
import { readSource } from './helpers/structure.jsx';

// Задание про способ чтения контекста: Context.Consumer с render-пропом
// заменяется на useContext. Результат на экране одинаковый — React показывает
// итог, а не то, каким синтаксисом его получили, поэтому здесь смотрим исходник.
describe('09 — контекст в функциях (useContext)', () => {
    const SOURCE = 'src/09-контекст-в-функциях-useContext.решение.jsx';

    test('бейдж показывает тему из провайдера, а не значение по умолчанию', () => {
        render(<App />);

        expect(screen.getByText(/Тема:\s*dark/)).toBeInTheDocument();
    });

    test('заголовок «Почта» на месте', () => {
        render(<App />);

        expect(screen.getByText('Почта')).toBeInTheDocument();
    });

    test('контекст читается через useContext', () => {
        expect(readSource(SOURCE), 'не видно вызова useContext').toMatch(/useContext\s*\(/);
    });

    test('Context.Consumer больше не используется', () => {
        expect(readSource(SOURCE), 'Context.Consumer всё ещё в коде').not.toMatch(/\.Consumer/);
    });
});
