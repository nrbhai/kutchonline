/**
 * bhuj.kutchonline.com — Page Ads & Banners
 * Edit this single file to update all marketing content across all category pages.
 * No page regeneration needed.
 */
(function () {
    'use strict';
    try {

    /* ── Read category name from page h1 ── */
    var h1 = document.querySelector('.seo-hero h1');
    var categoryRaw = h1 ? h1.textContent.replace(/\s+in\s+Bhuj.*/i, '').trim() : 'Business';

    /* ── 1. Inject CSS ── */
    var css = `
        /* Stats strip */
        .bo-stats-strip {
            display: flex; justify-content: center; align-items: center;
            gap: clamp(12px, 3vw, 36px); flex-wrap: wrap;
            background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
            border-radius: 16px; padding: 18px 24px; margin: 0 0 20px;
        }
        .bo-stat-item { text-align: center; color: #fff; }
        .bo-stat-num  { font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 800; line-height: 1; display: block; }
        .bo-stat-lbl  { font-size: 0.72rem; font-weight: 500; opacity: .80; text-transform: uppercase; letter-spacing: .06em; margin-top: 3px; display: block; }
        .bo-stat-div  { width: 1px; height: 40px; background: rgba(255,255,255,.25); flex-shrink: 0; }
        @media (max-width: 480px) { .bo-stat-div { display: none; } }

        /* List Your Business CTA */
        .bo-cta-banner {
            background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #2563eb 100%);
            border-radius: 16px; padding: 28px; margin: 0 0 20px;
            display: flex; align-items: center; justify-content: space-between;
            gap: 20px; flex-wrap: wrap;
            box-shadow: 0 6px 24px rgba(37,99,235,.22);
            position: relative; overflow: hidden;
        }
        .bo-cta-banner::before {
            content: ''; position: absolute; width: 220px; height: 220px;
            top: -80px; right: -60px; border-radius: 50%;
            background: rgba(255,255,255,.06); pointer-events: none;
        }
        .bo-cta-text  { flex: 1; min-width: 200px; position: relative; }
        .bo-cta-eyebrow {
            display: inline-block; font-size: .68rem; font-weight: 700;
            text-transform: uppercase; letter-spacing: .08em;
            background: rgba(255,255,255,.15); color: #93c5fd;
            padding: 3px 10px; border-radius: 999px; margin-bottom: 8px;
        }
        .bo-cta-title {
            font-size: clamp(1.05rem, 2.5vw, 1.4rem); font-weight: 800;
            color: #fff; margin: 0 0 6px; line-height: 1.25;
        }
        .bo-cta-sub   { font-size: .85rem; color: rgba(255,255,255,.72); margin: 0; }
        .bo-cta-btns  { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; flex-shrink: 0; position: relative; }
        .bo-btn-primary {
            display: inline-flex; align-items: center; gap: 6px;
            background: #fff; color: #1e3a8a;
            font-size: .88rem; font-weight: 800; padding: 11px 22px;
            border-radius: 999px; text-decoration: none;
            box-shadow: 0 4px 14px rgba(0,0,0,.18);
            transition: transform .15s, box-shadow .15s;
        }
        .bo-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(0,0,0,.22); }
        .bo-btn-secondary {
            display: inline-flex; align-items: center; gap: 6px;
            background: transparent; color: #fff;
            font-size: .85rem; font-weight: 600; padding: 10px 18px;
            border-radius: 999px; text-decoration: none;
            border: 1.5px solid rgba(255,255,255,.40);
            transition: background .15s, border-color .15s;
        }
        .bo-btn-secondary:hover { background: rgba(255,255,255,.10); border-color: rgba(255,255,255,.65); }

        /* Get Verified upsell */
        .bo-verified-upsell {
            background: linear-gradient(135deg, #fefce8 0%, #fef9c3 50%, #fef3c7 100%);
            border: 2px solid #fde68a; border-radius: 16px;
            padding: 22px 24px; margin: 0 0 20px;
            display: flex; align-items: center; gap: 20px; flex-wrap: wrap;
            box-shadow: 0 4px 16px rgba(234,179,8,.14);
        }
        .bo-vu-icon  { font-size: 2.6rem; flex-shrink: 0; line-height: 1; }
        .bo-vu-body  { flex: 1; min-width: 180px; }
        .bo-vu-title { font-size: 1.05rem; font-weight: 800; color: #78350f; margin: 0 0 4px; }
        .bo-vu-sub   { font-size: .84rem; color: #92400e; margin: 0 0 10px; line-height: 1.5; }
        .bo-vu-price {
            display: inline-flex; align-items: baseline; gap: 4px;
            background: #fef08a; border: 1px solid #fde047;
            border-radius: 999px; padding: 4px 14px;
            font-size: .82rem; color: #713f12; font-weight: 700;
        }
        .bo-vu-price strong { font-size: 1.1rem; }
        .bo-vu-cta {
            display: inline-flex; align-items: center; gap: 6px;
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: #fff; font-size: .88rem; font-weight: 800;
            padding: 11px 22px; border-radius: 999px;
            text-decoration: none; flex-shrink: 0;
            box-shadow: 0 4px 14px rgba(217,119,6,.30);
            transition: transform .15s, box-shadow .15s;
        }
        .bo-vu-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(217,119,6,.40); }

        /* Share strip */
        .bo-share-strip {
            display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
            background: #f8fafc; border: 1px solid #e2e8f0;
            border-radius: 14px; padding: 16px 20px; margin: 0 0 20px;
        }
        .bo-share-lbl  { font-size: .88rem; font-weight: 700; color: #374151; flex-shrink: 0; }
        .bo-share-btn  {
            display: inline-flex; align-items: center; gap: 7px;
            font-size: .83rem; font-weight: 700; padding: 9px 18px;
            border-radius: 999px; text-decoration: none; border: none; cursor: pointer;
            transition: transform .15s, box-shadow .15s; font-family: inherit;
        }
        .bo-share-wa   { background: #22c55e; color: #fff; box-shadow: 0 2px 8px rgba(34,197,94,.22); }
        .bo-share-wa:hover { background: #16a34a; transform: translateY(-1px); }
        .bo-share-copy { background: #eff6ff; color: #2563eb; border: 1.5px solid #bfdbfe !important; }
        .bo-share-copy:hover { background: #dbeafe; transform: translateY(-1px); }
        .bo-copy-ok    { font-size: .78rem; color: #16a34a; font-weight: 600; display: none; }

        /* Hari Tech Solutions banner */
        .bo-ht-banner {
            display: grid;
            grid-template-columns: auto 1fr auto;
            align-items: center;
            gap: 0;
            background: linear-gradient(120deg, #0a1628 0%, #0f2550 40%, #0f3460 100%);
            border-radius: 16px; padding: 0; margin: 0 0 20px;
            border: 1px solid rgba(37,99,235,.45);
            box-shadow: 0 6px 24px rgba(15,52,96,.35);
            position: relative; overflow: hidden; min-height: 100px;
        }
        .bo-ht-banner::before {
            content: ''; position: absolute; width: 300px; height: 300px; border-radius: 50%;
            top: -130px; right: -80px;
            background: radial-gradient(circle, rgba(37,99,235,.18) 0%, transparent 70%);
            pointer-events: none;
        }
        .bo-ht-banner::after {
            content: ''; position: absolute; width: 200px; height: 200px; border-radius: 50%;
            bottom: -100px; left: 160px;
            background: radial-gradient(circle, rgba(96,165,250,.10) 0%, transparent 70%);
            pointer-events: none;
        }
        .bo-ht-brand {
            padding: 20px 28px 20px 24px;
            border-right: 1px solid rgba(255,255,255,.10);
            display: flex; flex-direction: column;
            justify-content: center; align-items: flex-start;
            flex-shrink: 0; position: relative; min-width: 180px;
        }
        .bo-ht-name {
            font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 900;
            font-family: 'Barlow Condensed', 'Inter', sans-serif;
            color: #fff; line-height: 1.0; letter-spacing: -.01em; margin: 0 0 3px;
        }
        .bo-ht-name span { color: #60a5fa; }
        .bo-ht-it    { font-size: .68rem; font-weight: 700; text-transform: uppercase; letter-spacing: .10em; color: rgba(255,255,255,.50); margin-bottom: 8px; }
        .bo-ht-since {
            display: inline-block; font-size: .65rem; font-weight: 700;
            background: rgba(37,99,235,.40); color: #93c5fd;
            padding: 3px 10px; border-radius: 999px;
            border: 1px solid rgba(96,165,250,.30); letter-spacing: .06em;
        }
        .bo-ht-body  { padding: 20px 28px; position: relative; }
        .bo-ht-tagline {
            font-size: clamp(.95rem, 1.8vw, 1.15rem); font-weight: 700;
            color: #fff; margin: 0 0 6px; line-height: 1.3;
        }
        .bo-ht-tags  { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 8px; }
        .bo-ht-tag   {
            font-size: .72rem; font-weight: 600;
            background: rgba(255,255,255,.08); color: rgba(255,255,255,.70);
            border: 1px solid rgba(255,255,255,.12);
            padding: 3px 10px; border-radius: 999px;
        }
        .bo-ht-sub   { font-size: .80rem; color: rgba(255,255,255,.50); font-style: italic; margin: 0; }
        .bo-ht-contact {
            padding: 20px 24px 20px 20px;
            border-left: 1px solid rgba(255,255,255,.10);
            display: flex; flex-direction: column;
            align-items: flex-end; gap: 10px;
            flex-shrink: 0; position: relative;
        }
        .bo-ht-adlbl {
            position: absolute; top: 8px; right: 12px;
            font-size: .56rem; color: rgba(255,255,255,.25);
            text-transform: uppercase; letter-spacing: .08em;
        }
        .bo-ht-call {
            display: inline-flex; align-items: center; gap: 7px;
            background: #2563eb; color: #fff;
            font-size: 1rem; font-weight: 800; padding: 12px 22px;
            border-radius: 999px; text-decoration: none; white-space: nowrap;
            box-shadow: 0 4px 16px rgba(37,99,235,.45);
            transition: background .15s, transform .15s, box-shadow .15s;
        }
        .bo-ht-call:hover { background: #1d4ed8; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(37,99,235,.55); }
        .bo-ht-web {
            display: inline-flex; align-items: center; gap: 6px;
            background: transparent; color: #93c5fd;
            font-size: .85rem; font-weight: 600; padding: 9px 18px;
            border-radius: 999px; text-decoration: none; white-space: nowrap;
            border: 1.5px solid rgba(147,197,253,.35);
            transition: background .15s, border-color .15s;
        }
        .bo-ht-web:hover { background: rgba(147,197,253,.10); border-color: rgba(147,197,253,.70); }
        @media (max-width: 820px) {
            .bo-ht-banner { grid-template-columns: auto 1fr; }
            .bo-ht-contact { grid-column: 1 / -1; border-left: none; border-top: 1px solid rgba(255,255,255,.10); flex-direction: row; padding: 14px 24px; }
        }
        @media (max-width: 520px) {
            .bo-ht-banner { grid-template-columns: 1fr; }
            .bo-ht-brand { border-right: none; border-bottom: 1px solid rgba(255,255,255,.10); padding: 16px 20px; min-width: unset; }
            .bo-ht-body  { padding: 14px 20px; }
            .bo-ht-contact { padding: 14px 20px; }
        }
    `;

    var styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    /* ── 2. Build HTML blocks ── */

    var statsHtml = `
        <div class="bo-stats-strip" aria-label="bhuj.kutchonline.com stats">
            <div class="bo-stat-item"><span class="bo-stat-num">750+</span><span class="bo-stat-lbl">Businesses Listed</span></div>
            <div class="bo-stat-div" aria-hidden="true"></div>
            <div class="bo-stat-item"><span class="bo-stat-num">150+</span><span class="bo-stat-lbl">Categories</span></div>
            <div class="bo-stat-div" aria-hidden="true"></div>
            <div class="bo-stat-item"><span class="bo-stat-num">100%</span><span class="bo-stat-lbl">Local · Bhuj, Kutch</span></div>
            <div class="bo-stat-div" aria-hidden="true"></div>
            <div class="bo-stat-item"><span class="bo-stat-num">Free</span><span class="bo-stat-lbl">To Browse &amp; Call</span></div>
        </div>`;

    var ctaHtml = `
        <div class="bo-cta-banner">
            <div class="bo-cta-text">
                <span class="bo-cta-eyebrow">📍 Are you a ${categoryRaw} in Bhuj?</span>
                <h2 class="bo-cta-title">Get your business in front of local customers — free listing, verified badge for Rs.&nbsp;699/yr</h2>
                <p class="bo-cta-sub">ભુજના ગ્રાહકો સુધી પહોંચો · ફ્રી લિસ્ટિંગ · Verified Badge Rs.&nbsp;699/year</p>
            </div>
            <div class="bo-cta-btns">
                <a href="offers.html" class="bo-btn-primary">🚀 List My Business</a>
                <a href="offers.html" class="bo-btn-secondary">✔ Get Verified</a>
            </div>
        </div>`;

    var verifiedHtml = `
        <div class="bo-verified-upsell">
            <div class="bo-vu-icon">✅</div>
            <div class="bo-vu-body">
                <div class="bo-vu-title">Stand out with a Verified Badge</div>
                <div class="bo-vu-sub">Verified businesses get more calls. Customers trust providers with the green ✔ badge — your contact details are confirmed and you appear at the top.</div>
                <span class="bo-vu-price"><strong>Rs. 699</strong> / year · Includes webpage listing</span>
            </div>
            <a href="offers.html" class="bo-vu-cta">★ Get Verified Now</a>
        </div>`;

    var shareHtml = `
        <div class="bo-share-strip">
            <span class="bo-share-lbl">📤 Share this page:</span>
            <a class="bo-share-btn bo-share-wa" id="bo-wa-share" href="#" target="_blank" rel="noopener">💬 Share on WhatsApp</a>
            <button class="bo-share-btn bo-share-copy" id="bo-copy-btn">🔗 Copy Link</button>
            <span class="bo-copy-ok" id="bo-copy-ok">✔ Copied!</span>
        </div>`;

    var haritechHtml = `
        <div class="bo-ht-banner">
            <span class="bo-ht-adlbl">Sponsor</span>
            <div class="bo-ht-brand">
                <div class="bo-ht-name">Hari <span>Tech</span><br>Solutions</div>
                <div class="bo-ht-it">IT Solutions Provider</div>
                <span class="bo-ht-since">⭐ Serving clients since 1993</span>
            </div>
            <div class="bo-ht-body">
                <div class="bo-ht-tagline">Your trusted partner for all IT requirements</div>
                <div class="bo-ht-tags">
                    <span class="bo-ht-tag">💻 Software</span>
                    <span class="bo-ht-tag">🖥️ Hardware</span>
                    <span class="bo-ht-tag">🌐 Networking</span>
                    <span class="bo-ht-tag">🔧 Web</span>
                    <span class="bo-ht-tag">📱 Digital</span>
                </div>
                <p class="bo-ht-sub">Call us for any of your IT requirements</p>
            </div>
            <div class="bo-ht-contact">
                <a href="tel:+919825034580" class="bo-ht-call">📞 98250 34580</a>
                <a href="https://www.haritech.org" target="_blank" rel="noopener" class="bo-ht-web">🌐 www.haritech.org</a>
            </div>
        </div>`;

    /* ── 3. Find insertion point (middle of provider list) ── */
    var providerList = document.querySelector('.seo-provider-list');
    if (!providerList) return;

    var cards = Array.from(providerList.children).filter(function(el) {
        return el.classList && el.classList.contains('provider-card');
    });

    var adWrap = document.createElement('li');
    adWrap.id = 'bo-ad-blocks';
    adWrap.style.cssText = 'list-style:none; grid-column: 1 / -1;';
    adWrap.innerHTML = statsHtml + ctaHtml + verifiedHtml + shareHtml + haritechHtml;

    /* Insert after the middle card; if only 1 card or none, append at end of list */
    var midIndex = Math.ceil(cards.length / 2);
    var afterCard = cards[midIndex] || null;
    if (afterCard) {
        providerList.insertBefore(adWrap, afterCard);
    } else {
        providerList.appendChild(adWrap);
    }

    /* ── 4. Wire up share buttons ── */
    var waBtn = document.getElementById('bo-wa-share');
    if (waBtn) {
        waBtn.href = 'https://wa.me/?text=' + encodeURIComponent(document.title + ' - ' + window.location.href);
    }

    var copyBtn = document.getElementById('bo-copy-btn');
    var copyOk  = document.getElementById('bo-copy-ok');
    if (copyBtn && copyOk) {
        copyBtn.addEventListener('click', function () {
            var url = window.location.href;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(url).then(function () {
                    copyOk.style.display = 'inline';
                    setTimeout(function () { copyOk.style.display = 'none'; }, 2000);
                });
            } else {
                var t = document.createElement('textarea');
                t.value = url;
                document.body.appendChild(t);
                t.select();
                document.execCommand('copy');
                document.body.removeChild(t);
                copyOk.style.display = 'inline';
                setTimeout(function () { copyOk.style.display = 'none'; }, 2000);
            }
        });
    }

    } catch (e) {
        console.error('[page-ads.js]', e);
    }
})();
