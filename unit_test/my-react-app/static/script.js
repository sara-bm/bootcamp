import { JSDOM } from 'jsdom';
import { faker } from 'faker';
const sinon = require('sinon');
import { render, fireEvent, waitFor } from '@testing-library/dom';

describe('DOMContentLoaded event listener', () => {
  let dom;
  let document;
  let window;
  let goToHomeBtn;
  let homePage;
  let splashContainer;

  beforeEach(() => {
    dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
    document = dom.window.document;
    window = dom.window;

    document.body.innerHTML = `
      <button id="goToHomeBtn">Go to Home</button>
      <div id="homePage"></div>
      <div class="splash-container"></div>
    `;

    goToHomeBtn = document.getElementById('goToHomeBtn');
    homePage = document.getElementById('homePage');
    splashContainer = document.querySelector('.splash-container');

    jest.spyOn(window, 'addEventListener');
    jest.spyOn(document, 'addEventListener');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('adds event listener to document on DOMContentLoaded', () => {
    expect(document.addEventListener).toHaveBeenCalledTimes(1);
    expect(document.addEventListener).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function));
  });

  it('gets elements by id and class', () => {
    expect(goToHomeBtn).not.toBeNull();
    expect(homePage).not.toBeNull();
    expect(splashContainer).not.toBeNull();
  });

  it('adds active class to home page on goToHomeBtn click', () => {
    const addClassSpy = sinon.spy(homePage.classList, 'add');
    fireEvent.click(goToHomeBtn);
    expect(addClassSpy.calledOnceWith('active')).toBe(true);
  });

  it('does not throw an error if goToHomeBtn is null', () => {
    goToHomeBtn = null;
    expect(() => document.dispatchEvent(new window.Event('DOMContentLoaded'))).not.toThrow();
  });

  it('does not throw an error if homePage is null', () => {
    homePage = null;
    expect(() => document.dispatchEvent(new window.Event('DOMContentLoaded'))).not.toThrow();
  });

  it('does not throw an error if splashContainer is null', () => {
    splashContainer = null;
    expect(() => document.dispatchEvent(new window.Event('DOMContentLoaded'))).not.toThrow();
  });

  it('calls addEventListener on goToHomeBtn', () => {
    const addEventListenerSpy = sinon.spy(goToHomeBtn, 'addEventListener');
    document.dispatchEvent(new window.Event('DOMContentLoaded'));
    expect(addEventListenerSpy.calledOnceWith('click', expect.any(Function))).toBe(true);
  });

  it('executes callback on goToHomeBtn click', () => {
    const callbackSpy = sinon.spy();
    goToHomeBtn.addEventListener('click', callbackSpy);
    fireEvent.click(goToHomeBtn);
    expect(callbackSpy.calledOnce).toBe(true);
  });
});