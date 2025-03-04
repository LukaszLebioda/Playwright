// import * as nodeFetch from "node-fetch"
import fetch from "node-fetch";

export const getLoginToken = async (username, password) => {
	const response = await fetch("http://localhost:2221/api/login", {
		method: "POST",
		body: JSON.stringify({ username: username, password: password }),
	});
	if (response.status !== 200) {
		throw new Error("An error occured trying to retrieve the login token");
	}
	const responseBody = await response.json();
	return responseBody.token;
};
