import modalReducer, { defaultState } from '../../reducers/modalReducer';


test('should setup default modal value', () => {
  const state = modalReducer(defaultState, {type: '@@INIT'});
  expect(state.modalOpen).toBe(false);
})

test('should change modal state to true', () => {
  const state = modalReducer(defaultState, {type: 'TOGGLE_MODAL'});
  expect(state.modalOpen).toBe(true);
})