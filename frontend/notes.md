| Purpose            | Color                           | Example                         |
| ------------------ | ------------------------------- | ------------------------------- |
| **Background**     | `#0f0f0f` (very dark gray)      | Main layout background          |
| **Surface / Card** | `#1c1c1e`                       | Inner containers, modals        |
| **Primary Text**   | `#f5f5f5` (soft white)          | Headings, paragraphs            |
| **Secondary Text** | `#b3b3b3` (gray)                | Descriptions, labels            |
| **Primary Accent** | `#7c3aed` (purple/violet)       | Buttons, links                  |
| **Success**        | `#22c55e` (green)               | Status, badges                  |
| **Warning**        | `#eab308` (yellow)              | Cancel notice, warning banners  |
| **Error**          | `#ef4444` (red)                 | Error states, invalid forms     |
| **Button Hover**   | Slightly lighter shade of above | e.g. `#a78bfa` for violet hover |


src/
│
├── assets/           → images, logos, etc.
├── components/       → shared components (Navbar, Button, Input, etc.)
├── pages/            → page-level components (Login, Register, Dashboard, etc.)
├── layouts/          → layout wrappers (AdminLayout, UserLayout...)
├── services/         → Axios setup and API functions
├── utils/            → helper functions, constants
├── App.js
└── index.css



## Step for creating the Proejct -
    # Step one, firstly setup the project and install react and tailwind and add necessary folders.
    # Step two, Create the Home page file in the pages folder