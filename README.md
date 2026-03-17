# UI Project - Rick and Morty Episodes Dashboard

A React + TypeScript dashboard that lists Rick and Morty episodes with pagination, detail drawer, UI preferences persistence, and improved loading/error/empty states.

## Overview

This project was built as a frontend exercise focused on:

- GraphQL data consumption
- Redux state management for UI preferences
- Responsive UI with Material UI
- Better UX states (loading, error, empty)
- Clear separation between remote data and local UI state

## Tech Stack

- React 18
- TypeScript
- Vite
- Material UI 5
- React Router v6
- Apollo Client (GraphQL)
- Redux Toolkit
- Redux Persist

## Key Architecture Decisions

### Apollo Client for remote data
Apollo is responsible for fetching and caching API data (episodes list and episode details).

### Redux for UI state and preferences
Redux stores local UI state only, such as:

- Theme mode
- ID column visibility
- Drawer open/close state
- Selected episode ID
- Current pagination page

### Selective persistence
Redux Persist stores only selected UI preferences in localStorage (instead of persisting the full store), improving maintainability and reducing stale-state risk.

## Features Implemented

### Episodes page
- Paginated episodes list
- Pagination controls with current page state
- Table toolbar with:
  - "Episodes List" title
  - Show/Hide ID toggle
- Responsive table behavior (Created column hidden on small screens)

### Episode detail drawer
- Open from row actions menu ("View")
- Displays episode metadata
- Displays character list with avatars
- Improved layout and typography

### UX states
- Loading skeletons in table
- Loading skeletons in drawer
- Error state for episodes list
- Error state for episode details
- Empty state for episodes list
- Empty state for characters list

### Testing
- Unit tests for episodes, UI, and theme reducers
- Unit test for the shared date formatting helper
- Component tests for EpisodesTable
- Component tests for EpisodeDrawer
- Test environment configured with Vitest, jsdom, and Testing Library

### Date formatting
- Centralized date formatting helper
- Consistent month-day-year format for created dates

### Responsive UI
- Responsive AppBar with mobile menu
- Dashboard cards adapted for small screens
- Episodes table adjusted for mobile readability

## What Is Not Fully Implemented Yet

- Final production-level performance profiling and optimization pass
- Additional route-level modules beyond the episodes flow

## Project Setup

### 1. Install dependencies
npm install

### 2. Run development server
npm run dev

### 3. Build for production
npm run build

### 4. Preview production build
npm run preview

### 5. Run tests
npm test

## API

This app uses the Rick and Morty GraphQL API:

https://rickandmortyapi.com/graphql

## Testing Coverage

Current automated coverage includes:

- Reducer behavior for episodes, UI, and theme state
- Shared helper behavior for date formatting
- Episodes table rendering for loading, empty, and interaction states
- Episode drawer rendering for loading, error, and close interaction states

## Suggested Next Improvements

- Add integration tests for pagination and detail flow
- Add route-level pages for Characters and Locations
- Improve README with screenshots or GIF demo

## Status

Current status: Functional and polished for the Episodes dashboard flow, with improved architecture, responsive UI, selective persistence, pagination, and baseline automated unit tests.