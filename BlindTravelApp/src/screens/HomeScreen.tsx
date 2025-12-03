import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Dimensions,
  Alert,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import MapView from 'react-native-maps'; 
import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation, route }: any) {
  // Recibimos userName y userId (vital para borrar cuenta en Configuración)
  const { userName, userId } = route.params || { userName: 'Viajero', userId: null };
  
  // Estados
  const [isListening, setIsListening] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false); 

  // 1. Saludo Inicial
  useEffect(() => {
    const speakWelcome = () => {
      const frase = `Bienvenido a BlindX, ${userName}. Toque el botón inferior para decir su destino.`;
      Speech.speak(frase, { language: 'es-419', rate: 0.9 });
    };
    const timer = setTimeout(speakWelcome, 1000);
    return () => {
      clearTimeout(timer);
      Speech.stop();
    };
  }, [userName]);

  // 2. Lógica del Micrófono
  const handleMicrophonePress = () => {
    Speech.stop(); 
    if (isListening) {
      setIsListening(false);
      return;
    }
    setIsListening(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    Speech.speak("Escuchando...", { language: 'es-419' });

    setTimeout(() => {
      finishListening("Centro Comercial Chipichape");
    }, 4000);
  };

  const finishListening = (destinoDetectado: string) => {
    setIsListening(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Speech.speak(`Entendido. Iniciando viaje a ${destinoDetectado}`, {
      language: 'es-419',
      onDone: () => {
        // Navegamos a la pantalla de Ruta
        navigation.navigate('Route', { destination: destinoDetectado });
      }
    });
  };

  // 3. Lógica de Cerrar Sesión
  const handleLogout = () => {
    setMenuVisible(false);
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      
      {/* === HEADER === */}
      <View style={styles.header}>
        <Image 
          source={require('../../assets/logo_blindx.png')} 
          style={styles.headerLogo}
          accessibilityRole="image"
          accessibilityLabel="Logotipo de BlindX"
        />
        
        {/* FOTO DE PERFIL (Abre el menú) */}
        <TouchableOpacity 
          style={styles.profileContainer}
          onPress={() => setMenuVisible(true)}
          accessibilityRole="button"
          accessibilityLabel={`Perfil de ${userName}. Toca para abrir el menú.`}
        >
          <Text style={styles.userNameText}>{userName}</Text>
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={24} color="#555" />
          </View>
        </TouchableOpacity>
      </View>

      {/* === MAPA === */}
      <View style={styles.mapContainer}>
        <MapView 
          style={styles.map}
          initialRegion={{
            latitude: 3.4516, 
            longitude: -76.5320,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          pitchEnabled={false}
          rotateEnabled={false}
          accessibilityLabel="Mapa de la ciudad."
        />
        <View style={styles.mapShadow} />
      </View>

      {/* === FOOTER === */}
      <View style={styles.footer}>
        {/* Botón Atrás */}
        <TouchableOpacity 
          style={styles.backButtonFooter}
          onPress={() => navigation.navigate('Login')}
          accessibilityRole="button"
          accessibilityLabel="Salir"
        >
          <Ionicons name="arrow-back-circle" size={50} color="#333" />
        </TouchableOpacity>

        {/* Micrófono */}
        <TouchableOpacity 
          style={[styles.micButton, isListening && styles.micButtonActive]}
          onPress={handleMicrophonePress}
          accessibilityRole="imagebutton"
          accessibilityLabel={isListening ? "Escuchando" : "Activar micrófono"}
        >
          {isListening ? (
             <ActivityIndicator size="large" color="#fff" />
          ) : (
             <Ionicons name="mic" size={width * 0.3} color="#fff" />
          )}
        </TouchableOpacity>
        
        {isListening && (
            <View style={styles.statusBadge}>
                <Text style={styles.statusText}>Escuchando...</Text>
            </View>
        )}
      </View>

      {/* ================================================= */}
      {/* === MENÚ LATERAL (MODAL) === */}
      {/* ================================================= */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
            <View style={styles.modalTransparentLayer} />
          </TouchableWithoutFeedback>

          {/* CONTENIDO DEL MENÚ */}
          <View style={styles.menuContainer}>
            
            {/* 1. Cabecera */}
            <View style={styles.menuHeader}>
                <View style={styles.menuAvatar}>
                     <Ionicons name="person" size={40} color="#fff" />
                </View>
                <Text style={styles.menuUserName}>{userName}</Text>
                
                <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>5.0</Text>
                    <Ionicons name="star" size={16} color="#FFD700" />
                </View>
            </View>

            {/* 2. Crédito */}
            <View style={styles.creditBox}>
                <Text style={styles.creditLabel}>Crédito</Text>
                <Text style={styles.creditAmount}>$ 25.000</Text>
            </View>

            {/* 3. Lista de Opciones */}
            <View style={styles.menuOptions}>
                
                {/* --- BOTÓN HISTORIAL --- */}
                <TouchableOpacity 
                    style={styles.menuItem} 
                    onPress={() => {
                        setMenuVisible(false);
                        navigation.navigate('TripHistory'); 
                    }}
                >
                    <Ionicons name="time-outline" size={24} color="#2563EB" />
                    <Text style={styles.menuItemText}>Historial de viajes</Text>
                </TouchableOpacity>
                
                {/* --- BOTÓN AYUDA (NUEVO) --- */}
                <TouchableOpacity 
                    style={styles.menuItem} 
                    onPress={() => {
                        setMenuVisible(false);
                        navigation.navigate('Help'); // <--- CONEXIÓN REALIZADA
                    }}
                >
                    <Ionicons name="help-circle-outline" size={24} color="#2563EB" />
                    <Text style={styles.menuItemText}>Ayuda</Text>
                </TouchableOpacity>

                {/* --- BOTÓN CONFIGURACIÓN --- */}
                <TouchableOpacity 
                    style={styles.menuItem} 
                    onPress={() => {
                        setMenuVisible(false);
                        navigation.navigate('Settings', { userId: userId }); 
                    }}
                >
                    <Ionicons name="settings-outline" size={24} color="#2563EB" />
                    <Text style={styles.menuItemText}>Configuración</Text>
                </TouchableOpacity>

            </View>

            {/* 4. Footer */}
            <View style={styles.menuFooter}>
                <TouchableOpacity 
                    style={styles.logoutButton} 
                    onPress={handleLogout}
                >
                    <Ionicons name="log-out-outline" size={24} color="#EF4444" />
                    <Text style={styles.logoutText}>Cerrar sesión</Text>
                </TouchableOpacity>
                <Text style={styles.versionText}>V 1.0.0</Text>
            </View>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#fff', zIndex: 10, elevation: 4 },
  headerLogo: { width: 50, height: 50, resizeMode: 'contain' },
  profileContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', padding: 8, borderRadius: 30 },
  userNameText: { marginRight: 10, fontWeight: '600', color: '#333' },
  avatarPlaceholder: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E1E1E1', justifyContent: 'center', alignItems: 'center' },
  mapContainer: { flex: 1, position: 'relative' },
  map: { width: '100%', height: '110%' },
  mapShadow: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 150, backgroundColor: 'rgba(255,255,255,0.0)', zIndex: 5 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, height: width * 0.7, justifyContent: 'flex-end', alignItems: 'center', zIndex: 20, pointerEvents: 'box-none' },
  backButtonFooter: { position: 'absolute', bottom: 30, right: 30, zIndex: 30, backgroundColor: '#fff', borderRadius: 25, elevation: 5 },
  micButton: { width: width * 0.5, height: width * 0.5, backgroundColor: '#2563EB', borderRadius: (width * 0.5) / 2, justifyContent: 'center', alignItems: 'center', marginBottom: 50, shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 15, borderWidth: 5, borderColor: '#fff' },
  micButtonActive: { backgroundColor: '#EF4444', borderColor: '#FFCACA', transform: [{ scale: 1.1 }] },
  statusBadge: { position: 'absolute', bottom: 20, backgroundColor: 'rgba(0,0,0,0.7)', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20 },
  statusText: { color: '#fff', fontWeight: 'bold' },

  // Estilos del Menú
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', flexDirection: 'row' },
  modalTransparentLayer: { flex: 1 },
  menuContainer: { width: '80%', backgroundColor: '#fff', height: '100%', padding: 25, shadowColor: "#000", elevation: 5 },
  menuHeader: { alignItems: 'center', marginBottom: 30, marginTop: 20 },
  menuAvatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#E1E1E1', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  menuUserName: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF8E1', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  ratingText: { fontWeight: 'bold', color: '#333', marginRight: 4 },
  creditBox: { backgroundColor: '#F3F4F6', borderRadius: 10, padding: 15, marginBottom: 30, alignItems: 'center' },
  creditLabel: { fontSize: 14, color: '#666', marginBottom: 5 },
  creditAmount: { fontSize: 22, fontWeight: 'bold', color: '#2563EB' },
  menuOptions: { flex: 1 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  menuItemText: { fontSize: 16, color: '#333', marginLeft: 15 },
  menuFooter: { borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 20, alignItems: 'center' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  logoutText: { color: '#EF4444', fontWeight: '600', fontSize: 16, marginLeft: 8 },
  versionText: { color: '#999', fontSize: 12 }
});