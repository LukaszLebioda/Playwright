import { test, expect, request } from "@playwright/test";

test("authorize, publish article API, delete article GUI", async ({
  page,
  request,
}) => {
  // first we need to get authorization token
  const response = await request.post(
    "https://conduit-api.bondaracademy.com/api/users/login",
    {
      data: {
        user: {
          email: "wookie@wookiee.com",
          password: "Wookie123?",
        },
      },
    }
  );
  const responseBody = await response.json();
  const token = responseBody.user.token;
  // console.log(token);

  // with token we can create article with API
  const articleResponse = await request.post(
    "https://conduit-api.bondaracademy.com/api/articles/",
    {
      data: {
        article: {
          title: "my article",
          description: "short summary",
          body: "some content",
          tagList: [],
        },
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  expect(articleResponse.status()).toEqual(201);

  // and finally we delete the article, on FE this time
  // but we need to authorize again
  await page.goto("https://conduit.bondaracademy.com/"); // go to website
  await page.getByText("Sign in").click(); // sign in
  await page.getByRole("textbox", { name: "Email" }).fill("wookie@wookiee.com");
  await page.getByRole("textbox", { name: "Password" }).fill("Wookie123?");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.getByText("Global Feed").click(); // navigate to page with articles
  await page.getByText("my article").click();
  await page.getByRole("button", { name: "Delete Article" }).first().click();
  await expect(page.locator("app-article-list h1").first()).not.toContainText(
    "my article"
  );
});

test("authorize, publish article GUI, delete article API", async ({
  page,
  request,
}) => {
  // first we need to get authorization token
  const response = await request.post(
    "https://conduit-api.bondaracademy.com/api/users/login",
    {
      data: {
        user: {
          email: "wookie@wookiee.com",
          password: "Wookie123?",
        },
      },
    }
  );
  const responseBody = await response.json();
  const token = responseBody.user.token;
  // console.log(token);

  // then we add article with GUI
  await page.getByText("New Article").click();
  await page
    .getByRole("textbox", { name: "Article Title" })
    .fill("Playwright is awesome");
  await page
    .getByRole("textbox", { name: "Article Description" })
    .fill("PLaywright use for test automation");
  await page.getByRole("button", { name: "Publish Article" }).click();

  // now we are intercepting the API response
  const articleResponse = await page.waitForResponse(
    "https://*/**/api/articles*"
  );
  const articleResponseBody = await articleResponse.json();
  const articleId = articleResponse; // articleResponse.articleId;

  // await expect(
  //   page.locator(".article-page h1").toContainText("Playwright is awesome")
  // );

  // and now we delete article using articleId and token
  const deleteArticleResponse = await request.delete(
    `https://conduit-api.bondaracademy.com/api/${articleId}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  expect(articleResponse.status()).toEqual(204);
});
