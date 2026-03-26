# Doowit - A Full-Stack Cosmic To-Do App
A playful and intuitive full-stack to-do app that uses cosmic-themed priorities to help you organize and manage your tasks. Built with React, Node.js, and PostgreSQL, featuring a vibrant, responsive design and secure user authentication.
# Live Demo - https://pyro-kinetic.github.io/doowit/

<img src="https://github.com/user-attachments/assets/71ed90eb-809d-4a2b-9d2a-fb89ec0b8a05" alt="Meme image representation of the page" />

## ✨ Features
- **User Authentication**: Secure sign-up and login system with session-based authentication.
- **Cosmic Priority System**: Organize tasks with four visual priority levels:
    - 🌙 **Moon** - Low priority
    - 🪐 **Planet** - Medium priority
    - ☀️ **Sun** - High priority
    - ⭐ **Star** - Completed tasks

- **Task Management**:
    - Create, edit, and delete tasks (stored in a persistent database)
    - Mark tasks as complete with a single click
    - View full task details in an elegant modal
    - Filter between active and completed tasks

- **Beautiful UI**:
    - Responsive grid layout that adapts to all screen sizes
    - Color-coded priority themes with gradient backgrounds
    - Custom fonts (Hachi Maru Pop & Roboto) for a unique look
    - Font Awesome icons for crisp, scalable interface elements

- **Accessibility & Security**:
    - Proper ARIA labels and semantic HTML
    - Keyboard navigation support
    - Rate limiting and secure session management
    - Protected API endpoints

- **Contact Form**: Built-in contact page with form submission via Formspree

## 🚀 Tech Stack
### Frontend
- **React 19** - UI library
- **Bootstrap 5** - Responsive CSS framework
- **Font Awesome 7** - Vector icons
- **Axios** - API client

### Backend
- **Node.js & Express 5** - Server-side framework
- **PostgreSQL** - Relational database for persistent storage
- **Redis** - Session storage for high-performance authentication
- **Bcryptjs** - Password hashing for security

## 📦 Installation
### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL & Redis installed and running
- npm (comes with Node.js)

### Setup
1. **Clone the repository**
``` bash
git clone https://github.com/Pyro-Kinetic/doowit.git
cd doowit
```

2. **Backend Configuration**
Navigate to the `backend` directory and install dependencies:
``` bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory with the following variables:
```
PORT=8000
SESSION_SECRET=your_long_session_secret
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=doowit
REDIS_URL=redis://localhost:6379
CLIENT_ORIGIN=http://localhost:3000
```
Start the backend server:
``` bash
npm start
```

3. **Frontend Configuration**
Navigate to the `frontend` directory and install dependencies:
``` bash
cd ../frontend
npm install
```
Start the frontend development server:
``` bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

## 🎮 How to Use
### Getting Started
1. **Register/Login**: Create an account to start managing your tasks.
2. **Adding Tasks**: Click the **+** button to open the add task form.
3. **Task Details**: Enter a title (max 25 characters) and description (max 150 characters).
4. **Select Priority**: Small (Moon), Medium (Planet), or Large (Sun).
5. **Save**: Click **Add+** to save.

### Managing Tasks
- **Complete**: Click the priority icon (left side) to mark as complete.
- **Edit**: Click the pencil icon to modify the task.
- **Delete**: Click the X icon to remove the task.
- **View Details**: Click anywhere on the task body to open the detail modal.

### Navigation
- **Filter Toggle**: Click the checkmark icon to toggle between all tasks and completed tasks only.
- **Contact**: Access the contact form via the navigation button.

## 📱 Responsive Design
The app features a fully responsive design that works seamlessly across all devices:
- **Mobile**: Single column layout with optimized touch targets.
- **Tablet**: 2-3 column grid for efficient space usage.
- **Desktop**: Sidebar layout with image and tasks side-by-side.

## 🎨 Customization
The app uses CSS custom properties for easy theming. Priority colors can be customized in : `frontend/src/index.css`
- Moon: (Turquoise) `rgb(9, 209, 207)`
- Planet: (Blue) `rgb(1, 95, 182)`
- Sun: (Orange) `rgb(243, 101, 29)`
- Star: `rgb(0, 255, 0)` (Green)

## 🧪 Available Scripts
### Frontend
``` bash
npm start # Development server
npm run build # Production build
npm test # Run tests
```

### Backend
``` bash
npm start # Start production server
```

## 📂 Project Structure
``` 
doowit/
├── backend/
│   ├── src/
│   │   ├── config/       # Configuration (Env, Redis)
│   │   ├── controllers/  # Route controllers (Auth, Tasks)
│   │   ├── db/           # Database connection
│   │   ├── middleware/   # Custom middleware (Auth, Rate Limit)
│   │   ├── routes/       # API routes
│   │   └── server.js     # Entry point
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/       # Images and fonts
│   │   ├── components/   # UI components
│   │   ├── config/       # API configuration
│   │   ├── utils/        # Helper functions
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── index.js
│   └── package.json
└── README.md
```

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

## 🎯 Future Enhancements
- Task due dates and reminders
- Categories and tags
- Task search and filtering
- Dark mode toggle
- Mobile app version (React Native)

Built with ❤️ using React, Node.js, and cosmic inspiration ✨
