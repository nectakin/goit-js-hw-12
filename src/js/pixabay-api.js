
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36191554-a4c97c0aee7312389854400e2';

async function getData(str, page) {
  const parameters = new URLSearchParams({
    key: API_KEY,
    q: str,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 15,
  });

  const response = await axios(`${BASE_URL}?${parameters}`);
  return response.data;
}
export { getData };
