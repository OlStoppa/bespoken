import React from 'react';
import {Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { setUsername } from '../../actions/user';
import { useHistory } from 'react-router-dom';

const Container = styled.div`
    text-align: center;   
    height: 100%;
    position: relative;   
`;

const Header = styled.div`
    padding: 2rem;
`;

const Form = styled.form`
    height: 80%;
    display: flex;
    width: 100%;
    padding:2rem;
    margin: 0 auto;
    flex-direction: column;
    justify-content: space-around;
    text-align: left;
    input {
        background #d3d3d3;
        outline: 0;
        border: none;
        height: 3rem;
        width: 100%;
        padding: 0 1rem;
        margin-bottom: 2rem;
    }
    button {
        height: 3rem;
        border: none;
        background: teal;
        color: white;
    }
`;


const renderInput = ({input, type}) => {
    return (
        <input {...input} type={type} />
    );
}

const Login = (props) => {
    let history = useHistory();
    const onSubmitLogin = (formValues) => {
        const { username, roomId } = formValues;
        props.setUsername(username).then(() => history.push(`/room:${roomId}`));
        props.setModalVisible(false);
    }

    return (
        <Container>
            <Header>
            <h2>Start or Join a Room</h2>
            </Header>
            <Form onSubmit={props.handleSubmit(onSubmitLogin)}>
            <label>
                Username
            <Field name="username" component={renderInput} type="text" />
            </label>
            <label>
                Room Name
            <Field name="roomId" component={renderInput} type="text" />
            </label>
            <button>Submit</button>
            </Form>
        </Container>
    );
}

const reduxLoginForm = reduxForm({
    form: 'loginForm'
})(Login);

const mapDispatchToProps = dispatch => ({
    setUsername: (username, history, roomId) => dispatch(setUsername(username, history, roomId))
});

export default connect(undefined, mapDispatchToProps)(reduxLoginForm);