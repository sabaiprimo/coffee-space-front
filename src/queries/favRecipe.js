import { gql } from '@apollo/client';

export const FAV_RECIPE = gql`
  mutation addtoFavRecipe($userID: ID, $recipes: [ID]) {
    addFavRecipe(userID: $userID, recipes: $recipes) {
      _id
    }
  }
`;

export const EDIT_FAV_RECIPE = gql`
  mutation editFavRecipe($id: ID, $recipes: [ID]) {
    modifyFavRecipe(_id: $id, recipes: $recipes) {
      _id
    }
  }
`;
