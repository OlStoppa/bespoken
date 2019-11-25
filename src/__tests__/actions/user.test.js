import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setUsername } from '../../actions/user';


const createMockStore = configureMockStore([thunk]);

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.5;
global.Math = mockMath;

test('should add username and background color  to store', (done) => {
  const store = createMockStore({});
  store.dispatch(setUsername("oliver")).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_USERNAME',
      username: "oliver",
      color: 'green'
    });
    done();
  });
})