import axios from 'axios';

const API_BASE_URL = 'https://api.coingecko.com/api/v3/coins/list';

export const getCoinList = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/coins/list`);
    return response.data;
  } catch (error) {
    console.error('Error while fetching coin list:', error);
    throw error;
  }
};

export const getCoinPrice = async (coinId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/simple/price?ids=${coinId}&vs_currencies=usd`);
    return response.data[coinId].usd;
  } catch (error) {
    console.error(`Error while fetching price for ${coinId}:`, error);
    throw error;
  }
};
