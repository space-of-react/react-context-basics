// ⚙️ АВТОГЕНЕРАЦИЯ — не редактируй вручную.
// Это копия соседнего теста задания с импортом решения вместо проблемы.
// Правь исходный tests/NN.test.jsx и запусти: npm run play:generate

import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/04-скрытие-деталей-провайдера.решение.jsx';
import { renderTree, componentsWithProp } from './helpers/structure.jsx';

// Задание: спрятать детали контекста за собственным провайдером-компонентом
// (MailProvider) и хук-обёрткой — App больше не должен сам держать состояние
// и рисовать Context.Provider.
describe('04 — скрытие деталей провайдера', () => {
    test('счётчик непрочитанных считается верно', () => {
        render(<App />);

        expect(screen.getByText(/Непрочитанных:\s*1/)).toBeInTheDocument();
    });

    test('заголовок «Почта» на месте', () => {
        render(<App />);

        expect(screen.getByText('Почта')).toBeInTheDocument();
    });

    test('провайдер вынесен в отдельный компонент с children', () => {
        const root = renderTree(<App />);
        const wrappers = componentsWithProp(root, 'children');

        // В «проблеме» App сам рисует MailContext.Provider — компонента-обёртки,
        // принимающего children, в дереве нет.
        expect(
            wrappers.length,
            'App всё ещё сам раздаёт контекст: нет компонента-провайдера, который принимает children'
        ).toBeGreaterThanOrEqual(1);
    });
});
