/* eslint-disable no-undef */
const assert = require("assert");

Feature("Liking Restaurant");

Scenario("Liking and unLiking one Restaurant", async ({ I }) => {
  I.amOnPage("/");
  I.wait(1);
  I.seeElement(".restaurant-title");

  const firstRestaurant = locate(".restaurant-title").first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);

  I.click(firstRestaurant);
  I.wait(1);
  I.seeElement("#favoriteButton");

  I.click("#favoriteButton");
  I.wait(1);

  I.amOnPage("#/favorite");
  I.wait(1);
  I.seeElement(".restaurant-title");

    const screenshotFileName = `Liking_${Date.now()}.png`;
    I.saveScreenshot(screenshotFileName);
    console.log(`Screenshot saved as: ${screenshotFileName}`);
    I.wait(1);

  const likedRestaurantTitle = await I.grabTextFrom(".restaurant-title");

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);

  I.seeElement(".restaurant");
  I.wait(1);
  const likedRestaurant = locate(".restaurant-title a").first();
  I.click(likedRestaurant);
  I.wait(1);
  I.seeElement("#favoriteButton");

  I.click("#favoriteButton");
  I.wait(1);

  I.amOnPage("#/favorite");

  I.dontSee(firstRestaurantTitle);
  I.wait(1);
});
