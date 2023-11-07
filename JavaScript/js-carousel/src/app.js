import Carousel from "./index";
// import Slide from "./Slide";
//
// new Slide('#carousel-slide', {
//     defaultIndex: 0,
//     duration: 3000
// });

Carousel.create('#carousel-fade', {
    type: 'fade',
    defaultIndex: 0,
    duration: 3000
}).then(res => {
    console.log(res)
})

Carousel.create('#carousel-slide', {
    type: 'slide',
    defaultIndex: 0,
    duration: 3000
}).then(res => {
    console.log(res)
})