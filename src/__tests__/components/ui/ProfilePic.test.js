import React from 'react';
import ProfilePic from '../../../components/ui/ProfilePic';
import { render } from '@testing-library/react';

test('should render correctly', () => {
  const { getByText } = render(<ProfilePic username="oliver" size={30} />);

  expect(getByText("o")).toBeTruthy();
});