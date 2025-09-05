import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

const UnitCard = ({ unit, onPress }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => setImageLoading(false);
  const handleImageError = () => { setImageError(true); setImageLoading(false); };

  const getPlaceholderColor = (type) => ({
    '2 Bedroom':'#4A90E2','3 Bedroom':'#50E3C2','4 Bedroom':'#9013FE','Studio':'#F5A623','1 Bedroom':'#7ED321','Penthouse':'#BD10E0'
  }[type] || '#CCCCCC');

  const formatPrice = price => price ? `${price.toLocaleString('en-ET')} ETB` : '-';

  return (
    <TouchableOpacity style={[styles.card, unit.sold && styles.soldCard]} onPress={onPress} disabled={unit.sold}>
      <View style={styles.imageContainer}>
        {imageLoading && <View style={styles.loadingContainer}><ActivityIndicator size="small" color="#2c5aa0"/></View>}
        {!imageError ? (
          <Image source={{ uri: unit.imageUrl }} style={styles.image} onLoad={handleImageLoad} onError={handleImageError} resizeMode="cover" />
        ) : (
          <View style={[styles.placeholder, { backgroundColor: getPlaceholderColor(unit.type) }]}><Text style={styles.placeholderText}>{unit.type}</Text></View>
        )}
        {unit.sold && <View style={styles.soldOverlay}><Text style={styles.soldText}>SOLD</Text></View>}
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{unit.type} - {unit.id}</Text>
        <Text style={styles.floor}>Floor: {unit.floorDisplay}</Text>
        <Text style={styles.size}>Size: {unit.size}</Text>
        <Text style={styles.price}>{formatPrice(unit.price)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card:{ borderRadius:12, backgroundColor:'white', overflow:'hidden', marginBottom:12, elevation:3, shadowColor:'#000', shadowOffset:{width:0,height:1}, shadowOpacity:0.1, shadowRadius:2 },
  soldCard:{ opacity:0.7 },
  imageContainer:{ width:'100%', height:180, backgroundColor:'#eee', position:'relative' },
  image:{ width:'100%', height:'100%' },
  loadingContainer:{ ...StyleSheet.absoluteFillObject, justifyContent:'center', alignItems:'center' },
  placeholder:{ flex:1, justifyContent:'center', alignItems:'center' },
  placeholderText:{ color:'white', fontWeight:'bold', fontSize:18 },
  soldOverlay:{ position:'absolute', top:0,left:0,right:0,bottom:0,backgroundColor:'rgba(255,0,0,0.5)', justifyContent:'center', alignItems:'center' },
  soldText:{ color:'white', fontWeight:'bold', fontSize:24 },
  info:{ padding:10 },
  title:{ fontSize:16, fontWeight:'bold', marginBottom:4 },
  floor:{ fontSize:14, color:'#666' },
  size:{ fontSize:14, color:'#666' },
  price:{ fontSize:16, fontWeight:'bold', color:'#2c5aa0', marginTop:4 }
});

export default UnitCard;
