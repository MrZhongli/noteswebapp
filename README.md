# Note Taking App

This project is a note-taking application built with Next.js, TypeScript, and TailwindCSS. It allows users to create, organize, and manage notes efficiently.

## Prerequisites

Before running the application, ensure the following are installed on your system:

- **Node.js**: Version 16 or higher
- **npm** or **yarn**: For managing dependencies
- **Database**: A PostgreSQL database configured with the required schema

## Environment Variables

To configure the application, create a `.env.local` file in the root directory and include the following variables:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8023
```

Replace `http://localhost:8023` with the actual API URL and port if different.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up the database:
   - Ensure your PostgreSQL database is running.
   - Run the necessary migrations or use a database dump to set up the required tables (e.g., categories, notes).

## Running the Application

### Development Mode

1. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Open the application in your browser at `http://localhost:3000`.

### Production Mode

1. Build the application:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Start the production server:
   ```bash
   npm run start
   # or
   yarn start
   ```

3. Open the application in your browser at `http://localhost:3000`.

## Features

- Create, update, and delete notes.
- Organize notes into categories.
- Fetch categories dynamically from the API.

## UI Components

Some components in the project were built using the **shadcn UI** library. If you need to add any missing components, you can do so by following these steps:

### Create Project

Run the init command to set up the `shadcn` UI in your project:

```bash
npx shadcn@latest init
```

Use the `-d` flag for default settings:

```bash
npx shadcn@latest init -d
```

### Configure `components.json`

You will be prompted to configure the `components.json` file:

- **Which style would you like to use?**: New York
- **Which color would you like to use as base color?**: Zinc
- **Do you want to use CSS variables for colors?**: Yes

### Add Components

To add any missing components:

```bash
npx shadcn@latest add <component-name>
```

Most required components are already included in the project, but this command can be used to add any additional components if needed.

## API Endpoints

Ensure your backend API is running and provides the following endpoints:

- **GET /categories**: Fetch all categories.
- **POST /notes**: Create a new note.
- **PATCH /notes/{id}**: Update a note by ID.
- **DELETE /notes/{id}**: Delete a note by ID.

## Troubleshooting

- **Environment Variables Not Found**:
  Ensure the `.env.local` file is in the root directory and properly configured.

- **API Requests Failing**:
  Verify that the backend API is running and accessible at the configured URL.

- **Database Errors**:
  Confirm that the database is set up with the required schema and migrations have been applied.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

For further assistance, feel free to reach out to the project maintainers.

---

Made with ❤️ by Kenneth Chan.

