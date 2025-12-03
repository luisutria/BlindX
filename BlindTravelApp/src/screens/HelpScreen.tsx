import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Linking,
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function HelpScreen({ navigation }: any) {

  const SUPPORT_PHONE = '3124568907';
  const SUPPORT_EMAIL = 'soporte@blindx.app';

  // Función para llamar de verdad
  const handleCall = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${SUPPORT_PHONE}`;
    } else {
      phoneNumber = `telprompt:${SUPPORT_PHONE}`;
    }
    Linking.openURL(phoneNumber);
  };

  // Función para abrir correo
  const handleEmail = () => {
    Linking.openURL(`mailto:${SUPPORT_EMAIL}?subject=Ayuda con BlindX`);
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
        <Text style={styles.headerTitle} accessibilityRole="header">Ayuda y Asistencia</Text>
        <View style={{ width: 28 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.content}>

        {/* --- HERO SECTION --- */}
        <View style={styles.heroContainer}>
            <View style={styles.iconCircle}>
                <Ionicons name="headset" size={50} color="#2563EB" />
            </View>
            <Text style={styles.heroTitle}>¿Cómo podemos ayudarte?</Text>
            <Text style={styles.heroSubtitle}>Nuestro equipo está disponible 24/7 para asistirte en tus viajes.</Text>
        </View>

        {/* --- BOTONES DE CONTACTO DIRECTO --- */}
        <Text style={styles.sectionTitle}>Contacto Directo</Text>

        {/* Botón Llamar */}
        <TouchableOpacity 
            style={styles.contactCard}
            onPress={handleCall}
            accessibilityRole="button"
            accessibilityLabel={`Llamar a soporte técnico al ${SUPPORT_PHONE}`}
            accessibilityHint="Abre la aplicación de teléfono"
        >
            <View style={[styles.iconBox, { backgroundColor: '#DCFCE7' }]}>
                <Ionicons name="call" size={24} color="#10B981" />
            </View>
            <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Llámanos</Text>
                <Text style={styles.cardSubtitle}>{SUPPORT_PHONE}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        {/* Botón Correo */}
        <TouchableOpacity 
            style={styles.contactCard}
            onPress={handleEmail}
            accessibilityRole="button"
            accessibilityLabel={`Enviar correo a ${SUPPORT_EMAIL}`}
        >
            <View style={[styles.iconBox, { backgroundColor: '#DBEAFE' }]}>
                <Ionicons name="mail" size={24} color="#2563EB" />
            </View>
            <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Escríbenos</Text>
                <Text style={styles.cardSubtitle}>{SUPPORT_EMAIL}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>

        {/* --- PREGUNTAS FRECUENTES (FAQ) --- */}
        <Text style={styles.sectionTitle}>Preguntas Frecuentes</Text>

        <View style={styles.faqContainer}>
            <View style={styles.faqItem}>
                <Text style={styles.faqQuestion}>¿Cómo funciona el botón de pánico?</Text>
                <Text style={styles.faqAnswer}>Presiona 4 veces rápido la pantalla durante un viaje para enviar tu ubicación a tus contactos seguros.</Text>
            </View>

            <View style={styles.faqDivider} />

            <View style={styles.faqItem}>
                <Text style={styles.faqQuestion}>¿Qué métodos de pago aceptan?</Text>
                <Text style={styles.faqAnswer}>Aceptamos tarjetas de crédito, débito y pagos a través de la tienda de aplicaciones (Google Play).</Text>
            </View>

            <View style={styles.faqDivider} />

            <View style={styles.faqItem}>
                <Text style={styles.faqQuestion}>¿Cómo reportar un objeto perdido?</Text>
                <Text style={styles.faqAnswer}>Si perdiste algo, usa el botón de "Llámanos" inmediatamente para contactar al conductor.</Text>
            </View>
        </View>

      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
          <Text style={styles.footerText}>BlindX Inc. © 2025</Text>
          <Text style={styles.footerText}>Versión 1.0.0</Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#111' },
  
  content: { padding: 20 },

  // Hero
  heroContainer: { alignItems: 'center', marginBottom: 30, marginTop: 10 },
  iconCircle: {
      width: 100, height: 100, borderRadius: 50,
      backgroundColor: '#EFF6FF',
      justifyContent: 'center', alignItems: 'center',
      marginBottom: 15
  },
  heroTitle: { fontSize: 22, fontWeight: 'bold', color: '#111', marginBottom: 8, textAlign: 'center' },
  heroSubtitle: { fontSize: 14, color: '#6B7280', textAlign: 'center', paddingHorizontal: 20, lineHeight: 20 },

  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#6B7280', marginBottom: 15, marginTop: 10, textTransform: 'uppercase' },

  // Tarjetas de Contacto
  contactCard: {
      flexDirection: 'row', alignItems: 'center',
      backgroundColor: '#fff', padding: 16, borderRadius: 16,
      marginBottom: 12,
      shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2
  },
  iconBox: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  cardTextContainer: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#111' },
  cardSubtitle: { fontSize: 14, color: '#6B7280', marginTop: 2 },

  // FAQ
  faqContainer: { backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 30, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  faqItem: { marginBottom: 10 },
  faqQuestion: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  faqAnswer: { fontSize: 14, color: '#555', lineHeight: 20 },
  faqDivider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 15 },

  // Footer
  footer: { alignItems: 'center', paddingBottom: 20 },
  footerText: { fontSize: 12, color: '#9CA3AF' }
});