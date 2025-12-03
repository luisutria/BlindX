import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const dummyRequests = [
  { id: '1', name: 'Usuario 1', price: '10.000', distance: '500m', pickup: 'Calle 11c # 34-50', dropoff: 'Centro Comercial Chipichape', coords: { latitude: 3.4516, longitude: -76.5320 } },
  { id: '2', name: 'Maria Camila', price: '15.500', distance: '1.2km', pickup: 'Av. Sexta Norte # 23N', dropoff: 'Universidad del Valle', coords: { latitude: 3.4580, longitude: -76.5280 } },
  { id: '3', name: 'Pedro Pablo', price: '8.000', distance: '300m', pickup: 'Carrera 5ta # 10-12', dropoff: 'Clínica de Occidente', coords: { latitude: 3.4490, longitude: -76.5350 } },
];

export default function DriverHomeScreen({ navigation, route }: any) {
  const { userName, userId } = route.params || { userName: 'Conductor', userId: null };

  const [modalVisible, setModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const handleMarkerPress = (request: any) => {
    setSelectedRequest(request); 
    setModalVisible(true);       
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRequest(null);
  };

  const handleAcceptTrip = () => {
    if (selectedRequest) {
      setModalVisible(false);
      navigation.replace('DriverTrip', { 
        request: selectedRequest,
        userName: userName,
        userId: userId 
      });
    }
  };

  const handleLogout = () => {
    setMenuVisible(false);
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      
      <View style={styles.header}>
        <Image source={require('../../assets/logo_blindx.png')} style={styles.headerLogo} />
        <View style={styles.headerRight}>
            <Text style={styles.conductorLabel}>Conductor</Text>
            <TouchableOpacity 
                style={styles.avatarContainer}
                onPress={() => setMenuVisible(true)}
            >
                <Ionicons name="person" size={24} color="#555" />
            </TouchableOpacity>
        </View>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.welcomeText}>Bienvenido "{userName}"</Text>
        <Text style={styles.sectionTitle}>Seleccionar viaje</Text>
        <View style={styles.separator} />
        <Text style={styles.subtitle}>Viajes disponibles</Text>
      </View>

      <View style={styles.mapContainer}>
        <MapView 
          style={styles.map}
          provider={PROVIDER_GOOGLE} 
          initialRegion={{ latitude: 3.4530, longitude: -76.5310, latitudeDelta: 0.02, longitudeDelta: 0.02 }}
        >
            {dummyRequests.map((req) => (
                <Marker key={req.id} coordinate={req.coords} onPress={() => handleMarkerPress(req)}>
                    <Ionicons name="location-sharp" size={40} color="#333" />
                </Marker>
            ))}
        </MapView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
            style={styles.rewardsButton} 
            onPress={() => navigation.navigate('DriverGoals')}
        >
            <Text style={styles.rewardsButtonText}>Metas alcanzadas</Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={closeModal}>
        <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalOverlay}>
                <TouchableWithoutFeedback>
                    <View style={styles.modalContent}>
                        
                        <View style={styles.modalHeaderRow}>
                            <Text style={styles.modalUserName}>{selectedRequest?.name}</Text>
                            <View style={styles.priceBubble}>
                                <Text style={styles.priceText}>{selectedRequest?.price}</Text>
                            </View>
                        </View>
                        <View style={styles.modalSeparator} />
                        
                        <View style={styles.modalBodyRow}>
                            <View style={styles.modalAvatarLarge}>
                                <Ionicons name="person" size={60} color="#666" />
                            </View>
                            <View style={styles.tripDetails}>
                                <Text style={styles.detailText}>Distancia: {selectedRequest?.distance}</Text>
                                <Text style={styles.detailText} numberOfLines={2}>Origen: {selectedRequest?.pickup}</Text>
                                <Text style={styles.detailText} numberOfLines={2}>Destino: {selectedRequest?.dropoff}</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.acceptModalButton} onPress={handleAcceptTrip}>
                            <Text style={styles.acceptModalButtonText}>Aceptar</Text>
                        </TouchableOpacity>

                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal animationType="fade" transparent={true} visible={menuVisible} onRequestClose={() => setMenuVisible(false)}>
        <View style={styles.modalOverlayMenu}>
          <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
            <View style={styles.modalTransparentLayer} />
          </TouchableWithoutFeedback>

          <View style={styles.menuContainer}>
            <View style={styles.menuHeader}>
                <View style={styles.menuAvatar}><Ionicons name="person" size={40} color="#fff" /></View>
                <Text style={styles.menuUserName}>{userName}</Text>
                <View style={styles.ratingContainer}><Text style={styles.ratingText}>4.9</Text><Ionicons name="star" size={16} color="#FFD700" /></View>
            </View>

            <View style={styles.creditBox}>
                <Text style={styles.creditLabel}>Ganancias hoy</Text>
                <Text style={styles.creditAmount}>$ 85.000</Text>
            </View>

            <View style={styles.menuOptions}>
                <TouchableOpacity style={styles.menuItem} onPress={() => console.log("Historial")}>
                    <Ionicons name="time-outline" size={24} color="#2563EB" /><Text style={styles.menuItemText}>Historial de viajes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => console.log("Ayuda")}>
                    <Ionicons name="help-circle-outline" size={24} color="#2563EB" /><Text style={styles.menuItemText}>Soporte Conductor</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.menuItem} 
                    onPress={() => {
                        setMenuVisible(false);
                        navigation.navigate('DriverSettings', { userId: userId });
                    }}
                >
                    <Ionicons name="settings-outline" size={24} color="#2563EB" /><Text style={styles.menuItemText}>Configuración</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.menuFooter}>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={24} color="#EF4444" /><Text style={styles.logoutText}>Cerrar sesión</Text>
                </TouchableOpacity>
                <Text style={styles.versionText}>V 1.0.0 (Driver)</Text>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10 },
  headerLogo: { width: 50, height: 50, resizeMode: 'contain' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  conductorLabel: { marginRight: 10, fontSize: 16, color: '#333' },
  avatarContainer: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E1E1E1', justifyContent: 'center', alignItems: 'center' },
  titleContainer: { paddingHorizontal: 20, alignItems: 'center', marginBottom: 10 },
  welcomeText: { fontSize: 22, color: '#333', marginBottom: 20 },
  sectionTitle: { fontSize: 24, color: '#333' },
  separator: { width: '60%', height: 2, backgroundColor: '#E5E7EB', marginVertical: 5 },
  subtitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  mapContainer: { flex: 1, margin: 20, borderRadius: 20, overflow: 'hidden', elevation: 5 },
  map: { width: '100%', height: '100%' },
  footer: { padding: 20, alignItems: 'center' },
  rewardsButton: { backgroundColor: '#2563EB', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 25, width: '80%', alignItems: 'center' },
  rewardsButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#fff', borderRadius: 25, padding: 25, elevation: 10 },
  modalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  modalUserName: { fontSize: 26, color: '#000' },
  priceBubble: { backgroundColor: '#111', paddingVertical: 5, paddingHorizontal: 15, borderRadius: 20 },
  priceText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  modalSeparator: { height: 3, backgroundColor: '#000', marginBottom: 20 },
  modalBodyRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  modalAvatarLarge: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center', marginRight: 20 },
  tripDetails: { flex: 1 },
  detailText: { fontSize: 17, color: '#000', marginBottom: 5 },
  acceptModalButton: { backgroundColor: '#2563EB', paddingVertical: 12, borderRadius: 25, alignItems: 'center', alignSelf: 'center', width: '60%' },
  acceptModalButtonText: { color: '#fff', fontSize: 20, fontWeight: '600' },
  modalOverlayMenu: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', flexDirection: 'row' },
  modalTransparentLayer: { flex: 1 },
  menuContainer: { width: '80%', backgroundColor: '#fff', height: '100%', padding: 25, shadowColor: "#000", elevation: 5 },
  menuHeader: { alignItems: 'center', marginBottom: 30, marginTop: 20 },
  menuAvatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#E1E1E1', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  menuUserName: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF8E1', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  ratingText: { fontWeight: 'bold', color: '#333', marginRight: 4 },
  creditBox: { backgroundColor: '#F3F4F6', borderRadius: 10, padding: 15, marginBottom: 30, alignItems: 'center' },
  creditLabel: { fontSize: 14, color: '#666', marginBottom: 5 },
  creditAmount: { fontSize: 22, fontWeight: 'bold', color: '#10B981' },
  menuOptions: { flex: 1 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  menuItemText: { fontSize: 16, color: '#333', marginLeft: 15 },
  menuFooter: { borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 20, alignItems: 'center' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  logoutText: { color: '#EF4444', fontWeight: '600', fontSize: 16, marginLeft: 8 },
  versionText: { color: '#999', fontSize: 12 }
});