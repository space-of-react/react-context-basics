import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/01-введение-в-контекст.проблема.jsx';
import { renderTree, namesWithProp, components } from './helpers/structure.jsx';

// Задание: убрать проброс `user` через Header и раздать его через контекст.
// Экран при этом не меняется — поэтому проверок две пары: поведение (данные
// на месте) и структура (пропсом их больше не тащат).
describe('01 — введение в контекст', () => {
    test('в шапке видно имя и тариф пользователя', () => {
        render(<App />);

        const badge = screen.getByText(/·/);
        expect(badge.textContent.trim()).toMatch(/^\S.*·\s*\S+/);
    });

    test('заголовок «Почта» на месте', () => {
        render(<App />);

        expect(screen.getByText('Почта')).toBeInTheDocument();
    });

    test('ни один компонент не получает пользователя пропсом', () => {
        const root = renderTree(<App />);
        const got = namesWithProp(root, 'user');

        expect(got, `проп user всё ещё передают: ${got.join(', ')}`).toEqual([]);
    });

    test('меню пользователя по-прежнему отдельный компонент', () => {
        const root = renderTree(<App />);

        // Смысл задания — не «схлопнуть всё в App», а сменить способ доставки
        // данных: разбиение на компоненты должно сохраниться.
        expect(components(root).length).toBeGreaterThanOrEqual(2);
    });
});
