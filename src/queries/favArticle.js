import { gql } from '@apollo/client';

export const FAV_ARTICLE = gql`
  mutation addtoFavArticle($userID: ID, $articles: [ID]) {
    addFavArticle(userID: $userID, articles: $articles) {
      _id
    }
  }
`;

export const EDIT_FAV_ARTICLE = gql`
  mutation editFavArticle($id: ID, $articles: [ID]) {
    modifyFavArticle(_id: $id, articles: $articles) {
      _id
    }
  }
`;
