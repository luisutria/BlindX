import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  Vibration,
  Pressable,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Polyline, Marker } from 'react-native-maps';
import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

export default function RouteScreen({ navigation, route }: any) {
  const { destination } = route.params || { destination: 'Destino' };

  const [tripStatus, setTripStatus] = useState('SEARCHING'); 
  const [stepIndex, setStepIndex] = useState(0); 
  const [panicTriggered, setPanicTriggered] = useState(false); 
  
  const lastTapRef = useRef(0);
  const tapCountRef = useRef(0);

  // DATOS DEL CONDUCTOR
  const driverInfo = {
    name: "Carlos",
    car: "Chevrolet Spark Rojo",
    plate: "KIG-123",
    rating: "4.9",
    safeWord: "PIÑA"
  };

  // GUIÓN DEL VIAJE (Actualizado con los créditos al final)
  const tripUpdates = [
    // 0. ENCONTRADO
    `¡Conductor encontrado! ${driverInfo.name} ha aceptado tu solicitud. Tu palabra clave de seguridad es: ${driverInfo.safeWord}. Repito: ${driverInfo.safeWord}.`,
    
    // 1. LLEGADA
    `El conductor ha llegado. Pregúntale su nombre y la palabra clave. Si no te dice "${driverInfo.safeWord}", no te subas.`,
    
    // 2. INICIO
    "Palabra clave confirmada. Viaje iniciado. El conductor sigue la ruta segura. Monitoreo activo.",
    
    // 3. EN RUTA
    "Avanzando por la Avenida Sexta. Todo en orden, el vehículo mantiene la ruta correcta.",
    
    // 4. LLEGANDO
    `Estamos llegando a ${destination}. Prepárate para descender.`,
    
    // 5. FIN (AQUÍ AGREGAMOS LOS CRÉDITOS)
    "Has llegado a tu destino. Fin del viaje. ¡Felicidades! Has ganado 20 créditos por usar BlindX."
  ];

  useEffect(() => {
    speak("Buscando conductor cercano...", 1.0);
    const timer = setTimeout(() => {
        setTripStatus('FOUND');
        speak(tripUpdates[0], 0.95); 
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const speak = (text: string, rate = 0.9) => {
    Speech.stop();
    Speech.speak(text, { language: 'es-419', rate: rate });
  };

  const handleNextStep = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (tripStatus === 'SEARCHING') return;

    if (stepIndex < tripUpdates.length - 1) {
      const nextIndex = stepIndex + 1;
      setStepIndex(nextIndex);
      
      if (nextIndex === 1) setTripStatus('ARRIVED');
      if (nextIndex === 2) setTripStatus('IN_TRIP');
      
      // AL FINALIZAR EL VIAJE
      if (nextIndex === tripUpdates.length - 1) {
          setTripStatus('ENDED');
          speak(tripUpdates[nextIndex]);
          // Esperamos un poco más para que termine de hablar antes de salir
          setTimeout(() => navigation.goBack(), 6000); 
          return;
      }
      speak(tripUpdates[nextIndex]);
    }
  };

  const handleMapTap = () => {
    const now = Date.now();
    const delay = now - lastTapRef.current;
    if (delay < 400) tapCountRef.current += 1;
    else tapCountRef.current = 1;
    lastTapRef.current = now;

    if (tapCountRef.current === 4) {
      triggerPanicMode();
      tapCountRef.current = 0; 
    }
  };

  const triggerPanicMode = () => {
    Vibration.vibrate([0, 500, 200, 500]); 
    setPanicTriggered(true);
    Speech.stop(); 
    setTimeout(() => setPanicTriggered(false), 5000);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Cancelar viaje"
        >
          <Ionicons name="close-circle" size={40} color="#EF4444" />
        </TouchableOpacity>
        
        <View style={styles.securityTag}>
           <Ionicons name="shield-checkmark" size={18} color="#10B981" />
           <Text style={styles.securityText}> Monitoreo Activo</Text>
        </View>
      </View>

      {/* MAPA */}
      <Pressable style={styles.mapContainer} onPress={handleMapTap}>
        <View style={styles.mapWrapper} pointerEvents="none"> 
            <MapView 
              style={styles.map}
              initialRegion={{ latitude: 3.4516, longitude: -76.5320, latitudeDelta: 0.005, longitudeDelta: 0.005 }}
            >
              <Polyline coordinates={[{ latitude: 3.4516, longitude: -76.5320 }, { latitude: 3.4550, longitude: -76.5340 }]} strokeColor="#10B981" strokeWidth={5} />
              <Marker coordinate={{ latitude: 3.4516, longitude: -76.5320 }}>
                 <View style={styles.carMarker}><Ionicons name="car" size={24} color="#fff" /></View>
              </Marker>
            </MapView>
        </View>
        <View style={styles.invisibleLayer} accessible={true} accessibilityLabel="Mapa de ruta. Toque 4 veces rápido para emergencia." />
      </Pressable>

      {/* PANEL INFERIOR DINÁMICO */}
      <TouchableOpacity 
        style={[
            styles.infoPanel, 
            tripStatus === 'SEARCHING' ? styles.searchingPanel : styles.activePanel
        ]}
        onPress={handleNextStep}
        activeOpacity={0.9}
        accessibilityRole="button"
      >
        {tripStatus === 'SEARCHING' ? (
            <View style={styles.searchingContent}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.statusTitle}>Buscando conductor...</Text>
            </View>
        ) : (
            <View style={styles.tripContent}>
                
                {/* INFO CONDUCTOR */}
                <View style={styles.topInfoRow}>
                    <View style={styles.driverInfoSimple}>
                        <Text style={styles.driverName}>{driverInfo.name}</Text>
                        <Text style={styles.carInfo}>{driverInfo.car}</Text>
                    </View>
                    
                    {/* PALABRA CLAVE */}
                    <View style={styles.safeWordBox}>
                        <Text style={styles.safeWordLabel}>CLAVE:</Text>
                        <Text style={styles.safeWordText}>{driverInfo.safeWord}</Text>
                    </View>
                </View>

                <View style={styles.separator} />

                {/* ESTADO GRANDE */}
                <Text style={styles.statusLabel}>ESTADO:</Text>
                
                {tripStatus === 'ENDED' ? (
                   // ESTADO FINAL CON CRÉDITOS
                   <View>
                       <Text style={styles.statusTextBig}>¡Viaje Finalizado!</Text>
                       <View style={styles.creditsRow}>
                           <Ionicons name="gift" size={24} color="#FFD700" />
                           <Text style={styles.creditsText}> +20 Créditos</Text>
                       </View>
                   </View>
                ) : (
                   // ESTADOS NORMALES
                   <Text style={styles.statusTextBig}>
                      {tripStatus === 'FOUND' ? "Conductor Viene" : 
                       tripStatus === 'ARRIVED' ? "Conductor Aquí" :
                       "En Ruta Segura"}
                   </Text>
                )}

                <View style={styles.tapHint}>
                    <Ionicons name="finger-print" size={20} color="rgba(255,255,255,0.6)" />
                    <Text style={styles.tapHintText}>Toca para continuar</Text>
                </View>
            </View>
        )}
      </TouchableOpacity>

      {/* PÁNICO */}
      {panicTriggered && (
        <View style={styles.panicBanner}>
            <Ionicons name="checkmark-circle" size={40} color="#fff" />
            <Text style={styles.panicText}>Alerta enviada a contacto de emergencia</Text>
        </View>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' }, 
  
  header: {
    position: 'absolute', top: 50, left: 20, right: 20,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', zIndex: 20
  },
  cancelButton: { backgroundColor: '#fff', borderRadius: 20 },
  securityTag: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', 
    paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, elevation: 5
  },
  securityText: { fontWeight: 'bold', fontSize: 14, color: '#10B981' },

  mapContainer: { flex: 1 }, 
  mapWrapper: { flex: 1 },
  map: { width: '100%', height: '100%' },
  invisibleLayer: { ...StyleSheet.absoluteFillObject },
  carMarker: { backgroundColor: '#2563EB', padding: 5, borderRadius: 20, borderWidth: 2, borderColor: '#fff' },

  infoPanel: {
    height: '45%', 
    borderTopLeftRadius: 30, borderTopRightRadius: 30,
    padding: 25, justifyContent: 'center'
  },
  searchingPanel: { backgroundColor: '#333', alignItems: 'center' },
  activePanel: { backgroundColor: '#2563EB' }, 

  searchingContent: { alignItems: 'center' },
  statusTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginTop: 15 },

  tripContent: { flex: 1, justifyContent: 'space-between' },
  
  topInfoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  driverInfoSimple: { flex: 1 },
  driverName: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  carInfo: { color: 'rgba(255,255,255,0.8)', fontSize: 16 },

  safeWordBox: { 
      backgroundColor: '#F59E0B', 
      paddingVertical: 5, paddingHorizontal: 15, 
      borderRadius: 10, alignItems: 'center',
      borderWidth: 2, borderColor: '#fff'
  },
  safeWordLabel: { color: '#000', fontSize: 10, fontWeight: 'bold' },
  safeWordText: { color: '#000', fontSize: 20, fontWeight: 'bold' },
  
  separator: { height: 1, backgroundColor: 'rgba(255,255,255,0.3)', marginVertical: 10 },

  statusLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 'bold', letterSpacing: 1 },
  statusTextBig: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
  
  // Estilos para los créditos
  creditsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  creditsText: { color: '#FFD700', fontSize: 24, fontWeight: 'bold' },
  
  tapHint: { flexDirection: 'row', alignItems: 'center', opacity: 0.6, alignSelf: 'center', marginTop: 10 },
  tapHintText: { color: '#fff', marginLeft: 5 },

  panicBanner: {
      position: 'absolute', top: '40%', alignSelf: 'center', width: '90%',
      backgroundColor: '#EF4444', padding: 30, borderRadius: 20,
      alignItems: 'center', justifyContent: 'center', zIndex: 100, borderWidth: 2, borderColor: '#fff'
  },
  panicText: { color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 10 }
});