/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import { Flex } from "../../styled-components/grid";
import { TitleH1 } from "../../styled-components/titles";
import Background from "../../components/Background";
import { claimLunch } from "../../services/claim-lunch";
import usePost from "../../hooks/usePost";

const Main: React.FC = () => {
  const { post } = usePost<any>(claimLunch);

  const handleClaim = async () => {
    await post({});
  };

  return (
    <Background>
      <MainContainer id="claim">
        <ContainerControl direction="column">
          <TitleContainer direction="column" items="center">
            <Title>Free</Title>
            <Title>Lunch</Title>
            <Title>Day</Title>
          </TitleContainer>
          <ButtonContainer items="center">
            <button type="button" onClick={handleClaim}>
              Claim Your Free Lunch
            </button>
          </ButtonContainer>
        </ContainerControl>
      </MainContainer>
    </Background>
  );
};

const MainContainer = styled(Flex)`
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ContainerControl = styled(Flex)`
  transform: translateY(-100px);
`;

const TitleContainer = styled(Flex)`
  padding: 2rem;
`;

const Title = styled(TitleH1)`
  font-size: 90px;
  color: #000;
  z-index: 1;
  line-height: 100px;
  font-weight: 900;
`;

const ButtonContainer = styled(Flex)`
  transform: translateY(20px);

  button {
    padding: 1rem;
    width: 100%;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
      rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
      rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
    cursor: pointer;
    border-radius: 8px;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-style: normal;
    background: #000;
    color: #fff;

    &:hover {
      color: rgba(255, 165, 2, 1);
    }
  }
`;

export default Main;
