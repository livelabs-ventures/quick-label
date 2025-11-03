# Data Labeler

A beautiful, modern web application for labeling CSV data with complaint classification and test results. Built with React and Vite.

## Features

- 📄 **CSV Import**: Upload and parse CSV files with automatic header detection
- 🏷️ **Labeling Interface**: 
  - Complaint/Not Complaint classification
  - Five independent test labels (test_1 through test_5) with Pass/Fail options
- 📊 **Progress Tracking**: Visual progress bar and labeled count display
- ⌨️ **Keyboard Navigation**: Use arrow keys to navigate between records
- 💾 **CSV Export**: Export labeled data with all original columns plus new label columns
- 🎨 **Modern UI**: Clean, professional interface inspired by DataEQ design

## Prerequisites

- **Node.js** (version 18 or higher recommended)
- **npm** (comes with Node.js) or **yarn** or **pnpm**

To check if you have Node.js installed:
```bash
node --version
npm --version
```

If you don't have Node.js installed, download it from [nodejs.org](https://nodejs.org/)

## Installation

1. **Clone or download this repository**

   If you have the repository:
   ```bash
   cd labeler
   ```

   Or extract the files to a directory of your choice.

2. **Install dependencies**

   Using npm:
   ```bash
   npm install
   ```

   Or using yarn:
   ```bash
   yarn install
   ```

   Or using pnpm:
   ```bash
   pnpm install
   ```

   This will install all required packages including React, Vite, PapaParse (for CSV handling), and Tailwind CSS.

## Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

Or with yarn:
```bash
yarn dev
```

Or with pnpm:
```bash
pnpm dev
```

The application will start and you should see output like:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open your browser and navigate to `http://localhost:5173/` (or the URL shown in the terminal).

### Production Build

To create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

To preview the production build:

```bash
npm run preview
```

## Usage

1. **Import CSV File**
   - Click "Choose CSV File" button
   - Select your CSV file
   - The file will be parsed and displayed

2. **Label Data**
   - Review the data record on the left side
   - Use the labeling panel on the right to:
     - Select "Complaint" or "Not Complaint"
     - For each test (test_1 through test_5), select "Pass" or "Fail"
   - Use the "Previous" and "Next" buttons or arrow keys to navigate between records

3. **Export Labeled Data**
   - Click the "Export CSV" button in the header
   - The exported file will include all original columns plus:
     - `complaint_label`: The complaint classification
     - `test_1` through `test_5`: The test results

## Project Structure

```
labeler/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # App-specific styles
│   ├── index.css        # Global styles with Tailwind imports
│   └── main.jsx         # Application entry point
├── public/              # Static assets
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── postcss.config.js    # PostCSS configuration
```

## Dependencies

- **React** - UI library
- **Vite** - Build tool and dev server
- **PapaParse** - CSV parsing and generation
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically try the next available port. You can also specify a port:

```bash
npm run dev -- --port 3000
```

### Build Errors

If you encounter build errors, try:
1. Delete `node_modules` folder
2. Delete `package-lock.json` (or `yarn.lock` / `pnpm-lock.yaml`)
3. Run `npm install` again

### CSS Not Loading

If styles aren't loading, ensure:
- Tailwind CSS is properly configured in `tailwind.config.js`
- PostCSS is configured in `postcss.config.js`
- The CSS import is in `src/index.css`

## License

This project is private and for internal use.
