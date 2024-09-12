import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { RefreshControl, ScrollView, TextInput } from "react-native-gesture-handler";
import icon from "../../constants/icon";
import SearchProperty from "../../components/SearchProperty";
import MainHouseCard from "../../components/MainHouseCard";
import { Link, router } from "expo-router";

import { fetch } from "../../mocks/fetch";

import { useDispatch, useSelector } from "react-redux";

import { getDevelopers, selectdevelopers, selectDeveloperLoading } from "../../slices/developerSlice";
import { getListings, selectListingLoading, selectListings } from "../../slices/listingSlice";

import LoadingScreen from "../../components/LoadingScreen";

import { getlocations, selectLocationLoading, selectLocations } from "../../slices/locationSlice";

const Explore = () => {

  const dispatch = useDispatch()
  
  const developers = useSelector(selectdevelopers)
  const isDeveloperLoading = useSelector(selectDeveloperLoading)
  
  const listings = useSelector(selectListings)
  const isListingLoading = useSelector(selectListingLoading)

  const locations = useSelector(selectLocations)
  const isLocationLoading = useSelector(selectLocationLoading)
  
  const [SelectedFilter, setSelectedFilter] = useState("apartment");


  useEffect(()=>{
    dispatch(getListings()) // should be the only in this page
    dispatch(getDevelopers())
    dispatch(getlocations())
  },[])

  const handleSelectingFilter = (filter) => {
    setSelectedFilter(filter);
  };

  const [refreshing,setRefreshing] = useState(false)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      className="flex-1 gap-0 bg-[#FAFAFB]"
      decelerationRate="fast"
      vertical={true}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      >

{/*  */}
      <SearchProperty placeholder="Search Property" />
{/*  */}
      <View className="">
        
        <View className=" px-4 pt-3 flex flex-row items-center justify-between">
          <Text className="text-lg font-bold">Developers</Text>
          <Link
          href="/developers">
              View all
          </Link>
        </View>
{/*  */}
    {
      (isDeveloperLoading) ? <LoadingScreen /> :
        <FlatList
          data={developers}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            
            <TouchableOpacity onPress={() => 
              router.push({
              pathname:"/developer_details",
              params: {id:item.id} })}>
              <Image
              source={{ uri: item.profilePhoto }}
              className="w-32 h-32 mr-4 mt-3 rounded-[10px]"/>
            </TouchableOpacity>

          )}
        />
    }
    </View>

{/*  */}
      <View className="px-4 pt-4">
        <Text className="text-lg font-bold">What are you looking for?</Text>
        <View className="flex flex-row pt-4 items-center gap-2">
          <Text
            className={`py-2 px-3 shadow-lg rounded-[50px] flex-1 text-center ${
              SelectedFilter === "apartment"
                ? "bg-highlight text-white"
                : "bg-white"
            }`}
            onPress={() => handleSelectingFilter("apartment")}
          >
            Apartment
          </Text>
          <Text
            className={`py-2 px-3 shadow-lg rounded-[50px] flex-1 text-center ${
              SelectedFilter === "residential"
                ? "bg-highlight text-white"
                : "bg-white"
            }`}
            onPress={() => handleSelectingFilter("residential")}
          >
            Residential
          </Text>
          <Text
            className={`py-2 px-3 shadow-lg rounded-[50px] flex-1 text-center ${
              SelectedFilter === "hotel"
                ? "bg-highlight text-white"
                : "bg-white"
            }`}
            onPress={() => handleSelectingFilter("hotel")}
          >
            Hotel
          </Text>
        </View>
      </View>
{/*  */}
        {
        (isListingLoading) ? <LoadingScreen />:
      <>
      { locations?.map((item) => 
      (
      <View>
          <View className="px-4 pt-4 flex flex-row items-center justify-between">
            <View className="flex flex-col gap-1">
              <Text className="font-bold text-[18px]">{item.name}</Text>
              <Text className="">127 results</Text>
            </View>
            <View>
              <Link
              href={`/developer_details/${item.id}`}
              >
                View all
                </Link>
            </View>
          </View>

          <View className="pl-2 pb-4">
             <FlatList
              data={listings}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              // refreshing={isDeveloperLoading}
              // onRefresh={dispatch(getListings())}
              renderItem={({ item }) => (
                <MainHouseCard listing={item} width="100%" />
              )}
              className="w-full"
            />
          </View>
        </View>
      )
    )
  } 
  </>
}

    </ScrollView>
  );
};

export default Explore;
