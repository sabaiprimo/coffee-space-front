import React from 'react';
import { makeStyles, Divider } from '@material-ui/core';
import { Section, SectionAlternate } from 'components/organisms';
import { Features, Hero, BrowseRecipe } from './components';
import { gql, useQuery } from '@apollo/client';

const useStyles = makeStyles(() => ({
  sectionAlternateNoPaddingTop: {
    '& .section-alternate__content': {
      paddingBottom: 0,
    },
  },
  dividerSection: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));
const GET_FEATURED_ARTICLE = gql`
  query getFeaturedArticle($limit: Int) {
    featureArticle(limit: $limit) {
      _id
      title
      subtitle
      headline
      author {
        _id
        displayName
      }
      cover {
        src
      }
      content {
        text
        images
      }
      issueDate
      tags
    }
  }
`;
const IndexView = ({ themeMode }) => {
  const classes = useStyles();
  const queryFeatureArticle = useQuery(GET_FEATURED_ARTICLE, {
    variables: { limit: 6 },
  });

  if (queryFeatureArticle.loading) {
    return <p>Loading..</p>;
  }
  return (
    <div>
      <Hero themeMode={themeMode} />
      <BrowseRecipe />

      <SectionAlternate>
        <Features data={queryFeatureArticle.data.featureArticle} />
      </SectionAlternate>
      <Section></Section>
      <Section className={classes.dividerSection}>
        <Divider />
      </Section>
    </div>
  );
};

export default IndexView;
