# Zia AI Assistant

A beautiful React Native Android application featuring an AI assistant named Zia that can manage your calendar, handle emails, set reminders, and provide general assistance with voice interaction capabilities.

## Features

### 🤖 AI Chat Interface
- Conversational AI assistant
- Voice input support (ready for integration)
- Natural language processing for various tasks
- Beautiful chat bubble UI with timestamps

### 📅 Calendar Management
- Visual calendar with month view
- Create, view, and delete events
- Event details with location and time
- Conflict detection (AI-powered)
- Marked dates for quick overview

### 📧 Email Management
- Inbox with unread indicators
- AI-powered email summarization
- Automatic reply generation
- Read/unread status tracking
- Beautiful email detail view

### ⏰ Reminders
- Create reminders with priorities (Low, Medium, High)
- Push notifications for reminders
- Mark reminders as complete
- Due date tracking
- Color-coded priority system

### 🎨 Beautiful UI/UX
- Modern gradient backgrounds
- Smooth animations and transitions
- Card-based layouts with shadows
- Bottom tab navigation
- Floating action buttons
- Responsive design

## Tech Stack

- **React Native** with TypeScript
- **React Navigation** (Bottom Tabs + Stack)
- **AsyncStorage** for local data persistence
- **React Native Calendars** for calendar UI
- **React Native Linear Gradient** for beautiful gradients
- **React Native Push Notifications** for reminders
- **Context API** for state management

## Project Structure

```
ZiaAssistant/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Card.tsx
│   │   ├── GradientBackground.tsx
│   │   ├── MessageBubble.tsx
│   │   └── FloatingActionButton.tsx
│   ├── screens/             # Main app screens
│   │   ├── HomeScreen.tsx
│   │   ├── ChatScreen.tsx
│   │   ├── CalendarScreen.tsx
│   │   ├── EmailScreen.tsx
│   │   └── RemindersScreen.tsx
│   ├── navigation/          # Navigation setup
│   │   └── AppNavigator.tsx
│   ├── context/             # State management
│   │   └── AppContext.tsx
│   ├── services/            # Business logic
│   │   ├── AIService.ts
│   │   └── NotificationService.ts
│   ├── utils/               # Helper functions
│   │   └── helpers.ts
│   └── types/               # TypeScript types
│       └── index.ts
├── android/                 # Android native code
└── App.tsx                  # Main app entry point
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Android Studio with Android SDK
- Java Development Kit (JDK 11 or higher)
- Android device or emulator

### Steps

1. **Install Dependencies**
   ```bash
   cd ZiaAssistant
   npm install
   ```

2. **Start Metro Bundler**
   ```bash
   npm start
   ```

3. **Run on Android** (in a new terminal)
   ```bash
   npm run android
   ```

## Usage Guide

### Home Screen
- View quick overview of upcoming events, unread emails, and active reminders
- Quick access cards to navigate to different features
- Beautiful gradient background with statistics

### Chat with Zia
- Type messages to interact with Zia
- Ask about calendar, emails, reminders, or general questions
- Zia responds with helpful information and suggestions
- Voice input ready for integration

### Calendar
- Tap on any date to view events
- Use the floating action button (+) to create new events
- Add title, description, and location
- Delete events by tapping the delete button

### Email
- View all emails with unread indicators
- Tap on an email to read full content
- AI automatically generates summaries
- Get suggested replies for quick responses

### Reminders
- Create reminders with priority levels
- Set due dates (default: 1 hour from now)
- Mark reminders as complete
- Receive push notifications when due
- Delete completed reminders

## Customization

### Colors
The app uses a purple/blue gradient theme. To customize colors, edit:
- Primary gradient: `#667eea` to `#764ba2` to `#f093fb`
- Accent color: `#667eea`

### AI Responses
To integrate with a real AI API, modify `src/services/AIService.ts`:
```typescript
static async processMessage(userMessage: string): Promise<string> {
  // Replace with your AI API call
  const response = await fetch('YOUR_AI_API_ENDPOINT', {
    method: 'POST',
    body: JSON.stringify({ message: userMessage }),
  });
  return response.json();
}
```

### Voice Integration
To add voice recognition, the app is ready for `@react-native-voice/voice` integration:
1. Implement voice recording in ChatScreen
2. Convert speech to text
3. Send to AI service
4. Convert AI response to speech (text-to-speech)

## Permissions

The app requests the following Android permissions:
- `INTERNET` - For API calls
- `RECORD_AUDIO` - For voice input
- `POST_NOTIFICATIONS` - For reminder notifications
- `SCHEDULE_EXACT_ALARM` - For precise reminder timing
- `VIBRATE` - For notification vibration
- `RECEIVE_BOOT_COMPLETED` - To restore reminders after device restart

## Future Enhancements

- [ ] Voice calling with Zia
- [ ] Real AI API integration (OpenAI, Google AI, etc.)
- [ ] Email sync with real email providers
- [ ] Calendar sync with Google Calendar
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Widget support
- [ ] Cloud backup and sync
- [ ] Advanced AI features (sentiment analysis, smart suggestions)

## Troubleshooting

### Build Errors
- Clean the build: `cd android && ./gradlew clean && cd ..`
- Clear Metro cache: `npm start -- --reset-cache`

### Notification Issues
- Ensure notification permissions are granted in Android settings
- Check that the notification channel is created properly

### Navigation Issues
- Ensure all screens are properly imported in AppNavigator
- Check that navigation types match the defined types

## License

This project is created for demonstration purposes.

## Credits

Built with ❤️ using React Native and TypeScript
AI Assistant: Zia
