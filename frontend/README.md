# Tilia Photography - React Frontend Clone

This project is a complete frontend clone of the Tilia Photography demo website, built with React and Vite.

## Project Setup and Installation

1.  **Navigate into the project directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    This will install React, React DOM, React Router, Vite, and other necessary packages as defined in `package.json`.
    ```bash
    npm install
    ```

3.  **Start the development server:**
    This will launch the Vite development server, typically on `http://localhost:3000` or `http://localhost:5173`.
    ```bash
    npm run dev
    ```

## Project Structure

-   `frontend/`
    -   `src/`
        -   `assets/`: Contains all static assets like images, fonts, and icons.
        -   `components/`: Contains all reusable React components (e.g., `Navbar`, `Footer`, `Hero`).
        -   `pages/`: Contains the top-level components for each page/route (e.g., `Home`, `About`).
        -   `styles/`: Contains the global stylesheet.
        -   `App.jsx`: The main component that handles routing.
        -   `main.jsx`: The entry point for the React application.
    -   `index.html`: The main HTML file.
    -   `package.json`: Project dependencies and scripts.
    -   `vite.config.js`: Vite configuration.

## Tech Stack

-   **React 18+** (via Vite)
-   **React Router DOM v6** for client-side routing.
-   **Pure CSS3** with a global stylesheet for styling.
-   **Google Fonts** for typography.
-   **No backend dependencies.** This is a pure frontend application. All content is currently mocked statically within the components.
