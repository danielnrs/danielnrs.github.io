import { openDB } from 'idb';

const DB_NAME = 'restaurant-favorites';
const DB_VERSION = 1;
const OBJECT_STORE_NAME = 'restaurants';

class FavoriteRestaurantIdb {
  static async _openDatabase() {
    return openDB(DB_NAME, DB_VERSION, {
      upgrade(database) {
        if (!database.objectStoreNames.contains(OBJECT_STORE_NAME)) {
          const store = database.createObjectStore(OBJECT_STORE_NAME, {
            keyPath: 'id',
          });
          store.createIndex('name', 'name', { unique: false });
        }
      },
    });
  }

  static async putRestaurant(restaurant) {
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    const db = await this._openDatabase();
    return db.put(OBJECT_STORE_NAME, restaurant); // Memasukkan restoran ke dalam IndexedDB
  }

  static async deleteRestaurant(id) {
    const db = await this._openDatabase();
    return db.delete(OBJECT_STORE_NAME, id); // Menghapus restoran dari IndexedDB berdasarkan ID
  }

  static async getRestaurant(id) {
    const db = await this._openDatabase();
    return db.get(OBJECT_STORE_NAME, id); // Mengambil restoran dari IndexedDB berdasarkan ID
  }

  static async getAllRestaurants() {
    const db = await this._openDatabase();
    return db.getAll(OBJECT_STORE_NAME); // Mengambil semua restoran dari IndexedDB
  }

  static async isRestaurantInFavorites(id) {
    const db = await this._openDatabase();
    const restaurant = await db.get(OBJECT_STORE_NAME, id); // Memeriksa apakah restoran ada di dalam favorit berdasarkan ID
    return !!restaurant;
  }
}

export default FavoriteRestaurantIdb;
