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
  GridListTile,
  GridList,
  GridListTileBar,
  IconButton,
} from '@material-ui/core';

import { DropzoneArea } from 'material-ui-dropzone';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector } from '../../../../features/user/UserSlice';
import DeleteIcon from '@material-ui/icons/Delete';
import { upload } from '../../../../helpers/utils';
import validate from 'validate.js';
import { ImageSearch } from '@material-ui/icons';

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

const UPDATE_ARTICLE = gql`
  mutation updateArticle(
    $_id: ID!
    $title: String
    $subtitle: String
    $headline: String
    $cover: coverImageInput
    $content: [contentItemInput]
    $issueDate: DateTime
    $tags: [String]
  ) {
    modifyArticle(
      _id: $_id
      title: $title
      subtitle: $subtitle
      headline: $headline
      cover: $cover
      content: $content
      issueDate: $issueDate
      tags: $tags
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
  gridList: {
    height: 200,
    objectFit: 'cover',
    border: `4px solid ${theme.palette.alternate.dark}`,
    boxShadow: '0 5px 10px 0 rgba(0, 0, 0, 0.1)',
  },
  gridListTile: {
    objectFit: 'cover',
    borderRadius: '1rem',
  },
}));

const MainForm = (props) => {
  const { data, className, ...rest } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const userProfile = useSelector(userSelector);
  let initContentForm = [...data.content];
  for (let n = 0; n < initContentForm.length; n++) {
    initContentForm[n] = {
      ...initContentForm[n],
      images: [],
    };
  }
  const [updateArticle, resultArticle] = useMutation(UPDATE_ARTICLE);
  const [covImgShow, setCovImgShow] = useState(data.cover.src);
  const [contentForm, setContentForm] = useState(initContentForm);
  const initIsNeedCont =
    data.content[data.content.length - 1].images.length > 0 ? false : true;

  const [isNeedCont, setIsNeedCont] = useState(initIsNeedCont);
  const [tagForm, setTagForm] = useState(data.tags);
  const [tagNo, setTagNo] = useState(data.tags.length);

  const [formState, setFormState] = React.useState({
    isValid: false,
    values: {
      title: data.title,
      subtitle: data.subtitle,
      headline: data.headline,
      content: initContentForm,
      tags: data.tags,
    },
    touched: {},
    errors: {},
  });

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const handleSetCover = (file) => {
    if (file.length > 0) {
      setFile(file);
      setCovImgShow();
    }
  };

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

  const initContToRender = [];
  const initImageShow = [];
  for (const contentItem of data.content) {
    if (contentItem.images.length > 0) {
      initContToRender.push({
        content: true,
        image: true,
      });
      initImageShow.push(contentItem.images);
    } else {
      initContToRender.push({
        content: true,
      });
      initImageShow.push([]);
    }
  }

  const handleDeleteShowImage = (e, idx, key) => {
    let tempImageContentShow = [...imageContentShow];

    if (tempImageContentShow[idx].length === 1) {
      tempImageContentShow[idx] = [];
    } else {
      let tempChangeArray = Array.from(tempImageContentShow[idx]);
      tempChangeArray.splice(key, 1);
      tempImageContentShow[idx] = tempChangeArray;
    }
    setImageContentShow(tempImageContentShow);
  };

  const [imageContentShow, setImageContentShow] = useState(initImageShow);

  let imageContentShowList = [];

  imageContentShow.forEach((imageContent, idx) => {
    imageContentShowList.push(
      <div className={classes.form}>
        {imageContent.length > 0 ? (
          <GridList className={classes.gridList} cols={3} key={idx}>
            {imageContent.map((image, key) => {
              return (
                <GridListTile className={classes.gridListTile} key={key}>
                  <img src={image} />
                  <GridListTileBar
                    titlePosition='bottom'
                    actionIcon={
                      <IconButton
                        onClick={(e) => handleDeleteShowImage(e, idx, key)}
                        edge='end'
                        aria-label='delete'
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                    actionPosition='right'
                    className={classes.titleBar}
                  />
                </GridListTile>
              );
            })}
          </GridList>
        ) : (
          ''
        )}
      </div>
    );
  });
  // imageContentShow;

  const [contentRender, setContentRender] = useState({
    lastStep: data.content.length,
    contentToRender: initContToRender,
  });

  const contentList = [];
  const tagList = [];

  const manageContentstate = (idx, value) => {
    let tempContents = [...contentForm];
    let tempChange = tempContents[idx];
    tempChange = {
      ...tempChange,
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
    if (files.length > 0) {
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
    }
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
  // Cannot complete due to behavior of dropzone area
  // let tempRender = { ...contentRender };
  // let tempToRender = [...tempRender.contentToRender];
  // let tempFormState = { ...formState };
  // let tempContentForm = [...tempFormState.values.content];
  // let tempImageList = [...imageContentShow];
  // const handleDeleteContent = (key) => {
  //   // console.log('before: ', tempRender);
  //   tempToRender.splice(key, 1);
  //   tempRender.lastStep = tempRender.lastStep - 1;
  //   tempRender.contentToRender = tempToRender;
  //   // console.log('After: ', tempRender);

  //   // console.log('tempContentForm: ', tempContentForm);
  //   tempContentForm.splice(key, 1);
  //   // console.log('tempContentFormAfter: ', tempContentForm);
  //   tempFormState.values.content = tempContentForm;

  //   tempImageList.splice(key, 1);
  //   // formState.values.content[k];
  //   // console.log('After showlist: ', tempImageList);
  //   setContentRender(tempRender);
  //   setFormState(tempFormState);
  //   setContentForm(tempContentForm);
  //   setImageContentShow(tempImageList);
  // };
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
            value={formState.values.tags[i] ? formState.values.tags[i] : ''}
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
            <Grid
              justify='space-between' // Add it here :)
              container
            >
              <Grid item>
                <p className={classes.fontWeight600}>Content {k + 1}</p>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={(e) => handleDeleteContent(k)}
                  edge='end'
                  aria-label='delete'
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>

            <TextField
              onChange={({ target }) => manageContentstate(k, target.value)}
              variant='outlined'
              name='direction'
              fullWidth
              multiline
              rows={8}
              required
              value={
                formState.values.content[k]
                  ? formState.values.content[k].text
                  : ''
              }
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
            {imageContentShowList[k]}{' '}
            <div className={classes.bgBlue}>
              <div className={classes.form}>
                <DropzoneArea
                  onChange={(files) => manageContentFileState(k, files)}
                  require={
                    imageContentShow[k]
                      ? imageContentShow[k].length > 0
                        ? false
                        : true
                      : true
                  }
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
    if (filesObj.file.length == 0 && !covImgShow) {
      alert('Please add some images');
    }
    if (formState.isValid && (filesObj.file.length > 0 || covImgShow)) {
      const file = Array.from(filesObj.file);

      let coverImageLink = '';
      if (filesObj.file.length > 0) {
        let uploadImage = await upload(0, file[0]);
        coverImageLink = {
          src: uploadImage.data.fileLocation,
        };
      } else {
        coverImageLink = {
          src: covImgShow,
        };
      }

      // uplaod image -> content
      let contents = [];
      let idxContent = 0;
      for (const content of contentForm) {
        let tempContent = { ...content };
        let tempImageLink = imageContentShow[idxContent]
          ? Array.from(imageContentShow[idxContent])
          : [];
        if (tempContent.images) {
          if (tempContent.images.length > 0) {
            for (const file of tempContent.images) {
              let uploadImage = await upload(0, file);
              await tempImageLink.push(uploadImage.data.fileLocation);
            }
          }
        }
        tempContent = { ...tempContent, images: tempImageLink };
        await contents.push(tempContent);
        idxContent++;
      }

      const title = formState.values.title;
      const subtitle = formState.values.subtitle;
      const headline = formState.values.headline;
      const coverImage = coverImageLink;
      const tags = formState.values.tags;

      let issueDate = new Date().toISOString();
      const sentContent = contents;

      updateArticle({
        variables: {
          _id: data._id,
          title,
          subtitle,
          headline,
          cover: coverImage,
          tags,
          content: sentContent,
          issueDate,
        },
      })
        .then(() => {
          alert('Update article complete');

          window.location.reload();
        })
        .catch((error) => {
          alert(error);
          // window.location.reload();
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
      <form name='edit-article-form' method='post' onSubmit={handleSubmit}>
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
                  value={formState.values.title ? formState.values.title : ''}
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
                  value={
                    formState.values.subtitle ? formState.values.subtitle : ''
                  }
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
                  value={
                    formState.values.headline ? formState.values.headline : ''
                  }
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
                {covImgShow ? (
                  <GridList className={classes.gridList} cols={3}>
                    <GridListTile className={classes.gridListTile}>
                      <img src={covImgShow} />
                      <GridListTileBar
                        titlePosition='bottom'
                        actionIcon={
                          <IconButton
                            onClick={() => setCovImgShow()}
                            edge='end'
                            aria-label='delete'
                          >
                            <DeleteIcon />
                          </IconButton>
                        }
                        actionPosition='right'
                        className={classes.titleBar}
                      />
                    </GridListTile>
                  </GridList>
                ) : (
                  ''
                )}

                <DropzoneArea
                  filesLimit={1}
                  onChange={(file) => handleSetCover(file)}
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
                      className={classes.addStepButton}
                      onClick={handleClickImage}
                    >
                      Add Images
                    </Button>
                  </Grid>
                ) : (
                  ''
                )}

                <Grid item xs={12}>
                  <Button
                    className={classes.addStepButton}
                    onClick={handleClickContent}
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
                className={classes.addStepButton}
                onClick={() => setTagNo(tagNo + 1)}
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
            >
              Complete and Publish
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
