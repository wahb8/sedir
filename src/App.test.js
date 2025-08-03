// Import testing utilities from React Testing Library
import { render, screen } from '@testing-library/react';
// Import the App component to test
import App from './App';

// This test checks if the 'learn react' link is rendered in the App component
// (This is a default test from Create React App and may not match your actual UI)
test('renders learn react link', () => {
  // Render the App component in a virtual DOM
  render(<App />);
  // Try to find an element with text 'learn react' (case-insensitive)
  const linkElement = screen.getByText(/learn react/i);
  // Assert that the element is present in the document
  expect(linkElement).toBeInTheDocument();
});
