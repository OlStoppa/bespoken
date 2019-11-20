import { toggleModal } from '../../actions/modal';

test("should setup action object", () => {
  const action = toggleModal();

  expect(action).toEqual({
    type: 'TOGGLE_MODAL'
  });
})