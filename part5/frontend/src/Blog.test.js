import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    id: "id",
    title: "Title",
    author: {
      name: "Some Author",
    },
    likes: 3,
    url: "http://localhost:3002/api/blogs/id",
  };

  const component = render(
    <Blog
      blog={blog}
      updateBlog={() => {}}
      deleteBlog={() => {}}
      currentUser={{ id: "id" }}
    />
  );

  const title = component.container.querySelector(".blog-title");
  const author = component.container.querySelector(".blog-author");
  const likes = component.container.querySelector(".blog-likes");

  expect(title).toHaveTextContent("Title");
  expect(author).toHaveTextContent("Some Author");
  expect(likes).toBeNull();
});

test("shows additional content", () => {
  const blog = {
    id: "id",
    title: "Title",
    author: {
      name: "Some Author",
    },
    likes: 3,
    url: "http://localhost:3002/api/blogs/id",
  };

  const component = render(
    <Blog
      blog={blog}
      updateBlog={() => {}}
      deleteBlog={() => {}}
      currentUser={{ id: "id" }}
    />
  );

  const button = component.getByText("View");
  fireEvent.click(button);

  const url = component.container.querySelector(".blog-url");
  const likes = component.container.querySelector(".blog-likes");

  expect(url).toHaveTextContent("URL: http://localhost:3002/api/blogs/id");
  expect(likes).toHaveTextContent("Likes: 3");
});

test("button like can be clicked twice", () => {
  const blog = {
    id: "id",
    title: "Title",
    author: {
      name: "Some Author",
    },
    likes: 3,
    url: "http://localhost:3002/api/blogs/id",
  };

  const mock = jest.fn();

  const component = render(
    <Blog
      blog={blog}
      updateBlog={mock}
      deleteBlog={() => {}}
      currentUser={{ id: "id" }}
    />
  );

  const button = component.getByText("View");
  fireEvent.click(button);

  const like = component.getByText("Like");
  fireEvent.click(like);
  fireEvent.click(like);
  expect(mock).toHaveBeenCalledTimes(2);
});
