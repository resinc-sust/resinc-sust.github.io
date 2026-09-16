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
        menuToggle.addEventListener('click', () => {
            mainNav.classList.add('drawer-open');
        });
        menuClose.addEventListener('click', () => {
            mainNav.classList.remove('drawer-open');
        });
        drawerOverlay.addEventListener('click', () => {
            mainNav.classList.remove('drawer-open');
        });
    }
});
