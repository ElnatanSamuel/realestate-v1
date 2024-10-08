import React, { useState } from "react";
import { Image, TextInput, Touchable, View } from "react-native";
import icon from "../constants/icon";
import { TouchableRipple } from "react-native-paper";
import { TouchableOpacity } from "react-native";

const SearchProperty = ({ placeholder, search }) => {
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  return (
    <View className="py-2 relative px-4">
      <TouchableRipple
      className="w-5 h-5 z-10 absolute top-[20px] ml-1 left-5"
      onPress={async()=> search && await search()}
      >
      <Image
        source={icon.searchicon}
        className="w-5 h-5"
        />
      </TouchableRipple>

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"#CFCFCF"}
        className="text-[#2E2C2C] relative text-sm font-medium  bg-[#EFECEC]  py-2 px-8 rounded-[60px]"
      />
     
      <Image
        source={icon.filtericon}
        className="w-7 h-7 z-10 absolute top-[18px] mr-1 right-5 opacity-40"
      />
    </View>
  );
};

export default SearchProperty;
