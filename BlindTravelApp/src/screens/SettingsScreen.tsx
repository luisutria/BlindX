import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Modal, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech'; 
import { API_URL } from '../config/api'; 

export default function SettingsScreen({ navigation, route }: any) {
  // 1. RECIBIMOS EL ID FINAL AQUÍ
  const { userId } = route.params || { userId: null };

  const [isEmergencyEnabled, setIsEmergencyEnabled] = useState(true);
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('Español');
  const [voiceSpeed, setVoiceSpeed] = useState(0.9);
  const [isDeleting, setIsDeleting] = useState(false);

  const changeVoiceSpeed = (speed: number, label: string) => {
    setVoiceSpeed(speed);
    Speech.stop();
    Speech.speak(`Velocidad configurada en ${label}`, { language: 'es-419', rate: speed });
  };

  const handleDeleteAccount = () => {
    if (!userId) {
        // Si entra aquí, es que se rompió la cadena en Home o Login
        Alert.alert("Error de Identificación", "No se encontró el ID de usuario. Cierra sesión e intenta de nuevo.");
        return;
    }
    Alert.alert(
      "¿Eliminar cuenta permanentemente?",
      "Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sí, eliminar", style: "destructive", onPress: confirmDelete }
      ]
    );
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
        const response = await fetch(`${API_URL}/users/${userId}`, { method: 'DELETE' });
        if (response.ok) {
            Alert.alert("Cuenta Eliminada", "Tu cuenta ha sido borrada.");
            navigation.popToTop();
            navigation.replace('Login');
        } else {
            Alert.alert("Error", "No se pudo eliminar la cuenta.");
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Error de Conexión", "Verifica tu internet.");
    } finally {
        setIsDeleting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configuración</Text>
        <View style={{ width: 28 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Mi Plan</Text>
        <TouchableOpacity style={styles.subscriptionButton} onPress={() => navigation.navigate('Subscription')}>
            <View style={styles.rowLeft}>
                <View style={styles.iconGoldWrapper}><Ionicons name="diamond-outline" size={24} color="#D97706" /></View>
                <View><Text style={styles.settingText}>Cambiar Suscripción</Text><Text style={styles.subText}>Plan Actual: Gratuito</Text></View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#D97706" />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Accesibilidad</Text>
        <View style={styles.settingItemContainer}>
            <View style={styles.settingHeaderRow}><Ionicons name="speedometer-outline" size={24} color="#333" /><Text style={styles.settingText}>Velocidad de Voz</Text></View>
            <View style={styles.speedSelectorContainer}>
                {[ {l:'Lento', v:0.7}, {l:'Normal', v:0.9}, {l:'Rápido', v:1.2} ].map((opt) => (
                    <TouchableOpacity key={opt.l} style={[styles.speedOption, voiceSpeed === opt.v && styles.speedOptionSelected]} onPress={() => changeVoiceSpeed(opt.v, opt.l)}>
                        <Text style={[styles.speedText, voiceSpeed === opt.v && styles.speedTextSelected]}>{opt.l}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>

        <Text style={styles.sectionTitle}>General</Text>
        <View style={styles.settingItemContainerNoMargin}>
            <TouchableOpacity style={styles.settingRowSimple} onPress={() => setShowLanguageOptions(!showLanguageOptions)}>
                <View style={styles.rowLeft}><Ionicons name="language-outline" size={24} color="#333" /><Text style={styles.settingText}>Idioma</Text></View>
                <View style={styles.rowRight}><Text style={styles.valueText}>{currentLanguage}</Text><Ionicons name={showLanguageOptions ? "chevron-up" : "chevron-down"} size={20} color="#666" /></View>
            </TouchableOpacity>
            {showLanguageOptions && (
                <View style={styles.dropdownContainer}>
                    {['Español', 'English', 'Português'].map((lang) => (
                        <TouchableOpacity key={lang} style={styles.dropdownItem} onPress={() => { setCurrentLanguage(lang); setShowLanguageOptions(false); }}>
                            <Text style={[styles.dropdownText, currentLanguage === lang && styles.selectedText]}>{lang}</Text>
                            {currentLanguage === lang && <Ionicons name="checkmark" size={16} color="#2563EB" />}
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>

        <Text style={styles.sectionTitle}>Seguridad</Text>
        <View style={styles.settingRow}>
            <View style={styles.rowLeft}>
                <Ionicons name="alert-circle-outline" size={24} color="#333" />
                <Text style={styles.settingText}>Botón de Emergencia</Text>
                <TouchableOpacity style={styles.helpIcon} onPress={() => setShowHelpModal(true)}><Ionicons name="help-circle" size={22} color="#2563EB" /></TouchableOpacity>
            </View>
            <Switch value={isEmergencyEnabled} onValueChange={setIsEmergencyEnabled} trackColor={{ false: "#767577", true: "#81b0ff" }} thumbColor={isEmergencyEnabled ? "#2563EB" : "#f4f3f4"} />
        </View>

        <View style={styles.dangerZone}>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount} disabled={isDeleting}>
                {isDeleting ? <ActivityIndicator color="#EF4444" /> : <><Ionicons name="trash-outline" size={24} color="#EF4444" /><Text style={styles.deleteText}>Eliminar Cuenta</Text></>}
            </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal animationType="fade" transparent={true} visible={showHelpModal} onRequestClose={() => setShowHelpModal(false)}>
        <View style={styles.modalOverlay}>
            <View style={styles.helpModalContent}>
                <View style={styles.helpHeader}><Ionicons name="information-circle" size={32} color="#2563EB" /><Text style={styles.helpTitle}>Botón de Pánico</Text></View>
                <Text style={styles.helpBody}>Presiona 4 veces rápido la pantalla.</Text>
                <TouchableOpacity style={styles.closeModalButton} onPress={() => setShowHelpModal(false)}><Text style={styles.closeModalText}>Entendido</Text></TouchableOpacity>
            </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#111' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#6B7280', marginBottom: 10, marginTop: 15, textTransform: 'uppercase' },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 10, elevation: 2 },
  settingRowSimple: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  rowRight: { flexDirection: 'row', alignItems: 'center' },
  settingText: { fontSize: 16, color: '#333', marginLeft: 12, fontWeight: '500' },
  valueText: { fontSize: 14, color: '#666', marginRight: 8 },
  subscriptionButton: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFBEB', padding: 16, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: '#FCD34D', elevation: 3 },
  iconGoldWrapper: { backgroundColor: '#FEF3C7', padding: 8, borderRadius: 8 },
  subText: { fontSize: 12, color: '#B45309', marginLeft: 12, marginTop: 2 },
  settingItemContainer: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 10, elevation: 2 },
  settingItemContainerNoMargin: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 10, elevation: 2, overflow: 'hidden' },
  settingHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  speedSelectorContainer: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#F3F4F6', borderRadius: 8, padding: 4 },
  speedOption: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 6 },
  speedOptionSelected: { backgroundColor: '#fff', elevation: 2 },
  speedText: { fontSize: 14, color: '#666', fontWeight: '500' },
  speedTextSelected: { color: '#2563EB', fontWeight: 'bold' },
  dropdownContainer: { borderTopWidth: 1, borderTopColor: '#F3F4F6', backgroundColor: '#FAFAFA' },
  dropdownItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  dropdownText: { fontSize: 15, color: '#4B5563' },
  selectedText: { color: '#2563EB', fontWeight: 'bold' },
  helpIcon: { marginLeft: 8, padding: 4 },
  dangerZone: { marginTop: 30 },
  deleteButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FEF2F2', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#FECACA' },
  deleteText: { color: '#EF4444', fontWeight: 'bold', fontSize: 16, marginLeft: 8 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  helpModalContent: { width: '85%', backgroundColor: '#fff', borderRadius: 20, padding: 24, alignItems: 'center', elevation: 5 },
  helpHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  helpTitle: { fontSize: 18, fontWeight: 'bold', color: '#111', marginLeft: 10 },
  helpBody: { fontSize: 16, color: '#4B5563', textAlign: 'center', lineHeight: 24, marginBottom: 25 },
  closeModalButton: { backgroundColor: '#2563EB', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25, width: '100%', alignItems: 'center' },
  closeModalText: { color: '#fff', fontSize: 16, fontWeight: '600' }
});