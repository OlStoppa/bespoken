export const defaultState = {
  modalOpen: false
};

export default (state = defaultState, action) => {
  switch (action.type) {

    case 'TOGGLE_MODAL':
      return {
        modalOpen: !state.modalOpen
      };

    default:
      return state;
  }
}