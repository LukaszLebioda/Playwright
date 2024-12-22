function createEmployee(name = "unknown", surname = "unknown") {
	return {
		name: name,
		surnmane: surname,
	};
}

console.log(createEmployee("flops"));
console.log(createEmployee());
