import React from 'react';
import styled from 'styled-components';
import ProfilePic from './ProfilePic';

const Wrapper = styled.div`
  display: block;
`;
const MessageContainer = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 10px;
  
`;

const MessageText = styled.div`
  font-size: 0.8rem;
  position: relative;
  display: flex;
  justify-content: flex-start;

  p {
    font-weight: 600;
  }
  span {
    color: #7d8ea8;
    margin-right: 5px;
  }
`;

const PicContainer = styled.div`
  margin-right: 10px;
`;

const ChatMessage = ({ message }) => (
  <Wrapper>
    <MessageContainer >
      <PicContainer>
        <ProfilePic
          size="30"
          username={message.username}
          color={message.color}
        />
      </PicContainer>
      <MessageText>
        <p>
          <span>{message.username}</span> {message.message}
        </p>
      </MessageText>
    </MessageContainer>
  </Wrapper>
);

export default ChatMessage;