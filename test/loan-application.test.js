import { html, fixture, expect } from '@open-wc/testing';

import '../loan-application.js';

describe('LoanApplication', () => {
  
  it('should render the component', async () => {
    const element = await fixture(
      html`<loan-application></loan-application>`
    );

    expect(element).to.exist;
  });

  it('should have default title value', async () => {
    const element = await fixture(
      html`<loan-application></loan-application>`
    );

    expect(element.title).to.equal('Hey there');
  });

  it('should have default counter value', async () => {
    const element = await fixture(
      html`<loan-application></loan-application>`
    );

    expect(element.counter).to.equal(5);
  });

  it('should increment counter when __increment is called', async () => {
    const element = await fixture(
      html`<loan-application></loan-application>`
    );

    element.__increment();

    expect(element.counter).to.equal(6);
  });

  it('should render dashboard component', async () => {
    const element = await fixture(
      html`<loan-application></loan-application>`
    );

    const dashboard =
      element.shadowRoot.querySelector('dash-board');

    expect(dashboard).to.exist;
  });

});