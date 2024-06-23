import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Main = {
  async render() {
    return `
      <section class="hero">
        <div class="hero-text">
          <h2>Welcome</h2>
        </div>
      </section>
      <section class="restaurants">
        <h2>Masakan BuDhe</h2>
        <div class="restaurant-list" id="restaurantList"></div>
      </section>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.listRestaurants();
    const restaurantContainer = document.querySelector('#restaurantList');

    if (restaurantContainer) {
      restaurants.forEach((restaurant) => {
        const restaurantItem = createRestaurantItemTemplate(restaurant);
        restaurantContainer.innerHTML += restaurantItem;
      });
    } else {
      console.error('Element #restaurantList tidak ditemukan.');
    }
  },
};

export default Main;
