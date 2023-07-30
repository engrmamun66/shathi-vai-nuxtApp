

function menuMethods(functionName = '', ...args) {
    const methods = {
        toggleSidebar(force = null) {
            let menuState = State('menu')
            if (force != null) {
                menuState.isCollapse = force
            } else {
                menuState.isCollapse = !menuState.isCollapse
            }
        },
        isCollapse() {
            return State('menu').isCollapse
        },
        activeMenu(menu, subMenu = '') {
            let menuState = State('menu')
            if (menuState.menu == menu) {
                menuState.isCollapseMenu = !menuState.isCollapseMenu
            } else {
                menuState.isCollapseMenu = true
            }
            menuState.menu = menu;
            menuState.subMenu = subMenu;
        },
        activeSubMenu(menu, subMenu = '') {
            let menuState = State('menu')
            if (menuState.menu == menu && menuState.subMenu == subMenu && menuState.isCollapseMenu == false) {
                menuState.isCollapseMenu = !menuState.isCollapseMenu
            } else if (menuState.menu == menu && menuState.subMenu == subMenu && menuState.isCollapseMenu == true){
                menuState.isCollapseMenu = true
            } else {
                menuState.isCollapseMenu = true
            }
            menuState.menu = menu;
            menuState.subMenu = subMenu;
        },
        isCurrent(menu, subMenu = "") {
            let menuState = State('menu')
            if (menu && !subMenu) {
                if (menuState.menu == 'dashboard' && menu == 'dashboard') return true 
                if (menuState.menu == menu && menuState.isCollapseMenu) {
                    return true
                } else {
                    return false
                }
            } else if (menu && subMenu) {
                if (menuState.menu == menu && menuState.subMenu == subMenu && menuState.isCollapseMenu == true) {
                    return true
                }
            } else {
                return "";
            }
        },
        toggleProfilePopup() {
            let menuState = State('menu')
            menuState.showProfilePopup = !menuState.showProfilePopup
        },
        toggleRighttSideNavbar() {
            let menuState = State('menu')
            menuState.showRighttSideNavbar = !menuState.showRighttSideNavbar
        },
        onloadSelectMenu() {
            let menuState = State('menu')
            let menu = useRoute().path.split('/').splice(1)[0]
            menuState.menu = menu
            let menuGroups = ['users', 'guards'] // -------------------------------------- Menu Group of sidebar
            if (menuGroups.includes(menu)) menuState.isCollapseMenu = true
        },
        toggleNavBySwif(event) {
            let menuState = State('menu')
            if (event.type == 'touchstart') {
                menuState.clientX_start = event.changedTouches[0].clientX
            }
            if (event.type == 'touchend') {
                menuState.clientX_end = event.changedTouches[0].clientX
                let movedPixel = menuState.clientX_end - menuState.clientX_start
                if (menuState.clientX_end > menuState.clientX_start && movedPixel >= 120) {
                    if(menuState.clientX_start <= 30) this.toggleSidebar(true)
                } else if (menuState.clientX_end < menuState.clientX_start && movedPixel <= 120) {
                    this.toggleSidebar(false)
                }
            }
        }
    };

    // ===============================
    // ====Dynamic Method call=======
    // ===============================
    if (functionName && methods.hasOwnProperty(functionName)) {
        return methods[functionName](...args)
    } else {
        return methods
    }
}

export { menuMethods }; // We can call this function globally

export default function () {
    return useState('menu', () => ({
        isCollapse: false,
        isCollapseMenu: false,
        menu: 'dashboard',
        subMenu: '',
        showProfilePopup: false,
        isLoading: false,
        show_left_navbar_left: false,
        showRighttSideNavbar: false,
        // Sidebar toggle by swif left or right from mobile
        clientX_start: 0,
        clientX_end: 0,
    }))
}

