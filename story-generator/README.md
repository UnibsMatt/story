# Random Story Generator

A React application that generates random stories using a simulated API call. The app features a clean UI with loading states, error handling, and a modal component.

## Features

- Generates random stories with a single click
- Loading state during story generation
- Error handling for failed requests
- Modal component for additional UI elements
- Responsive design

## Technologies Used

- React (with hooks)
- CSS for styling
- StripeModal component (external dependency)

## File Structure

```
src/
├── App.jsx          # Main application component
├── components/
│   └── StripeModal.jsx # Modal component
└── App.css          # Stylesheet
```

## Component Breakdown

### App.jsx

The main application component that handles:
- State management for story content, loading status, and errors
- Story generation logic (simulated with mock data)
- Modal visibility control
- UI rendering for the story generator interface

### StripeModal.jsx

A reusable modal component that can be opened/closed via props.

### App.css

Contains all the styling for the application including:
- Layout and spacing
- Button styles
- Responsive design elements
- Loading animation styles

## How It Works

1. On initial load, the app automatically generates a story
2. Users can click the "Generate Story" button to create new stories
3. During generation, a loading state is displayed
4. Mock stories are randomly selected from a predefined array
5. Errors are displayed if story generation fails

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## Usage

1. Click the "Generate Story" button to create a new random story
2. View the generated story in the story container
3. Use the modal component as needed for additional functionality

## Customization

To modify the stories generated:
1. Edit the `mockStories` array in `App.jsx`
2. Add or remove stories as needed

To change the styling:
1. Modify the CSS in `App.css`
2. Update class names in `App.jsx` as needed

## Future Improvements

- Connect to actual AI story generation API
- Implement story saving functionality
- Add story categories or themes
- Include story sharing capabilities
- Add more sophisticated error handling