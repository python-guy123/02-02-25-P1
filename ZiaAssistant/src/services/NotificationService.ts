import * as Notifications from 'expo-notifications';
import {Reminder} from '../types';
import {Platform} from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export class NotificationService {
  static async configure() {
    const {status: existingStatus} = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const {status} = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log('Failed to get push notification permissions');
      return;
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('zia-reminders', {
        name: 'Zia Reminders',
        description: 'Reminders from Zia Assistant',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        sound: 'default',
      });
    }
  }

  static async scheduleReminder(reminder: Reminder) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Reminder: ' + reminder.title,
          body: reminder.description,
          sound: 'default',
        },
        trigger: {
          date: reminder.dueDate,
          channelId: 'zia-reminders',
        },
      });
    } catch (error) {
      console.error('Error scheduling reminder:', error);
    }
  }

  static async cancelReminder(reminderId: string) {
    try {
      await Notifications.cancelScheduledNotificationAsync(reminderId);
    } catch (error) {
      console.error('Error canceling reminder:', error);
    }
  }

  static async sendImmediateNotification(title: string, message: string) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: title,
          body: message,
          sound: 'default',
        },
        trigger: null,
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }
}
