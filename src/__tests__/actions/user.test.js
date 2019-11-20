import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setUsername } from '../../actions/user';


const createMockStore = configureMockStore([thunk]);

test('should add username to store', (done) => {
  const store = createMockStore({});
  store.dispatch(setUsername("oliver")).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type:'SET_USERNAME',
      username: "oliver"
    });
    done();
  });
})