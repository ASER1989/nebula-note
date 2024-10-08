/// <reference types="cypress" />
import React from 'react';
import ResizableSplit from './index';

describe('ResizableSplit Component', () => {
  beforeEach(() => {
    cy.viewport(1000,1000)
    cy.mount(
      <ResizableSplit direction="horizontal">
        <div style={{ backgroundColor: 'lightblue', height: '100%' }}>Left Panel</div>
        <div style={{ backgroundColor: 'lightgreen', height: '100%' }}>Right Panel</div>
      </ResizableSplit>
    );
  });

  it('renders left and right panels', () => {
    cy.get('.panel-1').should('contain.text', 'Left Panel');
    cy.get('.panel-2').should('contain.text', 'Right Panel');
  });

  it('allows resizing the panels', () => {
    // 获取 divider 的位置
    cy.get('.divider').trigger('mousedown'); // 按下鼠标左键

    // 移动鼠标到新的位置（假设您要将左边的面板扩大 20%）
    cy.get('body').trigger('mousemove', { clientX: 700 }); // 这里的 clientX 根据您的布局调整
    cy.get('body').trigger('mouseup');
    // // 获取面板的实际宽度
    // cy.get('.panel-1')
    //   .invoke('css', 'width')
    //   .then((width) => {
    //     const widthValue = parseFloat(width.toString()); // 转换为数字
    //     const expectedWidth = 0.5/* 根据您拖动的百分比计算期望宽度，例如 50% */;
    //     const expectedWidthInPixels = (expectedWidth * window.innerWidth) / 100; // 转换为像素
    //     expect(widthValue).to.be.closeTo(expectedWidthInPixels, 1); // 检查宽度是否在预期范围内
    //   });
    //
    // cy.get('.panel-2')
    //   .should('have.css', 'width')
    //   .and('match', /calc\(\d+% - 10px\)/); // 检查第二个面板
  });

  it('changes cursor style on drag', () => {
    cy.get('.divider').trigger('mousedown', { button: 1 });
    cy.get('body').should('have.css', 'cursor', 'col-resize'); // 检查鼠标样式变化

    cy.get('body').trigger('mouseup'); // 释放鼠标
  });

  it('does not allow resizing beyond limits', () => {
    // 尝试将左侧面板拉伸到小于 0%
    cy.get('.divider').trigger('mousedown', { which: 1 });
    cy.get('body').trigger('mousemove', { clientX: -100 }); // 移动到负值
    cy.get('body').trigger('mouseup');

    // 检查面板宽度是否大于 0%
    cy.get('.panel-1').should('have.css', 'width').and('match', /calc\(\d+% - 10px\)/);
  });
});
