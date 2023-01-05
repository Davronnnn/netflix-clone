import findElement from './utils/findElement.js';
import renderPosts from './utils/renderPost.js';

const elThemeBtn = findElement('#theme-btn');
const elBody = findElement('body');
const elHeader = findElement('header');
const elPopularPost = findElement('.popular-post');
const swiperWrapper = findElement('.swiper-wrapper');
const selectGenres = findElement('#genres');
const tvShowPostsElement = findElement('#tv-shows');
const blockbusterPostsElement = findElement('#blockbuster-posts');
const netflixOriginalsPostsElement = findElement('#netflix-posts');
const loader = findElement('.loader');
const loginBtn = findElement('#login-btn');
const accountBtn = findElement('#account-btn');

const elBtn = findElement('#speech');
const token = localStorage.getItem('token');

if (token) {
	loginBtn.style.display = 'none';
} else {
	accountBtn.style.display = 'none';
}

let popularPosts = [];
let trendPosts = [];
let genres = [];

let tvShowPosts = [];
let blockbusterPosts = [];
let netflixOriginalsPosts = [];

// if (!token) {
// 	window.location.href = 'http://127.0.0.1:5500/pages/login.html';
// }

const getData = async () => {
	try {
		const res = await fetch(
			'https://639b2e8331877e43d68513d1.mockapi.io/popular'
		);
		const trendRes = await fetch(
			'https://639b2e8331877e43d68513d1.mockapi.io/trend'
		);

		const allPostsRes = await fetch(
			'https://639b2e8331877e43d68513d1.mockapi.io/posts'
		);

		const allPosts = await allPostsRes.json();
		const trendData = await trendRes.json();
		const data = await res.json();

		allPosts.forEach((post) => {
			if (post.genre === 'horse') {
				tvShowPosts.push(post);
			} else if (post.genre === 'rabbit') {
				blockbusterPosts.push(post);
			} else if (post.genre === 'dog') {
				netflixOriginalsPosts.push(post);
			}
		});

		trendPosts = trendData;
		popularPosts = data;

		popularPosts.forEach((post) => {
			if (!genres.includes(post.genre)) {
				genres.push(post.genre);
				const newOption = document.createElement('option');
				newOption.value = post.genre;
				newOption.textContent = post.genre;

				selectGenres.appendChild(newOption);
			}
		});

		renderPosts(tvShowPosts.slice(0, 12), tvShowPostsElement);
		renderPosts(blockbusterPosts.slice(0, 12), blockbusterPostsElement);
		renderPosts(
			netflixOriginalsPosts.slice(0, 6),
			netflixOriginalsPostsElement
		);

		renderPosts(popularPosts, elPopularPost, 'popular');
		renderPosts(trendPosts, swiperWrapper, 'trend');

		loader.style.display = 'none';
	} catch (error) {
		console.log(error);
	}
};

elPopularPost.addEventListener('click', (e) => {
	if (e.target.classList.contains('btn-primary')) {
		const id = e.target.dataset.id;

		localStorage.setItem('id', id);
		window.location.href = 'http://127.0.0.1:5500/pages/singleFilm.html';
	}
});

selectGenres.addEventListener('change', (e) => {
	const genre = e.target.value;

	if (genre === 'all') {
		renderPosts(popularPosts, elPopularPost, 'popular');
	} else {
		const filteredPosts = popularPosts.filter((post) => {
			return post.genre === genre;
		});

		renderPosts(filteredPosts, elPopularPost, 'popular');
	}
});

getData();

// slider swiper
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
