import MenuView from '../view/menu';
import NewEventButtonView from '../view/new-event-button';
import {MenuItem, RenderPosition} from '../const';
import {render} from '../utils/render';

export default class Menu {
  constructor(menuContainer, timelinePresenter) {
    this._menuContainer = menuContainer;
    this._timelinePresenter = timelinePresenter;

    this._currentMenuItem = MenuItem.TABLE;

    this._siteMenuComponent = new MenuView();
    this._newEventButtonComponent = new NewEventButtonView();

    this._handleSiteMenuClick = this._handleSiteMenuClick.bind(this);
    this._handleNewEventButtonClick = this._handleNewEventButtonClick.bind(this);
    this._handleNewEventButtonState = this._handleNewEventButtonState.bind(this);
  }

  init() {
    const menuTitle = this._menuContainer.querySelector(`h2:nth-child(1)`);
    render(menuTitle, this._siteMenuComponent, RenderPosition.AFTEREND);
    render(this._menuContainer, this._newEventButtonComponent, RenderPosition.AFTEREND);

    this._siteMenuComponent.setMenuClickHandler(this._handleSiteMenuClick);
    this._siteMenuComponent.setActiveMenuItem(this._currentMenuItem);
    this._newEventButtonComponent.setNewEventButtonClick(this._handleNewEventButtonClick);
  }

  _handleNewEventButtonState() {
    this._newEventButtonComponent.enableButton();
  }

  _handleNewEventButtonClick() {
    if (this._currentMenuItem === MenuItem.STATS) {
      this._currentMenuItem = MenuItem.TABLE;
      this._siteMenuComponent.setActiveMenuItem(MenuItem.TABLE);
      // Убираем статистику
      this._timelinePresenter.init();
    }

    this._newEventButtonComponent.disableButton();
    this._timelinePresenter.createEvent(this._handleNewEventButtonState);
  }

  _handleSiteMenuClick(menuItem) {
    switch (menuItem) {
      case MenuItem.TABLE:
        // Убираем статистику
        this._timelinePresenter.init();
        break;
      case MenuItem.STATS:
        this._timelinePresenter.destroy();
        // Отрисовываем статистику
        break;
    }

    this._currentMenuItem = menuItem;
  }
}