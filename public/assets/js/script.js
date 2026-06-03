// script.js

document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
    initTopbarMobileMenu();

    // Detect which page we're on based on DOM elements, not URL
    // This works with Cloudflare Pages' pretty URLs (/category instead of /category.html)

    if (document.getElementById('category-list')) {
        // Home page has category-list element
        initHomePage();
    } else if (document.getElementById('provider-list')) {
        // Category page has provider-list element
        initCategoryPage();
    }
});



function closeTopbarMobileMenu() {
    const topbar = document.querySelector('.topbar');
    if (!topbar) return;
    if (!topbar.classList.contains('is-menu-open')) return;

    topbar.classList.remove('is-menu-open');

    const toggle = topbar.querySelector('.nav-toggle');
    if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
    }
}

function initTopbarMobileMenu() {
    const topbar = document.querySelector('.topbar');
    const inner = document.querySelector('.topbar .topbar-inner');
    const nav = document.querySelector('.topbar .main-nav');
    const links = document.querySelector('.topbar .nav-links');
    if (!topbar || !inner || !nav || !links) return;

    // Avoid injecting multiple times
    if (inner.querySelector('.nav-toggle')) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'nav-toggle';
    button.setAttribute('aria-label', 'Menu');
    button.setAttribute('aria-expanded', 'false');

    const lines = document.createElement('span');
    lines.className = 'nav-toggle-lines';
    lines.innerHTML = '<span></span><span></span><span></span>';
    button.appendChild(lines);

    // Put toggle right side on mobile
    inner.appendChild(button);

    const setOpen = (open) => {
        topbar.classList.toggle('is-menu-open', open);
        button.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    button.addEventListener('click', (e) => {
        e.preventDefault();
        const open = !topbar.classList.contains('is-menu-open');
        setOpen(open);
    });

    // Close when a link is clicked
    links.addEventListener('click', (e) => {
        const a = e.target && e.target.closest ? e.target.closest('a.nav-link') : null;
        if (a) setOpen(false);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!topbar.classList.contains('is-menu-open')) return;
        const target = e.target;
        if (target && (topbar.contains(target) || button.contains(target))) return;
        setOpen(false);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        if (!topbar.classList.contains('is-menu-open')) return;
        setOpen(false);
    });
}

function setActiveNavLink() {
    const links = document.querySelectorAll('a.nav-link');
    if (!links.length) return;

    const path = (window.location.pathname || '').replace(/\/+/g, '/');
    const last = path.split('/').filter(Boolean).pop() || 'index.html';
    const current = last.includes('.') ? last : `${last}.html`;
    const currentBase = current.replace(/\.html?$/i, '');

    links.forEach((a) => a.classList.remove('active'));

    for (const a of links) {
        const href = (a.getAttribute('href') || '').split('#')[0].split('?')[0];
        const hrefLast = href.split('/').filter(Boolean).pop();
        if (!hrefLast) continue;

        const hrefNormalized = hrefLast.includes('.') ? hrefLast : `${hrefLast}.html`;
        const hrefBase = hrefNormalized.replace(/\.html?$/i, '');

        if (hrefNormalized === current || hrefBase === currentBase) {
            a.classList.add('active');
            return;
        }

        // Special case: homepage
        if ((current === 'index.html' || current === '') && hrefLast === 'index.html') {
            a.classList.add('active');
            return;
        }
    }
}

function initHomePage() {
    const listContainer = document.getElementById('category-list');
    const searchInput = document.getElementById('home-search');
    const clearSearchBtn = document.getElementById('clear-search-btn');
    const voiceSearchBtn = document.getElementById('voice-search-btn');

    const scoreDisplayName = (name) => {
        const text = String(name || '').trim();
        if (!text) return 0;
        // Prefer names with stronger title casing (e.g., "Accounting Services" over "Accounting services")
        return text.split(/\s+/).reduce((score, part) => {
            if (/^[A-Z]/.test(part)) return score + 2;
            if (/^[a-z]/.test(part)) return score + 1;
            return score;
        }, 0);
    };

    // Use global categories from data.js and merge duplicates case-insensitively by id/name.
    const categoriesMap = new Map();
    (window.categories || []).forEach((cat) => {
        if (!cat) return;
        const rawName = String(cat.name || '').trim();
        if (rawName.toLowerCase() === 'ac fridge repairer') return;

        const rawId = String(cat.id || '').trim();
        const dedupeKey = (rawId || rawName).toLowerCase();
        if (!dedupeKey) return;

        const existing = categoriesMap.get(dedupeKey);
        if (!existing) {
            categoriesMap.set(dedupeKey, { ...cat });
            return;
        }

        const existingNameScore = scoreDisplayName(existing.name);
        const currentNameScore = scoreDisplayName(cat.name);
        if (currentNameScore > existingNameScore) {
            existing.name = cat.name;
        }

        if (!existing.gu_name && cat.gu_name) {
            existing.gu_name = cat.gu_name;
        }
        if (!existing.id && cat.id) {
            existing.id = cat.id;
        }

        categoriesMap.set(dedupeKey, existing);
    });

    const allCategories = Array.from(categoriesMap.values()).filter((cat) => {
        const name = (cat && cat.name ? cat.name : '').toLowerCase().trim();
        return name !== 'ac fridge repairer';
    });

    if (allCategories.length === 0) {
        listContainer.innerHTML = '<li class="empty-state">કેટેગરી લોડ કરવામાં નિષ્ફળ. કૃપા કરીને પેજ રિફ્રેશ કરો.</li>';
        return;
    }

    // Sort categories alphabetically
    allCategories.sort((a, b) => a.name.localeCompare(b.name));

    const render = (categories, isSearch) => {
        if (!Array.isArray(categories) || categories.length === 0) {
            listContainer.innerHTML = '<li style="grid-column:1/-1;text-align:center;padding:40px;color:#64748b;font-family:Outfit,sans-serif">કોઈ કેટેગરી મળી નથી.</li>';
            listContainer.classList.remove('search-mode');
            return;
        }

        listContainer.classList.toggle('search-mode', isSearch);

        // Cap stagger so 50+ results don't have a ridiculously long delay
        const maxStagger = Math.min(categories.length, 24);

        const html = categories.map((cat, i) => {
            if (!cat || !cat.id) return '';
            const nameEn = cat.name || 'Category';
            const nameGu = cat.gu_name || '';
            const { icon: faIcon, color: faColor } = window.getCategoryIcon ? window.getCategoryIcon(nameEn) : { icon: 'fa-store', color: '#6b7280' };
            const delay = i < maxStagger ? `${i * 28}ms` : '0ms';

            return `<li class="hp-cat-item"><a href="/bhuj/${cat.id}-in-bhuj.html" class="hp-cat-card${isSearch ? ' search-result' : ''}" style="animation-delay:${delay}">
                <span class="hp-cat-icon"><i class="fa-solid ${faIcon}" style="color:${faColor}"></i></span>
                <span class="hp-cat-en">${nameEn}</span>
                <span class="hp-cat-gu">${nameGu}</span>
            </a></li>`;
        }).join('');

        listContainer.innerHTML = html;
    };

    // Initial render
    render(allCategories, false);

    initHomeHeroSideTickers();

    // Search functionality
    if (searchInput) {
        let hasAutoScrolled = false;

        const updateClearButton = () => {
            if (!clearSearchBtn) return;
            const hasValue = (searchInput.value || '').trim().length > 0;
            clearSearchBtn.style.display = hasValue ? 'flex' : 'none';
        };

    // Random Quick Chips
    const chipContainer = document.querySelector('.home-quick-chips');
    if (chipContainer && allCategories.length > 0) {
        // Shuffle and pick 10
        const shuffled = [...allCategories].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 10);
        
        chipContainer.innerHTML = selected.map(cat => {
            const { icon: faIcon, color: faColor } = window.getCategoryIcon ? window.getCategoryIcon(cat.name) : { icon: 'fa-store', color: '#6b7280' };
            const displayName = cat.gu_name || cat.name;
            return `<button type="button" class="quick-chip" data-query="${cat.name}"><i class="fa-solid ${faIcon}" style="color:${faColor}"></i> ${displayName}</button>`;
        }).join('');
    }

    // Quick chips listener (added after recreation)
    const chips = document.querySelectorAll('.quick-chip');
    chips.forEach((chip) => {
        chip.addEventListener('click', () => {
            const query = chip.getAttribute('data-query') || chip.textContent || '';
            searchInput.value = query;
            searchInput.focus();
            searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            updateClearButton();
        });
    });

        // Clear search
        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input', { bubbles: true }));
                updateClearButton();
                searchInput.focus();
            });
        }

        // Mobile optimization: Add search-active class on focus
        searchInput.addEventListener('focus', () => {
            if (window.innerWidth <= 600) {
                closeTopbarMobileMenu();
                document.body.classList.add('search-active');
            }
        });

        // Remove search-active class when user scrolls or clicks outside
        searchInput.addEventListener('blur', () => {
            // Small delay to allow click events to process
            setTimeout(() => {
                document.body.classList.remove('search-active');
            }, 200);
        });

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const filtered = allCategories.filter(cat => {
                if (!cat) return false;
                const nameEn = (cat.name || '').toLowerCase();
                const nameGu = (cat.gu_name || '').toLowerCase();
                return nameEn.includes(query) || nameGu.includes(query);
            });
            render(filtered, query.length > 0);
            updateClearButton();

            const catsSection = document.getElementById('cats-section');

            // When searching, add class to body + apply search gradient to cats section
            if (query.length > 0) {
                document.body.classList.add('search-active');
                if (catsSection) catsSection.classList.add('search-active-section');
            } else if (document.activeElement !== searchInput) {
                document.body.classList.remove('search-active');
                if (catsSection) catsSection.classList.remove('search-active-section');
            }

            // Smoothly bring results into view when typing
            if (query.length > 1 && !hasAutoScrolled) {
                const grid = document.getElementById('category-list');
                if (grid) {
                    const navbarH = 58 + 44; // topbar + marquee bar
                    const extraOffset = 24;   // breathing room
                    const top = grid.getBoundingClientRect().top + window.scrollY - navbarH - extraOffset;
                    window.scrollTo({ top, behavior: 'smooth' });
                }
                hasAutoScrolled = true;
            }

            if (query.length === 0) {
                hasAutoScrolled = false;
                if (catsSection) catsSection.classList.remove('search-active-section');
                if (document.activeElement !== searchInput || window.innerWidth > 600) {
                    document.body.classList.remove('search-active');
                }
            }
        });

        // Initial state
        updateClearButton();

        // Voice Search Implementation - Simplified for Mobile
        if (voiceSearchBtn) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

            if (!SpeechRecognition) {
                voiceSearchBtn.style.display = 'none';
            } else {
                const recognition = new SpeechRecognition();
                recognition.lang = 'en-IN';
                recognition.interimResults = false;
                recognition.maxAlternatives = 1;

                let isRecognizing = false;

                const startRecognition = () => {
                    if (isRecognizing) {
                        try { recognition.stop(); } catch (e) { }
                        return;
                    }

                    voiceSearchBtn.classList.add('listening');
                    searchInput.placeholder = '🎤 સાંભળી રહ્યા છીએ...';

                    try {
                        recognition.start();
                    } catch (e) {
                        console.log('Voice start failed:', e);
                        stopRecognition();
                    }
                };

                const stopRecognition = () => {
                    voiceSearchBtn.classList.remove('listening');
                    searchInput.placeholder = 'સેવાઓ શોધો (દા.ત. Electrician, Taxi, Doctor...)...';
                };

                if (window.PointerEvent) {
                    voiceSearchBtn.addEventListener('pointerup', (e) => {
                        e.preventDefault();
                        startRecognition();
                    });
                } else {
                    voiceSearchBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        startRecognition();
                    });
                }

                recognition.onstart = () => { isRecognizing = true; };

                recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    searchInput.value = transcript;
                    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
                    stopRecognition();
                };

                recognition.onerror = (event) => {
                    console.log('Voice error:', event.error);
                    stopRecognition();
                    isRecognizing = false;
                    if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
                        setTimeout(() => {
                            alert('Please allow microphone access to use voice search.\n\nTip: Voice search works only on HTTPS and in supported browsers (Chrome/Android).');
                        }, 100);
                    }
                };

                recognition.onend = () => {
                    stopRecognition();
                    isRecognizing = false;
                };
            }
        }
    }

    // Popular services: collapse/expand
    const popularSection = document.getElementById('popular-services');
    const popularToggle = document.getElementById('popular-services-toggle');
    if (popularSection && popularToggle) {
        popularToggle.addEventListener('click', () => {
            const isCollapsed = popularSection.classList.toggle('is-collapsed');
            popularToggle.textContent = isCollapsed ? 'Show more' : 'Show less';
        });
    }
}

function initHomeHeroSideTickers() {
    const providersByCategory = window.providers || [];

    const mergedProvidersMap = new Map();

    const isTruthy = (value) => {
        if (typeof value === 'boolean') return value;
        if (typeof value === 'number') return value === 1;
        const text = String(value || '').toLowerCase().trim();
        return text === 'yes' || text === 'true' || text === '1';
    };

    const toSlug = (text) => String(text || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    const sanitizeLink = (link) => {
        const href = String(link || '').trim();
        if (!href) return '#';
        if (/^javascript:/i.test(href)) return '#';
        return href;
    };

    const normalizeName = (text) => String(text || '')
        .trim()
        .replace(/\s+/g, ' ')
        .toLowerCase();

    const isPlaceholderLink = (link) => !link || link === '#';

    providersByCategory.forEach((category) => {
        const categoryName = String((category && category.name) || 'Local Business').trim();
        const categoryId = String((category && category.id) || '').trim();
        const derivedId = categoryId || toSlug(categoryName);
        const categoryLink = derivedId ? `${derivedId}-in-bhuj.html` : '#';
        const providers = (category && Array.isArray(category.providers)) ? category.providers : [];
        providers.forEach((p) => {
            const name = String((p && p.name) || '').trim();
            if (!name) return;
            const webpage = String((p && p.webpage) || '').trim();
            const link = sanitizeLink(webpage || categoryLink);
            const normalizedName = normalizeName(name);
            if (!normalizedName) return;

            const verified = isTruthy(p.verified) || isTruthy(p.Verified);
            const topRated = isTruthy(p.top_rated) || isTruthy(p.topRated) || isTruthy(p['Top Rated']) || isTruthy(p.ratings) || isTruthy(p.Ratings);

            const existing = mergedProvidersMap.get(normalizedName);
            if (!existing) {
                mergedProvidersMap.set(normalizedName, {
                    name,
                    category: categoryName,
                    link,
                    verified,
                    topRated,
                });
                return;
            }

            if (isPlaceholderLink(existing.link) && !isPlaceholderLink(link)) {
                existing.link = link;
            }
            existing.verified = existing.verified || verified;
            existing.topRated = existing.topRated || topRated;

            mergedProvidersMap.set(normalizedName, existing);
        });
    });

    const verifiedMap = new Map();
    const topRatedMap = new Map();
    mergedProvidersMap.forEach((item, key) => {
        if (item.verified) {
            verifiedMap.set(key, { name: item.name, category: item.category, link: item.link });
        }
        if (item.topRated) {
            topRatedMap.set(key, { name: item.name, category: item.category, link: item.link });
        }
    });

    const toDisplayItems = (mapValues, limit) => {
        const values = Array.from(mapValues.values());
        if (values.length === 0) return [];
        return values.slice(0, limit);
    };

    const renderTrack = (element, values, makeClickable) => {
        if (!values.length) {
            element.innerHTML = '<li class="hp-ticker-item"><span class="hp-ticker-name">Business listings updating...</span></li>';
            return;
        }

        const escapeHtml = (text) => String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');

        const doubled = values.concat(values);
        element.innerHTML = doubled.map((item) => {
            const body =
                `<span class="hp-ticker-name">${escapeHtml(item.name)}</span>` +
                `<span class="hp-ticker-cat">${escapeHtml(item.category)}</span>`;

            if (makeClickable) {
                const safeHref = sanitizeLink(item.link);
                return `<li class="hp-ticker-item"><a class="hp-ticker-link" href="${safeHref}">${body}</a></li>`;
            }

            return `<li class="hp-ticker-item">${body}</li>`;
        }).join('');
    };

    // Build combined list for horizontal marquee
    const marqueeEl = document.getElementById('hp-marquee-track');
    if (marqueeEl) {
        const verifiedList = toDisplayItems(verifiedMap, 18);
        const topRatedList = toDisplayItems(topRatedMap, 18);
        const combined = [...verifiedList, ...topRatedList];
        if (combined.length > 0) {
            const doubled = combined.concat(combined);
            const escapeHtml = (t) => String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
            marqueeEl.innerHTML = doubled.map(item => {
                const safeHref = sanitizeLink(item.link);
                return `<li class="hp-marquee-item"><a href="${safeHref}" class="hp-marquee-link"><span class="hp-marquee-name">${escapeHtml(item.name)}</span><span class="hp-marquee-sep" aria-hidden="true">&middot;</span><span class="hp-marquee-cat">${escapeHtml(item.category)}</span></a></li>`;
            }).join('');
        }
    }

    // Also update side tickers if they still exist (legacy support)
    const verifiedListEl = document.getElementById('hero-verified-list');
    const topRatedListEl = document.getElementById('hero-toprated-list');
    if (verifiedListEl) renderTrack(verifiedListEl, toDisplayItems(verifiedMap, 18), true);
    if (topRatedListEl) renderTrack(topRatedListEl, toDisplayItems(topRatedMap, 18), true);

}

function initCategoryPage() {
    const params = new URLSearchParams(window.location.search);
    const catId = params.get('id');
    const aliasMap = {
        'pg/hostels': 'pg-hostels',
        'stock-market-servicee': 'stock-market-service',
    };
    const resolvedCatId = aliasMap[catId] || catId;
    const container = document.getElementById('provider-list');
    const titleEl = document.getElementById('category-title');
    const searchInput = document.getElementById('search-input');
    const resultsEl = document.getElementById('results-count');
    const iconEl = document.getElementById('category-icon');

    if (!catId) {
        // In Astro, we are using pretty URLs like /bhuj/electrician-in-bhuj.html
        // We set up a DOM-based search input listener that filters the rendered markup in place.
        if (searchInput && container) {
            searchInput.oninput = (e) => {
                const query = e.target.value.toLowerCase().trim();
                const cards = container.querySelectorAll('.pcard');
                let count = 0;
                cards.forEach(card => {
                    const name = card.querySelector('.pcard-name')?.textContent.toLowerCase() || '';
                    const area = card.querySelector('.pcard-area')?.textContent.toLowerCase() || '';
                    const phone = card.querySelector('.pcard-phone-row')?.textContent.toLowerCase() || '';
                    const address = card.querySelector('.pcard-address')?.textContent.toLowerCase() || '';
                    
                    const match = name.includes(query) || area.includes(query) || phone.includes(query) || address.includes(query);
                    card.style.display = match ? 'flex' : 'none';
                    if (match) count++;
                });
                
                // Hide/show the ads block during search
                const ads = container.querySelectorAll('.promo-row, .offers-split-wrap');
                ads.forEach(ad => {
                    ad.style.display = query.length > 0 ? 'none' : '';
                });

                // Toggle no-results message
                const noResultEl = document.getElementById('no-result');
                if (noResultEl) {
                    noResultEl.style.display = count === 0 ? 'block' : 'none';
                }
                
                // Update results count text
                if (resultsEl) {
                    resultsEl.textContent = `${count} provider${count === 1 ? '' : 's'} found`;
                }
            };

            // Search filter animations
            searchInput.addEventListener('focus', () => {
                if (window.innerWidth <= 600) {
                    closeTopbarMobileMenu();
                    document.body.classList.add('search-active');
                }
            });

            searchInput.addEventListener('blur', () => {
                setTimeout(() => {
                    document.body.classList.remove('search-active');
                }, 200);
            });
        }
        return;
    }

    if (resolvedCatId !== catId) {
        // Keep old links working, but canonicalize the URL
        const canonical = `category.html?id=${encodeURIComponent(resolvedCatId)}`;
        window.history.replaceState(null, '', canonical);
    }

    // Use global data from data.js
    const categoryData = typeof window.getProviders === 'function' ? window.getProviders(resolvedCatId) : null;

    if (categoryData) {
        setupCategoryPage(categoryData);
    } else {
        showCategoryNotFound();
    }

    function showCategoryNotFound() {
        titleEl.textContent = 'Category Not Found';
        container.innerHTML = '<div class="empty-state">Category not found. <a href="index.html">Go Home</a></div>';
    }

    function setupCategoryPage(data) {
        titleEl.textContent = `${data.icon} ${data.name}`;

        if (iconEl) {
            iconEl.textContent = data.icon || '📌';
        }

        const setResultsCount = (count, query) => {
            if (!resultsEl) return;
            const total = data.providers.length;
            if (total === 0 && (!query || !query.trim())) {
                resultsEl.textContent = 'Data collection is in progress for this category.';
                return;
            }
            if (query && query.trim()) {
                resultsEl.textContent = `${count} result${count === 1 ? '' : 's'} for "${query.trim()}"`;
            } else if (count === total) {
                resultsEl.textContent = `${total} provider${total === 1 ? '' : 's'} found`;
            } else {
                resultsEl.textContent = `${count} of ${total} provider${total === 1 ? '' : 's'}`;
            }
        };

        // SEO: Dynamic Title & Meta Description
        document.title = `${data.name} in Bhuj | Bhuj Online`;

        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = "description";
            document.head.appendChild(metaDesc);
        }
        if (data.providers.length > 0) {
            metaDesc.content = `Find the best ${data.name} in Bhuj. Contact details for ${data.providers.length} providers like ${data.providers[0].name}.`;
        } else {
            metaDesc.content = `Explore ${data.name} in Bhuj on Bhuj Online.`;
        }

        renderProviders(data.providers, container, '');
        setResultsCount(data.providers.length, '');

        // Update search filter to use the loaded data
            searchInput.oninput = (e) => {
                const query = e.target.value.trim();
                const queryLow = query.toLowerCase();
                const filtered = data.providers.filter(p =>
                    p.name.toLowerCase().includes(queryLow) ||
                    (p.area && p.area.toLowerCase().includes(queryLow)) ||
                    (p.phone && p.phone.includes(queryLow)) ||
                    (p.address && p.address.toLowerCase().includes(queryLow)) ||
                    (p.place_id && p.place_id.toLowerCase().includes(queryLow))
                );
                renderProviders(filtered, container, query);
                setResultsCount(filtered.length, query);
            };
    }

    // Search filter
    searchInput.addEventListener('focus', () => {
        if (window.innerWidth <= 600) {
            closeTopbarMobileMenu();
            document.body.classList.add('search-active');
        }
    });

    searchInput.addEventListener('blur', () => {
        setTimeout(() => {
            document.body.classList.remove('search-active');
        }, 200);
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        const queryLow = query.toLowerCase();
        const filtered = data.providers.filter(p =>
            p.name.toLowerCase().includes(queryLow) ||
            p.area.toLowerCase().includes(queryLow) ||
            p.phone.includes(queryLow)
        );
        renderProviders(filtered, container, query);
}

function highlightText(text, query) {
    if (!query || !query.trim()) return text;
    const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>');
}

function renderProviders(providers, container, searchQuery) {
    if (providers.length === 0) {
        if (!searchQuery || !searchQuery.trim()) {
            container.innerHTML = '<div class="empty-state">Data collection is in progress for this category. Please check back soon.</div>';
        } else {
            container.innerHTML = '<div class="empty-state">No providers found for your search.</div>';
        }
        return;
    }

    // Sort providers: Verified + Top Rated > Verified > Others
    providers.sort((a, b) => {
        const aVerified = !!a.verified;
        const aTopRated = !!a.top_rated;
        const bVerified = !!b.verified;
        const bTopRated = !!b.top_rated;

        // Priority 1: Verified + Top Rated
        const aTier1 = aVerified && aTopRated;
        const bTier1 = bVerified && bTopRated;
        if (aTier1 && !bTier1) return -1;
        if (!aTier1 && bTier1) return 1;

        // Priority 2: Verified
        if (aVerified && !bVerified) return -1;
        if (!aVerified && bVerified) return 1;

        // Default: Maintain original order
        return 0;
    });

    const AVATAR_COLORS = [
      ['#dbeafe','#1d4ed8'], ['#dcfce7','#15803d'], ['#fef9c3','#a16207'],
      ['#fce7f3','#9d174d'], ['#ede9fe','#6d28d9'], ['#ffedd5','#c2410c'],
      ['#e0f2fe','#0369a1'], ['#f0fdf4','#166534']
    ];
    const getAvatarColor = (name) => AVATAR_COLORS[(name ? name.charCodeAt(0) : 0) % AVATAR_COLORS.length];
    const getInitial = (name) => name ? name.trim()[0].toUpperCase() : '?';

    const html = providers.map(p => {
        const q = searchQuery || '';
        const tagsHtml = (p.tags || []).slice(0, 2).map(t => {
            return `<span class="pcard-tag">${highlightText(t, q)}</span>`;
        }).join('');
        
        const mapsUrl = p.place_id
            ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name + ' ' + (p.area || 'Bhuj') + ' Bhuj')}&query_place_id=${p.place_id}`
            : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name + ' ' + (p.area || 'Bhuj') + ' Bhuj Kutch Gujarat India')}`;

        // Clean phone for WhatsApp (remove spaces, dashes)
        const cleanPhone = (p.phone || '').replace(/\D/g, '');
        // Assume India code +91 if length is 10, otherwise just use number
        const waNumber = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

        // Badges Section
        let badgesHtml = '';
        if (p.verified && p.top_rated) {
            badgesHtml += `
              <span class="pbadge pbadge-elite">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                Trusted
              </span>
              <span class="pbadge pbadge-verified">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                Verified
              </span>`;
        } else if (p.verified) {
            badgesHtml += `
              <span class="pbadge pbadge-verified">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                Verified
              </span>`;
        } else if (p.top_rated) {
            badgesHtml += `
              <span class="pbadge pbadge-top">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                Top Rated
              </span>`;
        }
        
        if (p.badge) {
            badgesHtml += `<span class="pbadge pbadge-custom">${highlightText(p.badge, q)}</span>`;
        }

        let tier = '';
        if (p.verified && p.top_rated) tier = 'tier-elite';
        else if (p.top_rated) tier = 'tier-top';
        else if (p.verified) tier = 'tier-verified';

        const [avatarBg, avatarColor] = getAvatarColor(p.name);
        const avatarInitial = getInitial(p.name);

        return `
        <li class="pcard ${tier}">
          <div class="pcard-top">
            <!-- Avatar -->
            <div class="pcard-avatar" style="background:${avatarBg};color:${avatarColor}" aria-hidden="true">
              ${avatarInitial}
            </div>

            <!-- Info -->
            <div class="pcard-info">
              <div class="pcard-name-row">
                <span class="pcard-name">${highlightText(p.name, q)}</span>
                <div class="pcard-badges">
                  ${badgesHtml}
                </div>
              </div>

              <div class="pcard-meta-row">
                <span class="pcard-area">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  ${highlightText(p.area || 'Bhuj', q)}
                </span>
                ${tagsHtml}
              </div>

              ${p.address ? `<p class="pcard-address">${highlightText(p.address, q)}</p>` : ''}
              ${p.place_id ? `<div class="pcard-address" style="font-size:0.68rem;color:#94a3b8;margin-top:2px;">Place ID: ${highlightText(p.place_id, q)}</div>` : ''}
            </div>
          </div>

          <!-- Phone + Primary CTA -->
          <div class="pcard-phone-row">
            <a href="tel:${p.phone}" class="pcard-phone-link" aria-label="Call ${p.name}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
              ${highlightText(p.phone, q)}
            </a>
            <a href="tel:${p.phone}" class="pcard-call-btn" aria-label="Call ${p.name}">
              Call Now
            </a>
          </div>

          <!-- Secondary actions -->
          <div class="pcard-actions">
            <a href="https://wa.me/${waNumber}" target="_blank" rel="noopener noreferrer" class="paction paction-wa">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.999 2C6.479 2 2 6.479 2 12c0 1.883.522 3.641 1.425 5.146L2 22l4.984-1.311A9.953 9.953 0 0012 22c5.521 0 10-4.479 10-10S17.521 2 11.999 2zm.001 18.182a8.175 8.175 0 01-4.17-1.143l-.298-.177-3.091.812.825-3.013-.196-.309A8.167 8.167 0 013.818 12c0-4.512 3.67-8.182 8.182-8.182 4.513 0 8.182 3.67 8.182 8.182 0 4.513-3.669 8.182-8.182 8.182z"/></svg>
              WhatsApp
            </a>

            <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" class="paction paction-maps">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Maps
            </a>

            ${p.webpage ? `
              <a href="${p.webpage}" target="_blank" rel="noopener noreferrer" class="paction paction-web">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
                Website
              </a>
            ` : `
              <button class="paction paction-disabled" disabled aria-disabled="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
                Website
              </button>
            `}
          </div>
        </li>
        `;
    }).join('');

    container.innerHTML = html;
}
