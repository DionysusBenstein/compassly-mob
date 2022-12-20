import axios from 'axios';

import { PROD_API, TEST_API } from '../api/api_url';

export default axios.create({
  baseURL: PROD_API,
});
