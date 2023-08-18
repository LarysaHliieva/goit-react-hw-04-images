import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '19043103-0cd62514f089da7e89200caeb',
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

export const searchImages = async (search, page = 1, perPage = 4) => {
  const response = await instance.get('/', {
    params: {
      q: search,
      page,
      per_page: perPage,
    },
  });

  return response.data;
};
