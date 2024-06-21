import styled from "styled-components";
import { Flex } from "../../styled-components/grid";
import Ingredient from "../../components/Ingredient/Ingredient";
import useFetch from "../../hooks/useFetch";
import { getIngredients } from "../../services/ingredients";
import { IIngredient } from "../../interfaces/Ingredient";
import { TitleH1 } from "../../styled-components/titles";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import React, { useMemo } from "react";
import { IPurchase } from "../../interfaces/Purchase";
import { getPurchases } from "../../services/purchases";
import { format } from "date-fns";

interface Props {
  refresh: boolean;
}

const Purchases: React.FC<Props> = ({ refresh }) => {
  const { data: ingredients } = useFetch<IIngredient[]>(
    getIngredients,
    refresh
  );
  const { data: purchases } = useFetch<IPurchase[]>(getPurchases, refresh);

  const columns = useMemo<MRT_ColumnDef<IPurchase>[]>(
    () => [
      {
        accessorKey: "ingredient",
        header: "Inhredient",
        size: 50,
      },
      {
        accessorKey: "quantity",
        header: "Quantity purchased",
        size: 50,
      },
      {
        accessorKey: "createdAt",
        header: "Purchased at",
        size: 200,
        Cell: ({ cell }) => {
          return (
            <span>
              {format(new Date(cell.getValue() as Date), "dd/MM/yyy hh:mm aa")}
            </span>
          );
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    enableTopToolbar: false,
    enableColumnOrdering: false,
    columns,
    data: purchases ? (purchases as IPurchase[]) : [],
  });

  const IngredientsGrid = (
    <IngredientsContainer>
      {ingredients &&
        ingredients.length &&
        ingredients.map((ingredient) => {
          return (
            <Ingredient
              key={ingredient.id}
              id={ingredient.id}
              ingredient={ingredient.ingredient}
              existence={ingredient.existence}
            />
          );
        })}
    </IngredientsContainer>
  );

  return (
    <MainContainer id="purchases">
      <ContainerControl direction="column">
        <Flex content="center" items="center">
          <SectionTitle>Ingredients and purchases</SectionTitle>
        </Flex>
        {IngredientsGrid}
        <Flex items="center">
          <MaterialReactTable table={table} />
        </Flex>
      </ContainerControl>
    </MainContainer>
  );
};

const MainContainer = styled(Flex)`
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;

const ContainerControl = styled(Flex)``;

const SectionTitle = styled(TitleH1)`
  font-size: 3em;
  margin: 1em 0;
`;

const IngredientsContainer = styled(Flex)`
  gap: 20px;
  max-width: 100%;
  margin: auto;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

export default Purchases;
