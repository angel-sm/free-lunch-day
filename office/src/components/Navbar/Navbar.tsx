/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import { Flex } from "../../styled-components/grid";
import { Rice } from "../../assets/icons";

export const Nabvar = () => {
  const handleSmoothScroll = (e: any) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href").slice(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <Container content="center" items="center">
      <ContainerControl content="space-between">
        <Rice />
        <MenuContainer>
          <a href="#claim" onClick={handleSmoothScroll}>
            Home
          </a>
          <a href="#recipes" onClick={handleSmoothScroll}>
            Recipes
          </a>
          <a href="#orders" onClick={handleSmoothScroll}>
            Orders
          </a>
          <a href="#purchases" onClick={handleSmoothScroll}>
            Purchases
          </a>
        </MenuContainer>
      </ContainerControl>
    </Container>
  );
};

const Container = styled(Flex)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  height: 90px;
  align-items: center;
`;

const ContainerControl = styled(Flex)`
  width: 90%;
  position: absolute;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
`;

const MenuContainer = styled.div`
  display: flex;
  gap: 25px;

  a {
    color: #000;
    text-decoration: none;

    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-style: normal;
  }
`;

export default Nabvar;
