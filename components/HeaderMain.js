import { View, Text } from "react-native";
import React from "react";

const HeaderMain = (props) => {
    return (
        <View style={{ marginLeft: 0 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                {props.name}
            </Text>
        </View>
    )
}

export default HeaderMain;