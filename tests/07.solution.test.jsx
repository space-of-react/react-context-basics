// ⚙️ АВТОГЕНЕРАЦИЯ — не редактируй вручную.
// Это копия соседнего теста задания с импортом решения вместо проблемы.
// Правь исходный tests/NN.test.jsx и запусти: npm run play:generate

import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/07-уведомления-через-контекст.решение.jsx';
import { renderTree, components, componentsWithProp } from './helpers/structure.jsx';

// Задание: уведомления живут в своём провайдере, кнопка берёт addToast из
// контекста. Экран прежний, поэтому проверяем ещё и разбиение на компоненты.
describe('07 — уведомления через контекст', () => {
    test('сначала уведомлений нет', () => {
        const { container } = render(<App />);

        expect(container.querySelectorAll('.toast')).toHaveLength(0);
    });

    test('кнопка показывает уведомление', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);

        await user.click(screen.getByRole('button', { name: /Показать уведомление/ }));

        expect(container.querySelectorAll('.toast')).toHaveLength(1);
        expect(container.querySelector('.toastTitle')).toHaveTextContent('Письмо отправлено');
    });

    test('уведомления копятся', async () => {
        const user = userEvent.setup();
        const { container } = render(<App />);
        const button = screen.getByRole('button', { name: /Показать уведомление/ });

        await user.click(button);
        await user.click(button);

        expect(container.querySelectorAll('.toast').length).toBeGreaterThanOrEqual(2);
    });

    test('провайдер уведомлений вынесен в отдельный компонент с children', () => {
        const root = renderTree(<App />);

        expect(
            componentsWithProp(root, 'children').length,
            'App всё ещё сам держит состояние уведомлений: нет компонента-провайдера с children'
        ).toBeGreaterThanOrEqual(1);
    });

    test('кнопка стала отдельным компонентом', () => {
        const root = renderTree(<App />);

        expect(
            components(root).length,
            'кнопку не вынесли: в дереве нет вложенных компонентов'
        ).toBeGreaterThanOrEqual(2);
    });
});
