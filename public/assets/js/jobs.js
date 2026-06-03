/* global window, document */

(function () {
    const FIVE_DAYS_MS = 5 * 24 * 60 * 60 * 1000;

    const FEED_URL = (typeof window.BHUJONLINE_JOBS_FEED_URL === 'string' && window.BHUJONLINE_JOBS_FEED_URL.trim())
        ? window.BHUJONLINE_JOBS_FEED_URL.trim()
        : 'assets/data/jobs.json';

    const FORM_URL = (typeof window.BHUJONLINE_JOB_POST_FORM_URL === 'string' && window.BHUJONLINE_JOB_POST_FORM_URL.trim())
        ? window.BHUJONLINE_JOB_POST_FORM_URL.trim()
        : '';

    function byId(id) {
        return document.getElementById(id);
    }

    function safeText(value) {
        return (value == null) ? '' : String(value);
    }

    function parseDate(value) {
        if (!value) return null;
        if (value instanceof Date) return value;

        const asNumber = Number(value);
        if (!Number.isNaN(asNumber) && asNumber > 0) {
            // Accept seconds or milliseconds
            return new Date(asNumber < 10_000_000_000 ? asNumber * 1000 : asNumber);
        }

        const d = new Date(String(value));
        return Number.isNaN(d.getTime()) ? null : d;
    }

    function formatDate(d) {
        try {
            return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
        } catch {
            return d.toDateString();
        }
    }

    function msLeft(expiresAt) {
        return expiresAt.getTime() - Date.now();
    }

    function humanLeft(expiresAt) {
        const left = msLeft(expiresAt);
        if (left <= 0) return 'Expired';

        const days = Math.ceil(left / (24 * 60 * 60 * 1000));
        if (days === 1) return '1 day left';
        return `${days} days left`;
    }

    function normalizeJob(job) {
        const createdAt = parseDate(job.created_at || job.createdAt || job.posted_at || job.postedAt);
        if (!createdAt) return null;

        const expiresAt = new Date(createdAt.getTime() + FIVE_DAYS_MS);

        return {
            title: safeText(job.title || job.job_title || job.position).trim(),
            company: safeText(job.company || job.company_name || job.employer).trim(),
            location: safeText(job.location || job.area || job.city).trim(),
            phone: safeText(job.phone || job.contact_phone || job.mobile).trim(),
            email: safeText(job.email || job.contact_email).trim(),
            salary: safeText(job.salary || job.ctc || job.pay).trim(),
            description: safeText(job.description || job.details || job.desc).trim(),
            createdAt,
            expiresAt,
        };
    }

    function matchesQuery(job, query) {
        if (!query) return true;
        const q = query.toLowerCase();
        return [job.title, job.company, job.location, job.phone, job.email, job.salary, job.description]
            .filter(Boolean)
            .some((v) => v.toLowerCase().includes(q));
    }

    function renderJobs(jobs, query) {
        const list = byId('jobs-list');
        const count = byId('jobs-count');
        const empty = byId('jobs-empty');

        if (!list || !count || !empty) return;

        const filtered = jobs.filter((j) => matchesQuery(j, query));

        count.textContent = filtered.length ? `${filtered.length} active` : '';

        if (filtered.length === 0) {
            list.innerHTML = '';
            empty.hidden = false;
            return;
        }

        empty.hidden = true;

        list.innerHTML = filtered.map((job) => {
            const title = job.title || 'Job';
            const company = job.company || 'Company';
            const location = job.location || 'Bhuj';
            const posted = formatDate(job.createdAt);
            const expires = formatDate(job.expiresAt);
            const left = humanLeft(job.expiresAt);

            const contactParts = [];
            if (job.phone) {
                const digits = encodeURIComponent(job.phone.replace(/\s+/g, ''));
                contactParts.push(`<a class="job-link" href="tel:${digits}">📞 ${escapeHtml(job.phone)}</a>`);
            }
            if (job.email) {
                const mail = encodeURIComponent(job.email);
                contactParts.push(`<a class="job-link" href="mailto:${mail}">✉️ ${escapeHtml(job.email)}</a>`);
            }

            const salaryHtml = job.salary ? `<div class="job-pill">💰 ${escapeHtml(job.salary)}</div>` : '';
            const descHtml = job.description ? `<div class="job-desc">${escapeHtml(job.description)}</div>` : '';

            return `
                <article class="job-card" aria-label="Job posting">
                    <div class="job-head">
                        <div>
                            <h3 class="job-title">${escapeHtml(title)}</h3>
                            <div class="job-company">${escapeHtml(company)} • ${escapeHtml(location)}</div>
                        </div>
                        <div class="job-expiry" title="This job expires 5 days after posting">
                            <div class="job-expiry-label">Expires</div>
                            <div class="job-expiry-date">${escapeHtml(expires)}</div>
                            <div class="job-expiry-left">${escapeHtml(left)}</div>
                        </div>
                    </div>

                    <div class="job-meta">
                        <div class="job-pill">🗓️ Posted: ${escapeHtml(posted)}</div>
                        ${salaryHtml}
                        ${contactParts.length ? `<div class="job-contact">${contactParts.join('')}</div>` : ''}
                    </div>

                    ${descHtml}
                </article>
            `;
        }).join('');
    }

    function escapeHtml(str) {
        return safeText(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    async function loadJobs() {
        const loading = byId('jobs-loading');
        const error = byId('jobs-error');
        const empty = byId('jobs-empty');

        if (loading) loading.hidden = false;
        if (error) error.hidden = true;
        if (empty) empty.hidden = true;

        let payload;

        try {
            const resp = await fetch(FEED_URL, { cache: 'no-store' });
            if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
            payload = await resp.json();
        } catch {
            if (loading) loading.hidden = true;
            if (error) error.hidden = false;
            return { jobs: [] };
        }

        const rawJobs = Array.isArray(payload)
            ? payload
            : Array.isArray(payload.jobs)
                ? payload.jobs
                : [];

        const now = Date.now();
        const active = rawJobs
            .map(normalizeJob)
            .filter(Boolean)
            .filter((j) => j.expiresAt.getTime() > now);

        // Sequential: oldest first
        active.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

        if (loading) loading.hidden = true;

        return { jobs: active };
    }

    function initPostButton() {
        const btn = byId('job-form-link');
        const hint = byId('job-form-hint');
        if (!btn || !hint) return;

        if (!FORM_URL) {
            btn.setAttribute('aria-disabled', 'true');
            btn.classList.add('is-disabled');
            btn.href = '#';
            hint.hidden = false;
            return;
        }

        btn.href = FORM_URL;
        hint.hidden = true;
    }

    async function init() {
        initPostButton();

        const search = byId('jobs-search');
        const { jobs } = await loadJobs();

        const renderNow = () => {
            const q = search ? (search.value || '').trim() : '';
            renderJobs(jobs, q);
        };

        renderNow();

        if (search) {
            search.addEventListener('input', renderNow);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
