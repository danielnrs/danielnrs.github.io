import RestaurantSource from '../../data/restaurant-source';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import ReviewButtonInitiator from '../../utils/review-button-initiator';
import UrlParser from '../../routes/url-parser';
import { createRestaurantDetailTemplate } from '../templates/template-creator';

const Detail = {
  async render() {
    return `
      <section id="restaurantDetail"></section>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    try {
      const restaurant = await RestaurantSource.detailRestaurant(url.id);
      const restaurantContainer = document.querySelector('#restaurantDetail');

      if (restaurantContainer) {
        restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

        LikeButtonInitiator.init({
          likeButtonContainer: document.getElementById('favoriteButton'),
          restaurant: {
            id: restaurant.id,
            name: restaurant.name,
            rating: restaurant.rating,
            city: restaurant.city,
            description: restaurant.description,
            pictureId: restaurant.pictureId,
            address: restaurant.address,
            foods: restaurant.menus.foods,
            drinks: restaurant.menus.drinks,
            reviews: restaurant.customerReviews,
          },
        });

        // Panggil init setelah elemen form sudah ada di DOM
        ReviewButtonInitiator.init({ id: restaurant.id });

        const submitAddReview = document.getElementById('addReviewForm');
        submitAddReview.addEventListener('submit', async (event) => {
          event.preventDefault();
          const reviewName = document.getElementById('addReviewName').value;
          const reviewText = document.getElementById('addReviewText').value;

          await ReviewButtonInitiator.init({
            id: restaurant.id,
            name: reviewName,
            review: reviewText,
          });

          const result = await RestaurantSource.detailRestaurant(restaurant.id);
          const restaurantReviewContainer = document.querySelector(
            '.restaurant__reviews',
          );

          if (restaurantReviewContainer) {
            restaurantReviewContainer.innerHTML = result.customerReviews
              .map(
                (review) => `<li>${review.name} - ${review.date}: ${review.review}</li>`,
              )
              .join('');
          }
        });
      } else {
        console.error('Element #restaurantDetail tidak ditemukan.');
      }
    } catch (error) {
      console.error('Gagal memuat detail restoran:', error);
    }
  },
};

export default Detail;
