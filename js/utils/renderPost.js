function renderPosts(array, parent = elPopularPost, type = 'popular') {
	const fragment = document.createDocumentFragment();

	parent.innerHTML = null;

	if (type === 'trend') {
		array.forEach((element) => {
			const elPost = document.createElement('div');
			elPost.classList.add('swiper-slide');

			elPost.innerHTML = `
						<div class="card">
							<img src=${element.banner} class="slide-img" alt=${element.title} />
							<h4>${element.title}</h4>
							<p>${element.createdAt}</p>
							<p>${element.genre}</p>
						</div>
				
`;
			fragment.appendChild(elPost);
		});
	} else if (type === 'popular') {
		array.slice(0, 12).forEach((post) => {
			const elPost = document.createElement('div');

			elPost.href = post.id;
			elPost.innerHTML = `
						<div class="card">
							<img src=${post.banner} class="slide-img" alt=${post.title} />
							<h4>${post.title}</h4>
							<p>${post.createdAt}</p>
							<p>${post.genre}</p>

							<button data-id=${post.id} class="btn btn-primary">Read More</button>
						</div>
		`;
			fragment.appendChild(elPost);
		});
	}

	parent.appendChild(fragment);
}
export const renderSinglePost = (post, parent, template, token) => {
	parent.innerHTML = null;
	const fragment = document.createDocumentFragment();
	const elPost = template.content.cloneNode(true);

	const title = elPost.querySelector('.card-title');
	const description = elPost.querySelector('.card-text');
	const image = elPost.querySelector('.card-img-top');
	const body = elPost.querySelector('.card-body');

	const editBtn = elPost.querySelector('.edit-btn');
	const deleteBtn = elPost.querySelector('.delete-btn');
	image.src = post.banner;
	image.style.width = '100%';
	image.style.height = '50%';
	title.textContent = post.title;
	description.textContent = post.description;

	if (!token) {
		editBtn.style.display = 'none';
		deleteBtn.style.display = 'none';
	}

	fragment.appendChild(elPost);
	parent.appendChild(fragment);
};
export default renderPosts;
