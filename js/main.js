const elThemeBtn = document.querySelector('#theme-btn');
const elBody = document.querySelector('body');
const elHeader = document.querySelector('header');
const elPopularPost = document.querySelector('.popular-post');
const swiperWrapper = document.querySelector('.swiper-wrapper');

const elBtn = document.querySelector('#speech');
let popularPosts = [];
let trendPosts = [];

function renderPosts(array, parent = elPopularPost, type) {
	const fragment = document.createDocumentFragment();

	if (type === 'trend') {
		array.forEach((element) => {
			const elPost = document.createElement('div');
			elPost.classList.add('swiper-slide');

			elPost.innerHTML = `
		<img src=${element.banner} class="slide-img" alt=${element.title} />
`;
			fragment.appendChild(elPost);
		});
	} else if (type === 'popular') {
		array.slice(0, 12).forEach((element) => {
			const elPost = document.createElement('a');

			elPost.href = element.id;
			elPost.innerHTML = `
		<img src=${element.banner} alt="" />
		`;
			fragment.appendChild(elPost);
		});
	}

	parent.appendChild(fragment);
}

const getData = async () => {
	try {
		const res = await fetch(
			'https://639b2e8331877e43d68513d1.mockapi.io/popular'
		);
		const trendRes = await fetch(
			'https://639b2e8331877e43d68513d1.mockapi.io/trend'
		);

		const trendData = await trendRes.json();
		const data = await res.json();

		trendPosts = trendData;
		popularPosts = data;

		renderPosts(popularPosts, elPopularPost, 'popular');
		renderPosts(trendPosts, swiperWrapper, 'trend');
	} catch (error) {
		console.log(error);
	}
};
getData();

const swiper = new Swiper('.swiper', {
	// Optional parameters
	direction: 'horizontal',
	slidesPerView: 3,
	loop: true,
	parallax: true,

	pagination: {
		el: '.swiper-pagination',
	},

	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},

	scrollbar: {
		el: '.swiper-scrollbar',
	},
});
