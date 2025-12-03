import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Image,
  Alert,
  ActivityIndicator // Importamos el indicador de carga
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '../config/api'; // Importamos tu IP

interface RegisterUserScreenProps {
  navigation: any;
}

export default function RegisterUserScreen({ navigation }: RegisterUserScreenProps) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [nombreEmergencia, setNombreEmergencia] = useState('');
  const [telefonoEmergencia, setTelefonoEmergencia] = useState('');
  const [password, setPassword] = useState('');
  
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado de carga

  const emailRef = useRef<TextInput>(null);
  const emergencyNameRef = useRef<TextInput>(null);
  const emergencyPhoneRef = useRef<TextInput>(null);
  const passRef = useRef<TextInput>(null);

  // FUNCIÓN PRINCIPAL DE REGISTRO
  const handleRegister = async () => {
    // 1. Validaciones básicas
    if (!nombre || !email || !password || !nombreEmergencia || !telefonoEmergencia) {
      Alert.alert("Error", "Por favor completa todos los campos obligatorios.");
      return;
    }

    setIsLoading(true); // Activamos modo carga

    try {
      // 2. Preparamos los datos
      const userData = {
        fullName: nombre,
        email: email,
        password: password,
        emergencyName: nombreEmergencia,
        emergencyPhone: telefonoEmergencia
        // El backend pondrá el rol 'user' automáticamente
      };

      // 3. Enviamos los datos al Backend
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        // ÉXITO
        Alert.alert(
          "¡Bienvenido!", 
          "Tu cuenta ha sido creada exitosamente.",
          [{ text: "OK", onPress: () => navigation.navigate('Login') }]
        );
      } else {
        // ERROR DEL SERVIDOR (Ej. Email duplicado)
        Alert.alert("Error", result.message || "No se pudo crear el usuario.");
      }

    } catch (error) {
      // ERROR DE RED
      console.error(error);
      Alert.alert("Error de Conexión", "Verifique que su celular y PC estén en la misma red Wi-Fi.");
    } finally {
      setIsLoading(false); // Apagamos modo carga pase lo que pase
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={styles.backButton}
              accessibilityRole="button"
              accessibilityLabel="Regresar"
            >
              <Ionicons name="arrow-back" size={28} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle} accessibilityRole="header">Registro Usuario</Text>
            <View style={{ width: 28 }} /> 
          </View>

          {/* Avatar (Placeholder) */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatarWrapper}>
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="camera-outline" size={40} color="#fff" />
                </View>
            </View>
          </View>

          <View style={styles.formContainer}>
            {/* Inputs... (Se mantienen igual que antes, solo resumo para ahorrar espacio) */}
            
            <Text style={styles.label}>Nombre Completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Juan Pérez"
              value={nombre}
              onChangeText={setNombre}
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current?.focus()}
            />

            <Text style={styles.label}>Correo Electrónico</Text>
            <TextInput
              ref={emailRef}
              style={styles.input}
              placeholder="Ej. usuario@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => emergencyNameRef.current?.focus()}
            />

            <Text style={styles.label}>Nombre Contacto Emergencia</Text>
            <TextInput
              ref={emergencyNameRef}
              style={styles.input}
              placeholder="Ej. Mamá"
              value={nombreEmergencia}
              onChangeText={setNombreEmergencia}
              returnKeyType="next"
              onSubmitEditing={() => emergencyPhoneRef.current?.focus()}
            />

            <Text style={styles.label}>Teléfono de Emergencia</Text>
            <TextInput
              ref={emergencyPhoneRef}
              style={styles.input}
              placeholder="300 123..."
              value={telefonoEmergencia}
              onChangeText={setTelefonoEmergencia}
              keyboardType="phone-pad"
              returnKeyType="next"
              onSubmitEditing={() => passRef.current?.focus()}
            />

            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              ref={passRef}
              style={styles.input}
              placeholder="********"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              returnKeyType="done"
            />

            {/* Checkbox Términos */}
            <TouchableOpacity 
                style={styles.termsContainer}
                onPress={() => setTermsAccepted(!termsAccepted)}
            >
                <View style={[styles.checkboxBase, termsAccepted && styles.checkboxChecked]}>
                    {termsAccepted && <Ionicons name="checkmark" size={18} color="#fff" />}
                </View>
                <Text style={styles.termsText}>
                    Acepto los <Text style={styles.linkText}>Términos y Condiciones</Text>
                </Text>
            </TouchableOpacity>

            {/* BOTÓN REGISTRARSE CON LOGICA DE CARGA */}
            <TouchableOpacity 
              style={[styles.primaryButton, (!termsAccepted || isLoading) && styles.buttonDisabled]}
              disabled={!termsAccepted || isLoading}
              accessibilityRole="button"
              accessibilityLabel={isLoading ? "Registrando usuario, por favor espere" : "Completar registro"}
              onPress={handleRegister} // <--- AQUÍ LLAMAMOS A LA FUNCIÓN
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.primaryButtonText}>Registrarse</Text>
              )}
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... (Tus estilos anteriores se mantienen intactos)
  safeArea: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { flexGrow: 1, padding: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  avatarContainer: { alignItems: 'center', marginBottom: 30 },
  avatarWrapper: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#E1E1E1', justifyContent: 'center', alignItems: 'center' },
  avatarPlaceholder: { alignItems: 'center' },
  formContainer: { width: '100%' },
  label: { fontSize: 16, marginBottom: 8, fontWeight: '500' },
  input: { height: 50, borderColor: '#e1e1e1', borderWidth: 1, borderRadius: 8, paddingHorizontal: 16, marginBottom: 20, backgroundColor: '#f9f9f9' },
  termsContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  checkboxBase: { width: 24, height: 24, borderRadius: 4, borderWidth: 2, borderColor: '#2563EB', marginRight: 10, justifyContent: 'center', alignItems: 'center' },
  checkboxChecked: { backgroundColor: '#2563EB' },
  termsText: { flex: 1 },
  linkText: { color: '#2563EB', fontWeight: 'bold' },
  primaryButton: { width: '100%', height: 55, backgroundColor: '#2563EB', borderRadius: 8, justifyContent: 'center', alignItems: 'center', shadowColor: "#000", elevation: 5 },
  buttonDisabled: { backgroundColor: '#A0C4F7', elevation: 0 },
  primaryButtonText: { color: '#fff', fontSize: 20, fontWeight: '600' },
});