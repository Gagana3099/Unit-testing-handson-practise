import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import { Router } from '@vaadin/router';

import '../src/SuccessAndError/Success.js';
import '../src/SuccessAndError/Error.js';

describe('Success screen ', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(
      html`<loan-success></loan-success>`
    );
  });

  it('should render success component', () => {
    expect(element).to.exist;
  });

  it('should render success heading', () => {
    const heading =
      element.shadowRoot.querySelector('h2');

    expect(heading).to.exist;
  });

  it('should render success description', () => {
    const paragraph =
      element.shadowRoot.querySelector('p');

    expect(paragraph).to.exist;
  });

  it('should render home button', () => {
    const homeBtn =
      element.shadowRoot.querySelector('.home-btn');

    expect(homeBtn).to.exist;
  });

  it('should navigate to home page on button click', () => {
    const routerStub = stub(Router, 'go');

    const homeBtn =
      element.shadowRoot.querySelector('.home-btn');

    homeBtn.click();

    expect(routerStub.calledWith('/')).to.be.true;

    routerStub.restore();
  });

it('should call _toHome method', async () => {
  const methodStub = stub(element, '_toHome');

  await element.requestUpdate();

  const homeBtn =
    element.shadowRoot.querySelector('.home-btn');

  homeBtn.click();

  expect(methodStub.calledOnce).to.be.true;
});
});

describe('error screen', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(
      html`<loan-error></loan-error>`
    );
  });

  it('should render error component', () => {
    expect(element).to.exist;
  });

  it('should render error heading', () => {
    const heading =
      element.shadowRoot.querySelector('h2');

    expect(heading).to.exist;
  });

  it('should render error description', () => {
    const paragraph =
      element.shadowRoot.querySelector('p');

    expect(paragraph).to.exist;
  });

  it('should render home button', () => {
    const homeBtn =
      element.shadowRoot.querySelector('.home-btn');

    expect(homeBtn).to.exist;
  });

  it('should navigate to home page on button click', () => {
     const routerStub =stub(Router, 'go');

    const homeBtn =
      element.shadowRoot.querySelector('.home-btn');

    homeBtn.click();

    expect(routerStub.calledWith('/')).to.be.true;

    routerStub.restore();
  });

  it('should call _toHome method',async () => {
    const methodStub = stub(element, '_toHome');
    await element.requestUpdate();

    const homeBtn =
      element.shadowRoot.querySelector('.home-btn');

    homeBtn.click();

    expect(methodStub.calledOnce).to.be.true;
  });
});