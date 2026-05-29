import { html, fixture, expect } from '@open-wc/testing';
import sinon,{ stub } from 'sinon';
import { Router } from '@vaadin/router';

import '../src/LoanEMIDetails/LoanEMIDetails.js';

describe('Loan EMI details', () => {
  let element;

  beforeEach(async () => {
    localStorage.setItem(
      'emi',
      JSON.stringify({
        interestRate: '10',
        monthlyEMI: '2500',
        principal: '100000',
        interest: '20000',
        totalAmount: '120000',
      })
    );

    element = await fixture(
      html`<loanemi-details></loanemi-details>`
    );
  });

  afterEach(() => {
    localStorage.clear();
    sinon.restore();
  });

  it('should render loan emi details component', () => {
    expect(element).to.exist;
  });

  it('should render EMI heading', () => {
    const heading =
      element.shadowRoot.querySelector('h2');

    expect(heading.textContent).to.equal(
      'EMI Details'
    );
  });

  it('should load EMI data from localStorage', () => {
    expect(element._data.interestRate).to.equal(
      '10'
    );

    expect(element._data.monthlyEMI).to.equal(
      '2500'
    );
  });

  it('should render EMI details values', () => {
    const text =
      element.shadowRoot.querySelector(
        '.emi-details'
      ).textContent;

    expect(text).to.include('10');
    expect(text).to.include('2500');
    expect(text).to.include('100000');
    expect(text).to.include('20000');
    expect(text).to.include('120000');
  });

  it('should render cancel button', () => {
    const cancelBtn =
      element.shadowRoot.querySelector('.cancel-btn');

    expect(cancelBtn).to.exist;
  });

  it('should render continue button', () => {
    const continueBtn =
      element.shadowRoot.querySelector(
        '.continue-btn'
      );

    expect(continueBtn).to.exist;
  });

  it('should navigate to /details on cancel button click', async () => {
    const routerStub = stub(Router, 'go');

    const cancelBtn =
      element.shadowRoot.querySelector('.cancel-btn');

    cancelBtn.click();

    expect(
      routerStub.calledWith('/details')
    ).to.be.true;
  });

  it('should navigate to /customer on continue button click', async () => {
    const routerStub = stub(Router, 'go');

    const continueBtn =
      element.shadowRoot.querySelector(
        '.continue-btn'
      );

    continueBtn.click();

    expect(
      routerStub.calledWith('/customer')
    ).to.be.true;
  });

  it('should call _toBasicDetails method', async() => {
    const methodStub = stub(
      element,
      '_toBasicDetails'
    );

    const cancelBtn =
      element.shadowRoot.querySelector('.cancel-btn');
await element.requestUpdate();
    cancelBtn.click();

    expect(methodStub.calledOnce).to.be.true;
  });

  it('should call _toCustomer method', async () => {
    const methodStub = stub(
      element,
      '_toCustomer'
    );
    await element.requestUpdate();

    const continueBtn =
      element.shadowRoot.querySelector(
        '.continue-btn'
      );

    continueBtn.click();

    expect(methodStub.calledOnce).to.be.true;
  });
});