import React from 'react';
import { Room } from 'mediasoup-client';

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux'
import { render, cleanup } from '@testing-library/react';
import ConferenceRoom from '../../../components/pages/ConferenceRoom';


const mockStore = configureStore({});
let store;
afterEach(cleanup);

jest.mock("socket.io-client", () => {
  const emit = jest.fn();
  const on = jest.fn();
  const disconnect = jest.fn();
  const socket = { emit, on, disconnect };
  return jest.fn(() => socket);
});



test('shoud render call socket and setup mediasoup room', () => {
  store = mockStore({ user: { username: "Jim" }, chat: [] });
  const utils = render(
    <Provider store={store}>
      <ConferenceRoom match={{ params: { id: 1 } }} />
    </Provider>
  );

  expect(Room).toHaveBeenCalledTimes(1);

})