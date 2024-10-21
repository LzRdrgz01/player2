let swiper = new Swiper(".mySwiper", {
    slidesPerView: 1.5,
    spaceBetween: 10,
    breakpoints: {
      700: { slidesPerView: 2.5, spaceBetween: 10 },
      1050: { slidesPerView: 4, spaceBetween: 20 },
      1550: { slidesPerView: 5, spaceBetween: 22 },
    },
  }),
  topTen = new Swiper(".topTen", {
    slidesPerView: 3,
    spaceBetween: 5,
    breakpoints: {
      700: { slidesPerView: 4, spaceBetween: 10 },
      1050: { slidesPerView: 5, spaceBetween: 20 },
      1550: { slidesPerView: 6, spaceBetween: 22 },
    },
  }),
  swiper2 = new Swiper(".mySwiper2", {
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: { 700: { slidesPerView: 2, spaceBetween: 20 } },
  }),
  swiper3 = new Swiper(".tagsSlider", {
    slidesPerView: 2,
    spaceBetween: 20,
    breakpoints: {
      850: { slidesPerView: 3, spaceBetween: 25 },
      1550: { slidesPerView: 4 },
    },
  });
