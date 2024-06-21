import styled from "styled-components";
import { Flex } from "../../styled-components/grid";
import RecipeDetails from "../../components/RecipeDetails";
import { TitleH1 } from "../../styled-components/titles";
import useFetch from "../../hooks/useFetch";
import { getRecipes } from "../../services/recipes";
import { IRecipe } from "../../interfaces/Recipes";
import Spinner from "../../components/Spinner";

const Recipes: React.FC = () => {
  const { data: recipes, loading, error } = useFetch<IRecipe[]>(getRecipes);

  const RecipesContainerSection = (
    <RecipesContainer direction="column">
      {recipes &&
        recipes.length &&
        recipes.map((recipe) => <RecipeDetails recipe={recipe} />)}
    </RecipesContainer>
  );

  const loaderContainer = (
    <RecipesContainer direction="column">
      <Spinner />
    </RecipesContainer>
  );

  if (error) {
    return <h1>Error to fetch</h1>;
  }

  return (
    <MainContainer id="recipes">
      <ContainerControl direction="column">
        <Flex content="center" items="center">
          <SectionTitle>Recipes</SectionTitle>
        </Flex>
        {loading ? loaderContainer : RecipesContainerSection}
      </ContainerControl>
    </MainContainer>
  );
};

const MainContainer = styled(Flex)`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const SectionTitle = styled(TitleH1)`
  font-size: 3em;
  margin: 1em 0;
`;

const ContainerControl = styled(Flex)``;

const RecipesContainer = styled(Flex)`
  gap: 20px;
  max-width: 100%;
  margin: auto;
`;

export default Recipes;
