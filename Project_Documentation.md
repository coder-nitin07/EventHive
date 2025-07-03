##  EventHive – Full Stack Event Management & Assignment Platform

# Project Overview -
    EventHive is a full-stack event management platform where users can request personal or professional events (like weddings, birthdays, corporate meetups), and organizers can apply to manage them. An admin reviews the organizer applications for each event and assigns the most suitable one. The platform supports role-based access, event workflows, and a modern React + Tailwind frontend.

    This project is designed to showcase real-world coordination, multi-role workflows, and your ability to build scalable systems from scratch — both backend and frontend.


## Tech Stack - 
    # Backend -
        - Node.js – JavaScript runtime
        - Express.js – API framework
        - MongoDB + Mongoose – NoSQL database
        - JWT – Auth token for login/session handling
        - Cloudinary – Event poster upload (Organizer)
        - Multer – File parsing middleware
        - Joi – Request body validation
        - CORS, Helmet – Middleware for security and config

    # Frontend
        - React.js – Component-based frontend
        - Tailwind CSS – Utility-first responsive styling
        - Axios – To make API requests
        - React Router DOM – Page routing
        - localStorage – Store JWT for user sessions

## User Roles-
    1. User
        - Register & login
        - Submit an Event Request (e.g., "Need a wedding planned on July 10, 2025")
        - Track status of their requested events
        - Cannot manage or modify organizers or events directly

    2. Organizer
        - Register & login as a regular user
        - Submit Organizer Onboarding Request (includes photo, experience, etc.)
        - After approval by Admin:
            - View all open Event Requests
            - Apply to manage events of interest
            - Track assigned events

    3. Admin
        - Login with special privileges
        - View all event requests
        - View all organizer onboarding requests
        - Approve or reject organizer requests with message
        - View all organizer applications per event
        - Assign one organizer per event (auto-reject others with message)
        - Manage users/organizers (optional)

    
## Backend Features -
    - Auth APIs for all roles (JWT-based)
    - Event Request API for users
    - Apply to Event API for organizers
    - Admin approval API to assign an organizer
    - Organizer rejection logic
    - Cloudinary integration (for event posters)
    - Protected routes & RBAC using middleware
    - Input validation via Joi
    - Mongoose models for Users, Events, OrganizerRequests, etc.
    - Organizer Onboarding Request API (pending → approved/rejected)
    - Admin approval/rejection flow with message
    - Organizer access granted only after approval


## Frontend Features -
    - Clean UI with Tailwind CSS 
    - Authentication pages for all roles
    - Dashboard for each role:
        -> User: My Requests
        -> Organizer: Browse + Apply to Events
        -> Admin: Assign Organizers

    - Pages:
        -> Login / Register
        -> Request Event (User) 
        -> View Requests (Organizer)
        -> Event Applicants (Admin)
        -> Assignment Status pages

    
    - Protected Routes using JWT
    - Notification banners (via frontend messages)
    - Axios-based API integration


## Database Models (High-Level) -
| Model                   | Purpose                                               |
| ----------------------- | ----------------------------------------------------- |
| `User`                  | Stores all users (roles: user, organizer, admin)      |
| `EventRequest`          | Created by users (title, date, guests, facilities...) |
| `OrganizerRequest`      | Stores organizer applications per event               |
| `Assignment` (optional) | Final record of assigned organizer                    |
| OrganizerRequest        | Organizer onboarding request & approval logic         |


## Deployment Plan -
| Part         | Platform               |
| ------------ | ---------------------- |
| **Backend**  | Render                 |
| **Frontend** | Vercel or GitHub Pages |
| **Database** | MongoDB Atlas          |
| **Images**   | Cloudinary             |


## Resume Description (Sample) -
    - EventHive – Full Stack Event Assignment Platform
    - Tech: Node.js, Express.js, MongoDB, React.js, Tailwind CSS, JWT, Cloudinary
    - Features: Role-based auth (User, Organizer, Admin), Event Request workflow, Organizer applications, Admin selection and messaging, Protected frontend routes, Full-stack deployment
    - 🔗 GitHub (Frontend & Backend) • 🚀 Live Demo • 📄 Postman Collection


## Features To Be Added Later (Advanced Phase) -
| Feature             | Include Now? | Notes                                        |
| ------------------- | ------------ | -------------------------------------------- |
| Email notifications | ❌            | Add later; start with frontend notifications |
| Real-time updates   | ❌            | Socket.IO can be added later                 |
| Payment integration | ❌            | Out of scope for now                         |
| Ratings or reviews  | ❌            | Maybe for version 2                          |
| RNotify Each Other  | ❌            | WHen Event Successfully Organized if Organie and Admin nofify the EVen t is Completed so the Notification send to each other.                          |