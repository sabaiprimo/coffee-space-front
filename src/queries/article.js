import { gql } from '@apollo/client';

const ALL_ARTICLES = gql`
  query {
    recipes {
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

const ALL_ARTICLE_FILTER = gql`
  query {
    recipes {
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

const ALL_ARTICLE_BY_DATE = gql`
  query {
    recipes {
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
