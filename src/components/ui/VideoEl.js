import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';


const VideoElement = styled.video`
  background-color: #ddd;
    width: ${({ isLandscape, count }) => count ? `auto` : isLandscape ? `auto` : `auto`};
    height: ${({ isLandscape, count }) => count ? `100%` : isLandscape ? `100%` : `100%`};
place-self: center;

@media(max-width: 768px) {
  width: 100%;
}
`;

const VideoEl = (props) => {

  const myref = useRef(null);
  const { stream } = props;
  const [isLandscape, setIsLandscape] = useState(true);

  useEffect(() => {
    if (!!myref.current) {
      myref.current.srcObject = stream;
    }
  }, [stream, myref])

  useEffect(() => {
    if (!!myref.current) {
      const { clientHeight, clientWidth } = myref.current;
      if (clientHeight > clientWidth) {
        setIsLandscape(false);
      } else {
        setIsLandscape(true)
      }
    }
  }, [myref])

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      <VideoElement ref={myref} autoPlay playsInline controls isLandscape={isLandscape} count={props.count} />
    </div>
  );
}

export default VideoEl;