import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function TripHistoryScreen({ navigation }: any) {

  // DATOS SIMULADOS (Dummy Data)
  const historyData = [
    { 
      id: '1', 
      date: 'Hoy, 2:30 PM', 
      destination: 'Centro Comercial Chipichape', 
      price: '$15.000', 
      status: 'Finalizado', 
      driver: 'Carlos',
      car: 'Spark GT'
    },
    { 
      id: '2', 
      date: 'Ayer, 8:15 AM', 
      destination: 'Clínica Valle del Lili', 
      price: '$22.000', 
      status: 'Finalizado', 
      driver: 'Maria',
      car: 'Kia Picanto'
    },
    { 
      id: '3', 
      date: '28 Nov, 6:00 PM', 
      destination: 'Estadio Pascual Guerrero', 
      price: '$0', 
      status: 'Cancelado', 
      driver: '-',
      car: '-'
    },
    { 
      id: '4', 
      date: '25 Nov, 9:00 PM', 
      destination: 'Aeropuerto Alfonso Bonilla', 
      price: '$60.000', 
      status: 'Finalizado', 
      driver: 'Jorge',
      car: 'Renault Logan'
    },
  ];

  // Renderizado de cada tarjeta
  const renderItem = ({ item }: any) => {
    const isCancelled = item.status === 'Cancelado';

    return (
      <View 
        style={styles.card}
        accessible={true}
        accessibilityLabel={`Viaje ${item.status}. Fecha: ${item.date}. Destino: ${item.destination}. Precio: ${item.price}.`}
      >
        {/* Ícono Izquierdo */}
        <View style={[styles.iconContainer, isCancelled ? styles.iconCancelled : styles.iconFinished]}>
          <Ionicons 
            name={isCancelled ? "close" : "checkmark"} 
            size={24} 
            color="#fff" 
          />
        </View>

        {/* Info Central */}
        <View style={styles.cardInfo}>
          <Text style={styles.destinationText} numberOfLines={1}>{item.destination}</Text>
          <Text style={styles.dateText}>{item.date}</Text>
          {!isCancelled && (
            <Text style={styles.driverText}>Conductor: {item.driver} • {item.car}</Text>
          )}
        </View>

        {/* Precio y Estado */}
        <View style={styles.cardRight}>
          <Text style={[styles.priceText, isCancelled && styles.priceCancelled]}>
            {item.price}
          </Text>
          <Text style={[styles.statusText, isCancelled ? styles.textRed : styles.textGreen]}>
            {item.status}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Regresar al menú"
        >
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} accessibilityRole="header">Historial de Viajes</Text>
        <View style={{ width: 28 }} /> 
      </View>

      {/* LISTA DE VIAJES */}
      <FlatList
        data={historyData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        // Mensaje si no hay viajes
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="time-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>Aún no has realizado viajes.</Text>
          </View>
        }
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#111' },
  
  listContent: { padding: 20 },

  // Tarjeta de Viaje
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2
  },
  iconContainer: {
    width: 44, height: 44, borderRadius: 22,
    justifyContent: 'center', alignItems: 'center',
    marginRight: 15
  },
  iconFinished: { backgroundColor: '#10B981' }, // Verde
  iconCancelled: { backgroundColor: '#EF4444' }, // Rojo

  cardInfo: { flex: 1 },
  destinationText: { fontSize: 16, fontWeight: 'bold', color: '#111', marginBottom: 4 },
  dateText: { fontSize: 13, color: '#6B7280', marginBottom: 2 },
  driverText: { fontSize: 12, color: '#9CA3AF' },

  cardRight: { alignItems: 'flex-end' },
  priceText: { fontSize: 16, fontWeight: 'bold', color: '#111', marginBottom: 4 },
  priceCancelled: { color: '#9CA3AF', textDecorationLine: 'line-through' },
  statusText: { fontSize: 12, fontWeight: '600' },
  
  textGreen: { color: '#10B981' },
  textRed: { color: '#EF4444' },

  // Estado vacío
  emptyState: { alignItems: 'center', marginTop: 100 },
  emptyText: { color: '#999', marginTop: 10, fontSize: 16 }
});