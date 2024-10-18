import { Image, StyleSheet, Platform, SafeAreaView, View, Text, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { Feather, Fontisto, Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import styles from '@/components/stylehome';
import CarouserComp from '@/components/CarouserComp';
import { router } from 'expo-router';
// import styles from '@/components/stylehome';
export default function HomeScreen() {
  
const products=[1,2,3,4,5,6]


  const renderItem=(item:any)=>{
    return(
    <View >
      <View style={styles.renderContainer}>
        <View style={styles.imageContainer}>

      <Image source={require('../../assets/images/image.jpg')}  style={styles.image}/>
        </View>

      </View>
    </View>
    )
  }

  return (
    <SafeAreaView>
    <View style={styles.appBarWrapper}>
      <View style={styles.appBar}>
          <Ionicons name="location-outline" size={24}  />
          <Text style={styles.location}>Karachi</Text>
          <View style={{alignItems:"flex-end"}}>
              <View style={styles.cartCount}>
                
                    <Text style={styles.cardNum}>8</Text>
              </View>
              <TouchableOpacity onPress={()=>router.navigate('/login')}>
                <Text>login</Text>
                </TouchableOpacity>
              <TouchableOpacity>
                <Fontisto name="shopping-basket" size={24}  />
              </TouchableOpacity>
          </View>
      </View>
      
    </View>
    <ScrollView>
      <View>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>{" "} find the most</Text>
          <Text style={styles.welcomeText1}>{" "} Luxurious Furniture</Text>
        </View>
        <View style={styles.searchContainer}>
          <TouchableOpacity >
            <Feather name="search" size={24} style={styles.searchIcon}/>
          </TouchableOpacity>
          <View style={styles.searchWrapper}>
            <TextInput placeholder="What are you looking For?" style={styles.searchInput} />
          </View>
          {/* <View></View> */}
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name="camera-outline" size={24} color='white'/>
          </TouchableOpacity>
        </View>
        <View>
          <CarouserComp />
        </View>
        <View style={styles.arrivalContainer}>
          <View style={styles.arivalHeader}>
        <Text style={styles.arivalText}>New Arrival</Text>
        <TouchableOpacity>
          <Feather name="grid" size={24} />
        </TouchableOpacity>
        </View>
        </View>
        <View style={styles.productContainer}>
          <FlatList 
          data={products}
        
          horizontal

          renderItem={renderItem}
          contentContainerStyle={{columnGap:20}}
          />
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}



