/// <reference types="jest" />
import { render, screen } from '@testing-library/react';
import HighLight from './index';
import React from 'react';

describe('HightLight Component', () => {
    test('renders children without keywords', () => {
        const childrenText = 'This is a test';

        render(
            <HighLight id='1' focusId='2' keywords={undefined}>
                {childrenText}
            </HighLight>,
        );

        // 验证内容没有被修改
        expect(screen.getByText(childrenText)).toBeInTheDocument();
    });

    test('highlights the keyword in the children', () => {
        const childrenText = 'This is a test';
        const keyword = 'test';

        render(
            <HighLight id='1' focusId='2' keywords={keyword}>
                {childrenText}
            </HighLight>,
        );

        // 验证关键字高亮显示
        const highlightedText = screen.getByText(/This is a/);
        expect(highlightedText.innerHTML).toContain(
            '<span style="background:yellow">test</span>',
        );
    });

    test('highlights multiple keywords in the children', () => {
        const childrenText = 'This is a test for highlight';
        const keywords = ['test', 'highlight'];

        render(
            <HighLight id='1' focusId='2' keywords={keywords}>
                {childrenText}
            </HighLight>,
        );

        // 验证多个关键字高亮显示
        const highlightedText = screen.getByText(/This is a/);
        expect(highlightedText.innerHTML).toContain(
            '<span style="background:yellow">test</span>',
        );
        expect(highlightedText.innerHTML).toContain(
            '<span style="background:yellow">highlight</span>',
        );
    });

    test('applies underline when id matches focusId', () => {
        const childrenText = 'This is a test';

        const keyword = 'test';
        const testId = 'testId';
        render(
            <HighLight id='1' focusId='1' keywords={keyword} testId={testId}>
                {childrenText}
            </HighLight>,
        );

        // 验证是否应用下划线样式
        const testElement = screen.getByTestId(testId);
        expect(testElement).toHaveStyle('text-decoration: underline');
    });

    test('does not apply underline when id does not match focusId', () => {
        const childrenText = 'This is a test';

        const keyword = 'test';
        const testId = 'testId';
        render(
            <HighLight id='1' focusId='2' keywords={keyword} testId={testId}>
                {childrenText}
            </HighLight>,
        );

        const testElement = screen.getByTestId(testId);
        expect(testElement).toHaveStyle('text-decoration: none');
    });
});
