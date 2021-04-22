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
  Account as AccountView,
  BrowseRecipe as BrowseRecipeViewView,
  SingleRecipe as SingleRecipeView,
  BrowseArticles as BrowseArticlesView,
  SingleArticle as SingleArticleView,
  CreateRecipe as CreateRecipeView,
  NotFoundCover as NotFoundCoverView,
  SigninSimple as SigninSimpleView,
  SignupCover as SignupCoverView,
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
        path='/single-recipe'
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={SingleRecipeView}
            layout={MainLayout}
          />
        )}
      />
      <Route
        exact
        path='/create-recipe'
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={CreateRecipeView}
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
      <Route
        exact
        path='/account'
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={AccountView}
            layout={MainLayout}
          />
        )}
      />
      <Route
        exact
        path='/signin'
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={SigninSimpleView}
            layout={MinimalLayout}
          />
        )}
      />
      <Route
        exact
        path='/signup'
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={SignupCoverView}
            layout={MinimalLayout}
          />
        )}
      />
      <Route
        exact
        path='/not-found-cover'
        render={(matchProps) => (
          <WithLayout
            {...matchProps}
            component={NotFoundCoverView}
            layout={MinimalLayout}
          />
        )}
      />

      <Redirect to='/not-found-cover' />
    </Switch>
  );
};

export default Routes;
