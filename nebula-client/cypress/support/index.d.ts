
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Get an element by its `data-test-id` attribute.
     * @param testId The value of the `data-test-id` attribute.
     * @param options Cypress options for the `get` command.
     */
    getByTestId(testId: string, options?: Partial<Loggable & Timeoutable & Withinable & Shadow>): Chainable<JQuery<HTMLElement>>;
    findByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
  }
}
