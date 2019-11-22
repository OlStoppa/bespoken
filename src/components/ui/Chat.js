import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import styled from "styled-components";
import ProfilePic from "./ProfilePic";
import { getMessages, addMessage } from '../../actions/chat';
import ChatMessage from "./ChatMessage";

const ChatContainer = styled.div`
  flex: 1;
  width: 100%;
  outline: 1px solid #c8c8c8;
  display: flex;
  flex-grow: 1;
  height: 100%;
  flex-direction: column;
`;

const ChatWindow = styled.div`
  height: 80%;
  width: 100%;
  background: #f8f8f8;
  padding: 1rem;
 
  display: flex;
  justify-content: flex-start;
  flex-direction: column-reverse;
  overflow-y: scroll;
  overflow-wrap: break-word;

  @media(max-width: 768px ) {
    max-height: 400px;
    flex-grow: 1;
    
  }
`;

const InputContainer = styled.div`
 

  height: 20%;
  width: 100%;
  background: white;
  padding: 1rem;
  form {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
      width: 80%;
      border: none;
      border-bottom: solid #c3c3c3 1px;
      position: relative;
      min-height: 18px;
      max-height: 100px;
      overflow-y: auto;
      overflow-x: hidden;
      overflow-wrap: break-word;
      outline: none;
      word-break: break-word;
      color: inherit;
      line-height: 18px;
      padding: 2px 0;
    }

    button: {
      height: 40%;
    }
  }

  @media(max-width: 768px) {
    height: auto;
  }
`;

const ChatHeader = styled.div`
  height: 10%;
  background: white;
  padding: 0 2rem;
  display: flex;
  align-items: center;
`;
const SendButton = styled.button`
  height: 20px;
  width: 20px;
  background: transparent;
  border: none;
  outline: none;

  svg {
    fill: ${props => (props.invalid ? `grey` : `blue`)};
  }

`;

const UserChip = styled.div`
  display: flex;

  span {
    color: #7d8ea8;
    font-size: 0.7rem;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;


const renderInput = ({ input, type, placeholder }) => {
  return <input {...input} type={type} placeholder={placeholder} required />;
};
const Chat = props => {
  const { socket, username, getMessages, addMessage, messages } = props;

  useEffect(() => {
    if (socket) {
      socket.on('messages-sent', (messages) => {
        getMessages(messages);
      });

      socket.on('message-sent', (message) => {
        addMessage(message);
      });
    }
  }, [socket])

  const submitMessage = formValues => {
    const { message } = formValues;
    const messageObject = {
      message,
      username,

    };
    addMessage(messageObject);
    socket.emit('message-added', messageObject);
    props.reset();
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <h3>Live Chat</h3>
      </ChatHeader>
      <ChatWindow>
        {
          messages.length > 0 &&
          messages
            .map(message => <ChatMessage message={message} />).reverse()
        }
      </ChatWindow>
      <InputContainer>
        <UserChip>
          <ProfilePic size="30" username={props.username} />

          <span>{props.username}</span>
        </UserChip>
        <form onSubmit={props.handleSubmit(submitMessage)}>
          <Field
            name="message"
            type="text"
            component={renderInput}
            placeholder="Type a message"
          />
          <ButtonContainer>
            <SendButton>
              <svg
                x="0px"
                y="0px"
                width="100%"
                height="100%"
                viewBox="0 0 535.5 535.5"
              >
                <g>
                  <polygon points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75" />
                </g>
              </svg>
            </SendButton>
          </ButtonContainer>
        </form>
      </InputContainer>
    </ChatContainer>
  );
};

const mapStateToProps = state => ({

  username: state.user.username,
  messages: state.chat
});

const mapDispatchToProps = dispatch => ({
  getMessages: (messages) => dispatch(getMessages(messages)),
  addMessage: (message) => dispatch(addMessage(message))
});

const chatForm = reduxForm({
  form: "chatForm"
})(Chat);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(chatForm);
