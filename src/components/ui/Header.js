import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleModal } from '../../actions/modal';
import styled from 'styled-components';
import Modal from './Modal';
import Login from './Login';
import ProfilePic from './ProfilePic';


const HeaderContainer = styled.div`
    position: absolute;
    height: 100px;
    background: ${props => props.pathname === `/` ? `transparent` : `#24a7ff`};
    color: white;
    width: 100%;
    padding: 1rem 1rem;
    z-index: 5;
  
    @media(max-width: 1440px){
        height: 60px;
    }
    @media(max-width: 786px){
        display: ${props => props.pathname === `/` ? `block` : `none`};
    }
`;

const NavbarFluid = styled.div`
    max-width: 1170px;
    margin: 0 auto;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;

    >h5 {
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
    display: flex;
    align-items: center;

    :hover {
        ul {
            transform: scale(1);
            opacity: 1;
        }
    }
`;

const Header = ({ location, modalOpen, toggleModal, username, color }) =>

(
  <>
    <HeaderContainer pathname={location.pathname}>
      <NavbarFluid>
        <h3>Bespoken</h3>
        {
          !username ?
            <h5 onClick={() => toggleModal()}>Start/Join Room</h5> :
            (
              <ProfileContainer>
                <h5>{username}</h5>
                <ProfilePic username={username} size={32} color={color} />
              </ProfileContainer>
            )
        }
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
  modalOpen: state.modal.modalOpen,
  username: state.user.username,
  color: state.user.color
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));