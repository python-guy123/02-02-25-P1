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
import {useApp} from '../context/AppContext';
import Card from '../components/Card';
import FloatingActionButton from '../components/FloatingActionButton';
import {NotificationService} from '../services/NotificationService';
import {Reminder} from '../types';
import {generateId, formatDateTime} from '../utils/helpers';

const RemindersScreen = () => {
  const {reminders, addReminder, updateReminder, deleteReminder} = useApp();
  const [modalVisible, setModalVisible] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });

  const handleAddReminder = () => {
    if (!newReminder.title.trim()) {
      Alert.alert('Error', 'Please enter reminder title');
      return;
    }

    const dueDate = new Date();
    dueDate.setHours(dueDate.getHours() + 1);

    const reminder: Reminder = {
      id: generateId(),
      title: newReminder.title,
      description: newReminder.description,
      dueDate,
      isCompleted: false,
      priority: newReminder.priority,
    };

    addReminder(reminder);
    NotificationService.scheduleReminder(reminder);
    setModalVisible(false);
    setNewReminder({title: '', description: '', priority: 'medium'});
    Alert.alert('Success', 'Reminder added successfully!');
  };

  const handleToggleComplete = (reminder: Reminder) => {
    const updated = {...reminder, isCompleted: !reminder.isCompleted};
    updateReminder(updated);
    if (updated.isCompleted) {
      NotificationService.cancelReminder(reminder.id);
    }
  };

  const handleDeleteReminder = (reminderId: string) => {
    Alert.alert('Delete Reminder', 'Are you sure you want to delete this reminder?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteReminder(reminderId);
          NotificationService.cancelReminder(reminderId);
        },
      },
    ]);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#ff4444';
      case 'medium':
        return '#ff9800';
      case 'low':
        return '#4caf50';
      default:
        return '#999';
    }
  };

  const activeReminders = reminders.filter(r => !r.isCompleted);
  const completedReminders = reminders.filter(r => r.isCompleted);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Reminders</Text>
          {activeReminders.length === 0 ? (
            <Card>
              <Text style={styles.noReminders}>No active reminders</Text>
            </Card>
          ) : (
            activeReminders.map(reminder => (
              <Card key={reminder.id}>
                <View style={styles.reminderCard}>
                  <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => handleToggleComplete(reminder)}>
                    <View style={styles.checkboxInner} />
                  </TouchableOpacity>

                  <View style={styles.reminderContent}>
                    <View style={styles.reminderHeader}>
                      <Text style={styles.reminderTitle}>{reminder.title}</Text>
                      <View
                        style={[
                          styles.priorityBadge,
                          {backgroundColor: getPriorityColor(reminder.priority)},
                        ]}>
                        <Text style={styles.priorityText}>
                          {reminder.priority.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                    {reminder.description && (
                      <Text style={styles.reminderDescription}>
                        {reminder.description}
                      </Text>
                    )}
                    <Text style={styles.reminderTime}>
                      Due: {formatDateTime(new Date(reminder.dueDate))}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => handleDeleteReminder(reminder.id)}
                    style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            ))
          )}
        </View>

        {completedReminders.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Completed</Text>
            {completedReminders.map(reminder => (
              <Card key={reminder.id}>
                <View style={styles.reminderCard}>
                  <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => handleToggleComplete(reminder)}>
                    <View style={[styles.checkboxInner, styles.checkboxChecked]}>
                      <Text style={styles.checkmark}>✓</Text>
                    </View>
                  </TouchableOpacity>

                  <View style={styles.reminderContent}>
                    <Text style={[styles.reminderTitle, styles.completedText]}>
                      {reminder.title}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => handleDeleteReminder(reminder.id)}
                    style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            ))}
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
            <Text style={styles.modalTitle}>Add New Reminder</Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Reminder Title *"
              value={newReminder.title}
              onChangeText={text => setNewReminder({...newReminder, title: text})}
            />

            <TextInput
              style={[styles.modalInput, styles.modalTextArea]}
              placeholder="Description"
              value={newReminder.description}
              onChangeText={text =>
                setNewReminder({...newReminder, description: text})
              }
              multiline
              numberOfLines={3}
            />

            <Text style={styles.priorityLabel}>Priority:</Text>
            <View style={styles.priorityButtons}>
              {(['low', 'medium', 'high'] as const).map(priority => (
                <TouchableOpacity
                  key={priority}
                  style={[
                    styles.priorityButton,
                    newReminder.priority === priority && styles.priorityButtonActive,
                    {borderColor: getPriorityColor(priority)},
                  ]}
                  onPress={() => setNewReminder({...newReminder, priority})}>
                  <Text
                    style={[
                      styles.priorityButtonText,
                      newReminder.priority === priority && {
                        color: getPriorityColor(priority),
                      },
                    ]}>
                    {priority.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.addButton]}
                onPress={handleAddReminder}>
                <Text style={styles.addButtonText}>Add Reminder</Text>
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
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  noReminders: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    padding: 16,
  },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2,
  },
  checkboxInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#667eea',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reminderContent: {
    flex: 1,
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },
  priorityText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  reminderDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  reminderTime: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 32,
    color: '#ff4444',
    fontWeight: '300',
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
  priorityLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  priorityButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  priorityButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  priorityButtonActive: {
    backgroundColor: '#f5f5f5',
  },
  priorityButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999',
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

export default RemindersScreen;
