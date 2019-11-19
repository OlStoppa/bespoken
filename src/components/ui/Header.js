import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleModal } from '../../actions/modal';
import styled from 'styled-components';
import Modal from './Modal';
import Login from './Login';


const HeaderContainer = styled.div`
    position: absolute;
    height: 100px;
    background: ${props => props.pathname === `/` ? `transparent` : `#24a7ff`};
    color: white;
    width: 100%;
    padding: 1rem 1rem;
    z-index: 100;
`;

const NavbarFluid = styled.div`
    max-width: 1170px;
    margin: 0 auto;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;

    h5 {
        padding: 1rem; 
        border-radius: 10px;
        background: #3195ff;
        cursor: pointer;
        transition: all 300ms ease;
        transform: scale(1);

        &:hover {
            transform: scale(0.9);
            background: #0062CC;
        }
    }
`;



const ProfileContainer = styled.div`
    padding: 0.3rem;
    border-radius: 20px;
    background: #3195ff;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,.14);

    :hover {
        ul {
            transform: scale(1);
            opacity: 1;
        }
    }
`;

const DropdownBox = styled.ul`
    display: block;
    position: absolute;
    list-style: none;
    top: 75%;
    opacity: 0;
    transform: scale(0);
    transform-origin: 80% 0%;
    transition: all 300ms cubic-bezier(0.78, 0.74, 0.25, 1);

    :before {
        position: absolute;
    content: "";
    top: -7px;
    right: 40px;
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 7px solid #ffffff;
    }
    
    li {
        padding: 1rem;
        background: #fff;
        color: black;
        border-radius: 10px;

        :hover {
            background: grey;
            color: white;
            cursor: pointer;
        }
    }

`;




const Header = ({ location, modalOpen, toggleModal }) =>

    (

        <>
            <HeaderContainer pathname={location.pathname}>
                <NavbarFluid>
                    <h3>Bespoken</h3>
                    <h5 onClick={() => toggleModal()}>Start/Join Room</h5>

                </NavbarFluid>
            </HeaderContainer>

            <Modal
                modalVisible={modalOpen}
                setModalVisible={toggleModal}
            >
                <Login setModalVisible={toggleModal} />

            </Modal>
        </>
    );


const mapDispatchToProps = dispatch => ({
    toggleModal: () => dispatch(toggleModal())
});

const mapStateToProps = state => ({
    modalOpen: state.modal.modalOpen
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));