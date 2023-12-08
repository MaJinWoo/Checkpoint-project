import styled from 'styled-components';
import theme from '../styles/theme';

function FooterBar() {
  return (
    <Container>
      <p>될 수 있을까 개발자</p>
      <p>©CHECKPOINT CORP. ALL RIGHTS RESERVED</p>
    </Container>
  );
}

export default FooterBar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  row-gap: 10px;
  width: 100%;
  height: 100px;
  margin-top: 20px;

  font-size: 11px;
  font-family: 'Gowoon-Regular';

  color: gray;
  background-color: ${theme.color.main};
`;
