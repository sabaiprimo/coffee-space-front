import { gql } from '@apollo/client';

const ALL_RECIPES = gql`
  query {
    recipes {
      _id
      title
      images {
        src
        srcSet
      }
      preparationTime
      totalTime
      roastLevel
      level
      serving
    }
  }
`;

const ALL_RECIPES_FILTER = gql`
  query filterSearch($title: String, $filter: RecipeFilters) {
    recipes(title: $title, filter: $filter) {
      _id
      title
      images {
        src
        srcSet
      }
      preparationTime
      totalTime
      roastLevel
      level
      serving
      ingredient
      directions
      author
    }
  }
`;

export const GET_RECIPE_BY_ID = gql`
  query getOneRecipe($id: ID) {
    recipe(_id: $id) {
      _id
      title
      images {
        src
        srcSet
      }
      preparationTime
      totalTime
      roastLevel
      level
      serving
    }
  }
`;

export const ADD_RECIPE = gql`
  mutation createRecipe(
    $title: String
    $description: String
    $preparationTime: Float
    $totalTime: Float
    $serving: Int
    $roastLevel: String
    $level: String
    $ingredient: String
    $equipment: String
    $directions: [DirectionInput]
    $author: ID!
    $images: [ImageInput]
  ) {
    addRecipe(
      title: $title
      description: $description
      preparationTime: $preparationTime
      totalTime: $totalTime
      serving: $serving
      roastLevel: $roastLevel
      level: $level
      ingredient: $ingredient
      equipment: $equipment
      directions: $directions
      author: $author
      images: $images
    ) {
      _id
    }
  }
`;
export const EDIT_RECIPE = gql`
  mutation editRecipe(
    $id: ID
    $title: String
    $description: String
    $preparationTime: Float
    $totalTime: Float
    $serving: Int
    $roastLevel: String
    $level: String
    $ingredient: String
    $equipment: String
    $directions: [DirectionInput]
    $images: [ImageInput]
  ) {
    modifyRecipe(
      _id: $id
      title: $title
      description: $description
      preparationTime: $preparationTime
      totalTime: $totalTime
      serving: $serving
      roastLevel: $roastLevel
      level: $level
      ingredient: $ingredient
      equipment: $equipment
      directions: $directions
      images: $images
    ) {
      _id
    }
  }
`;
