describe('list', () => {
    beforeEach(() => {
        cy.viewport(883, 698);
        cy.visit('http://localhost:3107/');
    });
    it('test list search', () => {
        cy.getByTestId('note-list-search-button').click();
        cy.getByTestId('note-list-search-input').should('exist');
        cy.getByTestId('note-list-search-input').find('input').type('ant');
        cy.getByTestId('note-list')
            .findByTestId('note-list-item')
            .should('have.length', 1);

        cy.getByTestId('note-list-search-input').find('.icon-button').click();
        cy.wait(100);
        cy.getByTestId('note-list')
            .findByTestId('note-list-item')
            .should('have.length', 6);
        
        cy.getByTestId('note-list-search-input').find('.icon-button').click();
        cy.getByTestId('note-list-search-input').should('not.exist');
    });
});
