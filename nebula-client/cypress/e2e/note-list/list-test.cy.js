describe('list', () => {
    beforeEach(() => {
        cy.viewport(883, 698);
        cy.visit('http://localhost:3107/');
    });
    describe('filter', () => {
        it('test list search', () => {
            cy.getByTestId('note-list-search-button').click();
            cy.getByTestId('note-list-search-input').should('exist');
            cy.getByTestId('note-list-search-input').find('input').type('ant');
            cy.getByTestId('note-list')
                .findByTestId('note-list-item')
                .should('have.length', 1);

            cy.getByTestId('note-list-search-input').find('.nebula-icon-button').click();
            cy.wait(100);
            cy.getByTestId('note-list')
                .findByTestId('note-list-item')
                .should('have.length', 6);

            cy.getByTestId('note-list-search-input').find('.nebula-icon-button').click();
            cy.getByTestId('note-list-search-input').should('not.exist');
        });
    });

    describe('create', () => {
        it('test create note', () => {
            cy.getByTestId('note-list-create-note-button').click();
            cy.getByTestId('note-create-form').should('exist');
            cy.getByTestId('note-name').type('new note test');
            cy.getByTestId('form-submit').click();
            cy.getByTestId('note-list')
                .findByTestId('note-list-item')
                .should('contain.text', 'new note test');
        });

        it.skip('should cannot be duplicated', () => {
            cy.getByTestId('note-list-create-note-button').click();
            cy.getByTestId('note-create-form').should('exist');
            cy.getByTestId('note-name').type('new note test');
            cy.getByTestId('form-submit').click();
            cy.getByTestId('note-name').should('have.value', 'Error');
        });
    });

    describe('rename', () => {
        it('test note rename cancel', () => {
            cy.getByTestId('note-list-item')
                .filter(':contains("new note test")')
                .should('exist')
                .within(() => {
                    cy.getByTestId('note-list-name')
                        .click()
                        .clear()
                        .type('new note rename test')
                        .blur();
                    cy.getByTestId('rename-cancel-button').should('exist').click();
                    cy.getByTestId('note-list-name').should('have.text', 'new note test');
                });
        });

        it('test note rename', () => {
            cy.getByTestId('note-list-item')
                .filter(':contains("new note test")')
                .should('exist')
                .within(() => {
                    cy.getByTestId('note-list-name')
                        .click()
                        .clear()
                        .type('new note rename test')
                        .blur();
                    cy.getByTestId('rename-submit-button').click();
                });
            cy.getByTestId('note-list')
                .findByTestId('note-list-item')
                .should('contain.text', 'new note rename test');
        });

        it('test name cannot be duplicated', () => {
            cy.getByTestId('note-list-create-note-button').click();
            cy.getByTestId('note-create-form')
                .should('exist')
                .within(() => {
                    cy.getByTestId('note-name').type('new note test');
                    cy.getByTestId('form-submit').click();
                });

            cy.getByTestId('note-list')
                .findByTestId('note-list-item')
                .should('contain.text', 'new note test');

            cy.getByTestId('note-list-item')
                .filter(':contains("new note test")')
                .should('exist')
                .within(() => {
                    cy.getByTestId('note-list-name')
                        .click()
                        .clear()
                        .type('new note rename test')
                        .blur();
                    cy.getByTestId('rename-submit-button').click();
                });
            cy.getByTestId('message-box')
                .should('exist')
                .should('contain.text', '该名称已存在，请更换名称');
        });
    });

    describe('delete', () => {
        it('should confirm whether to delete', () => {
            cy.getByTestId('note-list-item')
                .filter(':contains("new note test")')
                .should('exist')
                .click()
                .within(() => {
                    cy.getByTestId('rename-cancel-button').click();
                    cy.getByTestId('note-item-remove').should('exist').click();
                });
            cy.getByTestId('confirm').should('exist');
        });
        it('should delete success', () => {
            cy.getByTestId('note-list-item')
                .filter(':contains("new note test")')
                .should('exist')
                .click()
                .within(() => {
                    cy.getByTestId('rename-cancel-button').click();
                    cy.getByTestId('note-item-remove').should('exist').click();
                });
            cy.getByTestId('confirm').findByTestId('confirm-apply').click();
            cy.getByTestId('note-list')
                .findByTestId('note-list-item')
                .should('not.contain.text', 'new note test');
            
            cy.getByTestId('note-list-item')
              .filter(':contains("new note rename test")')
              .should('exist')
              .click()
              .within(() => {
                  cy.getByTestId('rename-cancel-button').click();
                  cy.getByTestId('note-item-remove').click();
              });
            cy.getByTestId('confirm').findByTestId('confirm-apply').click();
        });
    });
});
