# OTC Voice Trading Assistant

A unified demo application showcasing a voice‑enabled and text‑based trading assistant built on Bland.ai. This monorepo contains three logical services:

1. **backend/** — Server that issues Bland.ai tokens & handles any secure server‑side operations.
2. **frontend/** — React/Vite single‑page app providing the user interface for voice and text chat.
3. **webAgent/** — Node.js Express service exposing Bland.ai Pathway Chat endpoints, webhooks, and business logic.

All three live under one Git repository to simplify development, but can be deployed independently.

---

## 🚀 Getting Started

### Prerequisites

* **Node.js** v16+ and **npm**
* **Git** installed
* **Bland.ai** account with:

  * Organization API Key
  * Pathway ID & Start Node ID
* (Optional) **Webhook** receiver URL for conversation logging

### Clone the Repository

```bash
git clone https://github.com/your-org/otc-voice-trading-assistant.git
cd otc-voice-trading-assistant
```

---

## 🔧 Configuration & Environment Variables

Each sub‑folder has its own `.env` file. Copy the example and fill in your credentials:

```bash
# In backend/
cp .env.example .env
# In webAgent/
cp .env.example .env
# In frontend/
cp .env.example .env
```

Populate with:

| Key                        | Location                    | Description                                |
| -------------------------- | --------------------------- | ------------------------------------------ |
| `BLAND_API_KEY`            | backend, webAgent, frontend | `Bearer <org_key>` for API authentication  |
| `PATHWAY_ID`               | webAgent, frontend          | Bland.ai conversational pathway identifier |
| `START_NODE_ID`            | webAgent, frontend          | ID of the first node in your pathway       |
| `WEBHOOK_URL` *(optional)* | webAgent, frontend          | URL to POST chat events for logging        |

---

## 📦 Installation & Run

### 1. Backend Service

```bash
cd backend
npm install
npm run start
```

* **createToken.js**: Generates short‑lived tokens for frontend consumption.
* **server.js**: Main Express app listening on port 4000 by default.

### 2. Web Agent Service

```bash
cd ../webAgent
npm install
npm run start
```

#### Directory Structure

```
webAgent/
├── controllers/
│   └── blandController.js      # API logic for Bland.ai interaction
├── routes/
│   └── blandRoutes.js          # Express route definitions
├── services/
│   └── blandService.js         # Functions to call Bland.ai endpoints
├── index.js                    # Entry point that sets up the Express app
├── .env                        # Environment variables: BLAND_API_KEY, PATHWAY_ID, START_NODE_ID, WEBHOOK_URL
├── package.json
├── package-lock.json
└── node_modules/
```

* **controllers/blandController.js**: Handles incoming HTTP requests and constructs responses.
* **routes/blandRoutes.js**: Maps URL paths to controller functions.
* **services/blandService.js**: Encapsulates direct calls to Bland.ai’s API endpoints.
* **.env**: Sample variables:

  ```bash
  BLAND_API_KEY=Bearer <org_key>
  PATHWAY_ID=<your_pathway_id>
  START_NODE_ID=<start_node_id>
  WEBHOOK_URL=<optional_webhook_url>
  ```

### 3. Frontend App

```bash
cd ../frontend
npm install
npm run dev
```

* Served via Vite on `http://localhost:3000`.
* Switch between **Voice Mode** and **Pathway Chat** in the UI.

---


## ⚙️ Project Structure

```
.otc-voice-trading-assistant/
├── backend/       # Token generation & secure endpoints
├── webAgent/      # Pathway Chat controller, routes, services
├── frontend/      # React/Vite UI with voice & text modes
└── .gitignore
```

---

## 🔮 Future Enhancements

* Add CI/CD pipelines for each service
* Dockerize all components with a single `docker-compose.yml`
* Integrate user authentication & session persistence
* Multi-language support and advanced NLP on a custom server
* Admin dashboard for analytics and conversation metrics

---


