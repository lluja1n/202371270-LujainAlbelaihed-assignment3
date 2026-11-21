# Personal Portfolio Website — Assignment 3

**SWE 363 — Web Engineering and Development**

## 1. Project Overview

This project is a responsive and interactive personal portfolio website developed using HTML, CSS, and JavaScript.

Assignment 3 builds upon Assignments 1 and 2 by introducing external API integration, advanced project filtering and sorting, state management, and performance improvements.

The portfolio showcases my background, programming skills, academic projects, and public GitHub repositories.

## 2. Features

### About Me
Introduces my background as a Computer Science student and my interest in software development.

### Skills
Displays my programming languages, including HTML, CSS, JavaScript, Java, Python, and SQL.

### Project Showcase
Displays three projects:
- Smart Mailbox
- Digital Traffic Light System
- E-Waste Management System

Each project includes an image, title, description, and category.

### Project Filtering and Sorting
Visitors can filter projects by All, Software, or Hardware.

Projects can also be sorted alphabetically using Default Order, A–Z, or Z–A.

Both features work together, and the selected filter remains highlighted.

### GitHub API Integration
The website uses the GitHub REST API to retrieve and display my public repositories.

Each repository card displays its name, description (if available), and a link to GitHub.

The application handles loading, empty results, and API errors.

### State Management
The website uses `localStorage` to remember:
- Light/dark mode preference.
- Selected project filter.
- Selected sorting order.

These preferences are restored when the website is refreshed.

### Contact Form Validation
The contact form checks that all required fields are completed and that the email address has a valid format.

The form displays success or error feedback. It is a demonstration feature and does not send messages to a server.

### Theme Toggle
A small moon/sun icon allows visitors to switch between light and dark mode.

### Responsive Design
The layout adjusts to different screen sizes using CSS Flexbox, Grid, and media queries.

### Performance Optimization
Performance improvements include:
- Lazy loading of project images.
- Asynchronous image decoding.
- Deferred JavaScript loading.
- Efficient rendering of GitHub repository cards.
- Support for reduced-motion preferences.

The website achieved a Lighthouse Performance score of 100 in a local mobile test.

## 3. Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Website structure and content |
| CSS3 | Styling and responsive layout |
| JavaScript | Interactive features and application logic |
| GitHub REST API | Fetching public repositories |
| localStorage | Saving user preferences |
| Git and GitHub | Version control |
| Lighthouse | Performance testing |

## 4. Project Structure

```text
202371270-LujainAlbelaihed-assignment3/
├── index.html
├── README.md
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── technical-documentation.md
│   └── ai-usage-report.md
└── .gitignore
```

## 5. How to Run

1. Clone or download the repository.
2. Open the project folder in Visual Studio Code.
3. Install the Live Server extension if needed.
4. Right-click `index.html` and select **Open with Live Server**.
5. Open the generated local URL in your browser.

No additional packages or backend server are required.

An internet connection is needed to retrieve GitHub repository data.

## 6. How to Use

- Navigate between sections using the header links.
- Filter projects using the category buttons.
- Sort projects using the dropdown menu.
- Switch themes using the moon/sun icon.
- Explore public repositories through their GitHub links.
- Enter contact form information to test validation.
- Use the Back to Top button to return to the page header.

## 7. Testing

The website was developed and tested locally using Chrome and Live Server.

Functionality checks include project filtering, sorting, saved preferences, theme switching, form validation, and GitHub API integration.

A Lighthouse mobile performance test returned a score of 100.

## 8. Limitations

- The contact form does not send real messages.
- GitHub API availability depends on network access and API rate limits.
- Only public GitHub repositories are displayed.
- User preferences are stored locally in the browser.

## 9. AI Usage

ChatGPT (GPT-6) was used to assist with code development, explanations, debugging, styling suggestions, and documentation.

AI-generated suggestions were reviewed and adapted to the existing portfolio design.

Detailed AI usage information is provided in `docs/ai-usage-report.md`.

## 10. Author

**Lujain Albelaihed**  
Student ID: 202371270  
Course: SWE 363