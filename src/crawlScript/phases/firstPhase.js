import path from "path";
import crypto from "crypto";
import * as fs from "fs/promises";
import { sendError, sendFiles, sendLog } from "../../telegramBot/index.js";
import commonPageSetup from "../commonPageSetup.js";

async function writeHTMLMainPage(filePath, HTML) {
  try {
    const pathToFoler = path.join(filePath, "..");
    await fs.mkdir(pathToFoler, { recursive: true });
    const files = await fs.readdir(pathToFoler);
    const fullPaths = files.map((file) => path.join(pathToFoler, file));
    await sendFiles(fullPaths);
    await fullPaths.map(async (forLink) => await fs.unlink(forLink));
    await fs.writeFile(filePath, HTML);
    await sendLog("записан новый HTML главной страницы.");
  } catch (error) {
    await sendError(
      `Что-то не так при записи HTML главной страницы: <b>${error.message}</b>`
    );
  }
}
async function onlyHTML(page) {
  await page.setRequestInterception(true);

  page.on("request", (request) => {
    if (request.resourceType() === "document") {
      request.continue();
    } else {
      request.abort();
    }
  });
}

export default async function firstPhase(page) {
  await commonPageSetup(page);
  await onlyHTML(page);
  await page.goto(global.state.url);
  const url = page
    .url()
    .replace(/\//g, "_")
    .replace(/:/g, "_")
    .replace(".html", "");
  const filePath = path.join("savedHTML", "mainPage", `${url}.html`);
  const HTML = await page.content();
  try {
    const htmlFile = await fs.readFile(filePath, "utf8");
    const pageHash = crypto.createHash("sha256").update(HTML).digest("hex");
    const fileHash = crypto.createHash("sha256").update(htmlFile).digest("hex");
    if (pageHash === fileHash) {
      return;
    }
    await sendLog("Страница была обновлена");
  } catch (error) {
    if (error.code !== "ENOENT") await sendError(error.message);
  }
  await writeHTMLMainPage(filePath, HTML);
}
