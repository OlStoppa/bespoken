import React from "react";
import ReactDom from "react-dom";
import Styled from 'styled-components';

const Overlay = props => <div className={props.className} onMouseDown={props.onMouseDown}>{props.children}</div>;

const StyledOverlay = Styled(Overlay)`
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: ${props => props.modalVisible ? `100` : `-1`};
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0, 0.8);
    opacity:    ${props => props.modalVisible ? `1` : `0`};
    transition: all 500ms;
    
`;



const ModalBox = Styled.div`
    
    width: 30%;
    background: white;

    @media(max-width: 768px){
        width: 60%;
    }
    @media(max-width: 425px){
        width: 95%;
    }
`;
const Modal = props => {
    return ReactDom.createPortal(
        <StyledOverlay modalVisible={props.modalVisible} onMouseDown={() => props.setModalVisible(false)}>
            <ModalBox onMouseDown={(e) => e.stopPropagation()} >{props.children}</ModalBox>
        </StyledOverlay>,
        document.querySelector("#modal")
    );
};

export default Modal;
