const elForm = document.querySelector('.login');
const elLoginForm = document.querySelector('#login-form');

elLoginForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const data = {
		email: e.target.email.value,
		password: e.target.password.value,
	};

	(async function () {
		try {
			const res = await fetch(
				'https://backend.gazoil.uz/accounts/login/',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					body: JSON.stringify(data),
				}
			);

			if (res.status === 201) {
				localStorage.setItem('token', 'token');

				window.location.href = 'http://127.0.0.1:5500/index.html';
			} else {
				let errorMessage = document.querySelector('#error');

				errorMessage.textContent = "Email yoki parol noto'g'ri";

				setTimeout(() => {
					errorMessage.textContent = '';
				}, 3000);
			}

			const result = await res.json();
			// success
		} catch (err) {
			console.log(err);
		}
	})();
});

elForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const data = {
		email: e.target.email.value,
		password: e.target.password.value,
		phone: e.target.phone.value,

		name: 'name',
		inn: 123123,
		company_name: 'kompany',
		type: 'partner',
		bank_account: 'asdasd',
		bank_name: 'bank',
		mfo: 12123123321123,
		company_address: 'asdasdwqeq',
	};

	(async function () {
		try {
			const res = await fetch(
				'https://backend.gazoil.uz/accounts/register/',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
					body: JSON.stringify(data),
				}
			);

			if (res.status === 201) {
				window.location.href = 'http://127.0.0.1:5500/index.html';
			} else {
				let errorMessage = document.querySelector('#error');

				errorMessage.textContent = "Email yoki parol noto'g'ri";

				setTimeout(() => {
					errorMessage.textContent = '';
				}, 3000);
			}

			localStorage.setItem('token', 'token');
		} catch (err) {
			console.log(err);
		}
	})();
});
