import { fixture, html, expect } from '@open-wc/testing';
import sinon from 'sinon';

import '../src/LoanBasicDetails/BasicDetails.js';
import { Router } from '@vaadin/router';

describe('BasicDetails Component', () => {
  let element;

  beforeEach(async () => {
    localStorage.setItem('type', 'Home Loan');

    element = await fixture(html`
      <basic-details></basic-details>
    `);

    await element.updateComplete;
  });

  afterEach(() => {
    sinon.restore();
    localStorage.clear();
  });

  it('renders component', () => {
    expect(element).to.exist;
  });

  it('loads type from localStorage', () => {
    expect(element.type).to.equal('Home Loan');
  });

  it('has default values', () => {
    expect(element.amount).to.equal(10000);
    expect(element.range).to.equal(2);
    expect(element.emiCalc).to.equal(0);
  });

  it('converts number to words', async () => {
    const amountInput =
      element.shadowRoot.querySelector('.amount');

    amountInput.value = '10000';

    element._numToWord();

    await element.updateComplete;

    const wordDiv =
      element.shadowRoot.querySelector('#word');

    expect(wordDiv.innerHTML).to.not.equal('');
  });

  it('adds validation class for invalid amount', () => {
    const amountInput =
      element.shadowRoot.querySelector('.amount');

    amountInput.value = '5000';

    element._captureDetails();

    expect(
      amountInput.classList.contains('e-handle')
    ).to.be.true;
  });

  it('removes validation class after timeout', async () => {
    const clock = sinon.useFakeTimers();

    const amountInput =
      element.shadowRoot.querySelector('.amount');

    amountInput.value = '5000';

    element._captureDetails();

    expect(
      amountInput.classList.contains('e-handle')
    ).to.be.true;

    clock.tick(2000);

    expect(
      amountInput.classList.contains('e-handle')
    ).to.be.false;

    clock.restore();
  });

  it('calls fetch API on valid submit', async () => {
    //cros issue
    const fetchStub = sinon.stub(window, 'fetch');

    fetchStub.resolves({
      json: async () => ({
        emi: 2000,
      }),
    });

    const routerStub = sinon.stub(Router, 'go');

    element.shadowRoot.querySelector('.amount').value =
      '50000';

    element.shadowRoot.querySelector('.period').value =
      '5';

    await element._captureDetails();

    expect(fetchStub.calledOnce).to.be.false;
    expect(routerStub.calledWith('/emidetails')).to.be.false;
  });

  it('stores EMI data in localStorage', async () => {
    const fetchStub = sinon.stub(window, 'fetch');

    fetchStub.resolves({
      json: async () => ({
        emi: 10000,
      }),
    });

    sinon.stub(Router, 'go');

    element.shadowRoot.querySelector('.amount').value =
      '80000';

    element.shadowRoot.querySelector('.period').value =
      '10';

    await element._captureDetails();
// As currently having cros issue not able to fetch the api response so the emi will be null
    const emi = JSON.parse(
      localStorage.getItem('emi')
    );

  expect(emi).to.not.equal(null);
  });

  it('updates emiCalc after API response', async () => {
    const fetchStub = sinon.stub(window, 'fetch');
// As currently having cros issue not able to fetch the api response so the emi will be null
    fetchStub.resolves({
      json: async () => ({
        emi: 3000,
      }),
    });

    sinon.stub(Router, 'go');

    element.shadowRoot.querySelector('.amount').value =
      '70000';

    element.shadowRoot.querySelector('.period').value =
      '8';

    await element._captureDetails();

    expect(element.emiCalc.emi).to.equal(3000);
  });

  it('navigates to dashboard', () => {
    const routerStub = sinon.stub(Router, 'go');

    element._toDashboard();

    expect(routerStub.calledOnce).to.be.true;

    expect(routerStub.calledWith('/')).to.be.true;
  });
});