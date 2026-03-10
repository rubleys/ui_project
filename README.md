# Rick & Morty Episodes Dashboard
A React + TypeScript + Vite application that displays paginated episodes from the Rick & Morty GraphQL API, allows viewing episode details with characters, and persists UI preferences using Redux Toolkit and localStorage.

# Features
- Paginated episodes table
- Episode detail drawer with character list
- Show/Hide ID column
- Global light/dark theme toggle
- Dashboard with reusable cards
- Fully responsive UI using Material UI
- State persistence using Redux + localStorage
- Apollo Client for GraphQL queries
- Avoids unnecessary API calls through caching strategy

# Tech Stack
- React 18 + TypeScript
- Vite
- Redux Toolkit
- Apollo Client
- Material UI (MUI)
- React Router
- localStorage persistence

# Functional Requirements
Episodes List
- Fetch paginated episodes from the Rick & Morty GraphQL API.
- Display episodes in a Material UI table.
- Columns: Actions, Name, Episode, Air Date, Created, ID (toggleable).
- Clicking a row opens a drawer with episode details.
Episode Drawer
- Shows:
- Episode ID
- Name
- Episode code (e.g., S01E01)
- Air date
- Created date
- Characters (image, name, species, status)
- Drawer must open/close using Redux state.
- Drawer must avoid unnecessary refetching.
Theme System
- Global light/dark theme toggle.
- Theme selection must persist across page reloads.
Column Visibility
- User can toggle the visibility of the ID column.
- Visibility preference must persist across reloads.

# Running the Project
npm install
npm run dev




