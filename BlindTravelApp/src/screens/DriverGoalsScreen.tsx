import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function DriverGoalsScreen({ navigation }: any) {
  
  const dailyGoal = {
    current: 8,
    target: 12,
    reward: '$ 12.000',
    timeLeft: '6h 30m'
  };

  const progressPercent = (dailyGoal.current / dailyGoal.target) * 100;

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Metas Alcanzadas</Text>
        <View style={{ width: 28 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.content}>

        <View style={styles.goalCard}>
            <View style={styles.goalHeader}>
                <Text style={styles.goalTitle}>Meta Diaria</Text>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>En Progreso</Text>
                </View>
            </View>

            <Text style={styles.rewardLabel}>Bono Extra:</Text>
            <Text style={styles.rewardAmount}>{dailyGoal.reward}</Text>

            <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${progressPercent}%` }]} />
            </View>
            
            <View style={styles.statsRow}>
                <Text style={styles.statsText}>
                    <Text style={styles.bold}>{dailyGoal.current}</Text> / {dailyGoal.target} Viajes
                </Text>
                <Text style={styles.timeLeft}>Termina en {dailyGoal.timeLeft}</Text>
            </View>

            <Text style={styles.motivationText}>
                ¡Solo te faltan {dailyGoal.target - dailyGoal.current} viajes para ganar tu bono!
            </Text>
        </View>

        <Text style={styles.sectionTitle}>Niveles de la Semana</Text>

        <View style={styles.levelCard}>
            <View style={styles.iconBoxGold}>
                <Ionicons name="trophy" size={24} color="#D97706" />
            </View>
            <View style={styles.levelInfo}>
                <Text style={styles.levelTitle}>Nivel Oro</Text>
                <Text style={styles.levelDesc}>Completa 50 viajes esta semana</Text>
            </View>
            <Text style={styles.levelReward}>+ $25k</Text> 
        </View>

        <View style={[styles.levelCard, { opacity: 0.8 }]}>
            <View style={styles.iconBoxSilver}>
                <Ionicons name="medal" size={24} color="#6B7280" />
            </View>
            <View style={styles.levelInfo}>
                <Text style={styles.levelTitle}>Nivel Plata</Text>
                <Text style={styles.levelDesc}>Completa 30 viajes esta semana</Text>
            </View>
            <Text style={styles.levelReward}>+ $15k</Text> 
        </View>

      </ScrollView>

      <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.actionButtonText}>Volver a Conducir</Text>
          </TouchableOpacity>
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
  goalCard: {
      backgroundColor: '#fff', borderRadius: 20, padding: 25,
      shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 5,
      marginBottom: 30
  },
  goalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  goalTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  badge: { backgroundColor: '#DBEAFE', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  badgeText: { color: '#2563EB', fontWeight: 'bold', fontSize: 12 },
  rewardLabel: { fontSize: 14, color: '#666', textAlign: 'center' },
  rewardAmount: { fontSize: 42, fontWeight: 'bold', color: '#10B981', textAlign: 'center', marginVertical: 10 },
  progressContainer: { height: 12, backgroundColor: '#F3F4F6', borderRadius: 6, width: '100%', overflow: 'hidden', marginBottom: 10 },
  progressBar: { height: '100%', backgroundColor: '#2563EB', borderRadius: 6 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  statsText: { fontSize: 16, color: '#333' },
  bold: { fontWeight: 'bold' },
  timeLeft: { fontSize: 14, color: '#EF4444', fontWeight: '600' },
  motivationText: { textAlign: 'center', color: '#666', fontStyle: 'italic' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111', marginBottom: 15 },
  levelCard: { 
      flexDirection: 'row', alignItems: 'center', 
      backgroundColor: '#fff', padding: 15, borderRadius: 15, marginBottom: 10,
      borderWidth: 1, borderColor: '#E5E7EB'
  },
  iconBoxGold: { backgroundColor: '#FEF3C7', padding: 10, borderRadius: 12, marginRight: 15 },
  iconBoxSilver: { backgroundColor: '#F3F4F6', padding: 10, borderRadius: 12, marginRight: 15 },
  levelInfo: { flex: 1 },
  levelTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  levelDesc: { fontSize: 12, color: '#666' },
  levelReward: { fontSize: 16, fontWeight: 'bold', color: '#10B981' },
  footer: { padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E5E7EB' },
  actionButton: { backgroundColor: '#2563EB', paddingVertical: 15, borderRadius: 12, alignItems: 'center' },
  actionButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});