import { View, Text, StyleSheet, Platform, SafeAreaView, FlatList, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import MapView, {Marker} from "react-native-maps";
import { categories } from "./categories";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export interface IMarker {
    category: string;
    contact: string;
    description: string;
    id: string;
    latitude: number;
    longitude: number;
    name: string;
}

export default function Home(){
    const [filter, setFilter] = useState('');
    const [markers, setMarkers] = useState<IMarker[]>([]);
    const navigation = useNavigation();

    const filteredData = markers.filter(m => m.category === filter);

    useEffect(()=>{
        fetch("http://192.168.4.2:3000/store").then(async (req) =>{
            const data = await req.json();
            setMarkers(data)
        })
    },[])

    if (!markers || markers.length === 0) {
        return <ActivityIndicator />;
    }

    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>Bem vindo</Text>
                <Text style={styles.subTitle}>Encontre no mapa um ponto de seu interesse</Text>
            </View>
            <MapView style={styles.map} 
            initialRegion={{
                latitude:-19.9196,
                longitude: -44.0143,
                latitudeDelta:0.0922,
                longitudeDelta:0.0421
            }}
            >
                {(filter ? filteredData : markers).map((item)=>{
                    return(
                    <Marker 
                        key={item.id}
                        onPress={()=>{ navigation.navigate<IMarker>("Detail", item) }}
                        coordinate={{
                            latitude:item.latitude,
                            longitude:item.longitude,
                        }}
                    />
                    )
                })}
            </MapView>
            <View>
                <FlatList 
                  data={categories}
                  horizontal
                  ItemSeparatorComponent={() => <View style={{ width: 10}}/>}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    alignItems: "center"
                  }}
                  renderItem={({ item })=>(
                    <TouchableOpacity 
                      style={[styles.categoryItem, filter === item.key ? styles.selectedCategory : null]} 
                      key={item.key} 
                      onPress={()=>{setFilter(filter === item.key ? "" : item.key)}}
                    >
                        <Image style={styles.categoryImage} source={item.image} />
                        <Text style={styles.categoryText}>{item.label}</Text>
                    </TouchableOpacity>
                )}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    padding: 20,
    paddingTop: Platform.OS === "android" ? 50 : 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "400",
    color: "#322153",
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#6c6c80",
  },
  map: {
    flex: 1,
  },
  categoryContainer: {
    padding: 10,
  },
  categoryItem: {
    height: 110,
    backgroundColor: "#f0f0f5",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  categoryImage: {
    width: 50,
    height: 50,
  },
  categoryText: {
    textAlign: "center",
    color: "#6c6c80",
  },
  selectedCategory: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#322153",
  },
});