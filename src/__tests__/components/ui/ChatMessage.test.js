import React from 'react';
import ChatMessage from '../../../components/ui/ChatMessage';
import { render } from '@testing-library/react';

const message = {
  username: 'Oliver',
  message: 'test'
}

test('should render a chat message', () => {
  const { getByText } = render(<ChatMessage message={message} />);

  expect(getByText('test')).toBeTruthy();
})