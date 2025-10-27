import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useApp} from '../context/AppContext';
import Card from '../components/Card';
import FloatingActionButton from '../components/FloatingActionButton';
import {CalendarEvent} from '../types';
import {generateId, formatDateTime} from '../utils/helpers';

const CalendarScreen = () => {
  const {events, addEvent, deleteEvent} = useApp();
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    location: '',
  });

  const markedDates = events.reduce((acc, event) => {
    const dateStr = new Date(event.startDate).toISOString().split('T')[0];
    acc[dateStr] = {marked: true, dotColor: '#667eea'};
    return acc;
  }, {} as any);

  const eventsForSelectedDate = events.filter(event => {
    const eventDate = new Date(event.startDate).toISOString().split('T')[0];
    return eventDate === selectedDate;
  });

  const handleAddEvent = () => {
    if (!newEvent.title.trim() || !selectedDate) {
      Alert.alert('Error', 'Please enter event title and select a date');
      return;
    }

    const startDate = new Date(selectedDate);
    startDate.setHours(9, 0, 0, 0);
    const endDate = new Date(selectedDate);
    endDate.setHours(10, 0, 0, 0);

    const event: CalendarEvent = {
      id: generateId(),
      title: newEvent.title,
      description: newEvent.description,
      startDate,
      endDate,
      location: newEvent.location,
    };

    addEvent(event);
    setModalVisible(false);
    setNewEvent({title: '', description: '', location: ''});
    Alert.alert('Success', 'Event added successfully!');
  };

  const handleDeleteEvent = (eventId: string) => {
    Alert.alert('Delete Event', 'Are you sure you want to delete this event?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteEvent(eventId),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Calendar
          markedDates={{
            ...markedDates,
            [selectedDate]: {
              selected: true,
              selectedColor: '#667eea',
              marked: markedDates[selectedDate]?.marked,
            },
          }}
          onDayPress={day => setSelectedDate(day.dateString)}
          theme={{
            todayTextColor: '#667eea',
            arrowColor: '#667eea',
            monthTextColor: '#333',
            textMonthFontWeight: 'bold',
            textMonthFontSize: 18,
          }}
        />

        {selectedDate && (
          <View style={styles.eventsSection}>
            <Text style={styles.sectionTitle}>
              Events for {new Date(selectedDate).toLocaleDateString()}
            </Text>
            {eventsForSelectedDate.length === 0 ? (
              <Card>
                <Text style={styles.noEvents}>No events for this day</Text>
              </Card>
            ) : (
              eventsForSelectedDate.map(event => (
                <Card key={event.id}>
                  <View style={styles.eventCard}>
                    <View style={styles.eventContent}>
                      <Text style={styles.eventTitle}>{event.title}</Text>
                      {event.description && (
                        <Text style={styles.eventDescription}>
                          {event.description}
                        </Text>
                      )}
                      {event.location && (
                        <Text style={styles.eventLocation}>📍 {event.location}</Text>
                      )}
                      <Text style={styles.eventTime}>
                        {formatDateTime(new Date(event.startDate))}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleDeleteEvent(event.id)}
                      style={styles.deleteButton}>
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </Card>
              ))
            )}
          </View>
        )}
      </ScrollView>

      <FloatingActionButton onPress={() => setModalVisible(true)} />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Event</Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Event Title *"
              value={newEvent.title}
              onChangeText={text => setNewEvent({...newEvent, title: text})}
            />

            <TextInput
              style={[styles.modalInput, styles.modalTextArea]}
              placeholder="Description"
              value={newEvent.description}
              onChangeText={text => setNewEvent({...newEvent, description: text})}
              multiline
              numberOfLines={3}
            />

            <TextInput
              style={styles.modalInput}
              placeholder="Location"
              value={newEvent.location}
              onChangeText={text => setNewEvent({...newEvent, location: text})}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.addButton]}
                onPress={handleAddEvent}>
                <Text style={styles.addButtonText}>Add Event</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  eventsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  noEvents: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    padding: 16,
  },
  eventCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: '#667eea',
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: '#333',
  },
  modalTextArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#667eea',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CalendarScreen;
