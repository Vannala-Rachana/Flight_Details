# Flight Challenge Setup Guide

This guide explains how to set up and run the Flight Challenge application locally.

## Prerequisites

Ensure you have the following installed on your machine:

1.  **Node.js** (v18 or later recommended)
2.  **npm** (comes with Node.js)
3.  **Angular CLI**: Install globally via terminal:
    ```bash
    npm install -g @angular/cli
    ```
4.  **Firebase CLI**: Install globally via terminal:
    ```bash
    npm install -g firebase-tools
    ```

## Installation

1.  **Clone the repository** (or download the source code):
    ```bash
    git clone <repository-url>
    cd flight-challenge
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

## Configuration

To run this application with your own Firebase backend, you need to replace the configuration values.

### 1. Firebase Project Setup

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Create a new project (e.g., "flight-challenge").
3.  Enable **Google Authentication**:
    *   Go to **Authentication** > **Sign-in method**.
    *   Enable **Google**.
    *   Save.

### 2. Application Configuration

Update the `src/environments/environment.ts` file with your Firebase configuration.

1.  In the Firebase Console, go to **Project settings**.
2.  Under **Your apps**, click the web icon (</>) to create a new web app.
3.  Copy the `firebaseConfig` object (apiKey, authDomain, etc.).
4.  Open `src/environments/environment.ts` and replace the values inside the `firebase` object:

```typescript
export const environment = {
  production: false,
  firebase: {
    projectId: "YOUR_PROJECT_ID",
    appId: "YOUR_APP_ID",
    storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    messagingSenderId: "YOUR_SENDER_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
  }
};
```

### 3. Deployment Configuration (Optional)

If you plan to deploy to your own Firebase Hosting:

1.  **Login to Firebase** locally:
    ```bash
    firebase login
    ```

2.  **Update `.firebaserc`**:
    Open `.firebaserc` and change the project ID to your own:
    ```json
    {
      "projects": {
        "default": "YOUR_PROJECT_ID" // e.g., flight-challenge-12345
      }
    }
    ```

## Running Locally

To start the development server:

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any source files.

## Deployment

To deploy the application to Firebase Hosting:

1.  **Build the application**:
    ```bash
    ng build
    ```

2.  **Deploy**:
    ```bash
    firebase deploy --only hosting
    ```
