import React from 'react';
import styled from 'styled-components';

const PicContainer = styled.div`
    height:${props => props.size}px;
    width: ${props => props.size}px;
    border-radius: 100%;
    background: white;
    margin: 0  5px;
`;

const ProfilePicImg = styled.img`
    height: ${props => props.size}px;
    width: ${props => props.size}px;
    border-radius: 100%;
`;

const ProfilePic = (props) => (
    <PicContainer size={props.size}>
        <ProfilePicImg 
            size={props.size} 
            src="https://i.pinimg.com/originals/02/5b/aa/025baa5b2cd7e46b6b4730247f6663ed.png" 
            alt="profile pic" 
        />
    </PicContainer>

)

export default ProfilePic;