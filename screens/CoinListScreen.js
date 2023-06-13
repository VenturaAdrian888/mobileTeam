import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getCoinList, getMarketData } from '../CoinGeckoAPI';

import { SafeAreaView } from 'react-native-safe-area-context';
import ListItem from '../components/ListItem';
import { FlatList } from 'react-native';



const CoinListScreen = () => {

  const  [data, setData ] = useState([]);
  const [selectedCoinData, setSelectedCoinData] = useState(null);
  
  const openModal = (item) => {
    // Your logic for opening the modal
    console.log('Opening modal for item:', item);
  };
  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData);
    }

    fetchMarketData();
  }, [])

  return (

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
 