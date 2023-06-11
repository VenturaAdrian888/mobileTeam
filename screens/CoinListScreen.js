import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getCoinList } from '../CoinGeckoAPI';

const CoinListScreen = () => {
  const [coinList, setCoinList] = useState([]);

  useEffect(() => {
    fetchCoinList();
  }, []);

  const fetchCoinList = async () => {
    try {
      const data = await getCoinList();
      console.log(data); // Check the API response in the console
      setCoinList(data);
    } catch (error) {
      console.error('Error fetching coin list:', error);
    }
  };
  

  return (
    <View>
      <Text>Coin List:</Text>
      {coinList.map((coin) => (
        <Text key={coin.id}>{coin.name}</Text>
      ))}
      <Text>coinList: {JSON.stringify(coinList)}</Text>
    </View>
  );
  
};

export default CoinListScreen;
