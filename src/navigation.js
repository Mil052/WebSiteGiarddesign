export function connectNavigation () {
    const navOferta = document.getElementById('nav-oferta');
    const linkOferta = document.getElementById('link-oferta');

    let animationComplete = true;
    
    const openMenuHandler = (event) => {
        event.preventDefault();
        if( !animationComplete) {
            return;
        }
        const menuVisible = navOferta.classList.toggle('visible');
        if (menuVisible) {
            openMenu();
        } else {
            closeMenu();
        }
    }

    const openMenu = () => {
        navOferta.classList.replace('animate-close-scale', 'animate-open-scale');
        navOferta.classList.replace('hidden', 'flex');
    }

    const closeMenu = () => {
        animationComplete = false;
        navOferta.classList.replace('animate-open-scale', 'animate-close-scale');
        setTimeout(() => {
            navOferta.classList.replace('flex', 'hidden');
            animationComplete = true;
        }, 500);
    }

    linkOferta.addEventListener('click', openMenuHandler);
    navOferta.addEventListener('click', closeMenu);
}
