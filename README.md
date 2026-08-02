# Personal Portfolio Website — Aditya Raj Saxena

A modern, full stack developer portfolio featuring a glassmorphism dark-mode-first
design, animated interactions, and a complete Node.js/Express/MongoDB backend
powering a live, database-backed contact form and projects list.

---

## ✨ Features

- Responsive, glassmorphism UI with dark mode (default) and light mode toggle
- Animated hero with typewriter effect, floating blobs and shapes
- Scroll-reveal animations, animated skill bars, and animated statistic counters
- Timeline-based Experience & Education sections
- Projects section that can be powered dynamically from the backend API
- Fully working contact form with client + server-side validation, stored in MongoDB
- MVC-structured Express REST API
- SEO-ready: meta tags, Open Graph, Twitter Cards, sitemap.xml, robots.txt, manifest.json
- No frameworks — pure HTML5, CSS3 and vanilla JavaScript on the frontend

---

## 🧰 Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Frontend   | HTML5, CSS3, Vanilla JavaScript      |
| Backend    | Node.js, Express.js                  |
| Database   | MongoDB Atlas, Mongoose              |
| Deployment | Vercel (frontend), Render (backend)  |

---

## 📁 Folder Structure

```
portfolio-website/
├── frontend/
│   ├── index.html
│   ├── about.html
│   ├── projects.html
│   ├── contact.html
│   ├── manifest.json
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── css/
│   │   ├── style.css
│   │   ├── responsive.css
│   │   └── animations.css
│   ├── js/
│   │   ├── main.js
│   │   ├── typing.js
│   │   ├── scroll.js
│   │   ├── theme.js
│   │   └── contact.js
│   └── assets/
│       ├── images/
│       ├── icons/
│       └── resume.pdf
│
├── backend/
│   ├── server.js
│   ├── config/
│   │   ├── db.js
│   │   └── seed.js
│   ├── models/
│   │   ├── Contact.js
│   │   └── Project.js
│   ├── routes/
│   │   ├── contactRoutes.js
│   │   └── projectRoutes.js
│   ├── controllers/
│   │   ├── contactController.js
│   │   └── projectController.js
│   ├── middlewares/
│   │   └── errorHandler.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) account
- Git

### 2. Clone the project

```bash
git clone https://github.com/adityarajsaxena/portfolio-website.git
cd portfolio-website
```

---

## 🗄️ MongoDB Atlas Setup

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Under **Database Access**, create a database user with a username and password.
3. Under **Network Access**, add your IP address (or `0.0.0.0/0` for development).
4. Click **Connect → Drivers** and copy your connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
   ```
5. You'll paste this into `backend/.env` in the next step.

---

## ⚙️ Run the Backend

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and fill in your values:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_atlas_connection_string_here
CLIENT_ORIGIN=http://localhost:5500,http://127.0.0.1:5500
```

Seed the database with sample projects (optional but recommended):

```bash
npm run seed
```

Start the development server (auto-restarts with nodemon):

```bash
npm run dev
```

Or start it in production mode:

```bash
npm start
```

The API will be available at `http://localhost:5000`. Test it:

```bash
curl http://localhost:5000/api/health
```

### API Endpoints

| Method | Endpoint            | Description                     |
|--------|----------------------|----------------------------------|
| GET    | `/api/projects`      | Get all projects                 |
| GET    | `/api/projects/:id`  | Get a single project by ID       |
| POST   | `/api/contact`       | Submit a contact form message    |
| GET    | `/api/contact`       | Get all submitted messages       |
| GET    | `/api/health`        | Health check                     |

---

## 🌐 Run the Frontend

The frontend is static — no build step required. From the `frontend/` folder, serve
it with any static server, for example:

```bash
cd frontend
npx serve .
```

Or simply open `index.html` in your browser using the VS Code "Live Server" extension.

> **Important:** Open `frontend/js/main.js` and update the `window.PORTFOLIO_API_BASE`
> value to match your backend URL (defaults to `http://localhost:5000/api`).

---

## ☁️ Deployment

### Deploy the Backend to Render

1. Push this repository to GitHub.
2. Go to [Render](https://render.com/) → **New → Web Service**.
3. Connect your repository and set:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add the environment variables from your `.env` file (`MONGO_URI`, `CLIENT_ORIGIN`, `NODE_ENV=production`) under **Environment**.
5. Deploy. Render will give you a URL like `https://your-backend.onrender.com`.

### Deploy the Frontend to Vercel

1. Go to [Vercel](https://vercel.com/) → **New Project**.
2. Import your repository and set the **Root Directory** to `frontend`.
3. Framework preset: **Other** (static site, no build step needed).
4. Before/after deploying, update `window.PORTFOLIO_API_BASE` in `frontend/js/main.js`
   to point to your Render backend URL, e.g. `https://your-backend.onrender.com/api`.
5. Deploy. Vercel will give you a live URL for your portfolio.

### Update CORS

Once deployed, update `CLIENT_ORIGIN` in your Render environment variables to include
your live Vercel URL so the backend accepts requests from your deployed frontend.

---

## 📸 Screenshots

> Add screenshots of your deployed site here once available.

- Hero Section: `screenshots/hero.png`
- Projects Section: `screenshots/projects.png`
- Contact Section: `screenshots/contact.png`

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🙋 Author

**Aditya Raj Saxena**
Full Stack Development Intern @ UniConverge Technologies
📍 Noida, Uttar Pradesh, India
