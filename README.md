# Task Management Application

A full-stack web app for managing tasks with title, description, and completion status.

---

## Tech stack

| Layer      | Technology |
|-----------|------------|
| **Frontend** | React 18, Vite, Tailwind CSS, Axios, Lucide React (icons) |
| **Backend**  | Node.js, Express |
| **Database** | Supabase (PostgreSQL) |

---

## Steps to run the project locally

### 1. Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. In the **SQL Editor**, run the script in **`supabase-schema.sql`** (in this repo) to create the `tasks` table.
3. In **Settings → API**, copy:
   - **Project URL**
   - **service_role** key (keep it secret)

### 2. Backend

```bash
cd backend
cp .env.example .env
```

Edit **`.env`** and set:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
PORT=3000
```

Then:

```bash
npm install
npm run dev
```

Backend runs at **https://revision-1.vercel.app/api/tasks**.  
APIs: `GET /api/tasks`, `POST /api/tasks`, `PUT /api/tasks/:id`.

### 3. Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at **https://chipper-queijadas-34b5b7.netlify.app/** (or the port Vite shows).

- By default it uses **https://revision-1.vercel.app/api/tasks** for the API.
- For a different backend URL, create **`.env`** in `frontend` with:
  ```
  VITE_API_URL=https://revision-1.vercel.app/api/tasks
  ```

### 4. Use the app

Open **https://chipper-queijadas-34b5b7.netlify.app/** in the browser. Add tasks (title + optional description), view the list, and mark tasks as completed.

---

## Assumptions and limitations

- **Supabase**: You have a Supabase project and have run `supabase-schema.sql` so the `tasks` table exists.
- **CORS**: Backend allows all origins; for production you may want to restrict this.
- **Auth**: No user authentication; all tasks are in one shared list.
- **No delete**: The assessment did not require delete; only add, list, and mark completed are implemented for tasks.
- **Status**: Tasks have two statuses only: **Pending** and **Completed** (no “In progress” or custom statuses).

---

## Bonus features

- **Description field** – Optional description in addition to title.
- **Client-side validation** – “Task title is required” when title is empty; form does not submit.
- **Server-side validation** – Backend returns 400 if title is missing.
- **Clear UI** – Card layout, status and created date per task, distinct pending vs completed styling (e.g. strikethrough when completed).
- **Single source of truth** – Task list updates immediately when adding or marking a task completed (shared state in the app).

---

## (Optional) Live deployed URL


Example:

- **Frontend:*https://chipper-queijadas-34b5b7.netlify.app/*  
- **Backend:*https://revision-1.vercel.app/api/tasks*  

Ensure the deployed frontend’s `VITE_API_URL` points to your deployed backend (e.g. `/api`).
