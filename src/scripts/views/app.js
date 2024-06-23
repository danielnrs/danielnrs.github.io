import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({
    button, drawer, content, closeButton,
  }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this._closeButton = closeButton;
    this._initialAppShell();
  }

  _initialAppShell() {
    this._button.addEventListener('click', (event) => {
      this._toggleDrawer(event, this._drawer);
    });
    this._closeButton.addEventListener('click', (event) => {
      this._closeDrawer(event, this._drawer);
    });
    this._content.addEventListener('click', (event) => {
      this._closeDrawer(event, this._drawer);
    });
  }

  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('active');
  }

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('active');
  }

  async renderPage() {
    try {
      const url = UrlParser.parseActiveUrlWithCombiner();
      const page = routes[url];
      this._content.innerHTML = await page.render();
      await page.afterRender();
      const skipLink = document.querySelector('.skip-to-content');
      const mainContent = document.querySelector('#mainContent');
      skipLink.addEventListener('click', (event) => {
        event.preventDefault();
        mainContent.focus();
      });
    } catch (error) {
      console.error('Gagal merender halaman:', error);
      alert('Gagal merender halaman. Silakan coba lagi.');
    }
  }
}

export default App;
