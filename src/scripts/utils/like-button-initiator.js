import FavoriteRestaurantIdb from '../data/favorite-restaurant-idb';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;

    if (!restaurant.id) {
      console.error('Restoran tidak memiliki ID.');
      return;
    }

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;
    if (await this._isRestaurantExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestaurantExist(id) {
    return !!(await FavoriteRestaurantIdb.getRestaurant(id));
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = '<button id="favoriteButton" aria-label="Tambah ke Favorit">Tambah ke favorit</button>';
    const favoriteButton = this._likeButtonContainer.querySelector('#favoriteButton');
    favoriteButton.addEventListener('click', async () => {
      try {
        await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
        this._renderButton();
      } catch (error) {
        console.error('Gagal menambahkan restoran ke favorit:', error);
      }
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = '<button id="favoriteButton" aria-label="Hapus dari Favorit">Hapus dari favorit</button>';
    const favoriteButton = this._likeButtonContainer.querySelector('#favoriteButton');
    favoriteButton.addEventListener('click', async () => {
      try {
        await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
        this._renderButton();
      } catch (error) {
        console.error('Gagal menghapus restoran dari favorit:', error);
      }
    });
  },
};

export default LikeButtonInitiator;
