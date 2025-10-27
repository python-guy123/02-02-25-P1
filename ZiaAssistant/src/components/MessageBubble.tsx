import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Message} from '../types';
import {formatTime} from '../utils/helpers';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({message}) => {
  const isUser = message.sender === 'user';

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.ziaContainer]}>
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.ziaBubble]}>
        <Text style={[styles.text, isUser ? styles.userText : styles.ziaText]}>
          {message.text}
        </Text>
        <Text style={[styles.time, isUser ? styles.userTime : styles.ziaTime]}>
          {formatTime(new Date(message.timestamp))}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    marginHorizontal: 16,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  ziaContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: '#667eea',
    borderBottomRightRadius: 4,
  },
  ziaBubble: {
    backgroundColor: '#f0f0f0',
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: 'white',
  },
  ziaText: {
    color: '#333',
  },
  time: {
    fontSize: 11,
    marginTop: 4,
  },
  userTime: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  ziaTime: {
    color: '#999',
  },
});

export default MessageBubble;
