import React from 'react';
import styled from 'styled-components';


const Button = styled.button`
border: 0;
border-radius: 10px;
font-size: 15px;
font-weight: 600;
text-transform: uppercase;
padding: 9px 26px;
margin: 5px 10px;
display: inline-block;
transition: all 300ms ease;
transform: scale(1);
white-space: nowrap;
outline: none;
background-color: ${props => props.background};
color: ${props => props.color};
cursor: pointer;

&:hover {
    transform: scale(0.9);
    background-color: #0062CC;
}

`;
const MainButton = props => (
  <Button
    background={props.background}
    onClick={props.onClick}
    color={props.color}
  >
    {props.text}
  </Button>
);

export default MainButton;