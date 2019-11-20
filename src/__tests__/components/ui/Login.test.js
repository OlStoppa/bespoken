import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reduxForm } from 'redux-form';
import { createMemoryHistory } from 'history';
import { render, fireEvent, cleanup, getByLabelText } from '@testing-library/react';
import { Login } from '../../../components/ui/Login';


afterEach(cleanup);
const store = createStore(() => ({}));

const Decorated = reduxForm({ form: 'testForm' })(Login)

function renderWithReduxFormAndRouter(submit, history) {

  return render(
    <Provider store={store}>
      <Router history={history}>
        <Decorated handleSubmit={submit} />
      </Router>
    </Provider>
  );
}

it("renders with correctly", () => {
  const history = createMemoryHistory();
  const submit = jest.fn();

  const { getByText } = renderWithReduxFormAndRouter(submit, history);
  expect(getByText('Start or Join a Room')).toBeTruthy();
})


// test("should handle submit", () => {
//   const history = createMemoryHistory();
//   const submit = jest.fn();


//   const {  getByText } = renderWithReduxFormAndRouter(submit, history);
 
 
//   const node = getByText("Submit");
//   fireEvent.click(node);

//   expect(submit).toHaveBeenCalledTimes(1);
  

// })