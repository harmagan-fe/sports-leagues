# Sports Leagues -

This project is a single-page application (SPA) built with **Angular 20.1.6** that fetches and displays sports leagues using the public api. Users can filter leagues by name or sport type and view season badges for each league.

## Features

- Fetch and display all sports leagues.
- Filter leagues by search term and sport type.
- Display league details.
- Show season badge when a league is clicked (with caching to avoid repeated API calls).
- Responsive design with a modern UI.

AI Tools Used
GitHub Copilot: Assisted in faster TypeScript/Angular coding and service logic.
Windsurf VS Code Extension: Helped with styling suggestions and component layout.

Design Decisions
Components: Standalone components for modularity (Header, Filters, LeagueCard, shared Loading, Error, NoResults).
State Management: Local component state with @Input, @Output, and simple caching for badges to avoid repeated API calls.
Styling: Modern, minimalistic design with SCSS variables, responsive layout.
Caching: Badge images are cached in memory to reduce API requests.

## Setup

Install dependencies and run the development server:

```bash
npm install
ng serve
```
