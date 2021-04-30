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
import { gql, useQuery, useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../../../../features/user/UserSlice';

import { upload } from '../../../../helpers/utils';
import validate from 'validate.js';
import { DirectionsWalkRounded, ImageSearch } from '@material-ui/icons';

const schema = {
  title: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  subtitle: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  headline: {
    presence: { allowEmpty: false, message: 'is required' },
  },

  // images: { allowEmpty: false, message: 'is required' },
};

const CREATE_ARTICLE = gql`
  mutation createArticle(
    $title: String
    $subtitle: String
    $headline: String
    $author: ID!
    $cover: coverImageInput
    $content: [contentItemInput]
    $tags: [String]
    $issueDate: DateTime
  ) {
    addArticle(
      title: $title
      subtitle: $subtitle
      headline: $headline
      author: $author
      cover: $cover
      content: $content
      tags: $tags
      issueDate: $issueDate
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

  const [createArticle, resultArticle] = useMutation(CREATE_ARTICLE);

  const [contentForm, setContentForm] = useState([]);
  const [isNeedCont, setIsNeedCont] = useState(true);
  const [tagForm, setTagForm] = useState([]);
  const [tagNo, setTagNo] = useState(1);

  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  // React.useEffect(() => {
  //   let isMounted = true; // note this flag denote mount status
  //   return () => {
  //     isMounted = false;
  //   }; // use effect cleanup to set flag false, if unmounted
  // });

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

  const manageTagState = (idx, value) => {
    let tempTag = [...tagForm];
    tempTag[idx] = value;
    setTagForm(tempTag);
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        tags: tempTag,
      },
      touched: {
        ...formState.touched,
        tags: true,
      },
    }));
  };

  const [filesObj, setFile] = useState({ file: [] });

  const [contentRender, setContentRender] = useState({
    lastStep: 1,
    contentToRender: [{ content: true }],
  });

  const contentList = [];
  const tagList = [];

  const manageContentstate = (idx, value) => {
    let tempContents = [...contentForm];
    let tempChange = tempContents[idx];
    tempChange = {
      ...tempChange,
      textNumber: idx + 1,
      text: value,
    };
    tempContents[idx] = tempChange;
    setContentForm(tempContents);
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        content: tempContents,
      },
      touched: {
        ...formState.touched,
        content: true,
      },
    }));
  };

  const manageContentFileState = (idx, files) => {
    let tempContents = [...contentForm];
    let tempChange = tempContents[idx];

    tempChange = {
      ...tempChange,
      images: files,
    };

    tempContents[idx] = tempChange;
    setContentForm(tempContents);
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        content: tempContents,
      },
      touched: {
        ...formState.touched,
        content: true,
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

  const handleClickContent = () => {
    let tempContent = { ...contentRender };
    tempContent.contentToRender.push({ content: true });
    tempContent = { ...tempContent, lastStep: tempContent.lastStep + 1 };
    setIsNeedCont(true);
    setContentRender(tempContent);
  };

  const handleClickImage = () => {
    let tempContent = { ...contentRender };
    tempContent.contentToRender[contentRender.lastStep - 1] = {
      ...tempContent.contentToRender[contentRender.lastStep - 1],
      image: true,
    };
    setIsNeedCont(false);
    setContentRender(tempContent);
  };

  for (let i = 0; i < tagNo; i++) {
    tagList.push(
      <Grid item xs={12} sm={3} key={i}>
        <div className={classes.form}>
          {/* <p className={classes.fontWeight600}>Step {i + 1}.</p> */}
          <TextField
            placeholder={i + 1 + '.'}
            onChange={({ target }) => manageTagState(i, target.value)}
            variant='outlined'
            name='tag'
            fullWidth
            multiline
            rows={1}
            required
          />
        </div>
      </Grid>
    );
  }
  for (let k = 0; k < contentRender.lastStep; k++) {
    contentList.push(
      <Grid item xs={12} key={k}>
        {contentRender.contentToRender[k].content ? (
          <div className={classes.form}>
            <p className={classes.fontWeight600}>Content {k + 1}</p>
            <TextField
              onChange={({ target }) => manageContentstate(k, target.value)}
              variant='outlined'
              name='direction'
              fullWidth
              multiline
              rows={8}
              required
            />
            <br></br>
            <br></br>
          </div>
        ) : (
          ''
        )}
        {contentRender.contentToRender[k].image ? (
          <div className={classes.form}>
            <Typography
              variant='subtitle1'
              color='textPrimary'
              className={classes.inputTitle}
            >
              Attach Images for content {k + 1}
            </Typography>
            <div className={classes.bgBlue}>
              <div className={classes.form}>
                <DropzoneArea
                  onChange={(files) => manageContentFileState(k, { files })}
                  required
                />
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </Grid>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (filesObj.file.length == 0) {
      alert('Please add some images');
    }
    if (formState.isValid && filesObj.file.length > 0) {
      const file = Array.from(filesObj.file);
      // console.log(files);
      let coverImageLink = '';
      // const uploadPromises =
      let uploadImage = await upload(0, file[0]);
      coverImageLink = {
        src: uploadImage.data.fileLocation,
      };
      console.log(coverImageLink);
      // uplaod image -> content
      let contents = [];
      Promise.all(
        contentForm.map(async (content, i) => {
          let tempContent = { ...content };
          let tempImageLink = [];
          if (tempContent.images) {
            if (tempContent.images.files.length > 0) {
              Promise.all(
                tempContent.images.files.map(async (file, i) => {
                  let uploadImage = await upload(i, file);
                  tempImageLink.push({
                    src: uploadImage.data.fileLocation,
                  });
                })
              );
            }
          }
          tempContent = { ...tempContent, images: tempImageLink };
          contents.push(tempContent);
        })
      )
        .then(() => {
          console.log(contents);

          const title = formState.values.title;
          const subtitle = formState.values.subtitle;
          const headline = formState.values.headline;
          const coverImage = coverImageLink;
          const tags = formState.values.tags;
          const author = userProfile._id;
          let issueDate = new Date().toISOString();

          createArticle({
            variables: {
              title,
              subtitle,
              headline,
              cover: coverImage,
              tags,
              author,
              issueDate,
              content: contents,
            },
          })
            .then(() => {
              alert('Create new article complete');
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
              // window.location.reload();
            });
        })
        .catch((err) => console.log(err));
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
              Article Information
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
              Article title
            </Typography>
            <div className={classes.bgBlue}>
              <div className={classes.form}>
                <TextField
                  onChange={handleChange}
                  placeholder='article title'
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
              Subtitle
            </Typography>
            <div className={classes.bgBlue}>
              <div className={classes.form}>
                <TextField
                  onChange={handleChange}
                  placeholder='subtitle'
                  variant='outlined'
                  size='medium'
                  name='subtitle'
                  fullWidth
                  multiline
                  type='text'
                  rows={2}
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
              Headline
            </Typography>
            <div className={classes.bgBlue}>
              <div className={classes.form}>
                <TextField
                  onChange={handleChange}
                  placeholder='headline'
                  variant='outlined'
                  size='medium'
                  name='headline'
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
              Cover image
            </Typography>
            <div className={classes.bgBlue}>
              <div className={classes.form}>
                <DropzoneArea
                  filesLimit={1}
                  onChange={(file) => setFile({ file })}
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
              Contents
            </Typography>
            <div className={classes.bgBlue}>
              <Grid container spacing={isMd ? 1 : 1}>
                {contentList}
              </Grid>

              <Grid container spacing={3}>
                {isNeedCont ? (
                  <Grid item xs={12}>
                    <Button
                      // variant='outlined'
                      className={classes.addStepButton}
                      onClick={handleClickImage}
                      // onChange={({ target }) => setDirection(target.value)}
                    >
                      Add Images
                    </Button>
                  </Grid>
                ) : (
                  ''
                )}

                <Grid item xs={12}>
                  <Button
                    // variant='outlined'
                    className={classes.addStepButton}
                    onClick={handleClickContent}
                    // onChange={({ target }) => setDirection(target.value)}
                  >
                    Add Content
                  </Button>
                </Grid>
              </Grid>
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
              Tags
            </Typography>
            <div className={classes.bgBlue}>
              <Grid container spacing={isMd ? 1 : 1}>
                {tagList}
              </Grid>

              <Button
                // variant='outlined'
                className={classes.addStepButton}
                onClick={() => setTagNo(tagNo + 1)}
                // onChange={({ target }) => setDirection(target.value)}
              >
                Add TAG
              </Button>
            </div>
          </Grid>

          <Grid item container justify='flex-start' xs={12}>
            <Button
              variant='contained'
              type='submit'
              color='primary'
              size='large'
              // onClick={uploadFiles}
            >
              Publish
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
