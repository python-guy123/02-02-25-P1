import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useApp} from '../context/AppContext';
import {AIService} from '../services/AIService';
import Card from '../components/Card';
import {Email} from '../types';
import {formatDateTime, truncateText, generateId} from '../utils/helpers';

const EmailScreen = () => {
  const {emails, addEmail, updateEmail} = useApp();
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (emails.length === 0) {
      const sampleEmails: Email[] = [
        {
          id: generateId(),
          from: 'john@example.com',
          to: 'me@example.com',
          subject: 'Meeting Tomorrow',
          body: 'Hi, just wanted to confirm our meeting tomorrow at 2 PM. Looking forward to discussing the project details with you.',
          timestamp: new Date(Date.now() - 3600000),
          isRead: false,
        },
        {
          id: generateId(),
          from: 'sarah@company.com',
          to: 'me@example.com',
          subject: 'Project Update',
          body: 'The latest project milestone has been completed successfully. Please review the attached documents and provide your feedback by end of week.',
          timestamp: new Date(Date.now() - 7200000),
          isRead: false,
        },
      ];
      sampleEmails.forEach(email => addEmail(email));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEmailPress = async (email: Email) => {
    if (!email.isRead) {
      const updatedEmail = {...email, isRead: true};
      updateEmail(updatedEmail);
    }

    if (!email.summary) {
      const summary = await AIService.summarizeEmail(email);
      const suggestedReply = await AIService.generateEmailReply(email);
      const updatedEmail = {...email, summary, suggestedReply, isRead: true};
      updateEmail(updatedEmail);
      setSelectedEmail(updatedEmail);
    } else {
      setSelectedEmail(email);
    }

    setModalVisible(true);
  };

  const unreadCount = emails.filter(e => !e.isRead).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {unreadCount > 0 ? `${unreadCount} Unread` : 'All Caught Up!'}
        </Text>
      </View>

      <ScrollView>
        {emails.length === 0 ? (
          <Card>
            <Text style={styles.noEmails}>No emails yet</Text>
          </Card>
        ) : (
          emails
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .map(email => (
              <Card key={email.id} onPress={() => handleEmailPress(email)}>
                <View style={styles.emailCard}>
                  {!email.isRead && <View style={styles.unreadDot} />}
                  <View style={styles.emailContent}>
                    <Text style={[styles.emailFrom, !email.isRead && styles.unreadText]}>
                      {email.from}
                    </Text>
                    <Text style={[styles.emailSubject, !email.isRead && styles.unreadText]}>
                      {email.subject}
                    </Text>
                    <Text style={styles.emailPreview}>
                      {truncateText(email.body, 80)}
                    </Text>
                    <Text style={styles.emailTime}>
                      {formatDateTime(new Date(email.timestamp))}
                    </Text>
                  </View>
                </View>
              </Card>
            ))
        )}
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              {selectedEmail && (
                <>
                  <Text style={styles.modalTitle}>{selectedEmail.subject}</Text>
                  <Text style={styles.modalFrom}>From: {selectedEmail.from}</Text>
                  <Text style={styles.modalTime}>
                    {formatDateTime(new Date(selectedEmail.timestamp))}
                  </Text>

                  <View style={styles.divider} />

                  <Text style={styles.sectionLabel}>Email Content:</Text>
                  <Text style={styles.modalBody}>{selectedEmail.body}</Text>

                  {selectedEmail.summary && (
                    <>
                      <View style={styles.divider} />
                      <Text style={styles.sectionLabel}>AI Summary:</Text>
                      <Text style={styles.modalSummary}>{selectedEmail.summary}</Text>
                    </>
                  )}

                  {selectedEmail.suggestedReply && (
                    <>
                      <View style={styles.divider} />
                      <Text style={styles.sectionLabel}>Suggested Reply:</Text>
                      <Text style={styles.modalReply}>{selectedEmail.suggestedReply}</Text>
                    </>
                  )}
                </>
              )}
            </ScrollView>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
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
  header: {
    backgroundColor: '#667eea',
    padding: 16,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  noEmails: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    padding: 16,
  },
  emailCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#667eea',
    marginRight: 12,
    marginTop: 4,
  },
  emailContent: {
    flex: 1,
  },
  emailFrom: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  emailSubject: {
    fontSize: 18,
    color: '#333',
    marginBottom: 4,
  },
  unreadText: {
    fontWeight: 'bold',
    color: '#000',
  },
  emailPreview: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  emailTime: {
    fontSize: 12,
    color: '#999',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '90%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  modalFrom: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  modalTime: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  modalBody: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  modalSummary: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
  },
  modalReply: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    backgroundColor: '#f0f7ff',
    padding: 12,
    borderRadius: 8,
  },
  closeButton: {
    backgroundColor: '#667eea',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EmailScreen;
