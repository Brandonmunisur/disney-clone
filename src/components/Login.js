import styled from "styled-components";

const Login = (props) => {
  return (
    <Container>
      <Content>
        <BgImage />
      </Content>
    </Container>
  );
};
const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`;
const Content = styled.div`
  margin-bottom: 10vh;
  width: 100%;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 40px;
  height: 100%;
`;
const BgImage = styled.div`
  background-image: url("/images/login-background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%; /* Ensure the div covers the desired area */
  height: 100%;
`;
export default Login;
