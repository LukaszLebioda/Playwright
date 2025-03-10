import { expect, test as setup } from "@playwright/test";

setup("create new article", async ({ request }) => {
	const articleResponse = await request.post(
		"https://conduit-api.bondaracademy.com/api/articles/",
		{
			data: {
				article: {
					title: "Likes test article",
					description: "short summary",
					body: "some content",
					tagList: [],
				},
			},
		}
	);
	expect(articleResponse.status()).toEqual(201);
	const response = await articleResponse.json();
	const articleId = response.article.slug;
	// we have to do this if we want to use articleId in other tests
	process.env["ARTICLE_ID"] = articleId;
});
