import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Login from '../../../components/ui/Login';

afterEach(cleanup);
function reducer(state = {}, action)

function renderWithRedux(component, { initialState, store = createStore(reducer, initialState) } = {}) {
  return {
    ...render(<Provider store={store}>{component}</Provider>)
      };
    }
    
it("renders with redux", () => {
  const {getByText} = renderWithRedux(<Login />)
})