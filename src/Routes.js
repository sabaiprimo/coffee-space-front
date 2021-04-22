/**
 * Caution: Consider this file when using react-scripts
 *
 * You may delete this file and its occurrences from the project filesystem if you are using GatsbyJS or NextJS version
 */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import WithLayout from 'WithLayout';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  IndexView,
  BrowseRecipe as BrowseRecipeViewView,
  BrowseArticles as BrowseArticlesView,
  SingleArticle as SingleArticleView,
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Route
        exact
        path='/'
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={IndexView}
            layout={MainLayout}
          />
        )}
      />
      <Route
        exact
        path='/browse-recipe'
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={BrowseRecipeViewView}
            layout={MainLayout}
          />
        )}
      />
      <Route
        exact
        path='/blog-articles'
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={BrowseArticlesView}
            layout={MainLayout}
          />
        )}
      />
      <Route
        exact
        path='/single-article'
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={SingleArticleView}
            layout={MainLayout}
          />
        )}
      />
    </Switch>
  );
};

export default Routes;
