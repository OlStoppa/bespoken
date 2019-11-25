import React from 'react';
import styled from 'styled-components';
import {FaEnvelope, FaPhone, FaInstagram, FaFacebookSquare, FaYoutubeSquare} from 'react-icons/fa';


const Container = styled.div`
  width: 100%;
  height: 150px;
  background: #0d1e30;
  position: relative;
  bottom: -100px;
  left: 0;
  padding: 1rem;
`;

const Fluid = styled.div`
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p{
  color: white;
  padding: 1rem;
  }
`;

const Footer = () => (
  <Container>
    <Fluid>
      <div>
      <p><FaPhone style={{marginRight: '1rem'}}/>+8869233038023</p>
      <p><FaEnvelope style={{marginRight: '1rem'}}/>support@bespoken.xyz</p>

      </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <FaFacebookSquare style={{color: 'white', fontSize: '30px', margin: '5px'}}/>
        <FaYoutubeSquare style={{color: 'white', fontSize: '30px', margin: '5px'}}/>
        <FaInstagram style={{color: 'white', fontSize: '30px', margin: '5px'}}/>
      </div>
      
      </Fluid>
  </Container>
);

export default Footer;