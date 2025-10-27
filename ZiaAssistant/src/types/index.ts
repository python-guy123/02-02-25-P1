export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'zia';
  timestamp: Date;
  isVoice?: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  reminder?: number;
}

export interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  timestamp: Date;
  isRead: boolean;
  summary?: string;
  suggestedReply?: string;
}

export interface Reminder {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  isCompleted: boolean;
  priority: 'low' | 'medium' | 'high';
}

export type RootStackParamList = {
  MainTabs: undefined;
  ChatDetail: undefined;
  EventDetail: { eventId?: string };
  EmailDetail: { emailId: string };
  ReminderDetail: { reminderId?: string };
};

export type MainTabParamList = {
  Home: undefined;
  Chat: undefined;
  Calendar: undefined;
  Email: undefined;
  Reminders: undefined;
};
