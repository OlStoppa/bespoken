import React from 'react';
import ReactDom from 'react-dom';
import MainButton from '../../../components/ui/MainButton';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'



it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(<MainButton />, div)
})

it("renders button correctly", () => {
  const click = jest.fn();
  const { getByText } = render(<MainButton text="hello" onClick={click} />);

  expect(getByText("hello")).toBeTruthy();

  fireEvent.click(getByText(/hello/i));

  expect(click).toHaveBeenCalledTimes(1);
});