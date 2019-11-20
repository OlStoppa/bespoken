import { getMessages, addMessage } from '../../actions/chat';



const messages = [{
  username: 'test',
  message: 'test'
}];
test('should setup chat messages action object', () => {
  const action = getMessages(messages);
  expect(action).toEqual({
    type: 'GET_MESSAGES',
    messages
  });
});

test('should setup addMessage action object', () => {
  const action = addMessage(messages[0]);
  expect(action).toEqual({
    type: 'ADD_MESSAGE',
    message: messages[0]
  })
})