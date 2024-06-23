import RestaurantSource from '../data/restaurant-source';

const ReviewButtonInitiator = {
  init({ id }) {
    const form = document.getElementById('addReviewForm');
    if (!form) {
      console.error("Element with id 'addReviewForm' not found.");
      return;
    }

    form.addEventListener('submit', async (event) => {
      event.preventDefault(); // Hindari reload halaman
      const reviewName = document.getElementById('addReviewName').value;
      const reviewText = document.getElementById('addReviewText').value;

      if (reviewName.trim() === '' || reviewText.trim() === '') {
        alert('Nama dan ulasan harus diisi');
        return;
      }

      const review = {
        id,
        name: reviewName,
        review: reviewText,
      };

      try {
        // Kirim review ke backend
        await RestaurantSource.addReview(review);
        alert('Ulasan Anda berhasil dikirim, Silahkan Refresh Halaman!');
        form.reset();
      } catch (error) {
        console.error('Gagal mengirim ulasan:', error);
        alert('Gagal mengirim ulasan. Silakan coba lagi.');
      }
    });
  },
};

export default ReviewButtonInitiator;
