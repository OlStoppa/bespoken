import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';


const VideoElement = styled.video`
  background-color: #ddd;
    width: 300px;
  place-self: center;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const VideoEl = (props) => {

    const myref = useRef(null);
    const {stream} = props;
    useEffect(() => {
        if(!!myref.current){
        myref.current.srcObject = stream;
        }
    }, [stream, myref])

    return (
        <VideoElement ref={myref}  autoPlay playsInline/>
    );
}

export default VideoEl;