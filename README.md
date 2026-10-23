# Mentor Harry for RGPV

Your Study Partner for RGPV — notes, guidebooks and previous year papers for all 8 semesters (CSE complete, other branches ready to fill).

## What is inside
- **Student site** (no sign-up needed): Home, Browse Notes (search + filters), Semesters (Year 1–4 sections), Branches, Subject pages, in-browser PDF viewer, download, About, Contact / Request notes.
- **Admin portal** at `/admin`: log in, **upload PDFs**, **delete notes**, add/delete subjects, add branches, read student requests, change password.
- **Database**: SQLite file (`data/mentor-harry.db`). **PDFs** are saved in `data/uploads/`.
- All CSE subjects (Sem 1–8) and the common first-year subjects are pre-loaded. **Please check the subject codes/names against the official RGPV scheme** and fix them in Admin → Subjects.

## Run it on your computer
1. Install Node.js **version 22.13 or newer** (the LTS version) from nodejs.org. Check with `node -v`.
2. Open a terminal in this folder and run:
   ```
   npm install
   npm start
   ```
3. Open http://localhost:3000
4. First run prints your admin email and password in the terminal. To choose your own, copy `.env.example` to `.env`, edit `ADMIN_EMAIL` and `ADMIN_PASSWORD`, and **delete the `data` folder** before the first run.
5. Admin login: http://localhost:3000/admin

## Put it online (Render)
1. Upload this folder to a GitHub repository (the `data` and `node_modules` folders are ignored automatically).
2. On render.com: New → Web Service → connect the repo.
   - Build command: `npm install`
   - Start command: `npm start`
3. Add environment variables: `NODE_VERSION=22`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `JWT_SECRET` (any long random text), `NODE_ENV=production`, and `DATA_DIR=/var/data`.
4. **Important:** Render's free plan erases files on every restart/redeploy, so uploaded PDFs and the database would disappear. Add a **Disk** (paid feature) mounted at `/var/data`. Without a disk, do not rely on the free plan for real uploads.

## Changing the design
Pages are in `routes/` and `lib/layout.js`. After changing styles/classes run `npm run build` (needs `npm install` first) to rebuild `public/styles.css`.

## Notes
- Maximum PDF size is 50 MB (`MAX_UPLOAD_MB` to change).
- Only upload material you have the right to share. The footer states this is not officially affiliated with RGPV.
- Back up the `data` folder regularly.

## Troubleshooting
- `npm install` errors: make sure `node -v` shows v22.13 or higher, then delete the `node_modules` folder and run `npm install` again.
- A yellow "SQLite is an experimental feature" warning on start is normal and harmless.
