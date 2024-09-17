const arr = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8];

for (let i = 0; i < arr.length; i++) {
	const el = arr[i];
	if (el % 2 == 0) {
		console.log(el, "is even");
	} else {
		console.log(el, "is odd");
	}
}
