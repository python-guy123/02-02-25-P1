import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import GradientBackground from '../components/GradientBackground';
import Card from '../components/Card';
import {useApp} from '../context/AppContext';
import {getGreeting} from '../utils/helpers';
import {MainTabParamList} from '../types';

type HomeScreenNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {events, emails, reminders} = useApp();

  const upcomingEvents = events.filter(
    e => new Date(e.startDate) > new Date(),
  ).length;
  const unreadEmails = emails.filter(e => !e.isRead).length;
  const activeReminders = reminders.filter(r => !r.isCompleted).length;

  return (
    <GradientBackground>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.greeting}>{getGreeting()}!</Text>
          <Text style={styles.subtitle}>I'm Zia, your AI assistant</Text>
        </View>

        <Card style={styles.quickStats}>
          <Text style={styles.statsTitle}>Quick Overview</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{upcomingEvents}</Text>
              <Text style={styles.statLabel}>Upcoming Events</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{unreadEmails}</Text>
              <Text style={styles.statLabel}>Unread Emails</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{activeReminders}</Text>
              <Text style={styles.statLabel}>Active Reminders</Text>
            </View>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <Card onPress={() => navigation.navigate('Chat')}>
          <View style={styles.actionCard}>
            <Text style={styles.actionIcon}>💬</Text>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Chat with Zia</Text>
              <Text style={styles.actionDescription}>
                Ask me anything or get help with tasks
              </Text>
            </View>
          </View>
        </Card>

        <Card onPress={() => navigation.navigate('Calendar')}>
          <View style={styles.actionCard}>
            <Text style={styles.actionIcon}>📅</Text>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Manage Calendar</Text>
              <Text style={styles.actionDescription}>
                View and organize your events
              </Text>
            </View>
          </View>
        </Card>

        <Card onPress={() => navigation.navigate('Email')}>
          <View style={styles.actionCard}>
            <Text style={styles.actionIcon}>📧</Text>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Check Emails</Text>
              <Text style={styles.actionDescription}>
                Read, summarize, and reply to emails
              </Text>
            </View>
          </View>
        </Card>

        <Card onPress={() => navigation.navigate('Reminders')}>
          <View style={styles.actionCard}>
            <Text style={styles.actionIcon}>⏰</Text>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Set Reminders</Text>
              <Text style={styles.actionDescription}>
                Never forget important tasks
              </Text>
            </View>
          </View>
        </Card>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Tap on any card to get started
          </Text>
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 32,
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  quickStats: {
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
});

export default HomeScreen;
