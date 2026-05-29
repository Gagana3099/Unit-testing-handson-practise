import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import { localize } from '@lion/localize';

import '../src/header/Header.js';

describe('loan-header', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(
      html`<loan-header></loan-header>`
    );
  });

  it('should render loan-header component', () => {
    expect(element).to.exist;
  });

  it('should render heading text', () => {
    const heading =
      element.shadowRoot.querySelector('p');

    expect(heading).to.exist;
  });

  it('should render EN and NL buttons', () => {
    const enBtn =
      element.shadowRoot.querySelector('#en-GB');

    const nlBtn =
      element.shadowRoot.querySelector('#nl-NL');

    expect(enBtn).to.exist;
    expect(nlBtn).to.exist;
  });

  it('should have default active EN button', () => {
    const enBtn =
      element.shadowRoot.querySelector('#en-GB');

    expect(
      enBtn.classList.contains('bg-btn-color')
    ).to.be.true;
  });

  it('should change locale to nl-NL on NL button click', async () => {
    const nlBtn =
      element.shadowRoot.querySelector('#nl-NL');

    nlBtn.click();

    await element.updateComplete;

    expect(localize.locale).to.equal('nl-NL');
  });

  it('should add active class to NL button after click', async () => {
    const nlBtn =
      element.shadowRoot.querySelector('#nl-NL');

    const enBtn =
      element.shadowRoot.querySelector('#en-GB');

    nlBtn.click();

    await element.updateComplete;

    expect(
      nlBtn.classList.contains('bg-btn-color')
    ).to.be.true;

    expect(
      enBtn.classList.contains('btn-cursor')
    ).to.be.true;
  });

  it('should change locale to en-GB on EN button click', async () => {
    const nlBtn =
      element.shadowRoot.querySelector('#nl-NL');

    const enBtn =
      element.shadowRoot.querySelector('#en-GB');

    // first switch to NL
    nlBtn.click();

    await element.updateComplete;

    // switch back to EN
    enBtn.click();

    await element.updateComplete;

    expect(localize.locale).to.equal('en-GB');
  });

  it('should call localeChanged method on button click', async () => {
    const localeStub = stub(
      element,
      'localeChanged'
    );

    await element.requestUpdate();

    const enBtn =
      element.shadowRoot.querySelector('#en-GB');

    enBtn.click();

    expect(localeStub.calledOnce).to.be.true;
  });

  it('should render container div', () => {
    const container =
      element.shadowRoot.querySelector('.container');

    expect(container).to.exist;
  });

  it('should render header element', () => {
    const header =
      element.shadowRoot.querySelector('header');

    expect(header).to.exist;
  });
});