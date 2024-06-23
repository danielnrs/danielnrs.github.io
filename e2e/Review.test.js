/* eslint-disable no-undef */
const assert = require("assert");

Feature("Customer Review Feature");

Scenario("Adding Customer Review via Form", async ({ I }) => {
  I.amOnPage("/");
  I.wait(1);
  I.seeElement(".restaurant-title");

  const firstRestaurant = locate(".restaurant-title").first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);

  I.click(firstRestaurant);
  I.wait(1);
  I.seeElement("#addReviewForm");

  const reviewerName = "Christiano Rudi";
  const reviewText = "P, 08 berapa?!";
  I.fillField("#addReviewName", reviewerName);
  I.wait(1);
  I.fillField("#addReviewText", reviewText);
  I.wait(1);

  I.click("Submit");
  I.wait(1);

  I.amOnPage("/");
  I.wait(1);

  I.click(firstRestaurant);
  I.wait(1);

  I.scrollTo("#addReviewName");
  I.wait(1);
  const screenshotFileName = `Review_${Date.now()}.png`;
  I.saveScreenshot(screenshotFileName);
  console.log(`Screenshot saved as: ${screenshotFileName}`);
    I.wait(1);
});
