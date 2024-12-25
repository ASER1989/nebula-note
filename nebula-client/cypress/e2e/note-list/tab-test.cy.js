describe('tab', () => {
    const noteName = 'Exclusive for tab test';

    const addNewTab = (tabName) => {
        // 点击添加新标签按钮
        cy.get('.tabs-pane-plus').click();
        // 等待新标签的输入框可见并输入名称
        cy.get('.tabs-pane-item').last().should('be.visible').type(tabName);
    };

    beforeEach(() => {
        cy.viewport(883, 698);
        cy.visit('http://localhost:3107/');
        cy.wait(500);

        cy.getByTestId('note-list-item').then((items) => {
            // 转换为普通的 DOM 集合
            const filteredItems = [...items].filter((element) =>
                element.innerText.includes(noteName),
            );
            if (filteredItems.length > 0) {
                cy.wrap(filteredItems)
                    .first()
                    .click()
                    .within(() => {
                        cy.getByTestId('rename-cancel-button').click();
                        cy.getByTestId('note-item-remove').should('exist').click();
                    });
                cy.getByTestId('confirm').findByTestId('confirm-apply').click();
            }
        });

        cy.getByTestId('note-list-create-note-button').click();
        cy.wait(100);
        cy.getByTestId('note-create-form').should('exist');
        cy.getByTestId('note-name').type(noteName);
        cy.getByTestId('form-submit').click();
        cy.getByTestId('note-list')
            .findByTestId('note-list-item')
            .should('contain.text', noteName);
    });
    afterEach(() => {
        cy.getByTestId('note-list-item').then((items) => {
            // 转换为普通的 DOM 集合
            const filteredItems = [...items].filter((element) =>
                element.innerText.includes(noteName),
            );
            if (filteredItems.length > 0) {
                cy.wrap(filteredItems)
                    .first()
                    .click()
                    .within(() => {
                        cy.getByTestId('rename-cancel-button').click();
                        cy.getByTestId('note-item-remove').should('exist').click();
                    });
                cy.getByTestId('confirm')
                    .should('exist')
                    .findByTestId('confirm-apply')
                    .click();
            }
        });
    });

    describe('create', () => {
        it('Should add a new tab', () => {
            cy.getByTestId('note-list-tab')
                .find('.tabs-nav')
                .within(() => {
                    addNewTab('new-tab-1');
                    // 验证标签总数是否为 3
                    cy.get('.tabs-pane-item').should('have.length', 3);
                });
        });

        it('test tab create with empty name', () => {
            cy.getByTestId('note-list-tab')
                .find('.tabs-nav')
                .within(() => {
                    // 点击添加新标签
                    cy.get('.tabs-pane-plus').click();
                    cy.get('.tabs-pane-item').last().should('be.visible');
                });
            cy.get('body').click();
            cy.getByTestId('message-box')
                .should('be.visible')
                .get('.content')
                .should('contain.text', '无效标题')
                .get('.nebula-button.primary')
                .click();
            cy.getByTestId('note-list-tab')
                .find('.tabs-nav')
                .within(() => {
                    cy.get('.tabs-pane-item')
                        .last()
                        .find('.nebula-editable-content')
                        .should('have.focus');
                });
            cy.reload();
        });

        it('test tab create with duplicate name', () => {
            cy.getByTestId('note-list-tab')
                .find('.tabs-nav')
                .within(() => {
                    addNewTab('new-tab-1');
                    cy.get('.tabs-pane-item').should('have.length', 3);

                    addNewTab('new-tab-1');
                    cy.get('.tabs-pane-item').should('have.length', 4);
                });
            cy.get('body').click();
            cy.getByTestId('message-box')
                .should('be.visible')
                .within(() => {
                    cy.get('.content').should('contain.text', '模板名称已存在');
                });
            cy.reload();
        });
    });

    describe('rename', () => {
        it('should rename tab successfully', () => {
            cy.getByTestId('note-list-tab')
                .find('.tabs-nav')
                .within(() => {
                    addNewTab('new-tab-1');
                    cy.get('.tabs-pane-item').should('have.length', 3);
                });

            cy.get('body').click();
            cy.getByTestId('note-list-tab')
                .find('.tabs-nav')
                .within(() => {
                    cy.get('.tabs-pane-item')
                        .should('have.length', 3)
                        .last()
                        .should('contain.text', 'new-tab-1')
                        .click()
                        .find('.nebula-editable-content')
                        .should('have.focus')
                        .invoke('text', '')
                        .type('new-tab-n2');
                });

            cy.get('body').click();
            cy.getByTestId('note-list-tab')
                .find('.tabs-nav')
                .within(() => {
                    cy.get('.tabs-pane-item').last().should('contain.text', 'new-tab-n2');
                });
        });
    });

    describe('remove', () => {
        it('should remove tab successfully', () => {
            cy.getByTestId('note-list-tab')
                .find('.tabs-nav')
                .within(() => {
                    addNewTab('new-tab-1');
                    cy.get('.tabs-pane-item').should('have.length', 3);
                });

            cy.get('body').click();
            cy.getByTestId('note-list-tab')
                .find('.tabs-nav')
                .within(() => {
                    cy.get('.tabs-pane-item')
                        .should('have.length', 3)
                        .wait(500)
                        .last()
                        .should('contain.text', 'new-tab-1')
                        .click()
                        .findByTestId('tabs-button-remove')
                        .should('exist')
                        .click()
                        .wait(500);
                    cy.get('.tabs-pane-item').should('have.length', 2);
                });
        });
    });
});
