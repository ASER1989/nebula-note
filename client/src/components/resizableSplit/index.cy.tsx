/// <reference types="cypress" />
import React from 'react';
import ResizableSplit from './index';
import {expect} from 'chai';

describe('ResizableSplit Component', () => {
  describe('basic test', () => {
    beforeEach(() => {
      cy.viewport(1000, 1000)
      cy.mount(
        <ResizableSplit direction="horizontal">
          <div style={{backgroundColor: 'lightblue', height: '100%'}}>Left Panel</div>
          <div style={{backgroundColor: 'lightgreen', height: '100%'}}>Right Panel</div>
        </ResizableSplit>
      );
    });

    it('renders left and right panels', () => {
      cy.get('.panel-1').should('contain.text', 'Left Panel');
      cy.get('.panel-2').should('contain.text', 'Right Panel');
    });

    it('allows resizing the panels', () => {
      cy.get('.panel-1')
        .invoke('css', 'width')
        .then((initialWidth) => {
          const initialWidthInPixels = parseFloat(initialWidth.toString());

          // Simulate mousedown
          cy.get('.divider').trigger('mousedown', {which: 1});

          // Move the mouse to a new position
          const moveOffset = 100; // Desired drag distance
          const newClientX = initialWidthInPixels + moveOffset;

          cy.get('body').trigger('mousemove', {clientX: newClientX});

          // Add a delay before the next mouse move to simulate realistic dragging
          cy.wait(100); // Optional: Adjust the wait time as needed

          // Release mouse
          cy.get('body').trigger('mouseup');

          // Verify the new width of the left panel
          cy.get('.panel-1')
            .invoke('css', 'width')
            .then((newWidth) => {
              const newWidthValue = parseFloat(newWidth.toString());
              expect(newWidthValue).to.be.greaterThan(initialWidthInPixels); // Check if width has increased
            });
        });
    });

    it('changes cursor style on drag', () => {
      cy.get('.divider').trigger('mousedown', {which: 1});
      cy.get('body').should('have.css', 'cursor', 'col-resize'); // 检查鼠标样式变化

      cy.get('body').trigger('mouseup'); // 释放鼠标
    });

    it('does not allow resizing less than limits', () => {
      // 尝试将左侧面板拉伸到小于 0%
      cy.get('.divider').trigger('mousedown', {which: 1});
      cy.get('body').trigger('mousemove', {clientX: -100}); // 移动到负值
      cy.wait(10);
      cy.get('body').trigger('mouseup');

      // 检查面板宽度是否大于 0%
      cy.get('.panel-1')
        .invoke('css', 'width')
        .then((initialWidth) => {
          const newWidthValue = parseFloat(initialWidth.toString());
          expect(newWidthValue).to.be.greaterThan(0);
        });
    });

    it('does not allow resizing more than limits', () => {
      // 尝试将左侧面板拉伸到小于 0%
      cy.get('.divider').trigger('mousedown', {which: 1});
      cy.get('body').trigger('mousemove', {clientX: window.innerWidth}); // 移动到负值
      cy.wait(10);
      cy.get('body').trigger('mouseup');

      // 检查面板宽度是否大于 0%
      cy.get('.panel-2')
        .invoke('css', 'width')
        .then((initialWidth) => {
          const newWidthValue = parseFloat(initialWidth.toString());
          expect(newWidthValue).to.be.greaterThan(0);
        });
    });
  })

  describe('vertical test', () => {
    beforeEach(() => {
      cy.viewport(1000, 1000)
      cy.mount(
        <ResizableSplit direction="vertical">
          <div style={{backgroundColor: 'lightblue', height: '100%'}}>Top Panel</div>
          <div style={{backgroundColor: 'lightgreen', height: '100%'}}>Bottom Panel</div>
        </ResizableSplit>
      );
    });

    it('renders top and bottom panels', () => {
      cy.get('.panel-1').should('contain.text', 'Top Panel');
      cy.get('.panel-2').should('contain.text', 'Bottom Panel');
    });

    it('allows resizing the vertical panels', () => {
      cy.get('.panel-1')
        .invoke('css', 'height')
        .then((initialHeight) => {
          const initialHeightInPixels = parseFloat(initialHeight.toString());

          // Simulate mousedown
          cy.get('.divider').trigger('mousedown', {which: 1});

          // Move the mouse to a new position
          const moveOffset = 100; // Desired drag distance
          const newClientY = initialHeightInPixels + moveOffset;

          cy.get('body').trigger('mousemove', {clientY: newClientY});

          // Add a delay before the next mouse move to simulate realistic dragging
          cy.wait(100); // Optional: Adjust the wait time as needed

          // Release mouse
          cy.get('body').trigger('mouseup');

          // Verify the new width of the left panel
          cy.get('.panel-1')
            .invoke('css', 'height')
            .then((newHeight) => {
              const newHeightValue = parseFloat(newHeight.toString());
              expect(newHeightValue).to.be.greaterThan(initialHeightInPixels); // Check if width has increased
            });
        });
    });


    it('changes cursor style on drag in vertical mod', () => {
      cy.get('.divider').trigger('mousedown', {which: 1});
      cy.get('body').should('have.css', 'cursor', 'row-resize'); // 检查鼠标样式变化

      cy.get('body').trigger('mouseup'); // 释放鼠标
    });

    it('does not allow resizing less than limits on the up direction', () => {
      // 尝试将左侧面板拉伸到小于 0%
      cy.get('.divider').trigger('mousedown', {which: 1});
      cy.get('body').trigger('mousemove', {clientY: -100}); // 移动到负值
      cy.wait(10);
      cy.get('body').trigger('mouseup');

      // 检查面板宽度是否大于 0%
      cy.get('.panel-1')
        .invoke('css', 'height')
        .then((initialHeight) => {
          const newHeightVal = parseFloat(initialHeight.toString());
          expect(newHeightVal).to.be.greaterThan(0);
        });
    });

    it('does not allow resizing more than limits on the down direction', () => {
      // 尝试将左侧面板拉伸到小于 0%
      cy.get('.divider').trigger('mousedown', {which: 1});
      cy.get('body').trigger('mousemove', {clientY: window.innerHeight}); // 移动到负值
      cy.wait(10);
      cy.get('body').trigger('mouseup');

      // 检查面板宽度是否大于 0%
      cy.get('.panel-2')
        .invoke('css', 'height')
        .then((initialHeight) => {
          const newHeightValue = parseFloat(initialHeight.toString());
          expect(newHeightValue).to.be.greaterThan(0);
        });
    });

  });
});
