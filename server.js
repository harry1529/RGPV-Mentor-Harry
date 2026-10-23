require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { generatedAdmin } = require('./lib/db');
const { page, container } = require('./lib/layout');

const app = express();
app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use((req, res, next) => { res.set({ 'X-Frame-Options': 'SAMEORIGIN', 'Referrer-Policy': 'strict-origin-when-cross-origin' }); next(); });
app.use(cookieParser());
app.use(express.static(require('path').join(__dirname, 'public'), { maxAge: '1h' }));
app.get('/health', (req, res) => res.send('ok'));
app.get('/robots.txt', (req, res) => res.type('text/plain').send('User-agent: *\nDisallow: /admin\nAllow: /\n'));
app.use('/admin', require('./routes/admin'));
app.use('/', require('./routes/public'));

app.use((req, res) => res.status(404).send(page({ title: 'Not found', body: container('<div class="py-space-xl text-center"><h1 class="font-headline-lg text-[32px] font-bold">Page not found</h1><p class="text-on-surface-variant mt-2">That page or file does not exist (it may have been deleted).</p><a href="/" class="inline-block mt-5 px-6 h-11 leading-[44px] rounded-lg bg-primary text-on-primary font-label-lg">Back to home</a></div>') })));
app.use((err, req, res, next) => { console.error(err); res.status(500).send(page({ title: 'Error', body: container('<div class="py-space-xl text-center"><h1 class="font-headline-lg text-[32px] font-bold">Something went wrong</h1><a href="/" class="text-primary">Back to home</a></div>') })); });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\nMentor Harry for RGPV running on http://localhost:${PORT}`);
  if (generatedAdmin) console.log(`\n*** FIRST RUN: admin login created ***\n    Email:    ${generatedAdmin.email}\n    Password: ${generatedAdmin.pw}\n    (Change it in Admin > Account, or set ADMIN_EMAIL / ADMIN_PASSWORD before first run.)\n`);
});
