import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Message, CalendarEvent, Email, Reminder} from '../types';

interface AppContextType {
  messages: Message[];
  addMessage: (message: Message) => void;
  events: CalendarEvent[];
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (event: CalendarEvent) => void;
  deleteEvent: (id: string) => void;
  emails: Email[];
  addEmail: (email: Email) => void;
  updateEmail: (email: Email) => void;
  reminders: Reminder[];
  addReminder: (reminder: Reminder) => void;
  updateReminder: (reminder: Reminder) => void;
  deleteReminder: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [emails, setEmails] = useState<Email[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [messagesData, eventsData, emailsData, remindersData] = await Promise.all([
        AsyncStorage.getItem('messages'),
        AsyncStorage.getItem('events'),
        AsyncStorage.getItem('emails'),
        AsyncStorage.getItem('reminders'),
      ]);

      if (messagesData) setMessages(JSON.parse(messagesData));
      if (eventsData) setEvents(JSON.parse(eventsData));
      if (emailsData) setEmails(JSON.parse(emailsData));
      if (remindersData) setReminders(JSON.parse(remindersData));
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const addMessage = async (message: Message) => {
    const updated = [...messages, message];
    setMessages(updated);
    await AsyncStorage.setItem('messages', JSON.stringify(updated));
  };

  const addEvent = async (event: CalendarEvent) => {
    const updated = [...events, event];
    setEvents(updated);
    await AsyncStorage.setItem('events', JSON.stringify(updated));
  };

  const updateEvent = async (event: CalendarEvent) => {
    const updated = events.map(e => (e.id === event.id ? event : e));
    setEvents(updated);
    await AsyncStorage.setItem('events', JSON.stringify(updated));
  };

  const deleteEvent = async (id: string) => {
    const updated = events.filter(e => e.id !== id);
    setEvents(updated);
    await AsyncStorage.setItem('events', JSON.stringify(updated));
  };

  const addEmail = async (email: Email) => {
    const updated = [...emails, email];
    setEmails(updated);
    await AsyncStorage.setItem('emails', JSON.stringify(updated));
  };

  const updateEmail = async (email: Email) => {
    const updated = emails.map(e => (e.id === email.id ? email : e));
    setEmails(updated);
    await AsyncStorage.setItem('emails', JSON.stringify(updated));
  };

  const addReminder = async (reminder: Reminder) => {
    const updated = [...reminders, reminder];
    setReminders(updated);
    await AsyncStorage.setItem('reminders', JSON.stringify(updated));
  };

  const updateReminder = async (reminder: Reminder) => {
    const updated = reminders.map(r => (r.id === reminder.id ? reminder : r));
    setReminders(updated);
    await AsyncStorage.setItem('reminders', JSON.stringify(updated));
  };

  const deleteReminder = async (id: string) => {
    const updated = reminders.filter(r => r.id !== id);
    setReminders(updated);
    await AsyncStorage.setItem('reminders', JSON.stringify(updated));
  };

  return (
    <AppContext.Provider
      value={{
        messages,
        addMessage,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        emails,
        addEmail,
        updateEmail,
        reminders,
        addReminder,
        updateReminder,
        deleteReminder,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
