# Flight Info Challenge App

An Angular application built for the Flight Info Coding Challenge. This app features a premium "Glass & Gradient" UI, secure authentication via Firebase, and seamless integration with the Flight Info Cloud Function.

## 🚀 Features & Requirements Met

### 1️⃣ Application Launch & Hosting
- **Stack**: Angular 19+ (Standalone Components), Firebase Hosting.
- **Routing**: Lazy-loaded routes with `AngularFireAuthGuard` for secure access control.

### 2️⃣ Authentication Gate
- **Mechanism**: Google OAuth and Email/Password (via Firebase Authentication).
- **Behavior**:
  - Unauthenticated users are redirected to `/login`.
  - Authenticated users are redirected to `/flight-form`.
  - Session persistence is handled automatically by Firebase.

### 3️⃣ Flight Details Form
- **Fields**: Airline, Arrival Date, Arrival Time, Flight Number, Number of Guests, Comments (Optional).
- **Validation**:
  - All fields (except comments) are required.
  - `numOfGuests` must be at least 1.
  - Submit button is disabled until the form is valid.

### 4️⃣ API Integration
- **Endpoint**: `POST https://us-central1-crm-sdk.cloudfunctions.net/flightInfoChallenge`
- **Security**: Includes required `token` and `candidate` headers.
- **Payload**: Strictly typed matching `FlightInfoPayload`.

### 5️⃣ UX/UI
- **Design**: Custom Glassmorphism design system using Vanilla CSS (no framework bloat).
- **Feedback**:
  - Success message upon valid submission.
  - Error banner for API failures.
  - Loading state during network requests.

## 🛠️ Setup & Configuration

### Prerequisites
- Node.js (v18+)
- Firebase Account

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd flight-challenge
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Firebase:**
   Open `src/app/app.config.ts` and replace the placeholder configuration with your Firebase project credentials:
   ```typescript
   provideFirebaseApp(() => initializeApp({
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.appspot.com",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   })),
   ```

4. **Run Locally:**
   ```bash
   npm start
   ```
   Navigate to `http://localhost:4200`.

### Deployment

1. **Login to Firebase:**
   ```bash
   npx firebase login
   ```

2. **Initialize Hosting:**
   ```bash
   npx firebase init hosting
   ```
   - Select your project.
   - Public directory: `dist/flight-challenge/browser`
   - Configure as single-page app: `Yes`

3. **Build and Deploy:**
   ```bash
   npm run build
   npx firebase deploy
   ```

## 📂 Project Structure

- `src/app/components/login`: Authentication view.
- `src/app/components/flight-form`: Main form with validation logic.
- `src/app/services/auth.ts`: Authentication service wrapping AngularFire.
- `src/app/services/flight.ts`: HTTP service for API communication.
- `src/styles.css`: Global styles and design system variables.
