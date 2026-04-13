    gsap.registerPlugin(ScrollTrigger);

    /* ── 1. Build headline characters ─────────────────────────── */
    const TITLE = "WELCOME  ITZFIZZ";
    const titleEl = document.getElementById('heroTitle');
    TITLE.split('').forEach(ch => {
      const span = document.createElement('span');
      span.className = 'hero-char';
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      titleEl.appendChild(span);
    });

    /* Make sure stats + bottom are invisible before anything runs */
    gsap.set('#statsRow', { opacity: 0, pointerEvents: 'none' });
    gsap.set('.stat-item', { opacity: 0, y: 50 });
    gsap.set('#heroBottom', { opacity: 0, y: 24 });

    /* ── 2. Page-load intro (title + car only) ──────────────────── */
    const introTl = gsap.timeline();

    // Title chars fly in
    introTl.fromTo('.hero-char',
      { y: 80, rotateX: -60, opacity: 0 },
      { y: 0, rotateX: 0, opacity: 1, duration: 1.1, stagger: 0.04, ease: 'power4.out' },
    0.15);

    // Tagline
    introTl.fromTo('#tagline',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
    0.5);

    // Car slides up from below
    introTl.fromTo('#car-wrap',
      { y: 140, opacity: 0, scale: 0.84 },
      { y: 0,   opacity: 1, scale: 1,    duration: 1.5, ease: 'expo.out' },
    0.2);

    /* ── 3. Scroll-driven pinned timeline ───────────────────────────
     *
     *  The section is pinned for 3× viewport height of scroll distance.
     *
     *  Timeline duration = 3 units (0 → 3):
     *    0 → 1.6  Phase 1 — Car scales forward, title fades out
     *    1.6 → 3  Phase 2 — Stats + "Scroll to explore" stagger in
     *
     * ──────────────────────────────────────────────────────────── */
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start:  'top top',
        end:    '+=300%',      // 3× scroll distance while pinned
        scrub:  2.8,           // Increased scrub value for extra smoothness
        pin:    true,
        anticipatePin: 1,
      },
    });

    /* ─ Phase 1: car drives forward, title disappears ─ */

    // Car: scale up + drift upward
    scrollTl.to('#car-wrap', {
      scale:    1.32,
      y:        -70,
      rotate:   1.5,
      ease:     'power1.inOut', // Added ease for smoother transition
      duration: 1.6,
    }, 0);

    // Title + tagline: fade & lift away
    scrollTl.to('#titleWrap', {
      y:        -110,
      opacity:  0,
      scale:    0.91,
      ease:     'none',
      duration: 1.2,
    }, 0);

    /* ─ Phase 2: reveal stats + scroll-to-explore ─ */

    // Make the stats container visible (instant flip at the boundary)
    scrollTl.to('#statsRow', {
      opacity:       1,
      pointerEvents: 'auto',
      duration:      0.01,
      ease:          'none',
    }, 1.6);

    // Each stat card staggers up into view
    scrollTl.fromTo('.stat-item',
      { y: 50, opacity: 0 },
      { y: 0,  opacity: 1, ease: 'power2.out', stagger: 0.18, duration: 0.55 },
    1.65);

    // "Scroll to explore" bar fades in
    scrollTl.fromTo('#heroBottom',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, ease: 'power2.out', duration: 0.5 },
    1.65);

    // Car continues its subtle push while stats are visible
    scrollTl.to('#car-wrap', {
      scale:    1.38,
      y:        -90,
      ease:     'power1.out', // Smoother deceleration
      duration: 1.4,
    }, 1.6);

