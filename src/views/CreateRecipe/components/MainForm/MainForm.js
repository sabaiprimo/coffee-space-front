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
  NativeSelect,
} from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import { gql, useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../../features/user/UserSlice';

import { upload } from '../../../../helpers/utils';
import validate from 'validate.js';

const schema = {
  title: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  description: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  preparationTime: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  totalTime: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  serving: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  roastLevel: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  level: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  ingredients: {
    presence: { allowEmpty: false, message: 'is required' },
  },

  equipments: {
    presence: { allowEmpty: false, message: 'is required' },
  },

  directions: {
    presence: { allowEmpty: false, message: 'is required' },
  },
};

const CREATE_RECIPE = gql`
  mutation createRecipe(
    $title: String
    $description: String
    $preparationTime: Float
    $totalTime: Float
    $serving: Int
    $roastLevel: String
    $level: String
    $ingredients: [String]
    $equipments: [String]
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
      ingredients: $ingredients
      equipments: $equipments
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

    background: '#f1f1f1',
    color: 'black',
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
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const userProfile = useSelector(userSelector);

  const [createRecipe, resultRecipe] = useMutation(CREATE_RECIPE);

  const [directionsForm, setDirections] = useState([]);
  const [ingredientsForm, setIngredients] = useState([]);
  const [equipmentsForm, setEquipments] = useState([]);
  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  React.useEffect(() => {
    async function checkErrorAndUpdateState() {
      const errors = await validate(formState.values, schema);

      await setFormState((formState) => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {},
      }));
    }

    checkErrorAndUpdateState();
  }, [formState.values]);

  const [filesObj, setFiles] = useState({
    files: [],
  });

  const [directionStep, setDirectionStep] = useState(1);
  const [ingredientStep, setIngredientStep] = useState(1);
  const [equipmentStep, setEquipmentStep] = useState(1);

  const ingredientList = [];
  const equipmentList = [];
  const directionList = [];

  const manageIngredientState = (idx, value) => {
    let tempIngredient = [...ingredientsForm];
    tempIngredient[idx] = value;
    setIngredients(tempIngredient);
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        ingredients: tempIngredient,
      },
      touched: {
        ...formState.touched,
        ingredients: true,
      },
    }));
  };
  const manageEquipmentState = (idx, value) => {
    let tempEquipment = [...equipmentsForm];
    tempEquipment[idx] = value;
    setEquipments(tempEquipment);
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        equipments: tempEquipment,
      },
      touched: {
        ...formState.touched,
        equipments: true,
      },
    }));
  };
  const manageDirectionState = (idx, value) => {
    let tempDirections = [...directionsForm];
    tempDirections[idx] = {
      step: idx + 1,
      content: value,
    };
    setDirections(tempDirections);
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        directions: tempDirections,
      },
      touched: {
        ...formState.touched,
        directions: true,
      },
    }));
  };

  const handleChange = (event) => {
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  for (let i = 0; i < ingredientStep; i++) {
    ingredientList.push(
      <Grid item xs={12} sm={6} key={i}>
        <div className={classes.form}>
          {/* <p className={classes.fontWeight600}>Step {i + 1}.</p> */}
          <TextField
            placeholder={i + 1 + '.'}
            onChange={({ target }) => manageIngredientState(i, target.value)}
            variant='outlined'
            name='bio'
            fullWidth
            multiline
            rows={1}
            required
          />
        </div>
      </Grid>
    );
  }

  for (let j = 0; j < equipmentStep; j++) {
    equipmentList.push(
      <Grid item xs={12} sm={6} key={j}>
        <div className={classes.form}>
          {/* <p className={classes.fontWeight600}>Step {i + 1}.</p> */}
          <TextField
            placeholder={j + 1 + '.'}
            onChange={({ target }) => manageEquipmentState(j, target.value)}
            variant='outlined'
            name='bio'
            fullWidth
            multiline
            rows={1}
            required
          />
        </div>
      </Grid>
    );
  }

  for (let k = 0; k < directionStep; k++) {
    directionList.push(
      <Grid item xs={12} key={k}>
        <div className={classes.form}>
          <p className={classes.fontWeight600}>Step {k + 1}.</p>
          <TextField
            onChange={({ target }) => manageDirectionState(k, target.value)}
            variant='outlined'
            name='bio'
            fullWidth
            multiline
            rows={2}
            required
          />
        </div>
      </Grid>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (filesObj.files.length == 0) {
      alert('Please add some images');
    }
    if (formState.isValid && filesObj.files.length > 0) {
      const files = Array.from(filesObj.files);

      let imageLinks = [];

      Promise.all(
        files.map(async (file, i) => {
          let uploadImage = await upload(i, file);
          imageLinks.push({
            src: uploadImage.data.fileLocation,
            srcSet: uploadImage.data.fileLocation,
          });
        })
      ).then(() => {
        const title = formState.values.title;
        const description = formState.values.description;
        const preparationTime = parseInt(formState.values.preparationTime);
        const totalTime = parseInt(formState.values.totalTime);
        const serving = parseInt(formState.values.serving);
        const roastLevel = formState.values.roastLevel;
        const level = formState.values.level;
        const ingredients = formState.values.ingredients;
        const equipments = formState.values.equipments;
        const directions = formState.values.directions;
        const author = userProfile._id;
        let issueDate = new Date().toISOString();

        createRecipe({
          variables: {
            title,
            description,
            preparationTime,
            totalTime,
            serving,
            roastLevel,
            level,
            ingredients,
            equipments,
            directions,
            author,
            issueDate,
            images: imageLinks,
          },
        })
          .then(() => {
            alert('Create new recipe complete');
            setFormState({
              isValid: false,
              values: {},
              touched: {},
              errors: {},
            });

            window.location.reload();
          })
          .catch((error) => {
            alert(error);
            window.location.reload();
          });
      });
    }

    setFormState((formState) => ({
      ...formState,
      touched: {
        ...formState.touched,
        ...formState.errors,
      },
    }));
  };

  return (
    <div className={className} {...rest}>
      <form name='create-recipe-form' method='post' onSubmit={handleSubmit}>
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
                  onChange={handleChange}
                  placeholder='recipe name'
                  variant='outlined'
                  size='medium'
                  name='title'
                  fullWidth
                  type='text'
                  required
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
              Description
            </Typography>
            <div className={classes.bgBlue}>
              <div className={classes.form}>
                <TextField
                  onChange={handleChange}
                  placeholder='description'
                  variant='outlined'
                  size='medium'
                  name='description'
                  fullWidth
                  multiline
                  type='text'
                  rows={4}
                  required
                />
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={6} data-aos='fade-up'>
            <Typography
              variant='subtitle1'
              color='textPrimary'
              className={classes.inputTitle}
            >
              Preparation Time
            </Typography>
            <div className={classes.bgBlue}>
              <div className={classes.form}>
                <TextField
                  placeholder='Preparation Time(mins)'
                  variant='outlined'
                  size='medium'
                  name='preparationTime'
                  fullWidth
                  type='number'
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} data-aos='fade-up'>
            <Typography
              variant='subtitle1'
              color='textPrimary'
              className={classes.inputTitle}
            >
              Total Time
            </Typography>
            <div className={classes.bgBlue}>
              <div className={classes.form}>
                <TextField
                  placeholder='Total Time(mins)'
                  variant='outlined'
                  size='medium'
                  name='totalTime'
                  fullWidth
                  type='number'
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} data-aos='fade-up'>
            <Typography
              variant='subtitle1'
              color='textPrimary'
              className={classes.inputTitle}
            >
              Serving
            </Typography>
            <div className={classes.bgBlue}>
              <div className={classes.form}>
                <TextField
                  placeholder='No. of Serving'
                  variant='outlined'
                  size='medium'
                  name='serving'
                  fullWidth
                  type='number'
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} data-aos='fade-up'>
            <Typography
              variant='subtitle1'
              color='textPrimary'
              className={classes.inputTitle}
            >
              Level
            </Typography>
            <div className={classes.bgBlue}>
              <div className={classes.form}>
                <NativeSelect
                  id='select'
                  variant='outlined'
                  size='medium'
                  name='level'
                  fullWidth
                  onChange={handleChange}
                  defaultValue=''
                >
                  <option value='' disabled>
                    Select Level
                  </option>
                  <option value='Beginner'>Beginner</option>
                  <option value='Advance'>Advance</option>
                  <option value='Expert'>Expert</option>
                </NativeSelect>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} data-aos='fade-up'>
            <Typography
              variant='subtitle1'
              color='textPrimary'
              className={classes.inputTitle}
            >
              Roast level
            </Typography>
            <div className={classes.bgBlue}>
              <div className={classes.form}>
                <NativeSelect
                  id='select'
                  variant='outlined'
                  size='medium'
                  name='roastLevel'
                  fullWidth
                  defaultValue=''
                  onChange={handleChange}
                >
                  <option value='' disabled>
                    Select Roast level
                  </option>
                  <option value='Light roast'>Light roast</option>
                  <option value='Medium roast'>Medium roast</option>
                  <option value='Dark roast'>Dark roast</option>
                </NativeSelect>
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
              <Grid container spacing={isMd ? 1 : 1}>
                {ingredientList}
              </Grid>

              <Button
                variant='outlined'
                className={classes.addStepButton}
                onClick={() => setIngredientStep(ingredientStep + 1)}
              >
                Add more ingredient
              </Button>
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
              <Grid container spacing={isMd ? 1 : 1}>
                {equipmentList}
              </Grid>

              <Button
                variant='outlined'
                className={classes.addStepButton}
                onClick={() => setEquipmentStep(equipmentStep + 1)}
              >
                Add more equipment
              </Button>
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
                {directionList}
              </Grid>

              <Button
                variant='outlined'
                className={classes.addStepButton}
                onClick={() => setDirectionStep(directionStep + 1)}
                // onChange={({ target }) => setDirection(target.value)}
              >
                Add more step
              </Button>
            </div>
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
              Attach images
            </Typography>
            <div className={classes.bgBlue}>
              <div className={classes.form}>
                <DropzoneArea
                  onChange={(files) => setFiles({ files })}
                  required
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
      </form>
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
