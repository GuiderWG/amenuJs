(() => {
  let burgerWidth = 0;
  let lastWidthItems = 0;

  const init = (menu, menuList, itemsMenu, burgerMenu) => {
    itemsMenu.forEach((element) => {
      element.classList.add('amenu__item');
    });

    burgerMenu.classList.add('amenu__burger');

    const [burgerBtn, burgerList] = createBurgerMenu(burgerMenu);

    updateMenu(menu, menuList, burgerBtn, burgerList, burgerMenu);

    window.addEventListener('resize', () => {
      updateMenu(menu, menuList, burgerBtn, burgerList, burgerMenu);
    });
  };

  const createBurgerMenu = (burgerMenu) => {
    const burgerBtn = document.createElement('button');
    burgerMenu.append(burgerBtn);
    burgerBtn.classList.add('amenu__burger-btn');

    burgerBtn.addEventListener('click', () => {
      burgerMenu.classList.toggle('amenu__burger-open');
    });

    const burgerList = document.createElement('ul');
    burgerMenu.append(burgerList);
    burgerList.classList.add('amenu__burger-list');

    return [burgerBtn, burgerList];
  };

  const updateMenu = (menu, menuList, burgerBtn, burgerList, burgerMenu) => {
    const menuItems = menuList.querySelectorAll('.amenu__item');
    const burgerItems = burgerList.querySelectorAll('.amenu__item');

    const widthMenu = menu.offsetWidth;

    burgerWidth = burgerMenu.offsetWidth || burgerWidth;

    const widthAllItems =
      [...menuItems].reduce((acc, element) => {
        return (
          acc +
          element.offsetWidth +
          parseFloat(getComputedStyle(element).marginRight)
        );
      }, 0) + burgerWidth;

    if (widthMenu < widthAllItems) {
      const lastItem = menuItems[menuItems.length - 1];
      lastWidthItems =
        lastItem.offsetWidth +
        parseFloat(getComputedStyle(lastItem).marginRight);
      burgerList.prepend(lastItem);
      return updateMenu(menu, menuList, burgerBtn, burgerList, burgerMenu);
    }

    if (widthMenu > widthAllItems + lastWidthItems && burgerItems.length) {
      const firstItem = burgerItems[0];
      menuList.append(firstItem);
      return updateMenu(menu, menuList, burgerBtn, burgerList, burgerMenu);
    }

    checkBurgerItems(burgerItems.length, burgerBtn);
  };

  const checkBurgerItems = (burgerItemsCount, burgerBtn) => {
    if (burgerItemsCount) {
      burgerBtn.classList.add('amenu__burger-btn_active');
    } else {
      burgerBtn.classList.remove('amenu__burger-btn_active');
    }
  };

  window.amenu = (
    selectorMenu,
    selectorMenuList,
    selectorItemsMenu,
    selectorBurger
  ) => {
    const menu = document.querySelector(selectorMenu),
      menuList = document.querySelector(selectorMenuList),
      itemsMenu = document.querySelectorAll(selectorItemsMenu),
      burgerMenu = document.querySelector(selectorBurger);

    init(menu, menuList, itemsMenu, burgerMenu);
  };
})();
