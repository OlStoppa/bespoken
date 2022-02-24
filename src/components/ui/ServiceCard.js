import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
width: 45%;
position: relative;
background-color: #fcfcfd;
padding: 1rem;
margin: 20px;
-webkit-transition: all 0.3s ease 0s;
transition: all 0.3s ease 0s;
z-index: auto;
display: flex;

@media(max-width: 768px) {
    width: 100%;
    flex-direction: column;
    height: auto;
}


:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    box-shadow: -1px 8px 18px rgba(0, 0, 0, 0.08);
}
`;

const CardImg = styled.div`
    width: 20%;
    display: flex;

    @media(max-width: 768px){
        width: 100%;
        justify-content: center;
    }
    
`;

const CardInfo = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
`;
const Title = styled.div`
font-size: 16px;
font-weight: 600;
padding: 0.5rem;
color: #2A4968;
text-transform: uppercase;
margin-bottom: 15px;
background-color: #EBF2F9;
    border-radius: 10px;
    text-align: center;
`;

const ImgBackground = styled.div`
    border-radius: 100%;
    background-color: ${props => props.color};
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ServiceCard = (props) => (
  <Card>
    <CardImg>
      <ImgBackground color={props.color}>
        <img style={{ width: '50%' }} src={props.img} alt="" />
      </ImgBackground>
    </CardImg>
    <CardInfo>
      <Title>
        <h3>{props.title}</h3>
      </Title>
      <p>{props.text}</p>
    </CardInfo>
  </Card>
);

export default ServiceCard;