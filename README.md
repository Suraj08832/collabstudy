# CollabStudy React Application

A collaborative study platform with interactive whiteboard and synchronized music features.

## Features

- User Authentication (Login/Signup)
- Interactive Whiteboard with real-time collaboration
- Synchronized Music Player
- Modern UI with Material-UI components
- Responsive design
- Real-time updates using Socket.IO

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Backend server running (see [Backend Setup](#backend-setup))

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd collabstudy-react
```

2. Install dependencies:
```bash
npm install
```

## Backend Setup

Make sure the backend server is running at `http://localhost:3000`. You can find the backend setup instructions in the main repository.

## Running the Application

1. Start the development server:
```bash
npm start
```

2. Open your browser and navigate to:
```
http://localhost:3001
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm run eject` - Ejects from Create React App

## Project Structure

```
collabstudy-react/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Home.js
│   │   ├── Auth.js
│   │   ├── Whiteboard.js
│   │   └── MusicSync.js
│   ├── App.js
│   ├── index.js
│   └── theme.js
├── package.json
└── README.md
```

## Technologies Used

- React
- Material-UI
- Socket.IO
- Framer Motion
- React Router

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 