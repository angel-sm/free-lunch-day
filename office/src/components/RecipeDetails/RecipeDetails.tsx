import styled from "styled-components";
import { IRecipe } from "../../interfaces/Recipes";

interface Props {
  recipe: IRecipe;
}

const RecipeDetails: React.FC<Props> = ({ recipe }) => {
  console.log("🚀 ~ recipe:", recipe);
  return (
    <Card>
      <Image src={recipe.cover} alt="Recipe Image" />
      <CardContent>
        <GridContainer>
          <Title>{recipe.title}</Title>
          <Paragraph>{recipe.description}</Paragraph>
          <GridContainer>
            <SubTitle>Ingredients:</SubTitle>
            <List>
              {Object.values(recipe.ingredients).map((ingredient) => (
                <ListItem key={ingredient.id}>
                  {ingredient.quantity} {ingredient.ingredient}
                </ListItem>
              ))}
            </List>
          </GridContainer>
        </GridContainer>
      </CardContent>
    </Card>
  );
};

const Card = styled.div`
  width: 100%;
  max-width: 700px;
  max-height: 300px;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  background-color: white;
  color: #1a202c;
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  max-width: 300px;
  max-height: 300px;
  object-fit: cover;
  @media (min-width: 768px) {
    width: 50%;
    height: auto;
  }
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: bold;
`;

const SubTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
`;

const Paragraph = styled.p`
  color: "#718096";
  font-size: 0.8em;
`;

const List = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
  color: #000;
  max-height: 60%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  font-size: 0.8em;
`;

const GridContainer = styled.div`
  display: grid;
  gap: 1rem;
`;

export default RecipeDetails;
