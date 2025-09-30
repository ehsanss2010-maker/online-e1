import React from 'react';
import { Text, View, FlatList } from 'react-native';
import axios from 'axios';

export default function App() {
  const [products, setProducts] = React.useState([]);
  React.useEffect(()=>{
    axios.get('http://10.0.2.2:8000/api/products/').then(r=>setProducts(r.data)).catch(()=>{})
  },[])
  return (
    <View style={{flex:1, padding:20}}>
      <Text style={{fontSize:20}}>سوپرمارکت آنلاین (اپ)</Text>
      <FlatList data={products.slice(0,20)} keyExtractor={i=>i.serial} renderItem={({item})=>(
        <View style={{padding:10, borderBottomWidth:1}}>
          <Text>{item.title || item.serial}</Text>
          <Text>قیمت: {item.retail_price}</Text>
        </View>
      )} />
    </View>
  );
}
