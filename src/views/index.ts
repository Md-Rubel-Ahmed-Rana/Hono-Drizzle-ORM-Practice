import { Context, Hono } from "hono";
import path from "path";
import fs from "fs";

const router = new Hono();

router.get("/", (c) => {
  const filePath = path.join(__dirname, "./", "index.html");
  const htmlFile = fs.readFileSync(filePath, "utf-8");
  return c.html(htmlFile);
});

router.get("/register", (c) => {
  const filePath = path.join(__dirname, "./", "register.html");
  const htmlFile = fs.readFileSync(filePath, "utf-8");
  return c.html(htmlFile);
});

router.get("/login", (c) => {
  const filePath = path.join(__dirname, "./", "login.html");
  const htmlFile = fs.readFileSync(filePath, "utf-8");
  return c.html(htmlFile);
});

router.get("/new-post", (c) => {
  const filePath = path.join(__dirname, "./", "new-post.html");
  const htmlFile = fs.readFileSync(filePath, "utf-8");
  return c.html(htmlFile);
});

router.get("/posts/post/edit/:id", (c) => {
  const filePath = path.join(__dirname, "./", "edit-post.html");
  const htmlFile = fs.readFileSync(filePath, "utf-8");
  return c.html(htmlFile);
});

router.get("/profile", (c) => {
  const filePath = path.join(__dirname, "./", "profile.html");
  const htmlFile = fs.readFileSync(filePath, "utf-8");
  return c.html(htmlFile);
});

export const generateNotFoundHtml = (c: Context) => {
  const filePath = path.join(__dirname, "./", "notFound.html");
  const htmlFile = fs.readFileSync(filePath, "utf-8");
  return c.html(htmlFile);
};

export const ViewRoutes = router;
