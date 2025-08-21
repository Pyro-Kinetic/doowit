# Doowit - A to do app
A playful and intuitive to-do app that uses cosmic-themed priorities to help you organize and manage your tasks. Built with React and featuring a vibrant, responsive design.

<div align="center">
  <img src="https://github.com/user-attachments/assets/71ed90eb-809d-4a2b-9d2a-fb89ec0b8a05" alt="Meme image representaion of the page" />
</div>

## ✨ Features
- **Cosmic Priority System**: Organize tasks with four visual priority levels:
    - 🌙 **Moon** - Low priority
    - 🪐 **Planet** - Medium priority
    - ☀️ **Sun** - High priority
    - ⭐ **Star** - Completed tasks

- **Task Management**:
    - Create, edit, and delete tasks
    - Mark tasks as complete with a single click
    - View full task details in an elegant modal
    - Filter between active and completed tasks

- **Beautiful UI**:
    - Responsive grid layout that adapts to all screen sizes
    - Color-coded priority themes with gradient backgrounds
    - Custom fonts (Hachi Maru Pop & Roboto) for a unique look
    - Font Awesome icons for crisp, scalable interface elements

- **Accessibility Features**:
    - Proper ARIA labels and semantic HTML
    - Keyboard navigation support
    - Screen reader compatibility
    - Modal backdrop click-to-close functionality

- **Contact Form**: Built-in contact page with form submission via Formspree

## 🚀 Tech Stack
- **React 19** - Modern React with latest features
- **Bootstrap 5** - Responsive CSS framework
- **Font Awesome 7** - Scalable vector icons
- **UUID** - Unique identifier generation
- **React Scripts** - Development and build tooling

## 📦 Installation
### Prerequisites
- Node.js (v18+ recommended)
- npm (comes with Node.js)

### Setup
``` bash
# Clone the repository
git clone https://github.com/your-username/doowit-app.git
cd doowit-app

# Install dependencies
npm install

# Start the development server
npm start
```
The app will open at [http://localhost:3000](http://localhost:3000) with hot reload enabled.

## 🎮 How to Use
### Adding Tasks
1. Click the **+** button to open the add task form
2. Enter a title (max 25 characters) and description (max 150 characters)
3. Select priority level: Small (Moon), Medium (Planet), or Large (Sun)
4. Click **Add+** to save

### Managing Tasks
- **Complete**: Click the priority icon (left side) to mark as complete
- **Edit**: Click the pencil icon to modify the task
- **Delete**: Click the X icon to remove the task
- **View Details**: Click anywhere on the task body to open the detail modal

### Navigation
- **Filter Toggle**: Click the checkmark icon to toggle between all tasks and completed tasks only
- **Contact**: Access the contact form via the navigation button

## 📱 Responsive Design
The app features a fully responsive design that works seamlessly across all devices:
- **Mobile**: Single column layout with optimized touch targets
- **Tablet**: 2-3 column grid for efficient space usage
- **Desktop**: Sidebar layout with image and tasks side-by-side

## 🎨 Customization
The app uses CSS custom properties for easy theming. Priority colors can be customized in : `src/index.css`
- Moon: (Turquoise) `rgb(9, 209, 207)`
- Planet: (Blue) `rgb(1, 95, 182)`
- Sun: (Orange) `rgb(243, 101, 29)`
- Star: `rgb(0, 255, 0)` (Green)

## 🧪 Available Scripts
``` bash
# Development server
npm start

# Production build
npm run build

# Run tests
npm test

# Eject from Create React App (irreversible)
npm run eject
```
## 📂 Project Structure
``` 
doowit-app/
├── public/
├── src/
│   ├── components/
│   │   ├── HomePage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── ToDo.jsx
│   │   ├── AddToDoForm.jsx
│   │   └── EditToDoForm.jsx
│   ├── assets/
│   ├── App.jsx
│   ├── appData.js
│   ├── index.css
│   └── index.js
└── package.json
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
- Data persistence with local storage
- Task export/import functionality

Built with ❤️ using React and cosmic inspiration ✨
