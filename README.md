# File Uploader

A modern React application built with TypeScript, Vite, and Tailwind CSS for handling file uploads.

## Prerequisites

- Node.js (v18 or higher)
- Yarn package manager

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/matscode/file-uploader-crdrl.git
cd file-uploader-crdrl
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn dev
```

The application will be available at `http://localhost:5173` by default.

## Sample Worksheets

The project includes sample Excel files in the `/public/sample` directory that you can use to test the file upload functionality:

- [financial_transactions_january.xlsx](/public/sample/financial_transactions_january.xlsx)
- [financial_transactions_february.xlsx](/public/sample/financial_transactions_february.xlsx)
- [financial_transactions_march.xlsx](/public/sample/financial_transactions_march.xlsx)

These sample files contain financial transaction data that can be used to test the application's file processing capabilities.

## Available Scripts

- `yarn dev` - Start the development server
- `yarn build` - Build the application for production
- `yarn preview` - Preview the production build locally
- `yarn lint` - Run ESLint to check code quality

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Radix UI Components
- Formik & Yup for form handling
- React Router for navigation

## Project Structure

- `/src` - Source code
- `/public` - Static assets
- `/components` - React components
- `/styles` - CSS and styling files

## Development

The project uses:

- ESLint for code linting
- TypeScript for type safety
- Tailwind CSS for styling
- Vite for fast development and building

## Building for Production

To create a production build:

```bash
yarn build
```

The built files will be in the `dist` directory.
