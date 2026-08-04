import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from '../src/06-потребитель-вне-провайдера.проблема.jsx';

// Задание: показать, что потребитель вне провайдера получает значение по
// умолчанию. Здесь поведение действительно меняется — второй бейдж должен
// отрисоваться как «Гость», поэтому структурных проверок не нужно.
describe('06 — потребитель вне провайдера', () => {
    test('бейдж внутри провайдера показывает имя пользователя', () => {
        const { container } = render(<App />);
        const badges = [...container.querySelectorAll('.badge')];

        expect(
            badges.some((b) => b.textContent.includes('Макс')),
            'нет бейджа с именем'
        ).toBe(true);
    });

    test('появился второй бейдж — вне провайдера', () => {
        const { container } = render(<App />);

        expect(
            container.querySelectorAll('.badge').length,
            'бейдж всё ещё один: потребителя вне провайдера не добавили'
        ).toBeGreaterThanOrEqual(2);
    });

    test('бейдж вне провайдера показывает значение по умолчанию — «Гость»', () => {
        const { container } = render(<App />);
        const badges = [...container.querySelectorAll('.badge')];

        expect(badges.some((b) => b.textContent.includes('Гость'))).toBe(true);
    });

    test('у гостя другой индикатор, чем у пользователя', () => {
        const { container } = render(<App />);
        const guest = [...container.querySelectorAll('.badge')].find((b) =>
            b.textContent.includes('Гость')
        );

        expect(guest, 'нет бейджа «Гость»').toBeTruthy();
        expect(
            guest.querySelector('.dotAmber'),
            'у гостя должен быть жёлтый индикатор'
        ).not.toBeNull();
    });
});
