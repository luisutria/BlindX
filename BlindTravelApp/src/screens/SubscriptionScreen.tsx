import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function SubscriptionScreen({ navigation }: any) {
  
  // Lista de beneficios ACTUALIZADA
  const benefits = [
    { 
      id: 1, 
      icon: 'gift', 
      text: 'Disfruta de 50% de descuentos en viajes largos y viaje cortos totalmente gratis', 
      color: '#10B981' // Verde
    },
    { 
      id: 2, 
      icon: 'cash', 
      text: 'Solo por $50.000 pesos al mes', 
      color: '#2563EB' // Azul
    },
    { 
      id: 3, 
      icon: 'flash', 
      text: 'Prioridad alta al buscar conductor', 
      color: '#F59E0B' // Dorado
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Regresar a configuración"
        >
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} accessibilityRole="header">Suscripción</Text>
        <View style={{ width: 28 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* --- TARJETA DEL PLAN ACTUAL --- */}
        <View 
            style={styles.currentPlanCard}
            accessible={true}
            accessibilityLabel="Tu plan actual es Gratuito."
        >
            <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>ACTUAL</Text>
            </View>
            <Text style={styles.planTitle}>Plan Gratuito</Text>
            <Text style={styles.planPrice}>$0 / mes</Text>
            <Text style={styles.planSubtext}>Funciones básicas de movilidad</Text>
        </View>

        {/* --- SECCIÓN: VENTAJAS BLINDX GOLD --- */}
        <Text style={styles.sectionTitle} accessibilityRole="header">Ventajas BlindX Gold</Text>
        <Text style={styles.sectionSubtitle}>Pásate a Premium y viaja sin límites</Text>

        <View style={styles.benefitsContainer}>
            {benefits.map((item) => (
                <View 
                    key={item.id} 
                    style={styles.benefitItem}
                    accessible={true}
                    accessibilityLabel={`Beneficio Premium: ${item.text}`}
                >
                    <View style={[styles.iconWrapper, { backgroundColor: `${item.color}20` }]}>
                        <Ionicons name={item.icon as any} size={24} color={item.color} />
                    </View>
                    <Text style={styles.benefitText}>{item.text}</Text>
                </View>
            ))}
        </View>

      </ScrollView>

      {/* --- FOOTER CON BOTÓN DE GESTIÓN --- */}
      <View style={styles.footerContainer}>
          
          {/* 👇 AQUÍ ESTABA EL PROBLEMA, YA ESTÁ CORREGIDO 👇 */}
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Payment')} 
            accessibilityRole="button"
            accessibilityLabel="Cambiar o cancelar suscripción"
            accessibilityHint="Te llevará a la pantalla de pago"
          >
            <Text style={styles.actionButtonText}>Cambiar o cancelar suscripción</Text>
          </TouchableOpacity>
          
          <Text style={styles.legalText}>
              La suscripción se renueva automáticamente cada mes. Puedes cancelar cuando quieras desde los ajustes.
          </Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#111' },
  
  scrollContent: { padding: 20, paddingBottom: 120 }, 

  // Tarjeta Plan Actual
  currentPlanCard: {
      backgroundColor: '#fff',
      borderRadius: 16,
      padding: 24,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#E5E7EB',
      marginBottom: 30,
      shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2
  },
  badgeContainer: {
      backgroundColor: '#E5E7EB',
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 20,
      marginBottom: 10
  },
  badgeText: { fontSize: 12, fontWeight: 'bold', color: '#4B5563' },
  planTitle: { fontSize: 24, fontWeight: 'bold', color: '#111', marginBottom: 5 },
  planPrice: { fontSize: 32, fontWeight: 'bold', color: '#6B7280', marginBottom: 5 },
  planSubtext: { fontSize: 14, color: '#6B7280' },

  // Sección Ventajas
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111', marginBottom: 5 },
  sectionSubtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  benefitsContainer: {
      backgroundColor: '#fff',
      borderRadius: 16,
      padding: 10,
      shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1
  },
  benefitItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 20,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#F3F4F6'
  },
  iconWrapper: {
      width: 44,
      height: 44,
      borderRadius: 22,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15
  },
  benefitText: {
      flex: 1,
      fontSize: 16,
      color: '#374151',
      lineHeight: 24,
      fontWeight: '500'
  },

  // Footer Fijo
  footerContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: '#E5E7EB',
      alignItems: 'center'
  },
  actionButton: {
      width: '100%',
      backgroundColor: '#fff',
      borderWidth: 2,
      borderColor: '#EF4444', 
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginBottom: 10
  },
  actionButtonText: {
      color: '#EF4444',
      fontSize: 16,
      fontWeight: 'bold'
  },
  legalText: {
      fontSize: 11,
      color: '#9CA3AF',
      textAlign: 'center',
      paddingHorizontal: 10
  }
});