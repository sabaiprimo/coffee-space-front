import axios from 'axios';

export const setUpToken = (token) => {
  console.log('setUpToken');
  localStorage.setItem('jwtToken', token);
};

export const clearToken = () => {
  console.log('clearToken');
  localStorage.clear();
};

export const getToken = () => {
  console.log('getToken');
  return localStorage.getItem('jwtToken');
};

export const uploadService = async (file) => {
  let formData = new FormData();
  // console.log(file);
  formData.append('image', file, file.name);
  // console.log(formData.image);
  return await axios({
    method: 'post',
    url: 'https://localhost:8000/api/upload',
    data: formData,
    // headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const upload = (idx, file) => {
  // console.log(file);
  const data = uploadService(file);
  return data;
};

export const uploadFiles = (filesObj) => {
  const files = Array.from(filesObj);
  // console.log(files);
  let imageLinks = [];
  // const uploadPromises =

  Promise.all(
    files.map(async (file, i) => {
      let uploadImage = await upload(i, file);
      imageLinks.push({
        src: uploadImage.data.fileLocation,
        srcSet: uploadImage.data.fileLocation,
      });
    })
  ).then(console.log('upload finish', imageLinks));

  return imageLinks;
  // setMessage([]);
};

export const compareDateFromNow = (dateToCompare) => {
  const nowDate = new Date();
  const compareDate = new Date(dateToCompare);
  const diff = nowDate - compareDate;
  let returnString = '';
  if (diff > 30 * 24 * 3600e3) {
    return 'More than 1 month ago';
  } else if (diff > 24 * 3600e3) {
    return Math.floor(diff / (24 * 3600e3)) + ' days ago';
  } else if (diff > 3600e3) {
    return Math.floor(diff / 3600e3) + ' hours ago';
  } else if (diff > 60e3) {
    return Math.floor(diff / 60e3) + ' minutes ago';
  } else {
    return Math.floor(diff / 1e3) + ' seconds ago';
  }
};
