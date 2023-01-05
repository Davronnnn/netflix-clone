import { renderSinglePost } from './utils/renderPost.js';
import findElement from './utils/findElement.js';

const elCard = findElement('.card');
const template = findElement('#template');
const loader = findElement('.loader');
const id = localStorage.getItem('id');
const token = localStorage.getItem('token');
const loginBtn = findElement('#login-btn');
const accountBtn = findElement('#account-btn');

const deleteModalBtn = findElement('#delete-modal-btn');
const editModalBtn = findElement('#edit-modal-btn');

const editForm = findElement('.edit-form');

deleteModalBtn.addEventListener('click', async () => {
	const loader = findElement('.spinner-border', deleteModalBtn);
	loader.style.display = 'block';

	const res = await fetch(
		`https://639b2e8331877e43d68513d1.mockapi.io/popular/${id}`,
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);
	const data = await res.json();
	window.location.href = '../index.html';
	loader.style.display = 'none';
});

if (token) {
	loginBtn.style.display = 'none';
} else {
	accountBtn.style.display = 'none';
}
const fetchData = async () => {
	try {
		const res = await fetch(
			`https://639b2e8331877e43d68513d1.mockapi.io/popular/${id}`
		);
		const post = await res.json();

		const title = findElement('#title', editForm);
		const description = findElement('#description', editForm);
		const img = findElement('#img', editForm);
		const genre = findElement('#genre', editForm);

		console.log(post);
		title.value = post.title;
		description.value = post.description;
		img.value = post.banner;
		genre.value = post.genre;

		editModalBtn.addEventListener('click', () => {
			const newPost = {
				title: title.value,
				description: description.value,
				banner: img.value,
				genre: genre.value,
			};
			const loader = findElement('.spinner-border', editModalBtn);
			loader.style.display = 'block';

			(async function editPost() {
				const res = await fetch(
					`https://639b2e8331877e43d68513d1.mockapi.io/popular/${id}`,
					{
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(newPost),
					}
				);
				const data = await res.json();

				renderSinglePost(data, elCard, template, token);
				loader.style.display = 'none';
			})();
		});

		renderSinglePost(post, elCard, template, token);
	} catch (error) {
		console.log(error);
	} finally {
		loader.style.display = 'none';
	}
};

fetchData();
