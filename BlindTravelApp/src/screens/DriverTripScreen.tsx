import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// --- CONSEJOS DE ETIQUETA PARA EL CONDUCTOR ---
const ACCESSIBILITY_TIPS = [
  "Preséntate claramente: 'Hola, soy Carlos, tu conductor'. No asumas que te reconocen.",
  "Si tiene perro guía, NO lo toques ni lo distraigas. Está trabajando.",
  "Para guiarlo al auto, ofrécele tu codo o pon su mano en el borde del techo (marco de la puerta).",
  "Pregunta siempre: '¿Necesitas ayuda para subir?' antes de actuar.",
  "Indícale verbalmente el entorno: 'El auto está a tu derecha', 'Cuidado con el escalón'."
];

export default function DriverTripScreen({ navigation, route }: any) {
  const { request, userName, userId } = route.params;

  const [stepIndex, setStepIndex] = useState(0);
  const [showEarnings, setShowEarnings] = useState(false);
  
  // --- NUEVOS ESTADOS PARA EL TIP ---
  const [showTipModal, setShowTipModal] = useState(false);
  const [currentTip, setCurrentTip] = useState('');

  // Coordenadas simuladas
  const tripCoords = [
    request.coords, 
    { latitude: request.coords.latitude + 0.005, longitude: request.coords.longitude + 0.005 } 
  ];

  // Instrucciones del GPS
  const instructions = [
    `Dirígete a recoger a ${request.name} en ${request.pickup}.`, // Paso 0
    "Has llegado al punto de recogida. Espera al pasajero.",       // Paso 1 (AQUÍ SALE EL TIP)
    "Pasajero a bordo. Inicia el viaje hacia el destino.",         // Paso 2
    "Gira a la derecha en 100 metros hacia la Avenida Principal.",
    "Continúa recto por 2 kilómetros.",
    "Has llegado al destino: " + request.dropoff
  ];

  useEffect(() => {
    speak(instructions[0]);
  }, []);

  const speak = (text: string) => {
    Speech.stop();
    Speech.speak(text, { language: 'es-419', rate: 1.0 });
  };

  // --- LÓGICA AVANZAR INSTRUCCIÓN CON TIP ---
  const handleNextInstruction = () => {
    if (stepIndex < instructions.length - 1) {
      const nextIndex = stepIndex + 1;
      setStepIndex(nextIndex);
      speak(instructions[nextIndex]);

      // *** AQUÍ ESTÁ LA MAGIA ***
      // Si llegamos al paso 1 (Llegada a recogida), mostramos el consejo
      if (nextIndex === 1) {
        const randomTip = ACCESSIBILITY_TIPS[Math.floor(Math.random() * ACCESSIBILITY_TIPS.length)];
        setCurrentTip(randomTip);
        setShowTipModal(true);
      }

    } else {
      finishTrip();
    }
  };

  const finishTrip = () => {
    const finalText = `Viaje finalizado. Has ganado ${request.price} pesos.`;
    speak(finalText);
    setShowEarnings(true); 
  };

  const handleClose = () => {
    setShowEarnings(false);
    navigation.replace('DriverHome', { userName, userId });
  };

  return (
    <View style={styles.container}>
      
      {/* MAPA DE FONDO */}
      <MapView 
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: request.coords.latitude,
          longitude: request.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={tripCoords[0]} title="Recogida" pinColor="green" />
        <Marker coordinate={tripCoords[1]} title="Destino" pinColor="red" />
        <Polyline coordinates={tripCoords} strokeColor="#2563EB" strokeWidth={5} />
      </MapView>

      {/* HEADER FLOTANTE */}
      <SafeAreaView style={styles.topContainer} edges={['top']}>
        <View style={styles.passengerCard}>
            <View style={styles.avatar}>
                <Ionicons name="person" size={24} color="#fff" />
            </View>
            <View style={styles.passengerInfo}>
                <Text style={styles.passengerName}>{request.name}</Text>
                <Text style={styles.routeText}>Hacia: {request.dropoff}</Text>
            </View>
            <View style={styles.priceTag}>
                <Text style={styles.priceText}>{request.price}</Text>
            </View>
        </View>
      </SafeAreaView>

      {/* PANEL INFERIOR */}
      <View style={styles.bottomPanel}>
          <View style={styles.instructionBox}>
              <Ionicons name="navigate" size={30} color="#333" />
              <Text style={styles.instructionText}>
                  {instructions[stepIndex]}
              </Text>
          </View>

          <TouchableOpacity 
            style={styles.nextButton} 
            onPress={handleNextInstruction}
          >
            <Ionicons name="arrow-forward" size={30} color="#fff" />
          </TouchableOpacity>
      </View>

      {/* === MODAL DE GANANCIAS (AL FINAL) === */}
      <Modal animationType="slide" transparent={true} visible={showEarnings}>
        <View style={styles.modalOverlay}>
            <View style={styles.earningsCard}>
                <Ionicons name="checkmark-circle" size={80} color="#10B981" />
                <Text style={styles.earningsTitle}>¡Viaje Finalizado!</Text>
                <Text style={styles.earningsSubtitle}>Tu ganancia es:</Text>
                <Text style={styles.earningsAmount}>{request.price}</Text>
                
                <TouchableOpacity style={styles.finishButton} onPress={handleClose}>
                    <Text style={styles.finishButtonText}>Volver al Mapa</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>

      {/* === MODAL DE TIP DE ETIQUETA (NUEVO) === */}
      <Modal animationType="fade" transparent={true} visible={showTipModal} onRequestClose={() => setShowTipModal(false)}>
        <View style={styles.modalOverlay}>
            <View style={styles.tipCard}>
                
                <View style={styles.tipHeader}>
                    <Ionicons name="information-circle" size={30} color="#2563EB" />
                    <Text style={styles.tipTitle}>Tip de Inclusión</Text>
                </View>
                
                <Text style={styles.tipText}>
                    "{currentTip}"
                </Text>

                <TouchableOpacity 
                    style={styles.tipButton} 
                    onPress={() => setShowTipModal(false)}
                >
                    <Text style={styles.tipButtonText}>Entendido</Text>
                </TouchableOpacity>

            </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  map: { width: '100%', height: '100%', position: 'absolute' },

  topContainer: { paddingHorizontal: 20, paddingTop: 10 },
  passengerCard: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: '#fff', padding: 15, borderRadius: 15,
      elevation: 5, shadowColor: "#000", shadowOffset: {width:0, height:2}, shadowOpacity:0.2
  },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  passengerInfo: { flex: 1 },
  passengerName: { fontWeight: 'bold', fontSize: 16, color: '#333' },
  routeText: { fontSize: 12, color: '#666' },
  priceTag: { backgroundColor: '#E5E7EB', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  priceText: { fontWeight: 'bold', color: '#10B981' },

  bottomPanel: {
      position: 'absolute', bottom: 30, left: 20, right: 20,
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
  },
  instructionBox: {
      flex: 1, backgroundColor: '#fff', padding: 20, borderRadius: 15,
      marginRight: 15, minHeight: 100, justifyContent: 'center',
      elevation: 5
  },
  instructionText: { fontSize: 18, fontWeight: '600', color: '#333', marginTop: 5 },
  
  nextButton: {
      width: 70, height: 70, borderRadius: 35,
      backgroundColor: '#2563EB',
      justifyContent: 'center', alignItems: 'center',
      elevation: 5, borderWidth: 3, borderColor: '#fff'
  },

  // Estilos Modales
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  
  // Ganancias
  earningsCard: { width: '80%', backgroundColor: '#fff', borderRadius: 20, padding: 30, alignItems: 'center', elevation: 10 },
  earningsTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', marginTop: 20 },
  earningsSubtitle: { fontSize: 16, color: '#666', marginTop: 5 },
  earningsAmount: { fontSize: 40, fontWeight: 'bold', color: '#2563EB', marginVertical: 20 },
  finishButton: { backgroundColor: '#10B981', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30, width: '100%', alignItems: 'center' },
  finishButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

  // --- NUEVOS ESTILOS: TIP CARD ---
  tipCard: { 
      width: '85%', backgroundColor: '#fff', borderRadius: 20, padding: 25, 
      alignItems: 'center', elevation: 10, borderLeftWidth: 5, borderLeftColor: '#2563EB' 
  },
  tipHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  tipTitle: { fontSize: 20, fontWeight: 'bold', color: '#2563EB', marginLeft: 10 },
  tipText: { fontSize: 18, color: '#333', textAlign: 'center', marginBottom: 25, lineHeight: 26, fontStyle: 'italic' },
  tipButton: { backgroundColor: '#2563EB', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25 },
  tipButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' }
});