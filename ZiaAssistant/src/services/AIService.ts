import {CalendarEvent, Email} from '../types';

export class AIService {
  static async processMessage(userMessage: string): Promise<string> {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! I'm Zia, your personal AI assistant. How can I help you today?";
    }

    if (lowerMessage.includes('calendar') || lowerMessage.includes('event')) {
      return "I can help you manage your calendar. You can create, view, or edit events. What would you like to do?";
    }

    if (lowerMessage.includes('email')) {
      return "I can help you with your emails. I can read them, summarize them, or generate replies. What do you need?";
    }

    if (lowerMessage.includes('reminder')) {
      return "I can set reminders for you. Just tell me what you'd like to be reminded about and when.";
    }

    if (lowerMessage.includes('help')) {
      return "I can assist you with:\n• Managing your calendar and events\n• Reading and summarizing emails\n• Generating email replies\n• Setting reminders\n• General questions and tasks\n\nWhat would you like help with?";
    }

    if (lowerMessage.includes('weather')) {
      return "The weather looks great today! Perfect for getting things done. Is there anything specific you'd like me to help you with?";
    }

    if (lowerMessage.includes('thank')) {
      return "You're welcome! I'm always here to help. Is there anything else you need?";
    }

    return "I understand you're asking about: " + userMessage + ". I'm here to help with calendar management, emails, reminders, and general assistance. How can I assist you specifically?";
  }

  static async summarizeEmail(email: Email): Promise<string> {
    const bodyPreview = email.body.substring(0, 150);
    return `Summary: Email from ${email.from} regarding "${email.subject}". ${bodyPreview}...`;
  }

  static async generateEmailReply(email: Email): Promise<string> {
    return `Dear ${email.from},\n\nThank you for your email regarding "${email.subject}". I appreciate you reaching out.\n\n[Your response here]\n\nBest regards,\nYour Name`;
  }

  static async analyzeCalendarConflicts(events: CalendarEvent[]): Promise<string[]> {
    const conflicts: string[] = [];
    for (let i = 0; i < events.length; i++) {
      for (let j = i + 1; j < events.length; j++) {
        const event1 = events[i];
        const event2 = events[j];
        if (
          event1.startDate < event2.endDate &&
          event2.startDate < event1.endDate
        ) {
          conflicts.push(
            `Conflict: "${event1.title}" and "${event2.title}" overlap`,
          );
        }
      }
    }
    return conflicts;
  }

  static async suggestReminderTime(_task: string): Promise<Date> {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    return now;
  }
}
