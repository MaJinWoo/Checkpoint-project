import styled from 'styled-components';

function NavBar() {
  return (
    <Container>
      <Logo>
        <img alt="logo" />
      </Logo>
      <LoginContainer>
        <button className="login-button">로그인</button>
      </LoginContainer>
    </Container>
  );
}

export default NavBar;

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
