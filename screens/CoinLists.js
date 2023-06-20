import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { getMarketData } from "../lib/CoinGecko";
import ListItem from "../components/ListItem";

const CoinLists = () => {
  // State for storing market data
  const [marketData, setMarketData] = useState([]);

  // Function to open modal for item
  const openModal = (item) => {
    console.log("Opening modal for item:", item);
  };

  useEffect(() => {
    // Fetch market data on component mount
    const fetchMarketData = async () => {
      try {
        const data = await getMarketData();
        setMarketData(data);
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
    };

    fetchMarketData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={marketData}
        renderItem={({ item }) => (
          <ListItem
            name={item.name}
            symbol={item.symbol}
            currentPrice={item.current_price}
            priceChangePercentage7d={
              item.price_change_percentage_7d_in_currency
            }
            logoUrl={item.image}
            onPress={() => openModal(item)}
          />
        )}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "white",
  },
};

export default CoinLists;
