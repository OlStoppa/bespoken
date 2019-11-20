import chatReducer from '../../reducers/chatReducer';

const messages = [
{
  username: 'Jim',
  message: 'hi'
},
{
  username: 'Jim',
  message: 'hi'
}
]
test("should set up default state", () => {
  const state = chatReducer(undefined, {type: '@@INIT'});
  expect(state).toEqual([]);
})

test("should add all messages to state", () => {
  const action = {
    type: 'GET_MESSAGES',
    messages
  }
  const state = chatReducer(undefined, action);

  expect(state).toEqual(messages);
});

test("should add a message to state", () => {
  const action = {
    type: 'ADD_MESSAGE',
    message: messages[0]
  };

  const state = chatReducer(messages, action);

  expect(state.length).toBe(3);
})