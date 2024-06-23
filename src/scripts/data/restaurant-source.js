import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantSource {
  static async listRestaurants() {
    const response = await fetch(API_ENDPOINT.LIST);
    const responseJson = await response.json();

    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      const responseJson = await response.json();

      if (responseJson.error) {
        throw new Error(responseJson.message);
      }

      return responseJson.restaurant;
    } catch (error) {
      throw new Error('Restaurant not found');
    }
  }

  static async toggleFavoriteRestaurant(restaurant) {
    // Method untuk menambahkan dan menghapus restoran dari daftar favorit
  }

  static async addReview(review) {
    try {
      const response = await fetch(API_ENDPOINT.REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review), // Menggunakan parameter review
      });

      if (!response.ok) {
        throw new Error('Gagal menambahkan ulasan');
      }

      return response.json(); // Mengembalikan respons JSON langsung
    } catch (error) {
      throw new Error(`Gagal menambahkan ulasan: ${error.message}`);
    }
  }
}

export default RestaurantSource;
