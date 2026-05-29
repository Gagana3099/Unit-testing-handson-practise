import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import '../src/Customer/Customer-details.js';

describe('customer details', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(
      html`<customer-details></customer-details>`
    );
  });

  afterEach(() => {
    if (window.fetch.restore) {
      window.fetch.restore();
    }
  });

  it('should render customer-details component', () => {
    expect(element).to.exist;
  });

  it('should render all input fields', () => {
    expect(
      element.shadowRoot.querySelector('#first_name')
    ).to.exist;

    expect(
      element.shadowRoot.querySelector('#last_name')
    ).to.exist;

    expect(
      element.shadowRoot.querySelector('#dateof_birth')
    ).to.exist;

    expect(
      element.shadowRoot.querySelector('#email')
    ).to.exist;

    expect(
      element.shadowRoot.querySelector('#mobile_number')
    ).to.exist;

    expect(
      element.shadowRoot.querySelector('#monthly_salary')
    ).to.exist;

    expect(
      element.shadowRoot.querySelector('#EMIs_amount')
    ).to.exist;
  });

  it('should render next button', () => {
    const nextBtn =
      element.shadowRoot.querySelector('#nextbtn');

    expect(nextBtn).to.exist;
  });

  it('should call fetch api on valid form submit', async () => {
    const fetchStub = stub(window, 'fetch').resolves({
      status: 200,
    });

    //CROS Issue

    const lionForm =
      element.shadowRoot.querySelector('lion-form');

    lionForm.serializedValue = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@test.com',
      mobile_number: '9876543210',
      monthly_salary: '50000',
      EMIs_amount: '1000',
      terms: true,
    };

    lionForm.hasFeedbackFor = [];

    lionForm.dispatchEvent(
      new CustomEvent('submit', {
        bubbles: true,
        composed: true,
      })
    );

    await element.updateComplete;

    expect(fetchStub.calledOnce).to.be.true;

    expect(fetchStub.firstCall.args[0]).to.equal(
      'https://loanfeapi.herokuapp.com/submit-form'
    );
  });

  it('should not call fetch when form has validation errors', async () => {
    const fetchStub = stub(window, 'fetch');

    const lionForm =
      element.shadowRoot.querySelector('lion-form');

    lionForm.hasFeedbackFor = ['error'];

    lionForm.formElements = [
      {
        hasFeedbackFor: ['error'],
        focus: () => {},
        classList: {
          add: () => {},
          remove: () => {},
        },
      },
    ];

    lionForm.dispatchEvent(
      new CustomEvent('submit', {
        bubbles: true,
        composed: true,
      })
    );

    await element.updateComplete;

    expect(fetchStub.called).to.be.false;
  });

  it('should validate mobile number validators', () => {
    const mobileInput =
      element.shadowRoot.querySelector('#mobile_number');

    expect(mobileInput.validators.length).to.equal(4);
  });

  it('should validate email validators', () => {
    const emailInput =
      element.shadowRoot.querySelector('#email');

    expect(emailInput.validators.length).to.equal(2);
  });

  it('should render back button', () => {
    const backBtn = element.shadowRoot.querySelector(
      '.backbg-btn-color'
    );

    expect(backBtn).to.exist;
  });
});