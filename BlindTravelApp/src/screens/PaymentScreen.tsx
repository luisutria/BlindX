import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function PaymentScreen({ navigation }: any) {
  const [loading, setLoading] = useState(false);

  // Simulación del proceso de pago con Google Play
  const handlePurchase = () => {
    setLoading(true);
    
    // Simulamos la demora de la ventana nativa de Google
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "¡Suscripción Exitosa!", 
        "Bienvenido a BlindX Gold. El cobro se ha procesado a través de Google Play.",
        [{ text: "Aceptar", onPress: () => navigation.navigate('Home') }]
      );
    }, 2000);
  };

  const handleManage = () => {
    Alert.alert("Google Play", "Redirigiendo a la gestión de suscripciones de Google Play...");
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Cancelar y regresar"
        >
          <Ionicons name="close" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} accessibilityRole="header">Confirmar Suscripción</Text>
        <View style={{ width: 28 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.content}>

        {/* --- ICONO PREMIUM --- */}
        <View style={styles.heroContainer}>
            <View style={styles.iconCircle}>
                <Ionicons name="diamond" size={50} color="#F59E0B" />
            </View>
            <Text style={styles.productName}>BlindX Gold</Text>
            <Text style={styles.productDesc}>Acceso total sin límites</Text>
        </View>

        {/* --- TARJETA DE PRECIO --- */}
        <View style={styles.priceCard}>
            <View style={styles.priceRow}>
                <Text style={styles.currency}>COP</Text>
                <Text style={styles.price}>$50.000</Text>
            </View>
            <Text style={styles.period}>/ mes</Text>
            
            <View style={styles.divider} />
            
            <View style={styles.storeInfo}>
                <Ionicons name="logo-google-playstore" size={20} color="#5F6368" />
                <Text style={styles.storeText}>Facturado por Google Play</Text>
            </View>
        </View>

        {/* --- INFORMACIÓN LEGAL --- */}
        <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Lo que debes saber:</Text>
            <View style={styles.bulletPoint}>
                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                <Text style={styles.bulletText}>Se renovará automáticamente cada mes.</Text>
            </View>
            <View style={styles.bulletPoint}>
                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                <Text style={styles.bulletText}>Cancela en cualquier momento desde la tienda.</Text>
            </View>
        </View>

      </ScrollView>

      {/* --- FOOTER DE ACCIÓN --- */}
      <View style={styles.footer}>
          
          {/* BOTÓN PRINCIPAL (ESTILO GOOGLE PLAY) */}
          <TouchableOpacity 
            style={styles.payButton}
            onPress={handlePurchase}
            disabled={loading}
            accessibilityRole="button"
            accessibilityLabel="Suscribirse por 50 mil pesos al mes con Google Play"
            accessibilityHint="Doble toque para confirmar el pago"
          >
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={styles.payButtonText}>Suscribirse con Google Play</Text>
            )}
          </TouchableOpacity>

          {/* BOTÓN SECUNDARIO (GESTIONAR/CANCELAR) */}
          <TouchableOpacity 
            style={styles.manageButton}
            onPress={handleManage}
            accessibilityRole="button"
            accessibilityLabel="Administrar suscripción existente"
          >
            <Text style={styles.manageButtonText}>Administrar suscripción existente</Text>
          </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#111' },
  
  content: { padding: 24, alignItems: 'center' },

  // Hero Section
  heroContainer: { alignItems: 'center', marginBottom: 30, marginTop: 10 },
  iconCircle: {
      width: 100, height: 100, borderRadius: 50,
      backgroundColor: '#FFFBEB',
      justifyContent: 'center', alignItems: 'center',
      marginBottom: 15,
      borderWidth: 1, borderColor: '#FCD34D'
  },
  productName: { fontSize: 28, fontWeight: 'bold', color: '#111', marginBottom: 5 },
  productDesc: { fontSize: 16, color: '#666' },

  // Precio
  priceCard: {
      width: '100%',
      backgroundColor: '#F8F9FA',
      borderRadius: 16,
      padding: 24,
      alignItems: 'center',
      borderWidth: 1, borderColor: '#E8EAED',
      marginBottom: 30
  },
  priceRow: { flexDirection: 'row', alignItems: 'baseline' },
  currency: { fontSize: 16, fontWeight: 'bold', color: '#333', marginRight: 5 },
  price: { fontSize: 40, fontWeight: 'bold', color: '#111' },
  period: { fontSize: 16, color: '#666', marginBottom: 15 },
  divider: { width: '100%', height: 1, backgroundColor: '#E8EAED', marginBottom: 15 },
  storeInfo: { flexDirection: 'row', alignItems: 'center' },
  storeText: { marginLeft: 8, color: '#5F6368', fontWeight: '500' },

  // Info
  infoContainer: { width: '100%' },
  infoTitle: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  bulletPoint: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  bulletText: { marginLeft: 10, color: '#555', fontSize: 14, flex: 1 },

  // Footer
  footer: {
      padding: 24,
      borderTopWidth: 1, borderTopColor: '#F1F3F4'
  },
  payButton: {
      width: '100%',
      height: 56,
      backgroundColor: '#01875F', // Verde oficial de Google Play
      borderRadius: 8,
      justifyContent: 'center', alignItems: 'center',
      marginBottom: 15,
      shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, elevation: 3
  },
  payButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  manageButton: { alignItems: 'center', padding: 10 },
  manageButtonText: { color: '#01875F', fontWeight: '600', fontSize: 14 }
});