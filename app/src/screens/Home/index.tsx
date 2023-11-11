import { View, Text, StyleSheet, Platform, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator, ImageComponent } from "react-native";
import MapView, {Marker} from "react-native-maps";
import { categories } from "./categories";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Drawer, IconButton } from "react-native-paper";
import { Announcement } from "../../components/Announcement";


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
    const [visibleMenu, setVisibleMenu] = useState(false)
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
            <View style={styles.headerContainer}>

              <IconButton 
                icon={require("../../../assets/menu.png")} 
                size={32} 
                onPress={()=>setVisibleMenu(!visibleMenu)}
              />
                <View>
                  <Text style={styles.title}>Bem vindo</Text>
                  <Text style={styles.subTitle}>Encontre no mapa um ponto de seu interesse</Text>
                </View>
                
            </View>
              {visibleMenu && 
                (<Drawer.Section showDivider>
                  <FlatList 
                  data={categories}
                  horizontal
                  renderItem={({ item })=>(                    
                      <TouchableOpacity onPress={()=>{setFilter(filter === item.key ? "" : item.key)}}>
                          <View style={styles.iconButton}>
                            {item.icon}
                            <Text>{item.label}</Text>
                          </View>
                      </TouchableOpacity>
                  )}
                  />
                  </Drawer.Section>)
              }
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
            <Announcement/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    padding: 8,
    paddingTop: Platform.OS === "android" ? 50 : 0,
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "400",
    color: "#322153",
  },
  iconButton:{
    padding:8,
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center"
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