import PushNotification from 'react-native-push-notification';
import {Reminder} from '../types';

export class NotificationService {
  static configure() {
    PushNotification.configure({
      onNotification: function (notification: any) {
        console.log('NOTIFICATION:', notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });

    PushNotification.createChannel(
      {
        channelId: 'zia-reminders',
        channelName: 'Zia Reminders',
        channelDescription: 'Reminders from Zia Assistant',
        playSound: true,
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      (created: boolean) => console.log(`Channel created: ${created}`),
    );
  }

  static scheduleReminder(reminder: Reminder) {
    PushNotification.localNotificationSchedule({
      channelId: 'zia-reminders',
      id: reminder.id,
      title: 'Reminder: ' + reminder.title,
      message: reminder.description,
      date: reminder.dueDate,
      allowWhileIdle: true,
    });
  }

  static cancelReminder(reminderId: string) {
    PushNotification.cancelLocalNotification(reminderId);
  }

  static sendImmediateNotification(title: string, message: string) {
    PushNotification.localNotification({
      channelId: 'zia-reminders',
      title: title,
      message: message,
    });
  }
}
