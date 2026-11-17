# FinPulse AI – Predictive Crypto & Stock Signal Radar

**Student ID:** PS/2022/036  
**Project Type:** Mobile Application Development  
**Name:** Isuru Udeshitha  
**Framework:** React Native with Expo

## 1. Project Overview

FinPulse AI is a mobile financial market intelligence application designed to present cryptocurrency market information, AI-style trading signals, confidence scores, price alerts, and market insights through a modern mobile interface.

The application provides users with a centralized dashboard to explore market indicators and monitor selected digital assets.

The current assignment version uses illustrative demonstration data. Live market data integration and production-level AI prediction services are planned as future enhancements.

## 2. Main Objectives

- Develop a mobile application using React Native and Expo.
- Implement file-based navigation using Expo Router.
- Display financial market information using reusable components.
- Provide interactive watchlist and price alert functionality.
- Demonstrate local notification functionality.
- Implement shared application state.
- Provide an intuitive and responsive user interface.

## 3. Main Features

### 3.1 AI Market Radar
- Market overview dashboard.
- Cryptocurrency signal cards.
- Market sentiment indicator.
- Signal confidence percentages.
- Risk disclaimer.

### 3.2 Watchlist
- Save favourite cryptocurrencies.
- Remove assets from the watchlist.
- Share watchlist state across screens.

### 3.3 Market Intelligence
- Market sentiment overview.
- Bullish, bearish, and neutral signal summaries.
- Confidence-based insights.

### 3.4 Price Alerts
- Create cryptocurrency price alerts.
- Select an asset.
- Set price-above or price-below conditions.
- Enter a target price.
- Delete existing alerts.
- Receive local test notifications.

### 3.5 Signal Details
- Individual cryptocurrency detail screens.
- Market price and percentage change.
- AI signal classification.
- Confidence score.
- Illustrative 24-hour target.
- Risk level and AI insight.

### 3.6 User Authentication
- Guest access.
- User registration.
- User login.
- Profile screen.

**Note:** Authentication currently uses temporary in-memory demonstration data. Production authentication and persistent account storage are future enhancements.

## 4. Technologies Used

| Technology | Purpose |
|---|---|
| React Native | Mobile application development |
| Expo | Development environment |
| Expo Router | File-based navigation |
| JavaScript | Application logic |
| React Hooks | State and lifecycle management |
| React Context API | Shared application state |
| React Native Components | Mobile UI |
| Expo Notifications | Local notifications |
| Ionicons | Application icons |

## 5. Application Navigation

The application uses Expo Router for file-based navigation.

Main navigation tabs:

1. AI Radar
2. Watchlist
3. Intelligence
4. Alerts
5. Profile

A nested Stack Navigator is implemented for individual cryptocurrency signal detail screens.

## 6. Project Structure

```text
FinPulseAI/
│
├── app/
│   ├── _layout.js
│   │
│   ├── (auth)/
│   │   ├── _layout.js
│   │   ├── login.js
│   │   └── register.js
│   │
│   ├── (tabs)/
│   │   ├── _layout.js
│   │   ├── index.js
│   │   ├── watchlist.js
│   │   ├── intelligence.js
│   │   ├── alerts.js
│   │   └── profile.js
│   │
│   └── signal/
│       ├── _layout.js
│       └── [id].js
│
├── context/
│   ├── AuthContext.js
│   └── MarketContext.js
│
├── services/
│   └── notificationService.js
│
├── assets/
│
├── app.json
├── package.json
└── README.md
```

## 7. Installation and Execution

### Prerequisites

- Node.js
- npm
- Visual Studio Code
- Expo Go installed on an Android device

### Step 1: Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### Step 2: Navigate to the project directory

```bash
cd FinPulseAI
```

### Step 3: Install dependencies

```bash
npm install
```

### Step 4: Start the Expo development server

```bash
npx expo start -c
```

### Step 5: Run the application

- Open Expo Go on an Android device.
- Connect the device and computer to the same Wi-Fi network.
- Scan the QR code displayed in the terminal.
- Wait for the application to load.

## 8. Assignment Requirements Demonstrated

| Requirement | Implementation |
|---|---|
| React Native core components | Views, Text, Pressable, ScrollView and TextInput |
| FlatList | Market cards and alert lists |
| Modal | Price alert creation |
| Expo Router | File-based tab and stack navigation |
| Nested navigation | Cryptocurrency signal detail screens |
| Shared state | React Context API |
| AppState | Background and foreground lifecycle listener |
| Local notifications | Expo Notifications |

## 9. Current Limitations

- Market information uses illustrative demonstration data.
- AI confidence scores and trading signals are not generated by a trained prediction model.
- Price alerts are not yet connected to automatic live market-price monitoring.
- Authentication data is stored temporarily in memory.
- Alert and watchlist persistence across application restarts is not yet implemented.

## 10. Future Enhancements

- Integrate live cryptocurrency market APIs.
- Introduce stock market data integration.
- Develop a backend using Node.js and Express.
- Implement a Python-based AI prediction service.
- Integrate FinBERT for financial sentiment analysis.
- Develop and evaluate machine learning prediction models.
- Implement persistent user authentication and storage.
- Add interactive financial charts.
- Implement automatic price monitoring and triggered alerts.

## 11. Disclaimer

FinPulse AI is an educational mobile application developed for academic purposes. Demonstration market values, signals, confidence scores, and target projections are illustrative and should not be considered actual investment recommendations or financial advice.

## 12. Video Link

https://drive.google.com/file/d/14KCUuXJXOM3qZ72rTlGIxX36uc6YjDyW/view?usp=drive_link
---

**FinPulse AI – Predictive Crypto & Stock Signal Radar**  
Student ID: PS/2022/036
