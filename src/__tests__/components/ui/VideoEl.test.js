import React from 'react';
import VideoEl from '../../../components/ui/VideoEl';
import { render } from '@testing-library/react';

test('renders video element', () => {
  const stream = {};
  const { container } = render(<VideoEl stream={stream} />);
  const video = container.getElementsByTagName('video');
  expect(video.length).toBe(1);
})