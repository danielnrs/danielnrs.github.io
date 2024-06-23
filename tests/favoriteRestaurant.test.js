import LikeButtonInitiator from "../src/scripts/utils/like-button-initiator";
import FavoriteRestaurantIdb from "../src/scripts/data/favorite-restaurant-idb";

describe("Menyukai Sebuah Restoran", () => {
  const tambahkanKontainerLikeButton = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    tambahkanKontainerLikeButton();
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant("restoran1");
  });

  it("seharusnya menampilkan tombol tambah ke favorit ketika restoran belum pernah disukai sebelumnya", async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      restaurant: {
        id: "restoran1",
        name: "Restoran Test 1",
      },
    });

    const likeButton = document.querySelector(
      '[aria-label="Tambah ke Favorit"]'
    );
    expect(likeButton).toBeTruthy();
  });

  it("seharusnya tidak menampilkan tombol hapus dari favorit ketika restoran belum pernah disukai sebelumnya", async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      restaurant: {
        id: "restoran1",
        name: "Restoran Test 1",
      },
    });

    const unlikeButton = document.querySelector(
      '[aria-label="Hapus dari Favorit"]'
    );
    expect(unlikeButton).toBeFalsy();
  });

  it("harus dapat menambahkan restoran ke favorit", async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      restaurant: {
        id: "restoran1",
        name: "Restoran Test 1",
      },
    });

    const favoriteButton = document.querySelector("#favoriteButton");
    favoriteButton.dispatchEvent(new Event("click"));

    const restaurant = await FavoriteRestaurantIdb.getRestaurant("restoran1");
    expect(restaurant).toEqual({
      id: "restoran1",
      name: "Restoran Test 1",
    });
  });

  it("seharusnya tidak menambahkan restoran lagi ketika restoran sudah disukai sebelumnya", async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      restaurant: {
        id: "restoran1",
        name: "Restoran Test 1",
      },
    });

    await FavoriteRestaurantIdb.putRestaurant({
      id: "restoran1",
      name: "Restoran Test 1",
    });

    const favoriteButton = document.querySelector("#favoriteButton");
    favoriteButton.dispatchEvent(new Event("click"));

    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    expect(restaurants).toEqual([
      {
        id: "restoran1",
        name: "Restoran Test 1",
      },
    ]);
  });

  it("seharusnya tidak menambahkan restoran ketika restoran tidak memiliki ID", async () => {
    console.error = jest.fn(); // Mock console.error

    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      restaurant: {
        id: null,
        name: "Restoran Test 1",
      },
    });

    const favoriteButton = document.querySelector("#favoriteButton");
    if (favoriteButton) {
      favoriteButton.dispatchEvent(new Event("click"));
    }

    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    expect(restaurants).toEqual([]);
    expect(console.error).toHaveBeenCalledWith("Restoran tidak memiliki ID.");
  });

  it("seharusnya tidak menambahkan restoran ketika terjadi kesalahan saat menyimpan", async () => {
    jest
      .spyOn(FavoriteRestaurantIdb, "putRestaurant")
      .mockImplementation(() => {
        throw new Error("Error saving restaurant");
      });

    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector("#likeButtonContainer"),
      restaurant: {
        id: "restoran1",
        name: "Restoran Test 1",
      },
    });

    const favoriteButton = document.querySelector("#favoriteButton");
    favoriteButton.dispatchEvent(new Event("click"));

    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    expect(restaurants).toEqual([]);
  });
});
