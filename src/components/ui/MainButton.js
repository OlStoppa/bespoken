import React from 'react';
import styled from 'styled-components';


const Button = styled.button `
border: 0;
border-radius: 10px;
font-size: 15px;
font-weight: 600;
text-transform: uppercase;
padding: 9px 26px;
margin: 5px 10px;
display: inline-block;
white-space: nowrap;
outline: none;
background-color: ${props => props.background};
color: ${props => props.color}

`;
const MainButton = props => (
    <Button background={props.background} color={props.color}>{props.text}</Button>
);

export default MainButton;