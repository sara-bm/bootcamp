import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { App } from './App';
import logo from './logo.svg';
import '@testing-library/jest-dom/extend-expect';

jest.mock('./logo.svg', () => 'logo.svg');

describe('App component', () => {
  it('renders successfully', () => {
    const { getByAltText } = render(<App />);
    expect(getByAltText('logo')).toBeInTheDocument();
  });

  it('displays the correct logo', () => {
    const { getByAltText } = render(<App />);
    expect(getByAltText('logo')).toHaveAttribute('src', 'logo.svg');
  });

  it('displays the edit message', () => {
    const { getByText } = render(<App />);
    expect(getByText('Edit src/App.js and save to reload.')).toBeInTheDocument();
  });

  it('displays the learn React link', () => {
    const { getByText } = render(<App />);
    expect(getByText('Learn React')).toBeInTheDocument();
  });

  it('has a link with the correct href', () => {
    const { getByText } = render(<App />);
    const link = getByText('Learn React').closest('a');
    expect(link).toHaveAttribute('href', 'https://reactjs.org');
  });

  it('has a link with the correct target', () => {
    const { getByText } = render(<App />);
    const link = getByText('Learn React').closest('a');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('has a link with the correct rel', () => {
    const { getByText } = render(<App />);
    const link = getByText('Learn React').closest('a');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('matches the snapshot', () => {
    const tree = render(<App />);
    expect(tree).toMatchSnapshot();
  });

  it('calls console.error when logo is not found', () => {
    jest.spyOn(console, 'error');
    jest.mock('./logo.svg', () => null);
    render(<App />);
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('calls console.error when logo is invalid', () => {
    jest.spyOn(console, 'error');
    jest.mock('./logo.svg', () => () => { throw new Error('Invalid logo'); });
    render(<App />);
    expect(console.error).toHaveBeenCalledTimes(1);
  });
});