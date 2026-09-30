# CodeFolio — No-Code CMS Portfolio Builder for Engineers

CodeFolio is a full-stack SaaS ecosystem designed specifically for developers to dynamically compile and deploy beautiful web portfolios via dynamic backend-driven vanity URLs (`/:username`).

---

## 🛠️ Architecture & Core Dependencies

### 1. Backend Server Framework (`/server`)
* **Runtime Environment:** Node.js (v24+)
* **Database Driver:** MongoDB Atlas via Mongoose Object Modeling
* **Authentication Integrity:** JSON Web Tokens (JWT) & Bcryptjs password hashing
* **Mail Dispatch Service:** Nodemailer SMTP transport delivery routing channels

### 2. Client Application Interface (`/client`)
* **Build Engine:** Vite + React.js
* **Routing Pipeline:** React Router Dom (Dynamic dynamic lookup mapping)
* **Metadata & Indexing Optimization:** React Helmet (Phase 3 Search Engine Optimization)

---

## 🚀 Installation & Local Environment Execution Guide

Follow these sequential terminal commands to initialize the local build spaces:

### Step 1: Backend Setup Configuration
Open a separate terminal shell workspace instance, navigate inside the server layout path, install module layers, and launch the service process:
```bash
cd server
npm install
node server.js
```
*Make sure your `.env` configuration file contains your `MONGO_URI`, `JWT_SECRET`, and local execution `PORT` mapping flags.*

### Step 2: Client Frontend Launch
Open a second parallel terminal window layout panel, install bundle dependencies, and launch Vite's hot-reloaded development tracking environment server:
```bash
cd client
npm install
npm run dev
```

---

## 📂 Structural Deliverables Index
* `/server/models/user.js`: Custom Mongoose configuration dynamic data schema modeling properties.
* `/client/src/Templates/TemplateEngine.jsx`: Advanced central dictionary lookups mapping logic dispatching portfolio templates based on user template preference indices.
* `SYSTEM_DESIGN.md`: Detailed engineering report clarifying the architectural paradigms of vanity URI routing operations.

# CodeFolio System Design Routing Documentation Note

## Evaluation Parameter Specification Registry Checking: Dynamic Client vs Backend Custom Path Handling Summary

### Architecture Decision: Client Parameter Routing Extraction Strategy
For resolving user public portfolios cleanly without configuration deployment clash parameters block patterns, this full-stack MERN application establishes target profile lookups utilizing **React Router client-side parameters mapping extraction matrix arrays (`/:username`)** within the client tier framework layer context setup.

1. **Routing Priorities Handlers Execution Sequence Table Alignment Blueprint:**
   All explicit static guest client routing parameters paths (such as `/login`, `/register`, and localized system modules interfaces like `/dashboard`) execute within high priority levels at the top of the React Router matching block context assembly table arrays layout configuration.
2. **Wildcard Parameter Dynamic Resolution:**
   The universal vanity wildcard slug parameters engine (`Route path="/:username"`) sits at the **absolute fallback base layer bottom level** of the router mounting table array execution lifecycle trace stack tree structure.
3. **Data Hydration Pipeline Loop Sync Handshake Operations Flow:**
   When a client requests `://://codefolio.com`, React Router captures the route slug string key token array parameter parsing metrics via `useParams()`. The engine component invokes a centralized non-authenticated public tracking data payload query call directly across the target API endpoint router middleware layer gateway system `http://localhost:5000/api/profile/public/Raj`.
