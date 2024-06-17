/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import {
  Drink,
  Frensh,
  Tomato,
  Hamburguer,
  Pizza,
  Garlic,
  Spicie,
} from "../../assets/icons";

const Background = ({ children }: any) => {
  return (
    <Container>
      <Decoration left={5} top={10} size="160px" rotate={-70}>
        <Pizza />
      </Decoration>

      <Decoration left={80} top={40} size="290px" rotate={70}>
        <Pizza />
      </Decoration>

      <Decoration left={40} top={60} size="100px" rotate={-30}>
        <Pizza />
      </Decoration>

      <Decoration left={10} top={73} size="180px" rotate={50}>
        <Tomato />
      </Decoration>

      <Decoration left={70} top={73} size="220px" rotate={-40}>
        <Tomato />
      </Decoration>

      <Decoration left={30} top={30} size="220px" rotate={-30}>
        <Hamburguer />
      </Decoration>

      <Decoration left={95} top={10} size="120px" rotate={-30}>
        <Hamburguer />
      </Decoration>

      <Decoration left={60} top={0} size="160px" rotate={-30}>
        <Drink />
      </Decoration>

      <Decoration left={25} top={55} size="230px" rotate={-20}>
        <Drink />
      </Decoration>

      <Decoration left={58} top={50} size="120px" rotate={-30}>
        <Frensh />
      </Decoration>

      <Decoration left={0} top={40} size="220px" rotate={60}>
        <Frensh />
      </Decoration>

      <Decoration left={50} top={90} size="120px" rotate={-30}>
        <Garlic />
      </Decoration>

      <Decoration left={40} top={-10} size="120px" rotate={-30}>
        <Garlic />
      </Decoration>

      <Decoration left={60} top={20} size="120px" rotate={10}>
        <Garlic />
      </Decoration>

      <Decoration left={90} top={90} size="280" rotate={-30}>
        <Spicie />
      </Decoration>

      <Decoration left={90} top={80} size="220px" rotate={20}>
        <Spicie />
      </Decoration>

      <Decoration left={20} top={-10} size="120px" rotate={-30}>
        <Spicie />
      </Decoration>

      {children}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const Decoration = styled.div<{
  top: number;
  left: number;
  rotate: number;
  size: string;
}>`
  position: absolute;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  transform: ${(props) =>
    `translate(-${props.top}%, -${props.left}%) rotate(${props.rotate}deg)`};
`;

export default Background;
