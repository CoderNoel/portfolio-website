# Styles Documentation  
  
## Overview  
This directory contains all CSS files used for styling the portfolio website. The styling is organized into modular components to improve maintainability and readability.  
  
## File Structure  
- `style.css` - Main stylesheet containing global styles and page-specific styles  
- `header.css` - Styles for the website header and navigation components  
- `footer.css` - Styles for the website footer  
  
## CSS Organization  
The CSS is organized using the following principles:  
- Global styles (typography, colors, common elements) are defined in `style.css`  
- Component-specific styles are separated into their respective files  
- Media queries for responsive design are included at the end of each file  
  
## Responsive Design System  
The website uses a breakpoint-based responsive design system:  
- Primary breakpoint: 750px  
  - Desktop view: > 750px  
  - Mobile view: ≤ 750px [1](#1-0)   
  
## CSS Naming Conventions  
- Class names use kebab-case (e.g., `hero-text`, `portfolio-button`)  
- Component containers are named after their section (e.g., `hero`, `about-container`)  
- Utility classes are prefixed with their function (e.g., `nav-elements`, `social-link`)  
  
## Common Components  
### Buttons  
The site uses consistent button styling with hover effects: [2](#1-1)   
  
### Media Queries  
Media queries follow a consistent pattern across all CSS files: [3](#1-2)