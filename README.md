# Currency Exchange App


## Technical Description

### App Architecture and Design Choices
The app follows a modular structure using **Redux Toolkit** for state management and **Redux Persist** for offline data persistence.
- **Redux Toolkit** provides centralized state management for exchange rates, favorites, and loading/error states.
- **Redux Persist** ensures that state (favorites and exchange rates) is retained across app restarts, enabling offline mode.
- **AsyncStorage** is used as the storage layer for caching.

The design follows separation of concerns:
1. **API layer**: Handles API communication.
2. **State layer**: Manages global state using Redux Toolkit.
3. **UI layer**: Screens and components handle rendering and user interaction.

---

### App Structure and Major Components

```
CurrencyExchangeApp/
│
├── src/
│   ├── api/
│   │   └── currencyApi.ts       # API logic for fetching exchange rates
│   │
│   ├── store/
│   │   ├── currencySlice.ts     # Redux slice for managing state
│   │   ├── hooks.ts             # Custom hooks for dispatch and selectors
│   │   └── store.ts             # Store configuration with Redux Persist
│   │
│   ├── components/
│   │   ├── Header.tsx           # Reusable Header component
│   │   └── ExchangeRateItem.tsx # Component for rendering a single currency rate
│   │
│   ├── screens/
│   │   └── CurrencyExchangeScreen.tsx # Main screen displaying rates and favorites
│   │
│   └── App.tsx                  # Root of the app with Redux and PersistGate setup
│
├── .env                         # Environment variables for API key and URL
└── README.md                    # Documentation
```

**Major Components:**
1. `Header.tsx`: Displays the app title.
2. `ExchangeRateItem.tsx`: Renders an exchange rate with a toggle for favorites.
3. `CurrencyExchangeScreen.tsx`: Main screen that fetches and displays exchange rates using Redux state.

---

### Offline Mode Implementation
Offline support is implemented using:
1. **Redux Persist**: Automatically saves and restores the Redux state.
   - Cached data is saved in `AsyncStorage` and rehydrated when the app is restarted.
2. **Error Handling with Fallback**:
   - If an API request fails, the app loads cached exchange rates from `AsyncStorage`.

**Flow:**
- On successful API fetch, exchange rates are cached in the Redux state.
- If offline, Redux Persist loads the last saved state, ensuring data availability.

---

### Additional Features and Libraries
1. **React Native + TypeScript**: Ensures type safety and clean code structure.
2. **Redux Toolkit**: Simplifies state management.
3. **Redux Persist**: Enables offline persistence.
4. **Axios**: Used for API calls.
5. **AsyncStorage**: Storage layer for Redux Persist.
6. **Environment Variables**: API keys and URLs are stored in a `.env` file, keeping sensitive data secure.

---

## Additional Considerations
1. **Error Handling**: Displays alerts when an API request fails.
2. **Code Maintainability**: The app follows modular structure and best practices.
3. **Environment Configuration**: Sensitive keys are kept in `.env` for security.
4. **Scalability**: New features (e.g., filtering, sorting) can be added easily due to the modular design.

---

## How to Run the App
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-url.git
   cd CurrencyExchangeApp
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add your API key in the `.env` file:
   ```plaintext
   API_URL=https://api.coinlayer.com/api/live
   API_KEY=YOUR_API_KEY
   ```
4. Run the app:
   - For iOS:
     ```bash
     npx react-native run-ios
     ```
   - For Android:
     ```bash
     npx react-native run-android
     ```

---

## Notes
- Ensure the API key is valid and accessible.
- Restart Metro Bundler with `--reset-cache` if environment variables are not picked up:
   ```bash
   npm start --reset-cache
   ```
