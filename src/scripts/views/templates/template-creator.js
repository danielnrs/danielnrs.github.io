const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant" data-id="${restaurant.id}">
    <img src="https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}" alt="${restaurant.name}" loading="lazy">
    <h3 class="restaurant-title"><a href="#/detail/${restaurant.id}">${restaurant.name}</a></h3>
    <p class="restaurant__city">${restaurant.city}</p>
    <div class="restaurant__rating">
        <span>⭐</span>
        <span>${restaurant.rating}</span>
    </div>
    <p class="restaurant__description restaurant__description-short">${restaurant.description}</p>
  </div>
`;

const createRestaurantDetailTemplate = (restaurant) => `
  <div class="restaurant-detail">
    <img src="https://restaurant-api.dicoding.dev/images/medium/${
  restaurant.pictureId
}" alt="${restaurant.name}" loading="lazy">
    <h2>${restaurant.name}</h2>
    <p class="restaurant__city">Kota: ${restaurant.city}</p>
    <p class="restaurant__address">Alamat: ${restaurant.address}</p>
    <p class="restaurant__description">${restaurant.description}</p>
    <h3>Menu Makanan</h3>
    <ul class="restaurant__foods">
      ${restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('')}
    </ul>
    <h3>Menu Minuman</h3>
    <ul class="restaurant__drinks">
      ${restaurant.menus.drinks
    .map((drink) => `<li>${drink.name}</li>`)
    .join('')}
    </ul>
    <button id="favoriteButton" data-id="${restaurant.id}">
      ${restaurant.isFavorite ? 'Hapus dari Favorit' : 'Tambahkan ke Favorit'}
    </button>
    <h3 class="review">Customer Reviews</h3>
    <ul class="restaurant__reviews">
      ${restaurant.customerReviews
    .map(
      (review) => `<li>${review.name} - ${review.date}: ${review.review}</li>`,
    )
    .join('')}
    </ul>
    <!-- Form untuk mengisi ulasan pelanggan -->
    <form id="addReviewForm">
      <h3>Tambah Ulasan Anda</h3>
      <label for="addReviewName">Nama:</label><br>
      <input type="text" id="addReviewName" name="addReviewName"><br>
      <label for="addReviewText">Ulasan:</label><br>
      <textarea type="text" id="addReviewText" name="addReviewText"></textarea><br><br>
      <button type="submit">Submit</button>
    </form>
  </div>
`;

export { createRestaurantItemTemplate, createRestaurantDetailTemplate };
