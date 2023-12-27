type Rating = 1 | 2 | 3 | 4 | 5;
type State = {
  rating: Rating;
};

const welcomeScreen = document.querySelector(".support-card--welcome");
const summaryScreen = document.querySelector(".support-card--thank");
const ratingForm = document.querySelector(".form");
const ratingOptions = document.querySelectorAll(".form__input");
const ratingElementValue = document.querySelector(".support-card__value");

const state: State = {
  rating: 1,
};

const getRating = () => {
  return state.rating;
};

const setRating = (ratingOption: HTMLInputElement) => {
  const rating = Number(ratingOption.getAttribute("value"));

  if (!rating) {
    throw new Error("Target doesnt have value attribute!");
  }

  if (!isValidRating(rating)) {
    throw new Error("Invalid rating!");
  }

  state.rating = rating;
};

const isValidRating = (rating: number): rating is Rating => {
  return rating >= 1 && rating <= 5;
};

const sendSupportRating = () => {
  const rating = getRating();

  if (!isValidRating(rating)) {
    throw new Error("Invalid rating!");
  }

  changeUI();
};

const changeUI = () => {
  if (!ratingElementValue) return;
  ratingElementValue.textContent = String(state.rating);
  welcomeScreen?.setAttribute("hidden", "true");
  summaryScreen?.setAttribute("hidden", "false");
};

ratingForm?.addEventListener("submit", (ev) => {
  ev.preventDefault();
  sendSupportRating();
});

ratingOptions?.forEach((ratingOption) => {
  ratingOption.addEventListener("change", ({ target }) => {
    if (!(target instanceof HTMLInputElement)) return;
    setRating(target);
  });
});
