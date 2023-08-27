class SubMenu {
    #submenu;
    #animationPending = false;

    constructor (submenuId) {
        this.#submenu = document.getElementById(submenuId);
    }

    #openMenu = () => {
        this.#submenu.classList.replace('animate-close-scale', 'animate-open-scale');
        this.#submenu.classList.replace('hidden', 'flex');
    }

    #closeMenu = () => {
        this.#animationPending = true;
        this.#submenu.classList.replace('animate-open-scale', 'animate-close-scale');
        setTimeout(() => {
            this.#submenu.classList.replace('flex', 'hidden');
            this.#animationPending = false;
        }, 500);
    }

    toggleMenu = () => {
        if (this.#animationPending) {
            return;
        }
        const menuVisible = this.#submenu.classList.toggle('visible');
        if (menuVisible) {
            this.#openMenu();
        } else {
            this.#closeMenu();
        }
        return menuVisible;
    }
}

export function setNavigation () {
    let openedSubMenu = null;
    let animationPending = false;

    const toggleSubMenuHandler = (selectedSubMenu, event) => {
        event.preventDefault();
        event.stopPropagation();
        if (animationPending) {
            return;
        }
        if (openedSubMenu && (openedSubMenu !== selectedSubMenu)) {
            animationPending = true;
            openedSubMenu.toggleMenu();
            setTimeout(() => {
                selectedSubMenu.toggleMenu();
                openedSubMenu = selectedSubMenu;
                animationPending = false;
            }, 500);
            return;
        }
        const selectedSubMenuOpen =  selectedSubMenu.toggleMenu();
        openedSubMenu = selectedSubMenuOpen ? selectedSubMenu : null;
    }

    const closeOpenedSubMenu = () => {
        if (openedSubMenu) {
            openedSubMenu.toggleMenu();
            openedSubMenu = null;
        }
    }
    
    const header = document.querySelector('header');
    header.addEventListener('click', closeOpenedSubMenu);

    const searchInput = document.querySelector('#sub-menu-search > input');
    searchInput.addEventListener('click', (event) => {event.stopPropagation()});

    const linkOferta = document.getElementById('link-oferta');
    const subMenuOferta = new SubMenu ('sub-menu-oferta');
    linkOferta.addEventListener('click', toggleSubMenuHandler.bind(this, subMenuOferta));

    const linkSearch = document.getElementById('link-search');
    const subMenuSearch = new SubMenu ('sub-menu-search');
    linkSearch.addEventListener('click', toggleSubMenuHandler.bind(this, subMenuSearch));
}