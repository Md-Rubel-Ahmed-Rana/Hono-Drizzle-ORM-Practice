import { Context, Hono } from "hono";
import path from "path";
import fs from "fs";
import { authenticate } from "../middlewares/authenticate";
import { unauthenticate } from "../middlewares/unauthenticate";

const router = new Hono();

router.get("/", authenticate, (c) => {
  const filePath = path.join(__dirname, "./", "index.html");
  const htmlFile = fs.readFileSync(filePath, "utf-8");
  return c.html(htmlFile);
});

router.get("/register", unauthenticate, (c) => {
  const filePath = path.join(__dirname, "./", "register.html");
  const htmlFile = fs.readFileSync(filePath, "utf-8");
  return c.html(htmlFile);
});

router.get("/login", unauthenticate, (c) => {
  const filePath = path.join(__dirname, "./", "login.html");
  const htmlFile = fs.readFileSync(filePath, "utf-8");
  return c.html(htmlFile);
});

router.get("/new-post", authenticate, (c) => {
  const filePath = path.join(__dirname, "./", "new-post.html");
  const htmlFile = fs.readFileSync(filePath, "utf-8");
  return c.html(htmlFile);
});

router.get("/posts/post/edit/:id", authenticate, (c) => {
  const filePath = path.join(__dirname, "./", "edit-post.html");
  const htmlFile = fs.readFileSync(filePath, "utf-8");
  return c.html(htmlFile);
});

router.get("/profile", authenticate, (c) => {
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
