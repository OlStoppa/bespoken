import React from 'react';
import styled from 'styled-components';

const PicContainer = styled.div`
    height:${props => props.size}px;
    width: ${props => props.size}px;
    border-radius: 100%;
    background: ${props => props.color};
    margin: 0  5px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ProfilePicLetter = styled.div`
    font-size: 1rem;
    color: white;
    text-transform: uppercase;
    font-weight: 600;
`;

const ProfilePic = (props) => (
  <PicContainer color={props.color} size={props.size}>
    <ProfilePicLetter>{props.username[0]}</ProfilePicLetter>
  </PicContainer>

)

export default ProfilePic;