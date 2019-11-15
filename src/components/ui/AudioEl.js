import React, {useEffect, useRef} from 'react';

const AudioEl = (props) => {

    const myref = useRef(null);
    const {stream} = props;
    useEffect(() => {
        if(!!myref.current){
        myref.current.srcObject = stream;
        }
    }, [stream, myref])

    return (
        <audio ref={myref}  autoPlay playsInline/>
    );
}

export default AudioEl;