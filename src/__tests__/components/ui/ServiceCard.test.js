import React from 'react';
import ServiceCard from '../../../components/ui/ServiceCard';
import { render } from '@testing-library/react'

it("renders text and title correctly", () => {
  const { getByText } = render(<ServiceCard text="test" title="title"/>);
  expect(getByText('test')).toBeTruthy();
  expect(getByText('title')).toBeTruthy();
})