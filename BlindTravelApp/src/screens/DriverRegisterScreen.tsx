import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, 
  Switch, Modal, Alert, KeyboardAvoidingView, Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '../config/api';

export default function DriverRegisterScreen({ navigation }: any) {
  
  // Estados para el formulario
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    vehicleType: '',
    phone: '',
    idNumber: '',
    email: '',
    password: '123' // Contraseña temporal o agregar campo si se requiere
  });
  
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Simulación de carga de archivos
  const handleUpload = (docName: string) => {
    Alert.alert("Cargar Documento", `Abriendo selector para: ${docName}`);
  };

  const handleRegister = async () => {
    if (!termsAccepted) {
      Alert.alert("Atención", "Debes aceptar los términos y condiciones.");
      return;
    }
    // Aquí conectarías con tu backend (POST /users) con role: 'driver'
    // Simulamos éxito por ahora:
    Alert.alert("Solicitud Enviada", "Tu registro de conductor está en revisión.", [
        { text: "Entendido", onPress: () => navigation.navigate('Login') }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle" size={40} color="#2563EB" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Registro Conductor</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          {/* AVATAR EDITABLE */}
          <View style={styles.avatarContainer}>
             <View style={styles.avatarCircle}>
                <Ionicons name="person" size={50} color="#555" />
                <View style={styles.editIconBadge}>
                    <Ionicons name="pencil" size={16} color="#fff" />
                </View>
             </View>
          </View>

          {/* CAMPOS DE TEXTO (Según imagen) */}
          <TextInput style={styles.input} placeholder="Nombre" placeholderTextColor="#999" onChangeText={(t) => setFormData({...formData, fullName: t})} />
          <TextInput style={styles.input} placeholder="Usuario" placeholderTextColor="#999" onChangeText={(t) => setFormData({...formData, username: t})} />
          <TextInput style={styles.input} placeholder="Tipo de vehiculo" placeholderTextColor="#999" onChangeText={(t) => setFormData({...formData, vehicleType: t})} />
          <TextInput style={styles.input} placeholder="Telefono" keyboardType="phone-pad" placeholderTextColor="#999" onChangeText={(t) => setFormData({...formData, phone: t})} />
          <TextInput style={styles.input} placeholder="Numero de cedula" keyboardType="numeric" placeholderTextColor="#999" onChangeText={(t) => setFormData({...formData, idNumber: t})} />
          <TextInput style={styles.input} placeholder="Correo" keyboardType="email-address" placeholderTextColor="#999" onChangeText={(t) => setFormData({...formData, email: t})} />

          {/* CAMPOS DE CARGA (Uploads) */}
          <TouchableOpacity style={styles.uploadInput} onPress={() => handleUpload('Cédula')}>
              <Text style={styles.uploadText}>Adjuntar cedula</Text>
              <Ionicons name="cloud-upload-outline" size={24} color="#333" />
          </TouchableOpacity>

          {/* Papeles con Ayuda (?) */}
          <View style={styles.rowWithHelp}>
              <TouchableOpacity style={[styles.uploadInput, { flex: 1, marginBottom: 0 }]} onPress={() => handleUpload('Papeles Vehículo')}>
                  <Text style={styles.uploadText}>Adjuntar papeles de vehiculo</Text>
                  <Ionicons name="cloud-upload-outline" size={24} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.helpButton} onPress={() => setShowHelpModal(true)}>
                  <Ionicons name="help-circle-outline" size={30} color="#333" />
              </TouchableOpacity>
          </View>
          {/* Espaciador manual porque el marginBottom del input de arriba se quitó para alinear */}
          <View style={{height: 15}} /> 

          <TouchableOpacity style={styles.uploadInput} onPress={() => handleUpload('Licencia Conductor')}>
              <Text style={styles.uploadText}>Adjuntar licencia de conductor</Text>
              <Ionicons name="cloud-upload-outline" size={24} color="#333" />
          </TouchableOpacity>

          {/* TÉRMINOS */}
          <View style={styles.termsContainer}>
             <Switch 
                value={termsAccepted} 
                onValueChange={setTermsAccepted}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={termsAccepted ? "#2563EB" : "#f4f3f4"}
             />
             <Text style={styles.termsText}>
                He leído y acepto los <Text style={styles.linkText}>terminos y condiciones ↗</Text>
             </Text>
          </View>

          {/* BOTÓN ACEPTAR */}
          <TouchableOpacity style={styles.acceptButton} onPress={handleRegister}>
              <Text style={styles.acceptButtonText}>Aceptar</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>

      {/* MODAL DE AYUDA */}
      <Modal animationType="fade" transparent={true} visible={showHelpModal} onRequestClose={() => setShowHelpModal(false)}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                    <Ionicons name="document-text-outline" size={24} color="#2563EB" />
                    <Text style={styles.modalTitle}>Documentos Requeridos</Text>
                </View>
                <View style={styles.docList}>
                    <Text style={styles.docItem}>• Licencia de tránsito</Text>
                    <Text style={styles.docItem}>• SOAT Vigente</Text>
                    <Text style={styles.docItem}>• Revisión técnico-mecánica</Text>
                </View>
                <TouchableOpacity style={styles.closeModalButton} onPress={() => setShowHelpModal(false)}>
                    <Text style={styles.closeModalText}>Entendido</Text>
                </TouchableOpacity>
            </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 10 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#000' },
  scrollContent: { padding: 20, paddingBottom: 50 },
  avatarContainer: { alignItems: 'center', marginBottom: 30 },
  avatarCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center' },
  editIconBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#333', padding: 6, borderRadius: 20 },
  input: { height: 50, borderColor: '#E5E7EB', borderWidth: 1, borderRadius: 10, paddingHorizontal: 15, marginBottom: 15, fontSize: 16, color: '#333' },
  uploadInput: { height: 50, borderColor: '#E5E7EB', borderWidth: 1, borderRadius: 10, paddingHorizontal: 15, marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  uploadText: { color: '#999', fontSize: 16 },
  rowWithHelp: { flexDirection: 'row', alignItems: 'center' },
  helpButton: { marginLeft: 10 },
  termsContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginTop: 10 },
  termsText: { marginLeft: 10, fontSize: 12, color: '#333', flex: 1 },
  linkText: { color: '#2563EB', fontWeight: 'bold' },
  acceptButton: { backgroundColor: '#2563EB', height: 55, borderRadius: 10, justifyContent: 'center', alignItems: 'center', shadowColor: "#000", elevation: 4 },
  acceptButtonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', backgroundColor: '#fff', borderRadius: 20, padding: 25, alignItems: 'center', elevation: 5 },
  modalHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginLeft: 10 },
  docList: { width: '100%', marginBottom: 25 },
  docItem: { fontSize: 16, color: '#555', marginBottom: 8, paddingLeft: 10 },
  closeModalButton: { backgroundColor: '#2563EB', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 20 },
  closeModalText: { color: '#fff', fontWeight: 'bold' }
});