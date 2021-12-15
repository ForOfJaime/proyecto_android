import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { Text, View, Image, ScrollView, SafeAreaView, TextInput, StyleSheet, Button,FlatList} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen(){
  return(
    <SafeAreaView style={{flex:1}}>
      <ScrollView style={{ flex: 1}}>
        <View style={{justifyContent: "center", alignItems: "center", paddingTop: 50 }}>
          <Text style={{fontSize: 25, textAlign: "center"}}>Bienvenido a la historia de los dispositivos</Text>
          <Image source={{
            uri:"https://www.moviles.com/fotos/blackberry-blackberrycurve8330-2048-g.jpg"
          }} style={{width: 250, height: 350, marginTop: 30}}/>
        <Text style={{fontSize: 25, textAlign: "center", paddingTop: 150}}> Por el otro lado tenemos los smartphones táctiles</Text> 
        <Image source={{
          uri:"http://estaticos.elmundo.es/assets/multimedia/imagenes/2016/04/01/14595056767099.jpg"
          }} style={{width: 250, height: 450, marginTop: 30}}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


function ListScreen({navigation, route}){
  const [number, numberEdad] = React.useState(0);
  return(
    <View style={{justifyContent: "center", alignItems: "center", paddingTop: 50}}>
      <Text style={{fontSize: 25, textAlign: "center"}}>Busqueda de usuarios</Text>
       <TextInput
        style={styles.input}
        onChangeText={(x) => numberEdad(x)}
        placeholder="Introduzca edad"
        keyboardType="numeric"
      />
      <View style={styles.buttonStyle}>
        <Button
        title="Buscar"
        color="#00EFCE"
        onPress={() => navigation.navigate('busqueda', {numero: number})}
        />
      </View>
    </View>
  )
}

function resultadoBusqueda({ route }){
  const Datos = [
  {id: '1',nombre: 'Fernando javier',year: '60', sexo: 'masculino' },
  {id: '2',nombre: 'Jaime Garcia',year: '60', sexo: 'masculino'},  
  {id: '3',nombre: 'pablo vital',year: '32', sexo: 'masculino'},
  {id: '4',nombre: 'irene manca',year: '35', sexo: 'masculino'},
  {id: '5',nombre: 'roberto camela',year: '10', sexo: 'masculino'},
  {id: '6',nombre: 'rodrigo loncon',year: '23', sexo: 'masculino'},
  {id: '7',nombre: 'benito camena',year: '69', sexo: 'masculino'},
  {id: '8',nombre: 'niko borrallo',year: '65', sexo: 'masculino'},
  {id: '9',nombre: 'lorenzo vital',year: '53', sexo: 'masculino'},
  {id: '10',nombre: 'alberto garcia',year: '29', sexo: 'masculino'},
  ];

  const { numero } = route.params;

  function funcionFiltrado({ item }) {
    console.log("El item.age es: ", item.year)
    console.log("El numero es: " , numero)
    if (item.year >= numero) {
      console.log("-------igual")
      return (
        <View>
          <Text>{item.nombre} ||||| {item.year} ||||| {item.sexo}</Text>
        </View>
      );
    }
  }

  const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
   return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Numero introducido: {route.params.numero}</Text>
      <Text>-</Text>
      <FlatList renderItem={funcionFiltrado} data={Datos} keyExtractor={(item) => item.id}></FlatList>
    </View>
  );
  }


const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 5,
  },
  buttonStyle: {
        marginTop: 50,
    }
});

const Stack = createStackNavigator();

function tabScreen( {navigation} ){
  return(
   <Tab.Navigator screenOptions={{
        activeBackgroundColor: "#00EFCE", inactiveBackgroundColor: "#9CF5E9"
      }} screenOptions={{headerTitleAlign: 'center'}}>
        <Tab.Screen name="Historia" component={HomeScreen} />
        <Tab.Screen name="Listado" component={ListScreen}  />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="home" component={tabScreen} options={{headerShown: false}}/>
      <Stack.Screen name="busqueda" component={resultadoBusqueda} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}




