import React from "react";
import styled from "styled-components";
import MainButton from "../ui/MainButton";
import ServiceCard from "../ui/ServiceCard";
import PublicStreamSvg from "../../assets/online-class.svg";
import LimitedStreamSvg from "../../assets/online.svg";
import PrivateSvg from "../../assets/privacy.svg";
import TestSvg from "../../assets/motivational-speech.svg";
import groupChat from "../../assets/group-chat.svg";



const Container = styled.div`
  font-size: 1rem;
  background: transparent;
`;

const HeaderHolder = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  padding-top: 100px;
  top: 0;
  left: 0;

  @media(max-width: 768px){
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Background = styled.div`
position: absolute;
height: 100%
left: 0;
top: 0;

width: 100%
background-image: linear-gradient(150deg, #0a5dd3, #24a7ff);
transform: skewY(-8deg);
z-index: -1;
transform-origin: top left;
`;

const BackgroundColor = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  
  left: 0;
  z-index: -1;
  transform: skewY(-8deg);
  transform-origin: center center;
  background-color: #f6f9fc;
`;

const TopContentContainer = styled.div`
  padding-top: 110px;
  padding-bottom: 110px;
  text-align: left;

  @media(max-width: 768px){
    padding: 0;
  }
`;

const FluidContent = styled.div`
  width: 1170px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;

  @media(max-width: 1024px){
    width: 100%;
    position: relative;
    padding: 0 1rem;
  }
`;


const MainTitles = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  color: white;
  padding: 3rem 0;

  h1 {
    font-size: 2.5rem;
    margin: 1rem 0;
  }

  p {
    font-size: 1.2rem;
    font-weight: 100;
    margin: 1rem 0;
  }

  @media(max-width: 768px) {
    position: relative;
    width: 100%;
  }
`;

const GraphicContainer = styled.div`
position: absolute;
display: inline-block;
right: calc(50% - 600px);
bottom: 0;
width: 100%;
max-width: 600px;

img {
    width: 100%;
    transform: skewY(8deg);
}

  @media(max-width: 1024px){
    right: 0;
    max-width: 500px;
  }

  @media(max-width: 768px) {
    position: relative;
    right: auto;
  }
`;

const TitleContainer = styled.div`
  text-align: center;
  width: 100%;
  margin-bottom: 20px;

  h2 {
    color: #2F3C52;
    margin: 1rem 0;
  }

  h4 {
    color: #7D8EA8;
    font-weight: 400;
    margin: 1rem 0;
    }

    ::after {
      position: absolute;
    content: "";
    width: 156px;
    height: 2px;
    background-color: #D9E3F2;
    left: 50%;
    margin-left: -78px; 
  }
`;

const ClassroomsContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 100px;

`;

const Landing = () => {

  return (
    <Container>
      <HeaderHolder>
        <TopContentContainer>
          <FluidContent>
            <MainTitles>
              <h1>
                Conference <span style={{ color: "#84ebad" }}>privately</span> in a live video chat room.
              </h1>
              <p>
                Join an existing room or open a new one.
              </p>
              <div>
                <MainButton
                  color="white"
                  background="#3195ff"
                  text="Get Started"
                />
              </div>
            </MainTitles>
          </FluidContent>
        </TopContentContainer>
        <Background/>
          <GraphicContainer>
            <img src={groupChat} alt="people chatting online" />
          </GraphicContainer>
        
      </HeaderHolder>
      <div>
        <FluidContent>
          <TitleContainer>
            <h2>Our Service</h2>
            <h4>Just choose a username and say which room you would like to join. If there is no room by that name, a new one will be opened.</h4>
          </TitleContainer>
        </FluidContent>
        <FluidContent>
          <ServiceCard
            img={PublicStreamSvg}
            title="Teaching"
            text="Bespoken is a great place for online classes. Use live video and chat."
            color="#24a7ff"
          />
          <ServiceCard
            img={LimitedStreamSvg}
            title="Low latency"
            text="Bespoken uses webRTC to connect straight to your browser for minimal lag."
            color="rgb(132, 235, 173)"
          />
          <ServiceCard
            img={PrivateSvg}
            title="Privacy"
            text="No user data is stored after a room has been closed and communications are encrypted with SSL."
            color="#24a7ff"
          />
          <ServiceCard
            img={TestSvg}
            title="CPU light"
            text="Bespoken uses a selective forwarding unit for live video communication."
            color="rgb(132, 235, 173)"
          />

        </FluidContent>
      </div>
      <ClassroomsContainer>
        <FluidContent>
          <BackgroundColor />
          <TitleContainer>
            <h2>Classrooms</h2>
            <h4>Whatever class you choose to participate in, it will take place in our online classrooms.</h4>
            <h4>The classrooms are built in to the ClassStream website. No extra software is needed!</h4>
          </TitleContainer>
        </FluidContent>
      </ClassroomsContainer>
    </Container>
  );
};


export default Landing;