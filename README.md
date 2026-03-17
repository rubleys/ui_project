# UI Project - Rick and Morty Episodes Dashboard

A React + TypeScript dashboard that lists Rick and Morty episodes with pagination, detail drawer, UI preferences persistence, and improved loading/error/empty states.

## Overview

This project was built as a frontend exercise focused on:

- GraphQL data consumption
- Redux state management for UI state and persisted episodes data
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

### Redux for app state and persisted episodes snapshot
Redux stores application state such as:

- Episodes list (persisted snapshot)
- Last fetched episodes page metadata
- Theme mode
- ID column visibility
- Drawer open/close state
- Selected episode ID
- Current pagination page

### Selective persistence
Redux Persist stores selected fields in localStorage:

- Theme: mode
- UI: ID visibility and current page
- Episodes: episodes list, total pages, and last fetched page

Transient state is not persisted when it should reset after reload (for example, selected episode and drawer open state).

### Cache and refetch strategy
- Apollo handles GraphQL fetching and in-memory cache during runtime.
- Redux Persist keeps a durable episodes snapshot across browser reloads.
- On app load, if persisted episodes match the current page, the episodes query is skipped.
- If the requested page differs from the persisted last page, the query runs and Redux is updated.

## Features Implemented

### Episodes page
- Paginated episodes list
- Pagination controls with current page state
- Current page persists after browser reload (F5)
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

## Status

Current status: Functional and polished for the Episodes dashboard flow, with responsive UI, persisted page and episodes snapshot, controlled refetch strategy, pagination, and baseline automated unit tests.
