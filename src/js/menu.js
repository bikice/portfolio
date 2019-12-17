const Menu = {

    "elements": {
        "menu": {
            "class": "show",
            "element": document.querySelector(".menu")
        },
        "menuBranding": {
            "class": "show",
            "element": document.querySelector(".menu-branding")
        },
        "menuBtn": {
            "class": "close",
            "element": document.querySelector(".menu-btn")
        },
        "menuNav": {
            "class": "show",
            "element": document.querySelector(".menu-nav")
        },
        "navItems": {
            "class": "show",
            "elements": document.querySelectorAll(".nav-item")
        }
    },

    "hide": () => {

        "use strict";

        Object.keys(Menu.elements).map((key) => {

            const obj = Menu.elements[key];
            if (obj.element) {

                obj.element.classList.remove(obj.class);
                return true;

            }

            obj.elements.forEach((item) => item.classList.remove(obj.class));
            return true;

        });

    },

    "initialize": () => {

        "use strict";

        Menu.elements.menuBtn.element.addEventListener("click",
            Menu.toggle
        );

    },

    "show": () => {

        "use strict";

        Object.keys(Menu.elements).map((key) => {

            const obj = Menu.elements[key];
            if (obj.element) {

                obj.element.classList.add(obj.class);
                return true;

            }

            obj.elements.forEach((item) => item.classList.add(obj.class));
            return true;

        });

    },

    "showMenu": false,

    "toggle": () => {

        "use strict";

        if (Menu.showMenu) {

            Menu.hide();

        } else {

            Menu.show();

        }

        Menu.showMenu = !Menu.showMenu;

    }
};

Menu.initialize();
