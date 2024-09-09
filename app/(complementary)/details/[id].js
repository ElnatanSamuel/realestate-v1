import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import image from "../../../constants/image";
import CarouselRoom from "../../../components/CarouselRoom";
import { StatusBar } from "expo-status-bar";
import HorizontalScrollRooms from "../../../components/HorizontalScrollRooms";
import { Link, useLocalSearchParams, useSearchParams } from "expo-router";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import icon from "../../../constants/icon";
import { getListings, getListingsById, selectlistings } from "../../../slices/listingSlice";
import HouseDetails from "../../../components/HouseDetails";
// import { selectSelectedHouse, getHouse } from "../../../slices/houseSlice";

const Details = () => {

  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();
  const listing = useSelector(selectlistings);
  console.log(listing)

  const { width } = Dimensions.get("window");

  useEffect(() => {
    dispatch(getListingsById())
    // dispatch(getHouse(id));
    // latitude = house.location.coords.lat;
    // longitude = house.location.coords.lng;
  }, [id]);

  const rooms = [
    {
      image: image.detailimg,
      title: "Bedroom",
      index: 1,
    },
    {
      image: image.detailimg,
      title: "Bedroom",
      index: 2,
    },
    {
      image: image.detailimg,
      title: "Bedroom",
      index: 3,
    },
    {
      image: image.detailimg,
      title: "Bedroom",
      index: 4,
    },
    {
      image: image.detailimg,
      title: "Bedroom",
      index: 5,
    },
  ];

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="bg-[#FAFAFB] h-full w-full">
          <View>
            <CarouselRoom rooms={rooms} width={width} />
          </View>

          <View className="mt-2">
            <HorizontalScrollRooms rooms={rooms} />
          </View>

          {/* detail */}
          <View className="px-2 mt-4">
            {/* availability */}
            <View className="flex-row items-center gap-2">
              {/* {!house.offMarket ?
                          <>
                        <Text className="p-2 bg-green-600 rounded-full w-2 h-2"></Text>
                        <Text className=" text-green-500">Available </Text>
                          </>
                          : 
                          <>
                          <Text className="p-2 bg-slate-600 rounded-full w-2 h-2"></Text>
                          <Text className=" text-white">off-market </Text>
                          </>
                } */}
            </View>
<HouseDetails />

            <View className="flex-col gap-2 mt-1 px-3">
              {/* <Text className="text-lg font-extrabold text-black">
                ETB {house.price} $200000
              </Text>

              <View>
                <View></View>
                <View></View>
              </View>

              <Text className="text-lg font-extrabold text-black">
                3{house.bedrooms}BD . 4{house.bathrooms}BA . 2020
                {house.houseSize} SQFT
              </Text> */}

              {/* <Text className="text-black text-sm">
                Address:{house.address}
              </Text> */}

              {/* <Text className="underline text-white">Read More</Text> */}

              <Text className=" font-extrabold underline text-black">
                Call (+251923234562)
              </Text>

              <Text className="text-gray-400 text-sm">
                By Calling You Are Concenting To Our Policy.{" "}
                <Text className="underline text-white">Read More</Text>
              </Text>
            </View>

            {/* <View className="mt-4">
              <Text className="text-white text-lg ">{house.description}</Text>
            </View> */}
          </View>

          {/* Map  */}
          <View className="">
            {/* <View className="flex-1 border border-white h-72">
              <MapView
                region={{
                  latitude: house.location.coords.lat,
                  longitude: house.location.coords.lng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                className="flex-1"
              >
                <Marker
                  coordinate={{
                    latitude: house.location.coords.lat,
                    longitude: house.location.coords.lng,
                  }}
                  title={house.address}
                  description={"description"}
                />
              </MapView>
            </View> */}

            <View className="items-center justify-center flex-row px-6 ">
              {/* <TouchableOpacity className="bg-white flex-row justify-evenly text-black p-4 mt-4 rounded-2xl inline">
                <Text className="text-black font-bold">Get Directions</Text>
              </TouchableOpacity> */}

              <TouchableOpacity className="bg-highlight text-primary w-full p-4 rounded-2xl inline">
                <Text className="text-white font-bold text-center">
                  Request A Private Showing
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mt-3 ">
            <View>
              <Text className=" px-6 font-bold">Rate our service</Text>
              <View
                className="flex flex-row px-5 items-center mt-1 
              "
              >
                {[1, 2, 3, 4, 5].map((item) => (
                  <Image source={icon.staricon} className="w-6 h-6" />
                ))}
              </View>
            </View>
            <TextInput
              multiline
              placeholder="Write a review"
              numberOfLines={6}
              className="border px-2 mx-6 mt-2 rounded-[10px]"
            />
          </View>

          {/* similar */}
          <View className="mt-6 ">
            <Text className="text-lg px-6 font-extrabold">Similar Results</Text>

            <View className="mt-4 mb-4">
              <ScrollView
                decelerationRate="fast"
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {rooms.map((room) => (
                  <View
                    key={room.index}
                    onPress={() => {
                      router.push("/details/2");
                    }}
                    className="relative w-32 items-center justify-center rounded-xl ml-6"
                  >
                    <Image
                      source={room.image}
                      className=" w-32 h-20 rounded-t-xl z-10"
                    />
                    <View className="mt-2">
                      <View className="flex-row items-center gap-2">
                        <Text className="p-1 bg-green-600 rounded-full w-1 h-1"></Text>

                        <Text className=" text-green-500 text-xs">
                          Available
                        </Text>
                      </View>
                      <View className="flex-col gap-2 opacity-90 mt-[1px]">
                        <Text className="text-sm font-extrabold ">
                          ETB 200,000
                        </Text>
                        <Text className="text-xs  ">3BD . 3BA . 1,882SQFT</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#012847" style="light" />
    </SafeAreaView>
  );
};

export default Details;
