import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
} from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import { gql, useQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import {
  incrementStep,
  setTitle,
  setDescription,
  setPreparationTime,
  setTotalTime,
  setServing,
  setRoastlevel,
  setLevel,
  setIngredient,
  setEquipment,
  setDirection,
} from '../../../../features/recipe/recipeReducer';

const CREATE_RECIPE = gql`
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
      title
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  fontWeight600: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
  addStepButton: {
    width: '100%',
    marginTop: '1rem',
    height: '2rem',
    // display: 'inline-block',
    // padding: '10px 30px',
    background: '#f1f1f1',
    color: 'black',
    // textDecoration: 'none',
    // textTransform: 'uppercase',
    // // text-decoration: none;
    // // text-transform: uppercase;
    // border: '1px solid #000',
  },
  bgBlue: {
    padding: '1.5rem 1.5rem',
    borderRadius: '0.5rem',
    background: '#f7f5ee',
  },
  form: {
    // width: '100%',
    '& .MuiTextField-root': {
      background: theme.palette.background.paper,
    },
    '& .MuiOutlinedInput-input': {
      background: theme.palette.background.paper,
    },
  },
}));

const MainForm = (props) => {
  const { className, ...rest } = props;
  const classes = useStyles();

  // const count = useSelector(selectStep);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const [count, setCount] = useState(1);
  const steps = [];
  const [fileObjects, setFileObjects] = React.useState([]);
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [preparationTime, setPreparationTime] = useState('');
  // const [totalTime, setTotalTime] = useState('');
  // const [serving, setServing] = useState('');
  // const [roastLevel, setRoastlevel] = useState('');
  // const [level, setLevel] = useState('');
  // const [ingredient, setIngredient] = useState('');
  // const [equipment, setEquipment] = useState('');
  // const [directions, setDirection] = useState('');
  // const [images, setImages] = useState('');

  // title: $title
  // description: $description;
  // preparationTime: $preparationTime;
  // totalTime: $totalTime;
  // serving: $serving;
  // roastLevel: $roastLevel;
  // level: $level;
  // ingredient: $ingredient;
  // equipment: $equipment;
  // directions: $directions;
  // author: $author;
  // images: $images;
  // const [createRecipe] = useMutation(CREATE_RECIPE);
  // const submit = (event) => {
  //   event.preventDefault();

  //   createRecipes({ variables: { name, phone, street, city } });

  //   setName('');
  //   setPhone('');
  //   setStreet('');
  //   setCity('');
  // };

  for (let i = 1; i <= count; i++) {
    steps.push(
      <Grid item xs={12}>
        <div className={classes.form}>
          <p className={classes.fontWeight600}>Step {i}.</p>
          <TextField
            variant='outlined'
            name='bio'
            fullWidth
            multiline
            rows={2}
          />
        </div>
      </Grid>
    );
  }
  return (
    <div className={className} {...rest}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12}>
          <Typography variant='h6' color='textPrimary'>
            Recipe Information
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant='subtitle1'
            color='textPrimary'
            className={classes.inputTitle}
          >
            Recipe name
          </Typography>
          <div className={classes.bgBlue}>
            <div className={classes.form}>
              <TextField
                onChange={({ target }) => dispatch(setTitle(target.value))}
                placeholder='recipe name'
                variant='outlined'
                size='medium'
                name='fullname'
                fullWidth
                type='text'
              />
            </div>
          </div>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant='subtitle1'
            color='textPrimary'
            className={classes.inputTitle}
          >
            Ingredients
          </Typography>
          <div className={classes.bgBlue}>
            <div className={classes.form}>
              <TextField
                onChange={({ target }) => dispatch(setIngredient(target.value))}
                placeholder='ingredients'
                variant='outlined'
                name='bio'
                fullWidth
                multiline
                rows={4}
              />
            </div>
          </div>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant='subtitle1'
            color='textPrimary'
            className={classes.inputTitle}
          >
            Equipments
          </Typography>
          <div className={classes.bgBlue}>
            <div className={classes.form}>
              <TextField
                onChange={({ target }) => dispatch(setEquipment(target.value))}
                placeholder='equipments'
                variant='outlined'
                name='bio'
                fullWidth
                multiline
                rows={4}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant='subtitle1'
            color='textPrimary'
            className={classes.inputTitle}
          >
            Directions
          </Typography>
          <div className={classes.bgBlue}>
            <Grid container spacing={isMd ? 1 : 1}>
              {steps}
            </Grid>

            <Button
              variant='outlined'
              className={classes.addStepButton}
              onClick={() => setCount(count + 1)}
              // onChange={({ target }) => setDirection(target.value)}
            >
              Add more step
            </Button>
          </div>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        {/* <Grid item xs={12} sm={6}>
          <Typography
            variant='subtitle1'
            color='textPrimary'
            className={classes.inputTitle}
          >
            City
          </Typography>
          <TextField
            placeholder='City'
            variant='outlined'
            size='medium'
            name='city'
            fullWidth
            type='text'
          />
        </Grid> */}

        <Grid item xs={12}>
          <Typography
            variant='subtitle1'
            color='textPrimary'
            className={classes.inputTitle}
          >
            Attach images
          </Typography>
          <div className={classes.bgBlue}>
            <div className={classes.form}>
              <DropzoneArea
                onChange={(files) => console.log('Files:', files)}
              />
            </div>
          </div>
        </Grid>
        <Grid item container justify='flex-start' xs={12}>
          <Button
            variant='contained'
            type='submit'
            color='primary'
            size='large'
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

MainForm.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default MainForm;