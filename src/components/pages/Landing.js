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
`;

const FluidContent = styled.div`
  width: 1170px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;

  @media(max-width: 768px){
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

  @media(max-width: 768 px) {
    position: relative;
    margin-bottom: 200px;
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

  @media(max-width: 786px) {
    right: 0;
    position: absolute;
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
                Chat <span style={{ color: "#84ebad" }}>privately</span> as part of a community.
              </h1>
              <p>
                Join an existing room or open a new 
              </p>
              <div>
                <MainButton
                  color="white"
                  background="#3195ff"
                  text="register"
                />
              </div>
            </MainTitles>
          </FluidContent>
        </TopContentContainer>
        <Background>
          <GraphicContainer>
            <img src={groupChat} alt="people chatting online" />
          </GraphicContainer>
        </Background>
      </HeaderHolder>
      <div>
        <FluidContent>
          <TitleContainer>
            <h2>Our Classes</h2>
            <h4>Checkout our usual classes or if you have special requirements, just send us a message.</h4>
          </TitleContainer>
        </FluidContent>
        <FluidContent>
          <ServiceCard
            img={PublicStreamSvg}
            title="Free Classes"
            text="Free classes are open to everyone to hang out and improve your English"
            color="#24a7ff"
          />
          <ServiceCard
            img={LimitedStreamSvg}
            title="Limited Classes"
            text="We run a number of daily streams that are limited to 10 users only. Everyone can participate as much as they like by live video chat."
            color="rgb(132, 235, 173)"
          />
          <ServiceCard
            img={PrivateSvg}
            title="Private Classes"
            text="One to one and small group classes are available and can be arranged to suit your schedule. The topic of these classes can be anything you like. Popular choices are things like speaking test preparation and interview practice."
            color="#24a7ff"
          />
          <ServiceCard
            img={TestSvg}
            title="Speaking Tests"
            text="Do you need to take the IELTS or TOEFL? We offer a speaking test service where you can take a test with one of our experienced teachers and receive your estimated score and helpful feedback."
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