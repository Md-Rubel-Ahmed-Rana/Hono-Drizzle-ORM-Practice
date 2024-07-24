import { Context, Hono } from "hono";
import path from "path";
import fs from "fs";
import { authenticate } from "../middlewares/authenticate";
import { unauthenticate } from "../middlewares/unauthenticate";
import { generateHtmlMetadata } from "../utils/generateHtmlMetadata";

const router = new Hono();
const headFilePath = path.join(__dirname, "./shared", "head.html");
const head = fs.readFileSync(headFilePath, "utf-8");

router.get("/", authenticate, (c) => {
  const filePath = path.join(__dirname, "./", "index.html");
  const body = fs.readFileSync(filePath, "utf-8");
  const html = generateHtmlMetadata("News Feeds", body);
  return c.render(`
    ${head}
    ${html}
    `);
});

router.get("/register", unauthenticate, (c) => {
  const registerPageFilePath = path.join(__dirname, "./", "register.html");
  const body = fs.readFileSync(registerPageFilePath, "utf-8");
  const html = generateHtmlMetadata("Register", body);
  return c.render(`
    ${head}
    ${html}
    `);
});

router.get("/login", unauthenticate, (c) => {
  const loginPageFilePath = path.join(__dirname, "./", "login.html");
  const body = fs.readFileSync(loginPageFilePath, "utf-8");
  const html = generateHtmlMetadata("Login", body);
  return c.render(`
    ${head}
    ${html}
    `);
});

router.get("/new-post", authenticate, (c) => {
  const filePath = path.join(__dirname, "./", "new-post.html");
  const body = fs.readFileSync(filePath, "utf-8");
  const html = generateHtmlMetadata("New Post", body);
  return c.render(`
    ${head}
    ${html}
    `);
});

router.get("/posts/post/edit/:id", authenticate, (c) => {
  const filePath = path.join(__dirname, "./", "edit-post.html");
  const body = fs.readFileSync(filePath, "utf-8");
  const html = generateHtmlMetadata("Edit post", body);
  return c.render(`
    ${head}
    ${html}
    `);
});

router.get("/profile", authenticate, (c) => {
  const filePath = path.join(__dirname, "./", "profile.html");
  const body = fs.readFileSync(filePath, "utf-8");
  const html = generateHtmlMetadata("Profile ", body);
  return c.render(`
    ${head}
    ${html}
    `);
});

export const generateNotFoundHtml = (c: Context) => {
  const filePath = path.join(__dirname, "./", "notFound.html");
  const htmlFile = fs.readFileSync(filePath, "utf-8");
  return c.html(htmlFile);
};

export const ViewRoutes = router;
