# GigaCodeX Backend

This is the backend service for the GigaCodeX application.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

- Copy `.env.example` to `.env`
- Update the values according to your environment

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

5. Start production server:

```bash
npm start
```

## Project Structure

- `/modules` - Feature modules (auth, roadmap, quiz, blog)
- `/common` - Shared utilities and configurations
- `/scripts` - Build and deployment scripts

## Testing

Run tests with:

```bash
npm test
```
