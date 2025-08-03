# Sedir Game - Project Structure and File Explanations

## Overview

This is a React-based web application for the game "Sedir". The project is organized into several directories and files, each serving a specific purpose. Below is a breakdown of what each file does.

---

## Root Directory

- **package.json**  
  Lists project dependencies, scripts (start, build, test), and configuration for React and ESLint.

- **package-lock.json**  
  Automatically generated for locking dependencies' versions.

---

## `public/` Directory

- **index.html**  
  The main HTML template for the React app. The React app is injected into the `<div id="root"></div>`.

- **manifest.json**  
  Web app manifest for PWA support (icons, theme color, etc.).

- **favicon.ico**  
  The browser tab icon.

- **logo192.png, logo512.png**  
  App icons for various device sizes.

- **robots.txt**  
  Tells web crawlers which pages/files they can or cannot request from your site.

---

## `src/` Directory

### Top-Level Files

- **App.js**  
  Main React component that sets up routing between pages (Landing, Game, Leaderboard, Profile).

- **index.js**  
  Entry point for the React app. Renders the `App` component.

- **index.css**  
  Global CSS for basic body and code styling.

- **App.css**  
  Default styles for the App component (from Create React App).

- **App.test.js**  
  Example test file for the App component.

- **reportWebVitals.js**  
  For measuring and reporting web performance metrics.

- **setupTests.js**  
  Configures the testing environment to use custom matchers from `@testing-library/jest-dom`.

- **logo.svg**  
  SVG logo (default from Create React App).

---

### `src/components/` Directory

- **LandingPage.js**  
  The main menu/landing page. Lets users navigate to play, view the leaderboard, see how to play, or view their profile.

- **LandingPage.css**  
  Styles for the landing page and its components.

- **HowToPlayModal.js**  
  Modal popup with a carousel explaining how to play the game.

- **GamePage.js**  
  The main game board and logic, including timers, move validation, win conditions, and integration with the Carousel.

- **GamePage.css**  
  Styles for the game page, including the board, timers, and winner modal.

- **Square.js**  
  Represents a single square on the game board. Handles drag-and-drop and highlighting.

- **Piece.js**  
  Represents a game piece. Handles drag-and-drop and animation.

- **Carousel.js**  
  Carousel component that displays information about each piece type (Bash, Walad, Sheikh, Sheikha, Wazeer).

- **LeaderboardPage.js**  
  Displays a leaderboard of top players (currently uses dummy data).

- **ProfilePage.js**  
  Shows user profile info and a table of previous games (currently uses dummy data).

---

### `src/assets/` Directory

- **Logo.png, logo.xcf**  
  Main logo images for the app.

- **bg.png**  
  Background image for the app.

- **bash.png, walad.png, sheikh.png, sheikha.png, wazeer.png**  
  Images for the different game pieces.

- **bash-black.png, walad-black.png, sheikh-black.png, sheikha-black.png, wazeer-black.png**  
  Images for the black versions of the game pieces.

- **move.wav, move1.wav**  
  Sound effects for moving pieces.

- **End of Game.wav**  
  Sound effect for the end of the game.

- **@templeOS - Search _ X.html**  
  Appears to be an unrelated HTML file (possibly a resource or reference).

- **@templeOS - Search _ X_files/**  
  Contains various images and JavaScript files, likely related to the above HTML file or as extra resources.

---

### `src/locales/` Directory

- *(Currently empty)*  
  Intended for localization/translation files.

---

## Notes

- All images and sound files in `src/assets/` are used for game visuals and effects.
- The `src/components/` directory contains all React components for the UI and game logic.
- The `public/` directory contains static files served directly by the web server.
- The `src/locales/` directory is reserved for future internationalization support.

---

Let me know if you want a more detailed description for any specific file or if you want this in a specific markdown format! 