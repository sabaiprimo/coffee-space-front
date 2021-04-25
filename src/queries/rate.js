import { gql } from 'apollo-server-express';

export const RATE_RECIPE = gql`
  mutation rate($userID: ID, $recipeID: ID, $rating: Int) {
    addRating(userID: $userID, recipe: $recipe, rating: $rating) {
      _id
    }
  }
`;

export const EDIT_RATE_RECIPE = gql`
  mutation edit_rate($ratingID: ID, $rating: Int) {
    modifyRating(_id: $ratingID, rating: $rating) {
      _id
    }
  }
`;
