# Zia Assistant - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- Android Studio with Android SDK
- Android device or emulator

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd ZiaAssistant
   ```

2. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

3. **Start the Metro bundler:**
   ```bash
   npm start
   ```

4. **In a new terminal, run the app on Android:**
   ```bash
   npm run android
   ```

## 📱 App Features Overview

### Home Screen
- **Quick Overview Dashboard**: See your upcoming events, unread emails, and active reminders at a glance
- **Quick Action Cards**: Tap any card to navigate to that feature

### Chat with Zia
- **AI Conversations**: Type messages to interact with Zia
- **Smart Responses**: Zia understands context about calendar, emails, and reminders
- **Help Command**: Type "help" to see what Zia can do

### Calendar
- **Visual Calendar**: Month view with marked dates for events
- **Create Events**: Tap the + button to add new events
- **Event Details**: Add title, description, location, and time
- **Manage Events**: View and delete events by date

### Email Management
- **Inbox View**: See all emails with unread indicators (blue dot)
- **AI Summaries**: Tap an email to get an AI-generated summary
- **Reply Suggestions**: Get suggested replies for quick responses
- **Sample Emails**: App comes with sample emails to demonstrate features

### Reminders
- **Priority System**: Set reminders as Low, Medium, or High priority
- **Color Coding**: 
  - 🟢 Low (Green)
  - 🟠 Medium (Orange)
  - 🔴 High (Red)
- **Notifications**: Get push notifications when reminders are due
- **Complete Tasks**: Check off reminders when done

## 🎨 UI Features

- **Beautiful Gradients**: Purple to pink gradient backgrounds
- **Smooth Animations**: Card animations and transitions
- **Bottom Navigation**: Easy access to all main features
- **Floating Action Buttons**: Quick create actions
- **Modal Dialogs**: Clean forms for creating events and reminders

## 💡 Tips & Tricks

1. **Chat with Zia**: Try asking:
   - "Hello" - Get a greeting
   - "Help" - See available features
   - "Calendar" - Learn about calendar features
   - "Email" - Get email assistance
   - "Reminder" - Set up reminders

2. **Calendar**: 
   - Tap any date to see events for that day
   - Events default to 9 AM - 10 AM
   - Marked dates show you have events

3. **Email**:
   - Unread emails show a blue dot
   - AI summaries appear when you open an email
   - Suggested replies are automatically generated

4. **Reminders**:
   - Default due time is 1 hour from creation
   - Notifications will alert you when due
   - Completed reminders move to a separate section

## 🔧 Customization

### Change Theme Colors
Edit the gradient colors in `src/components/GradientBackground.tsx`:
```typescript
colors={['#667eea', '#764ba2', '#f093fb']}
```

### Integrate Real AI
Replace the mock AI in `src/services/AIService.ts` with your preferred AI API (OpenAI, Google AI, etc.)

### Add Voice Features
The app structure supports voice integration. Add voice recognition in `ChatScreen.tsx`

## 📦 Data Storage

- All data is stored locally using AsyncStorage
- Data persists between app sessions
- No internet connection required for basic features

## 🐛 Troubleshooting

### App won't build?
```bash
cd android
./gradlew clean
cd ..
npm start -- --reset-cache
```

### Metro bundler issues?
```bash
npm start -- --reset-cache
```

### Notifications not working?
- Check Android notification permissions in device settings
- Ensure the app has permission to schedule exact alarms

## 📝 Next Steps

1. **Explore all features** - Try creating events, emails, and reminders
2. **Chat with Zia** - Test the AI conversation capabilities
3. **Customize the app** - Change colors, add features, integrate real APIs
4. **Add voice** - Implement voice recognition and text-to-speech
5. **Deploy** - Build a release APK for distribution

## 🎯 Key Files to Know

- `App.tsx` - Main app entry point
- `src/navigation/AppNavigator.tsx` - Navigation structure
- `src/context/AppContext.tsx` - Global state management
- `src/services/AIService.ts` - AI logic (customize here!)
- `src/screens/*` - All main screens

## 🌟 Enjoy using Zia!

Your personal AI assistant is ready to help you manage your calendar, emails, and reminders with style!
