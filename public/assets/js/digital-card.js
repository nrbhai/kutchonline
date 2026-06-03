document.addEventListener('DOMContentLoaded', () => {
    const el = (id) => document.getElementById(id);

    const fields = {
        business: el('dc-business'),
        name: el('dc-name'),
        phone: el('dc-phone'),
        whatsapp: el('dc-whatsapp'),
        address: el('dc-address'),
        website: el('dc-website'),
        tagline: el('dc-tagline'),
        message: el('dc-message'),
        color: el('dc-color'),
        template: el('dc-template'),
        bg: el('dc-bg'),
        font: el('dc-font'),
    };

    const preview = {
        card: el('dc-preview-card'),
        initials: el('dc-preview-initials'),
        business: el('dc-preview-business'),
        name: el('dc-preview-name'),
        phone: el('dc-preview-phone'),
        whatsapp: el('dc-preview-whatsapp'),
        address: el('dc-preview-address'),
        website: el('dc-preview-website'),
        tagline: el('dc-preview-tagline'),
        cta: el('dc-preview-cta'),
        link: el('dc-whatsapp-link'),
        downloadCard: el('dc-download-card'),
        copyLink: el('dc-copy-link'),
    };

    const computeInitials = (businessName, personName) => {
        const pick = (businessName || '').trim() || (personName || '').trim();
        if (!pick) return 'BO';

        const words = pick
            .replace(/[^a-zA-Z0-9\s]/g, ' ')
            .split(/\s+/)
            .filter(Boolean);

        if (words.length === 1) {
            return words[0].slice(0, 2).toUpperCase();
        }

        return (words[0][0] + words[1][0]).toUpperCase();
    };

    const slugifyFilename = (value) => {
        const s = (value || '').toString().trim().toLowerCase();
        const cleaned = s
            .replace(/[^a-z0-9\s-_]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
        return cleaned || 'digital-card';
    };

    const sanitizeDigits = (value) => (value || '').toString().replace(/\D/g, '');

    const normalizeWhatsAppNumber = (value) => {
        const digits = sanitizeDigits(value);
        if (!digits) return '';
        // If user entered 10-digit Indian mobile number, add country code
        if (digits.length === 10) return `91${digits}`;
        // If user entered 12 digits starting with 91, accept
        return digits;
    };

    const buildWhatsAppUrl = () => {
        const phoneFallback = fields.phone ? fields.phone.value : '';
        const raw = (fields.whatsapp && fields.whatsapp.value) ? fields.whatsapp.value : phoneFallback;
        const waNumber = normalizeWhatsAppNumber(raw);
        if (!waNumber) return '';

        const text = (fields.message && fields.message.value || '').trim();
        const qs = text ? `?text=${encodeURIComponent(text)}` : '';
        return `https://wa.me/${waNumber}${qs}`;
    };

    const setTemplate = (templateId) => {
        preview.card.dataset.template = templateId;
    };

    const setBg = (bgId) => {
        preview.card.dataset.bg = bgId || 'none';
        // also set data-pattern for ::after overlay (pat-* values)
        if (bgId && bgId.startsWith('pat-')) {
            preview.card.dataset.pattern = bgId.replace('pat-', '');
        } else {
            preview.card.dataset.pattern = 'none';
        }
    };

    const setFontStyle = (fontId) => {
        preview.card.dataset.font = fontId;
    };

    const updatePreviewText = () => {
        const business = (fields.business?.value || 'Your Business Name').trim();
        const name = (fields.name?.value || 'Your Name').trim();
        const phone = (fields.phone?.value || '').trim();
        const whatsapp = (fields.whatsapp?.value || '').trim();
        const address = (fields.address?.value || '').trim();
        const website = (fields.website?.value || '').trim();
        const tagline = (fields.tagline?.value || '').trim();

        preview.business.textContent = business;
        preview.name.textContent = name;
        if (preview.initials) {
            preview.initials.textContent = computeInitials(business, name);
        }
        preview.phone.textContent = phone ? phone : '—';

        const waDisplay = whatsapp ? whatsapp : (phone ? phone : '—');
        preview.whatsapp.textContent = waDisplay;

        preview.address.textContent = address ? address : '—';
        preview.website.textContent = website ? website : '—';
        preview.tagline.textContent = tagline ? tagline : '—';
    };

    const updateBrandColor = () => {
        const color = (fields.color?.value || '#4f46e5').trim();
        preview.card.style.setProperty('--dc-accent', color);
    };

    const updateShare = () => {
        const url = buildWhatsAppUrl();
        preview.link.href = url || '#';
        preview.link.setAttribute('aria-disabled', url ? 'false' : 'true');
        preview.link.classList.toggle('is-disabled', !url);
    };

    const updateAll = async () => {
        updatePreviewText();
        updateBrandColor();
        setTemplate(fields.template?.value || 'classic');
        setBg(fields.bg?.value || 'none');
        setFontStyle(fields.font?.value || 'modern');
        updateShare();
    };

    // Events
    Object.values(fields).forEach((input) => {
        if (!input) return;
        input.addEventListener('input', () => {
            // Debounce not needed (small page)
            updateAll();
        });
        input.addEventListener('change', () => updateAll());
    });

    if (preview.downloadCard) {
        preview.downloadCard.addEventListener('click', async (e) => {
            e.preventDefault();

            if (!window.html2canvas) {
                alert('Download library failed to load. Please check your internet/CDN.');
                return;
            }

            // Digital card export dimensions (3.5:2 ratio), slightly larger for safer framing
            const TARGET_W = 1200;
            const TARGET_H = 686;
            const SAFE_PAD = 22;
            const CORNER_RADIUS = 30;

            // Hide share area entirely for a clean card image
            const shareWrap = preview.card.querySelector('.dc-share-wrap');
            const prevShareDisplay = shareWrap ? shareWrap.style.display : '';
            if (shareWrap) shareWrap.style.display = 'none';

            try {
                const sourceCanvas = await window.html2canvas(preview.card, {
                    scale: 3,
                    useCORS: true,
                    backgroundColor: null,
                });

                const outCanvas = document.createElement('canvas');
                outCanvas.width = TARGET_W;
                outCanvas.height = TARGET_H;
                const ctx = outCanvas.getContext('2d');
                if (!ctx) throw new Error('Could not create canvas context.');

                // Fit inside target ratio with padding so no top/bottom content is cut
                const srcW = sourceCanvas.width;
                const srcH = sourceCanvas.height;
                const maxW = TARGET_W - SAFE_PAD * 2;
                const maxH = TARGET_H - SAFE_PAD * 2;
                const scale = Math.min(maxW / srcW, maxH / srcH);
                const drawW = Math.round(srcW * scale);
                const drawH = Math.round(srcH * scale);
                const drawX = Math.round((TARGET_W - drawW) / 2);
                const drawY = Math.round((TARGET_H - drawH) / 2);

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(CORNER_RADIUS, 0);
                ctx.lineTo(TARGET_W - CORNER_RADIUS, 0);
                ctx.quadraticCurveTo(TARGET_W, 0, TARGET_W, CORNER_RADIUS);
                ctx.lineTo(TARGET_W, TARGET_H - CORNER_RADIUS);
                ctx.quadraticCurveTo(TARGET_W, TARGET_H, TARGET_W - CORNER_RADIUS, TARGET_H);
                ctx.lineTo(CORNER_RADIUS, TARGET_H);
                ctx.quadraticCurveTo(0, TARGET_H, 0, TARGET_H - CORNER_RADIUS);
                ctx.lineTo(0, CORNER_RADIUS);
                ctx.quadraticCurveTo(0, 0, CORNER_RADIUS, 0);
                ctx.closePath();
                ctx.clip();

                ctx.drawImage(sourceCanvas, drawX, drawY, drawW, drawH);
                ctx.restore();

                const business = fields.business ? fields.business.value : '';
                const filename = `${slugifyFilename(business)}-card.png`;

                const dataUrl = outCanvas.toDataURL('image/png');
                const a = document.createElement('a');
                a.href = dataUrl;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                a.remove();
            } catch (err) {
                console.error('Card download failed:', err);
                alert('Could not generate image. Please try again.');
            } finally {
                if (shareWrap) shareWrap.style.display = prevShareDisplay;
            }
        });
    }

    if (preview.copyLink) {
        preview.copyLink.addEventListener('click', async (e) => {
            e.preventDefault();
            const url = buildWhatsAppUrl();
            if (!url) return;
            try {
                await navigator.clipboard.writeText(url);
                preview.copyLink.textContent = 'Copied!';
                setTimeout(() => (preview.copyLink.textContent = 'Copy link'), 1200);
            } catch {
                // Fallback
                const tmp = document.createElement('input');
                tmp.value = url;
                document.body.appendChild(tmp);
                tmp.select();
                document.execCommand('copy');
                tmp.remove();
                preview.copyLink.textContent = 'Copied!';
                setTimeout(() => (preview.copyLink.textContent = 'Copy link'), 1200);
            }
        });
    }

    // Defaults
    if (fields.message && !fields.message.value) {
        fields.message.value = 'Hello! I found you on bhuj.kutchonline.com.';
    }

    if (fields.bg && !fields.bg.value) {
        fields.bg.value = 'none';
    }

    if (fields.font && !fields.font.value) {
        fields.font.value = 'modern';
    }

    updateAll();
});
