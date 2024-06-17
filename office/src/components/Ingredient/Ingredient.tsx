import React from "react";
import styled from "styled-components";
import { IIngredient } from "../../interfaces/Ingredient";
import {
  Cheese,
  Chicken,
  Ketchup,
  Lemon,
  Lettuce,
  Meat,
  Onion,
  Potato,
  RiceIng,
  TomatoIng,
} from "../../assets/icons";

interface Props extends IIngredient {}

interface IngredientIcons {
  [ingredient: string]: React.ReactNode;
}

const Ingredient: React.FC<Props> = ({ ingredient, existence }) => {
  const ingredientIcon = {
    tomato: <TomatoIng />,
    lemon: <Lemon />,
    potato: <Potato />,
    rice: <RiceIng />,
    ketchup: <Ketchup />,
    lettuce: <Lettuce />,
    onion: <Onion />,
    cheese: <Cheese />,
    meat: <Meat />,
    chicken: <Chicken />,
  } as IngredientIcons;

  return (
    <Container>
      <IngredientContainer>{ingredientIcon[ingredient]}</IngredientContainer>
      <Title>{ingredient}</Title>
      <Description>{existence}</Description>
    </Container>
  );
};

const Container = styled.div`
  border-radius: 0.5rem;
  padding: 1rem;
  gap: 5px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: #000;
  text-align: center;
`;

const IngredientContainer = styled.div`
  width: 50px;
  height: 50px;
  margin: auto;
`;

export default Ingredient;
