import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebase';
import styled from 'styled-components';
export default function Signup({ setIsMember }) {
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupNickname, setSignupNickname] = useState('');
  const signupHandler = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      await updateProfile(auth.currentUser, { displayName: signupNickname });
      alert('회원가입이 완료되었습니다! 로그인 해주세요.');
      setIsMember(true);
      setSignupEmail('');
      setSignupPassword('');
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        alert('이미 사용중인 이메일입니다.');
      } else if (errorCode === 'auth/missing-password') {
        alert('비밀번호를 입력해주세요.');
      } else if (errorCode === 'auth/invalid-email') {
        alert('이메일을 확인해주세요.');
      } else if (errorCode === 'auth/weak-password') {
        alert('비밀번호는 6자 이상이어야 합니다.');
      }
      console.log('error with signup', errorCode);
      // alert('회원가입 중 오류가 발생하였습니다.');
    }
  };
  return (
    <SignupWrapper>
      <h1>📖 Checkpoint의 회원이 되어보세요!</h1>
      <InputSection>
        <SignupInput placeholder="이메일" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
        <SignupInput
          placeholder="비밀번호 (6자 이상)"
          type="password"
          value={signupPassword}
          onChange={(e) => setSignupPassword(e.target.value)}
        />
        <SignupInput placeholder="닉네임" value={signupNickname} onChange={(e) => setSignupNickname(e.target.value)} />
      </InputSection>
      <ButtonSection>
        <StyledButton type="button" onClick={() => setIsMember(true)}>
          로그인
        </StyledButton>
        <StyledButton type="button" onClick={signupHandler}>
          회원가입
        </StyledButton>
      </ButtonSection>
    </SignupWrapper>
  );
}

const SignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  gap: 50px;
  & h1 {
    font-size: 20px;
  }
`;
const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const SignupInput = styled.input`
  width: 200px;
  height: 20px;
  border-radius: 20px;
  border: 1px solid black;
  padding: 15px;
  font-size: 16px;
`;
const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const StyledButton = styled.button`
  background-color: white;
  border: 1px solid black;
  width: 189px;
  height: 35px;
  border-radius: 20px;
  font-size: 16px;

  cursor: pointer;
`;
