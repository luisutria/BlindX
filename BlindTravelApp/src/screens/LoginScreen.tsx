import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  Switch, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '../config/api';

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAutoLogin, setIsAutoLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // --- NUEVA FUNCIÓN: ALERTA DE AYUDA ---
  const showAutoLoginHelp = () => {
    Alert.alert(
      "Información",
      "Si activas esta opción, el sistema iniciará sesión automáticamente cada vez que abras la aplicación, sin pedir usuario ni contraseña."
    );
  };

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Por favor ingresa usuario y contraseña");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: username.trim(),
          password: password.trim()
        })
      });

      const data = await response.json();

      if (response.ok) {
        const { fullName, id, role } = data.user;

        if (role === 'driver') {
            navigation.replace('DriverHome', { userName: fullName, userId: id });
        } else {
            navigation.replace('Home', { userName: fullName, userId: id });
        }

      } else {
        Alert.alert("Error", data.message || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("ERROR:", error);
      Alert.alert("Error de Conexión", "No se pudo conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* LOGO */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/logo_blindx.png')} 
            style={styles.mainLogo}
            accessibilityRole="image"
            accessibilityLabel="Logotipo de BlindX"
          />
        </View>

        <Text style={styles.title} accessibilityRole="header">Iniciar Sesión</Text>
        <Text style={styles.subtitle}>Introduce tu usuario y contraseña</Text>

        {/* FORMULARIO */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Usuario o Correo"
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* BOTÓN INICIO SESIÓN */}
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.primaryButtonText}>Iniciar Sesión</Text>
          )}
        </TouchableOpacity>

        {/* --- TOGGLE AUTO LOGIN CON AYUDA --- */}
        <View style={styles.toggleContainer}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isAutoLogin ? "#2563EB" : "#f4f3f4"}
            onValueChange={() => setIsAutoLogin(prev => !prev)}
            value={isAutoLogin}
          />
          <Text style={styles.toggleText}>Inicio automático</Text>
          
          {/* BOTÓN DE PREGUNTA (?) */}
          <TouchableOpacity onPress={showAutoLoginHelp} style={styles.helpButton}>
             <Ionicons name="help-circle-outline" size={22} color="#666" />
          </TouchableOpacity>
        </View>

        {/* BOTÓN REGISTRARSE */}
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.secondaryButtonText}>Registrarse</Text>
        </TouchableOpacity>

        {/* FOOTER */}
        <View style={styles.footerContainer}>
          <Image 
            source={require('../../assets/logo_america.png')} 
            style={styles.footerLogo}
            resizeMode="contain"
          />
          <Text style={styles.footerText}>
            Esta aplicación ha sido posible gracias al equipo América de Cali
          </Text>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContainer: { flexGrow: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
  logoContainer: { marginBottom: 20, marginTop: 40 },
  mainLogo: { width: 120, height: 120, borderRadius: 60 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#000', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#333', marginBottom: 30, textAlign: 'center' },
  inputContainer: { width: '100%', marginBottom: 10 },
  input: { height: 50, borderColor: '#e1e1e1', borderWidth: 1, borderRadius: 8, paddingHorizontal: 16, marginBottom: 16, fontSize: 16, backgroundColor: '#fff' },
  primaryButton: { width: '100%', height: 55, backgroundColor: '#2563EB', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 16, elevation: 5 },
  primaryButtonText: { color: '#fff', fontSize: 20, fontWeight: '600' },
  
  // Estilos del Toggle y Ayuda
  toggleContainer: { flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: 20 },
  toggleText: { marginLeft: 10, fontSize: 14, color: '#333' },
  helpButton: { marginLeft: 8, padding: 4 }, // Espacio para el dedo

  secondaryButton: { width: '100%', height: 55, backgroundColor: '#2563EB', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 40, opacity: 0.9 },
  secondaryButtonText: { color: '#fff', fontSize: 20, fontWeight: '600' },
  footerContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 'auto', paddingTop: 20 },
  footerLogo: { width: 50, height: 60, marginRight: 12 },
  footerText: { flex: 1, fontSize: 12, color: '#333' },
});