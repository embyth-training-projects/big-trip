import MenuView from '../view/menu';
import NewEventButtonView from '../view/new-event-button';
import {MenuItem, RenderPosition, UpdateType} from '../const';
import {render} from '../utils/render';

export default class Menu {
  constructor(menuContainer, timelinePresenter, statisticsPresenter, eventsModel) {
    this._menuContainer = menuContainer;
    this._timelinePresenter = timelinePresenter;
    this._statisticsPresenter = statisticsPresenter;
    this._eventsModel = eventsModel;

    this._currentMenuItem = MenuItem.TABLE;
    this._isMenuActive = false;

    this._siteMenuComponent = new MenuView();
    this._newEventButtonComponent = new NewEventButtonView();

    this._handleSiteMenuClick = this._handleSiteMenuClick.bind(this);
    this._handleNewEventButtonClick = this._handleNewEventButtonClick.bind(this);
    this._handleNewEventButtonState = this._handleNewEventButtonState.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
  }

  init() {
    const menuTitle = this._menuContainer.querySelector(`h2:nth-child(1)`);
    render(menuTitle, this._siteMenuComponent, RenderPosition.AFTEREND);
    render(this._menuContainer, this._newEventButtonComponent, RenderPosition.AFTEREND);

    if (!this._isMenuActive) {
      this._newEventButtonComponent.disableButton();
      this._siteMenuComponent.disableMenu();
      return;
    }

    this._siteMenuComponent.setMenuClickHandler(this._handleSiteMenuClick);
    this._siteMenuComponent.setActiveMenuItem(this._currentMenuItem);
    this._siteMenuComponent.enableMenu();
    this._newEventButtonComponent.setNewEventButtonClick(this._handleNewEventButtonClick);
    this._newEventButtonComponent.enableButton();
  }

  _handleNewEventButtonState() {
    this._newEventButtonComponent.enableButton();
  }

  _handleNewEventButtonClick() {
    if (this._currentMenuItem === MenuItem.STATS) {
      this._currentMenuItem = MenuItem.TABLE;
      this._siteMenuComponent.setActiveMenuItem(MenuItem.TABLE);
      this._statisticsPresenter.destroy();
      this._timelinePresenter.init();
    }

    this._newEventButtonComponent.disableButton();
    this._timelinePresenter.createEvent(this._handleNewEventButtonState);
  }

  _handleSiteMenuClick(menuItem) {
    if (menuItem === this._currentMenuItem) {
      return;
    }

    switch (menuItem) {
      case MenuItem.TABLE:
        this._statisticsPresenter.destroy();
        this._timelinePresenter.init();
        break;
      case MenuItem.STATS:
        this._timelinePresenter.destroy();
        this._statisticsPresenter.init();
        break;
    }

    this._currentMenuItem = menuItem;
  }

  _handleModelEvent(updateType) {
    if (updateType === UpdateType.INIT) {
      this._isMenuActive = true;
    }

    this.init();
  }
}
