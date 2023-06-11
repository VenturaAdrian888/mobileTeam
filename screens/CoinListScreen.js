import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getCoinList, getMarketData } from '../CoinGeckoAPI';

import { SafeAreaView } from 'react-native-safe-area-context';
import ListItem from '../components/ListItem';
import { FlatList } from 'react-native-web';



const CoinListScreen = () => {
  // const [coinList, setCoinList] = useState([]);

  // useEffect(() => {
  //   fetchCoinList();
  // }, []);

  // const fetchCoinList = async () => {
  //   try {
  //     const data = await getCoinList();
  //     console.log(data); // Check the API response in the console
  //     setCoinList(data);
  //   } catch (error) {
  //     console.error('Error fetching coin list:', error);
  //   }
  // };
  
  const  [data, setData ] = useState([]);
  const [selectedCoinData, setSelectedCoinData] = useState(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData);
    }

    fetchMarketData();
  }, [])

  return (
    // <View>
    //   <Text>Coin List:</Text>
    //   {coinList.map((coin) => (
    //     <Text key={coin.id}>{coin.name}</Text>
    //   ))}
    //   <Text>coinList: {JSON.stringify(coinList)}</Text>
    // </View>
    <SafeAreaView >
    <FlatList
      keyExtractor={(item) => item.id}
      data={data}
      renderItem={({ item }) => (
        <ListItem
          name={item.name}
          symbol={item.symbol}
          currentPrice={item.current_price}
          priceChangePercentage7d={item.price_change_percentage_7d_in_currency}
          logoUrl={item.image}
          onPress={() => openModal(item)}
        />
      )}
      
    />
    </SafeAreaView>
    
  );
  
};

export default CoinListScreen;
