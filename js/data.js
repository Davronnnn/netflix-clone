const inputFile = document.querySelector('#input-file');
const image = document.querySelector('#image');
const elProgress = document.querySelector('#progress');

inputFile.addEventListener('change', (e) => {
	const file = e.target.files[0];
	const reader = new FileReader();
	reader.readAsDataURL(e.target.files[0]);

	console.log(reader);

	reader.onprogress = (e) => {
		const percent = (e.loaded / e.total) * 100;
		elProgress.style.width = `${percent}%`;
		const size = file.size / 1000;

		console.log(size);
		elProgress.textContent = `${percent}% ` + size + 'KB';
	};

	reader.onload = () => {
		console.log(reader.result);
		image.src = reader.result;
	};
});
