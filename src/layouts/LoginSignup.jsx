import { useState } from 'react';
import Login from './Login';
import styled from 'styled-components';
import Signup from './Signup';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { changeLoginStatus, changeMemberStatus } from '../redux/modules/authSlice';

export default function LoginSignup() {
  const [modalOpen, setModalOpen] = useState(false);
  const authState = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  console.log(authState.isLogin);
  const modalHandler = () => {
    setModalOpen(!modalOpen);
    dispatch(changeMemberStatus(true));
  };

  const logoutHandler = async () => {
    await signOut(auth);
    alert('로그아웃 되었습니다.');
    dispatch(changeLoginStatus(false));
    console.log(authState.isLogin);
  };

  return (
    <Container>
      <Logo>
        <img alt="logo" />
      </Logo>
      {authState.isLogin === true ? (
        <LoginContainer>
          <button onClick={logoutHandler}>로그아웃</button>
        </LoginContainer>
      ) : (
        <LoginContainer>
          <button onClick={modalHandler}>로그인</button>
        </LoginContainer>
      )}
      {modalOpen ? (
        <ModalWrapper>
          <ModalBody>
            <ModalCloseBtn onClick={modalHandler}>&times;</ModalCloseBtn>
            {authState.isMember ? <Login setModalOpen={setModalOpen} /> : <Signup setModalOpen={setModalOpen} />}
          </ModalBody>
        </ModalWrapper>
      ) : null}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 1100px;
  margin: 0 auto;

  background-color: lightblue;
`;

const Logo = styled.div`
  background-color: pink;
`;

const LoginContainer = styled.div`
  background-color: pink;
`;
const ModalWrapper = styled.div`
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalBody = styled.div`
  width: 400px;
  height: 500px;
  padding: 30px 30px;
  margin: 0 auto;
  border: 1px solid #777;
  border-radius: 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const ModalCloseBtn = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
  border: none;
  font-size: 30px;
  cursor: pointer;
  background-color: transparent;
`;
