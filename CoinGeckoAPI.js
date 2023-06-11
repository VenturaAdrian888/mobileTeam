import axios from 'axios';
import moment from 'moment';

// const API_BASE_URL = 'https://api.coingecko.com/api/v3/coins/list';

// export const getCoinList = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/coins/list`);
//     return response.data;
//   } catch (error) {
//     console.error('Error while fetching coin list:', error);
//     throw error;
//   }
// };

// export const getCoinPrice = async (coinId) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/simple/price?ids=${coinId}&vs_currencies=usd`);
//     return response.data[coinId].usd;
//   } catch (error) {
//     console.error(`Error while fetching price for ${coinId}:`, error);
//     throw error;
//   }
// };

const formatSparkline = (numbers) => {
  const sevenDaysAgo = moment().subtract(7, 'days').unix();
  let formattedSparkline = numbers.map((item, index) => {
    return {
      x: sevenDaysAgo + (index + 1) * 3600,
      y: item,
    }
  })

  return formattedSparkline;
}

const formatMarketData = (data) => {
  let formattedData = [];

  data.forEach(item => {
    const formattedSparkline = formatSparkline(item.sparkline_in_7d.price)

    const formattedItem = {
      ...item,
      sparkline_in_7d: {
        price: formattedSparkline
      }
    }

    formattedData.push(formattedItem);
  });

  return formattedData;
}
export const getMarketData = async () => {
  try {
    const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=7d");
    const data = response.data;
    const formattedResponse = formatMarketData(data);
    return formattedResponse;
  } catch (error) {
    console.log(error.message);
  }
}