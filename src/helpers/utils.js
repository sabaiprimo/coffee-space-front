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
    url: 'https://env-8924245.jelastic.metropolia.fi/api/upload',
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
