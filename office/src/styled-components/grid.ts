import styled from "styled-components";

interface IFlex {
  width?: string;
  direction?: "column" | "row";
  items?: "center" | "flex-start" | "flex-end";
  content?: "center" | "flex-start" | "space-between" | "flex-end";
}

export const Flex = styled.div<IFlex>`
  width: ${(props) => props.direction ?? "100%"};
  display: flex;
  flex-direction: ${(props) => props.direction};
  align-items: ${(props) => props.items};
  justify-content: ${(props) => props.items};
`;
