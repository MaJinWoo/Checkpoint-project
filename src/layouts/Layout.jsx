import styled from 'styled-components';
import FooterBar from './FooterBar';
import NavigationBar from './NavigationBar';

export default function Layout(props) {
  return (
    <LayoutContainer>
      <NavigationBar />
      <Main>{props.children}</Main>
      <FooterBar />
    </LayoutContainer>
  );
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
