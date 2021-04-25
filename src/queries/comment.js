import { gql } from 'apollo-server-express';

export const REPLY_COMMENT = gql`
  mutation reply($userID: ID, $recipeID: ID, $description: String) {
    addComment(email: $email) {
      _id
    }
  }
`;

export const EDIT_COMMENT = gql`
    mutation edit($commentID: ID, $$description: String){
        editComment(_id: $commentID, description: $description ){
            _id
            description
        }
    }

`;
