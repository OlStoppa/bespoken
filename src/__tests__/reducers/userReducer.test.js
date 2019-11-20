import userReducer, { defaultState } from '../../reducers/userReducer';

test('should setup state with default value', () => {
  const state = userReducer(defaultState, { type: '@@INIT' });
  expect(state.username).toBe(null);
})

test('should set username in state', () => {

  const action = {
    type: 'SET_USERNAME',
    username: 'Oliver'
  }
  const state = userReducer(defaultState, action);
  expect(state.username).toBe('Oliver');
})