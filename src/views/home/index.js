require(["../../static/conf/config.js"],function(){
	require(["sw","jquery","css!styles/views/base.css","css!styles/views/home/index.css"],function(Swiper,$) {
		console.log($);
		var swiper = new Swiper('.swiper-container', {
			spaceBetween: 30,
			centeredSlides: true,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	})
});
/*Swiper区域*/
