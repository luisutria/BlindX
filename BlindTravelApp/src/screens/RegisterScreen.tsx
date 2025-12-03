
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Definimos la interfaz para las props, incluyendo la navegación
interface RegisterScreenProps {
  navigation: any;
}

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* ENCABEZADO CON BOTÓN ATRÁS MINIMALISTA */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Regresar"
            accessibilityHint="Vuelve a la pantalla de inicio de sesión"
          >
            <Ionicons name="arrow-back" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} accessibilityRole="header">Selector registro</Text>
          {/* View vacío para equilibrar el header */}
          <View style={{ width: 28 }} /> 
        </View>

        {/* LOGO PRINCIPAL */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/logo_blindx.png')} 
            style={styles.mainLogo}
            accessibilityRole="image"
            accessibilityLabel="Logotipo de BlindX"
          />
        </View>

        {/* TÍTULO E INSTRUCCIÓN ACCESIBLES */}
        <View 
          style={styles.instructionContainer}
          accessible={true}
          accessibilityLabel="Instrucción de selección. Seleccione qué tipo de usuario será usted."
        >
          <Text style={styles.instructionTitle}>Seleccione</Text>
          <Text style={styles.instructionSubtitle}>Que tipo de usuario sera usted</Text>
        </View>

        {/* OPCIÓN USUARIO */}
        <View style={styles.optionContainer}>
            {/* Placeholder para la imagen de Usuario */}
            <View style={styles.placeholderImage}>
                <Ionicons name="person-outline" size={60} color="#555" />
            </View>
            {/* Cuando tengas la imagen, usa esto:
            <Image 
              source={require('../../assets/img_usuario.png')} 
              style={styles.optionImage}
              accessibilityRole="image"
            /> 
            */}
          <TouchableOpacity 
            style={styles.optionButton}
            accessibilityRole="button"
            accessibilityLabel="Registrarse como Usuario"
            accessibilityHint="Navega al formulario de registro para pasajeros"
            onPress={() => navigation.navigate('RegisterUser')}
          >
            <Text style={styles.optionButtonText}>Usuario</Text>
          </TouchableOpacity>
        </View>

        {/* OPCIÓN CONDUCTOR */}
        <View style={styles.optionContainer}>
            {/* Placeholder para la imagen de Conductor */}
            <View style={styles.placeholderImage}>
                <Ionicons name="car-sport-outline" size={60} color="#555" />
            </View>
             {/* Cuando tengas la imagen, usa esto:
            <Image 
              source={require('../../assets/img_conductor.png')} 
              style={styles.optionImage}
              accessibilityRole="image"
            /> 
            */}
          <TouchableOpacity 
            style={styles.optionButton}
            accessibilityRole="button"
            accessibilityLabel="Registrarse como Conductor"
            accessibilityHint="Navega al formulario de registro para conductores"
            onPress={() => navigation.navigate('DriverRegister')}
          >
            <Text style={styles.optionButtonText}>Conductor</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    color: '#999',
  },
  logoContainer: {
    marginBottom: 30,
  },
  mainLogo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  instructionContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  instructionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  instructionSubtitle: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  optionContainer: {
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  placeholderImage: {
    marginBottom: 15,
    opacity: 0.5
  },
  optionImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  optionButton: {
    width: '100%',
    height: 55,
    backgroundColor: '#2563EB', // Mismo azul del login
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});