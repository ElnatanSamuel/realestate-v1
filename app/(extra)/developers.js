import React, { useEffect } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import SearchProperty from "../../components/SearchProperty";
import { router } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { getDevelopers, selectDeveloperLoading, selectdevelopers } from "../../slices/developerSlice";
import LoadingScreen from "../../components/LoadingScreen";


const developers = () => {
  
  const dispatch = useDispatch()
  
  const developers = useSelector(selectdevelopers)
  const isDeveloperLoading = useSelector(selectDeveloperLoading)

  useEffect(()=>{
    dispatch(getDevelopers())
  },[])

  return (
    <View className="bg-[#FAFAFB] h-full w-full">
      <SearchProperty placeholder="Search Developers" />
      {
          (isDeveloperLoading) ? <LoadingScreen />:
      <View className="flex flex-row flex-wrap justify-between w-full item-center px-4">
        
        {developers.map((item) => (
          <TouchableOpacity 
          onPress={() =>{ 
            router.push(
              {
              pathname:"/developer_details",
              params: {id:item.id}
            })
          }
          }>
          <Image
          source={{ uri: item.profilePhoto }}
          className="w-40 h-40 mr-4 mt-3 rounded-[10px]"
          />
          </TouchableOpacity>
          ))}
        <View className="w-40 h-40 bg-highlight rounded-[10px] flex flex-row justify-center items-center">
          <Text className="text-white">
            View all developers
            </Text>
        </View>
      </View>
}
    </View>
  );
};

export default developers;
