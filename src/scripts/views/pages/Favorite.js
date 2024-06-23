import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Favorite = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Your Favorite Restaurants</h2>
        <div id="restaurants" class="restaurants"></div>
      </div>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#restaurants');

    if (restaurants.length === 0) {
      restaurantsContainer.innerHTML = '<p>No favorite restaurants to display</p>';
      return;
    }

    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML
        += createRestaurantItemTemplate(restaurant);
    });

    // Inisialisasi tombol favorit setelah template dimasukkan ke dalam DOM
    restaurants.forEach((restaurant) => {
      const likeButton = document.querySelector(
        `#favoriteButton[data-id="${restaurant.id}"]`,
      );
      if (likeButton) {
        LikeButtonInitiator.init({ likeButton, restaurant });
      }
    });
  },
};

export default Favorite;
