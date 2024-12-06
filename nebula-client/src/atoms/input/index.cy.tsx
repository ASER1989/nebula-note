/// <reference types="cypress" />
import React, { useState } from 'react';
import Input from './index';

describe('<Input />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<Input value='hello' />);
        cy.get('input').should('have.value', 'hello');
    });

    it('should called on change every times', () => {
        const handleChange = cy.spy().as('handleChange');
        cy.mount(<Input value='hello' onChange={handleChange} />);
        cy.get('input').type('word');
        cy.get('@handleChange').should('have.callCount', 4);
    });

    it('should container height-light class', () => {
        cy.mount(<Input light />);
        cy.get('input').should('have.class', 'height-light');
    });

    it('can change height-light by state', () => {
        const TestCase = () => {
            const [light, setLight] = useState(false);
            const handleLightChange = () => {
                setLight(true);
            };
            return (
                <>
                    <button onClick={handleLightChange}>test</button>
                    <Input light={light} />
                </>
            );
        };

        cy.mount(<TestCase />);
        cy.get('input').should('not.have.class', 'height-light');
        cy.get('button').click();
        // cy.tick(300)
        cy.get('input').should('have.class', 'height-light');
    });
});
