import axios from 'axios';
import mocksData from '@/mocks/getPayments';

/**
 * @var {Axios}
 */
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

/**
 * Load payments data.
 *
 * @param {Object} params
 * @returns {Promise}
 */
const getPayments = (params = {}) => instance.request({
  method: 'get',
  url: '/api/v1/payments',
  params,
});

const requests = {
  getPayments,
};

const mocks = {
  getPayments: mocksData,
};

const api = process.env.NODE_ENV === 'development' ? mocks : requests;

export default api;
