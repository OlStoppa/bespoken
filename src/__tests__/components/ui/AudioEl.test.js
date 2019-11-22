import React from 'react';
import AudioEl from '../../../components/ui/AudioEl';
import { render } from '@testing-library/react';

test('renders video element', () => {
  const stream = {};
  const { container } = render(<AudioEl stream={stream} />);
  const audio = container.getElementsByTagName('audio');
  expect(audio.length).toBe(1);
})