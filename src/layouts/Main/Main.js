import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Divider } from '@material-ui/core';
import { Topbar, Footer, Sidebar } from './components';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
}));

const Main = ({ children, themeToggler, themeMode }) => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const pages = {
    recipes: {
      title: 'Recipes',
      id: 'recipe-pages',
      expand: true,
      pages: [
        {
          title: 'Browse Recipe',
          href: '/browse-recipe',
        },
        {
          title: 'Create Recipe',
          href: '/create-recipe',
        },
      ],
    },
    articles: {
      title: 'Articles',
      id: 'article-pages',
      href: '/blog-articles',
    },
    account: {
      expand: true,
      title: 'Account',
      id: 'account',
      pages: [
        {
          title: 'General',
          href: '/account/?pid=general',
        },
        {
          title: 'Security',
          href: '/account/?pid=security',
        },
        {
          title: 'Notifications',
          href: '/account/?pid=notifications',
        },
        // {
        //   title: 'Billing',
        //   href: '/account/?pid=billing',
        // },
      ],
      // children: {
      //   settings: {
      //     groupTitle: 'Settings',

      //   },
      //   signup: {
      //     groupTitle: 'Sign up',
      //     pages: [
      //       {
      //         title: 'Simple',
      //         href: '/signup-simple',
      //       },
      //       {
      //         title: 'Cover',
      //         href: '/signup-cover',
      //       },
      //     ],
      //   },
      //   signin: {
      //     groupTitle: 'Sign in',
      //     pages: [
      //       {
      //         title: 'Simple',
      //         href: '/signin-simple',
      //       },
      //       {
      //         title: 'Cover',
      //         href: '/signin-cover',
      //       },
      //     ],
      //   },
      //   password: {
      //     groupTitle: 'Password reset',
      //     pages: [
      //       {
      //         title: 'Simple',
      //         href: '/password-reset-simple',
      //       },
      //       {
      //         title: 'Cover',
      //         href: '/password-reset-cover',
      //       },
      //     ],
      //   },
      //   error: {
      //     groupTitle: 'Error',
      //     pages: [
      //       {
      //         title: 'Simple',
      //         href: '/not-found',
      //       },
      //       {
      //         title: 'Cover',
      //         href: '/not-found-cover',
      //       },
      //     ],
      //   },
      // },
    },
  };

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const open = isMd ? false : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
      })}
    >
      <Topbar
        onSidebarOpen={handleSidebarOpen}
        pages={pages}
        themeMode={themeMode}
        themeToggler={themeToggler}
      />
      {/* <Sidebar
        onClose={handleSidebarClose}
        open={open}
        variant='temporary'
        pages={pages}
      /> */}
      <main>
        <Divider />
        {children}
      </main>
      <Footer pages={pages} />
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node,
  themeToggler: PropTypes.func.isRequired,
  themeMode: PropTypes.string.isRequired,
};

export default Main;
