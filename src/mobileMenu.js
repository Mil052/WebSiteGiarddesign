class MobileMenu {
    #container;
    #menu;
    #isOpen = false;

    constructor(container, navigation) {
        this.#container = container;
        this.#menu = navigation;
    }
    
  get isOpen () {
    return this.#isOpen;
  }

  openMenu = () => {
    this.#container.classList.replace('hidden', 'block');
    // Hidden elements can not be transitioned since they’re not in the document flow. However, we can get around this by forcing the document to reflow after removing the hidden attribute:
    // https://cloudfour.com/thinks/transitioning-hidden-elements/#showing-our-drawer
    const reflow = this.#menu.offsetHeight;
    this.#menu.classList.replace('mobile-nav-close', 'mobile-nav-open');
    this.#isOpen = true;
  }
  
  closeMenu = () => {
    this.#container.classList.replace('block','hidden');
    this.#menu.classList.replace('mobile-nav-open', 'mobile-nav-close');
    this.#isOpen = false;
  }
}

export function setMobileMenu (containerId, navigationId, buttonId) {
  const menuButton = document.getElementById(buttonId);
  const container = document.getElementById(containerId);
  const navigation = document.getElementById(navigationId);

  const mobileMenu = new MobileMenu(container, navigation);

  const toggleMobileMenu = () => {
    if (mobileMenu.isOpen) {
      mobileMenu.closeMenu();
      menuButton.innerHTML = '&#9776;';
    } else {
      mobileMenu.openMenu();
      menuButton.innerHTML = '&#10005;';
    }
  }

  menuButton.addEventListener('click', toggleMobileMenu);
  container.querySelectorAll('a').forEach(element => element.addEventListener('click', toggleMobileMenu));
}