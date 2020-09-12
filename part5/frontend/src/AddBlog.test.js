import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import AddBlog from "./AddBlog";

test("event handler receives correct form data", () => {
  const mock = jest.fn();

  const component = render(<AddBlog onAddBlog={mock} />);
  const show = component.container.querySelector(".show");
  fireEvent.click(show);

  const title = component.container.querySelector("#title");
  const url = component.container.querySelector("#url");

  fireEvent.change(title, { target: { value: "Title" } });
  fireEvent.change(url, {
    target: { value: "http://localhost:3002/api/blogs/123" },
  });

  const submit = component.container.querySelector("#submit");
  fireEvent.click(submit);

  expect(mock).toHaveBeenCalledWith({
    title: "Title",
    url: "http://localhost:3002/api/blogs/123",
  });
});
