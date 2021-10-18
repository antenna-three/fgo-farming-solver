# Contributing

Thank you for considering contributing. This project is my personal project but feel free to create issues and pull requests. Any contribution is welcome as long as it doesn't impair the function and it passes the linting and building process. Below are information that help you to contribute.

## Basic flow

1. Create Issue (optional)
2. Fork and Clone
3. Install dependencies
   ```
   npm install
   ```
4. Run local server on `localhost://3000`
   ```
   npm run dev
   ```
5. Format & Lint
   ```
   npm run format
   npm run lint
   ```
6.  Commit, Push and Pull Request

## Technologies

This project uses Next.js with TypeScript and Chakra UI and is deployed to Vercel.

## Directory structure

- `components`
  
  React components. `common` for components across pages, and rest directories for corresponding pages.

- `constants`

  Constants such as external api url, servant class names and revalidate period.

- `docs`

  Documents both for GitHub and the web site.

- `hooks`

  Custom hooks.

- `interfaces`

  Type definitions for external services.

- `lib`

  Data fetcher and other useful modules.

- `pages`

  Files mapped to the website's pages.

- `public`

  Static resources.
