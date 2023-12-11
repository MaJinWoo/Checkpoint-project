import { useState } from 'react';
import Login from './Login';
import styled from 'styled-components';
import theme from '../styles/theme';
import Signup from './Signup';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { changeLoginStatus, changeMemberStatus } from '../redux/modules/authSlice';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

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

    swal('로그아웃', '로그아웃 되었습니다.', 'success');

    dispatch(changeLoginStatus(false));
    console.log(authState.isLogin);
  };

  return (
    <>
      <Container>
        <div>
          <StyledLink to={'/'}>Home</StyledLink>
        </div>
        {authState.isLogin === true ? (
          <button onClick={logoutHandler}>로그아웃</button>
        ) : (
          <button onClick={modalHandler}>로그인</button>
        )}
      </Container>

      {modalOpen ? (
        <ModalWrapper>
          <ModalBody>
            <ModalCloseBtn onClick={modalHandler}>&times;</ModalCloseBtn>
            {authState.isMember ? <Login setModalOpen={setModalOpen} /> : <Signup setModalOpen={setModalOpen} />}
          </ModalBody>
        </ModalWrapper>
      ) : null}
    </>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  width: 1100px;
  padding: 20px;

  position: absolute;
  top: 0;
  z-index: 100;

  & button {
    display: flex;
    padding: 5px 20px;
    border-radius: 20px;
    border: 1px solid gray;

    font-family: 'Gowoon-Regular';
    font-size: 14px;
    color: ${theme.color.main};
    background-color: ${theme.color.green};

    &:hover {
      cursor: pointer;
      font-weight: 400;
      color: ${theme.color.green};
      background-color: ${theme.color.main};
    }
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  font-size: 14px;
  font-family: 'Gowoon-Regular';
  color: ${theme.color.main};
  text-decoration: none;

  padding: 10px 20px;
  border: 1px solid ${theme.color.main};
  border-radius: 70px;
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
  justify-content: center;
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
