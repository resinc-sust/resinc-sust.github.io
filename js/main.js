document.addEventListener("DOMContentLoaded", () => {
    for (let post_img of document.querySelectorAll(".post-content > p > img")) {
        post_img.addEventListener("click", (event) => {
            let modal = document.createElement("div");
            modal.classList.add("modal");
            modal.innerHTML = `
                <div class="img-modal-content">
                    <div class="img-modal-image">
                        <img src="${post_img.getAttribute("src")}" alt="${post_img.getAttribute("alt")}">
                    </div>
                    <button class="close">&times;</button>
                </div>
            `;
            modal.style.display = "block";
            modal.onclick = (event) => {
                if (event.target.className === "img-modal-content") {
                    modal.style.display = "none";
                    document.body.removeChild(modal);
                }
            };
            modal.querySelector(".close").addEventListener("click", () => {
                modal.style.display = "none";
                document.body.removeChild(modal);
            });
            document.body.appendChild(modal);

        });
    }

    // Mobile navigation drawer
    const mainNav = document.querySelector('.main-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const drawerOverlay = document.querySelector('.drawer-overlay');

    if (mainNav && menuToggle && menuClose && drawerOverlay) {
        const closeDrawer = () => {
            mainNav.classList.remove('drawer-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        };
        menuToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('drawer-open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            if (isOpen) menuClose.focus();
        });
        menuClose.addEventListener('click', () => {
            closeDrawer();
            menuToggle.focus();
        });
        drawerOverlay.addEventListener('click', closeDrawer);
        mainNav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeDrawer);
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && mainNav.classList.contains('drawer-open')) {
                closeDrawer();
                menuToggle.focus();
            }
        });
    }

    // Keep native scrolling and anchor links; only track the section being read.
    const sections = Array.from(document.querySelectorAll('[data-scroll-section]'));
    const sectionLinks = document.querySelectorAll('.nav-links [data-section]');
    let navHeight = 0;
    let activeSection = '';
    let scrollPending = false;

    const updateSection = () => {
        scrollPending = false;
        if (!sections.length) return;

        const readingLine = navHeight + 48;
        let current = sections[0];
        for (const section of sections) {
            if (section.getBoundingClientRect().top <= readingLine) current = section;
        }
        if (current.id === activeSection) return;
        activeSection = current.id;
        sectionLinks.forEach((link) => {
            if (link.dataset.section === activeSection) {
                link.setAttribute('aria-current', 'location');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    const scheduleUpdate = () => {
        if (!scrollPending) {
            scrollPending = true;
            window.requestAnimationFrame(updateSection);
        }
    };

    const measureNav = () => {
        navHeight = mainNav ? mainNav.getBoundingClientRect().height : 0;
        document.documentElement.style.setProperty('--nav-height', `${navHeight + 16}px`);
        scheduleUpdate();
    };

    measureNav();
    if (mainNav && 'ResizeObserver' in window) {
        new ResizeObserver(measureNav).observe(mainNav);
    }
    window.addEventListener('resize', measureNav);
    if (sections.length) {
        window.addEventListener('scroll', scheduleUpdate, { passive: true });
        window.addEventListener('hashchange', scheduleUpdate);
        window.addEventListener('load', measureNav);
        updateSection();
    }
});
