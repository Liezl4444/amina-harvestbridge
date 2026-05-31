# Amina Mokoena · HarvestBridge
## AI Learning Companion — Dynamic Innovation GIJ 878
### GIBS MBA · Gordon Institute of Business Science

---

## What this is

Three AI-powered learning bots featuring **Amina Mokoena**, CEO of the fictional **HarvestBridge** company. Deployed as separate Netlify sites, embedded via iframe in Blackboard Ultra.

Amina appears at four touchpoints across the three-day Dynamic Innovation intensive. Each conversation gives students progressively less certainty and more at stake — rewarding those who engaged early with accumulated narrative depth.

Built and maintained by **Digital Education · GIBS**  
Contact: liezl@gibs.co.za

---

## Repository structure

```
amina-harvestbridge/
├── README.md                        ← You are here
├── SYSTEM_PROMPT.md                 ← Amina's full character brief (shared across all bots)
│
├── day1/                            ← Bot 1: harvestbridge-day1.netlify.app
│   ├── index.html                   ← Full chat interface (Stage 1 + Stage 2)
│   ├── amina.jpg                    ← Amina's photo (add before deploying)
│   ├── netlify.toml
│   └── netlify/functions/
│       ├── chat.js                  ← Claude API + fallback library
│       ├── verify.js                ← SCALETRAP unlock validation
│       └── health.js                ← Health check endpoint
│
├── day2/                            ← Bot 2: harvestbridge-day2.netlify.app
│   ├── index.html
│   ├── amina.jpg
│   ├── netlify.toml
│   └── netlify/functions/
│       ├── chat.js
│       ├── verify.js                ← PATHLOCK unlock validation
│       └── health.js
│
└── day3/                            ← Bot 3: harvestbridge-day3.netlify.app
    ├── index.html
    ├── amina.jpg
    ├── netlify.toml
    └── netlify/functions/
        ├── chat.js
        └── health.js                ← No unlock needed for Day 3
```

---

## The three bots

| Bot | Netlify URL | BB Ultra placement | Conversation mode | Unlock word |
|-----|-------------|-------------------|-------------------|-------------|
| Bot 1 | harvestbridge-day1.netlify.app | Day 1 folder — twice | Stage 1: orientation (morning) → Stage 2: scaling challenge (end of day) | `SCALETRAP` |
| Bot 2 | harvestbridge-day2.netlify.app | Day 2 folder — end of day | Coordination crisis mode | `PATHLOCK` |
| Bot 3 | harvestbridge-day3.netlify.app | Day 3 folder — end of day | Synthesis and decision mode | None |

---

## Before you deploy — checklist

### 1. Add Amina's photo
Place `amina.jpg` in the root of each day folder (`day1/`, `day2/`, `day3/`).  
The interface has a graceful SVG fallback if the image doesn't load — but the photo should be there.  
Recommended: square crop, minimum 200×200px, JPEG.

### 2. Create the GitHub repo
```bash
# If starting from scratch
git init
git add .
git commit -m "Initial commit — HarvestBridge Bot 1"
git remote add origin https://github.com/YOUR-ORG/amina-harvestbridge.git
git push -u origin main
```

### 3. Create three Netlify sites
Create each site separately in the Netlify dashboard.  
**Key setting for each:** Build Settings → Base directory → set to `day1`, `day2`, or `day3`

| Site name | Base directory | Publish directory |
|-----------|---------------|-------------------|
| harvestbridge-day1 | `day1` | `day1` |
| harvestbridge-day2 | `day2` | `day2` |
| harvestbridge-day3 | `day3` | `day3` |

> Netlify subdomain names are first-come-first-served. Claim all three even before Day 2 and 3 are built — you can deploy placeholder pages to hold them.

### 4. Set environment variables (per site — never shared)

Go to: **Site → Site configuration → Environment variables**

| Variable | Day 1 value | Day 2 value | Day 3 value |
|----------|-------------|-------------|-------------|
| `ANTHROPIC_API_KEY` | `sk-ant-...` | `sk-ant-...` | `sk-ant-...` |
| `UNLOCK_CODE` | `SCALETRAP` | `PATHLOCK` | *(not needed)* |

> ⚠️ Never put the API key or unlock codes in the HTML or JavaScript. They must live only as Netlify environment variables.

---

## Netlify build settings (per site)

Each `netlify.toml` is already configured. The key settings are:

```toml
[build]
  functions = "netlify/functions"
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "ALLOWALL"
    Content-Security-Policy = "frame-ancestors *"
```

The `frame-ancestors *` header is essential — without it, Blackboard Ultra will refuse to load the iframe.

---

## Blackboard Ultra embed codes

Paste these into a **Blackboard Ultra content item** using the HTML source editor (`< >`).  
Set the content item to **full width** in BB Ultra for best display.

### Bot 1 — Day 1 morning (Stage 1: Orientation)
```html
<iframe
  src="https://harvestbridge-day1.netlify.app"
  width="100%"
  height="820"
  title="Amina Mokoena – HarvestBridge · Day 1 Morning"
  allow="clipboard-write"
  style="border: none; border-radius: 12px; display: block;"
  loading="lazy"
></iframe>
```

### Bot 1 — Day 1 end of day (Stage 2: SCALETRAP)
Same URL — the unlock banner appears automatically after 4 exchanges. Students enter `SCALETRAP` (shared by faculty at the end of Day 1 theory sessions).
```html
<iframe
  src="https://harvestbridge-day1.netlify.app"
  width="100%"
  height="820"
  title="Amina Mokoena – HarvestBridge · Day 1 End of Day"
  allow="clipboard-write"
  style="border: none; border-radius: 12px; display: block;"
  loading="lazy"
></iframe>
```

### Bot 2 — Day 2 end of day (PATHLOCK)
```html
<iframe
  src="https://harvestbridge-day2.netlify.app"
  width="100%"
  height="820"
  title="Amina Mokoena – HarvestBridge · Day 2"
  allow="clipboard-write"
  style="border: none; border-radius: 12px; display: block;"
  loading="lazy"
></iframe>
```

### Bot 3 — Day 3 end of day (no unlock)
```html
<iframe
  src="https://harvestbridge-day3.netlify.app"
  width="100%"
  height="820"
  title="Amina Mokoena – HarvestBridge · Day 3"
  allow="clipboard-write"
  style="border: none; border-radius: 12px; display: block;"
  loading="lazy"
></iframe>
```

---

## Health checks

Before every session, confirm all three bots are live:

| Bot | Health check URL |
|-----|-----------------|
| Bot 1 | https://harvestbridge-day1.netlify.app/.netlify/functions/health |
| Bot 2 | https://harvestbridge-day2.netlify.app/.netlify/functions/health |
| Bot 3 | https://harvestbridge-day3.netlify.app/.netlify/functions/health |

A healthy response looks like:
```json
{
  "status": "ok",
  "bot": "harvestbridge-day1",
  "character": "Amina Mokoena",
  "api_key_configured": true,
  "timestamp": "2026-06-05T07:30:00.000Z"
}
```

If `api_key_configured` returns `false`, the environment variable is missing — redeploy after setting it.

---

## How the unlock system works

Bot 1 (Stage 2) and Bot 2 use a keyword unlock:

1. The bot's HTML counts student message exchanges
2. After 4 exchanges, an unlock banner appears automatically
3. The student enters the keyword shared by faculty
4. The keyword is sent to `/.netlify/functions/verify` — a Netlify serverless function
5. The function compares it (case-insensitive) against the `UNLOCK_CODE` environment variable
6. If valid, the bot transitions to the next conversation mode

The keyword is **never in the client-side HTML or JavaScript**. It lives only in Netlify environment variables. Students cannot find it by inspecting source code.

---

## Reliability architecture

Every API call has:
- **8-second timeout** — aborts if Claude takes too long
- **2 retries** with a 2-second gap before fallback fires
- **Pre-authored fallback library** — 10 responses per bot stage, written in Amina's voice, indistinguishable from live responses
- **No visible error states** — students always receive a response

If the Anthropic API is down, students will still have a full, coherent conversation with Amina.

---

## Making changes

### Updating Amina's system prompt or voice
Edit `SYSTEM_PROMPT.md` (character reference) and the system prompt strings inside each `chat.js`.  
Push to GitHub → Netlify redeploys in ~30 seconds.

### Updating fallback responses
Edit the `FALLBACK_RESPONSES_*` arrays in each `chat.js`.

### Changing the unlock codes
Update the `UNLOCK_CODE` environment variable in the Netlify dashboard for the relevant site.  
No code change needed — the value is read at runtime.

### Updating Amina's photo
Replace `amina.jpg` in the relevant day folder and push.

---

## VS Code recommended workflow

```
1. Open the amina-harvestbridge/ folder in VS Code
2. Make changes to index.html, chat.js, or SYSTEM_PROMPT.md
3. git add . && git commit -m "describe your change"
4. git push origin main
5. Netlify detects the push and redeploys — watch progress in the Netlify dashboard
6. Hit the health check URL to confirm the new deployment is live
7. Test the bot in a browser before the session starts
```

---

## Design decisions

**Why three separate Netlify sites from one repo?**  
Each site has its own environment variables (different unlock codes, same API key). This is cleaner and more secure than one site trying to manage multiple unlock contexts. It also means a problem with Day 2's deployment doesn't affect Day 1 or Day 3.

**Why no split-room hybrid?**  
Faculty deliver either fully online or fully face-to-face. The bot architecture follows the same principle — each student cohort gets the same clean experience regardless of delivery mode.

**Why is the unlock in the server function and not the HTML?**  
Security. Any keyword stored in client-side JavaScript can be found by a student who opens browser DevTools. The Netlify function is server-side — the keyword is invisible to the browser.

**Why Google Fonts instead of the system font stack?**  
The brief originally specified system fonts for performance. The Dean has reviewed and approved the current design including Google Fonts (DM Serif Display + Inter). If font loading ever causes issues in a low-bandwidth context, the fallback stack in the CSS (`Georgia, serif` / `system-ui, sans-serif`) will render correctly.

---

## Technical stack

| Layer | Technology |
|-------|-----------|
| Frontend | Single-file HTML + CSS + vanilla JS (no build step) |
| AI | Anthropic Claude Sonnet via Netlify serverless functions |
| Hosting | Netlify (3 sites, 1 GitHub repo) |
| Fonts | Google Fonts (DM Serif Display, Inter) |
| Accessibility | WCAG 2.1 AA — ARIA live regions, keyboard nav, focus rings |
| LMS integration | Blackboard Ultra iframe embed |
| Analytics | None (no persistent student data stored) |

---

## Academic integrity notes

- No student data is stored or logged
- Each conversation is stateless — no history carries between sessions
- The bot is a diagnostic thinking tool, not an assessment-completing tool
- Students cannot extract the system prompt or unlock codes from the client-side code
- Consistent with the GenAI disclosure framework in Prof Mthombeni's course brief

---

*Last updated: June 2026 · Digital Education · GIBS MBA · liezl@gibs.co.za*
