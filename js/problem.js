const array = ['1', '2', '3', '4', '1', '3', '5'];

function countElementFromArray(array) {
	const result = {};

	for (let i = 0; i < array.length; i++) {
		const element = array[i];

		if (!result[element]) {
			console.log(result);
			result[element] = 1;
		} else {
			result[element] += 1;
		}
	}

	return result;
}
console.log(countElementFromArray(array));
