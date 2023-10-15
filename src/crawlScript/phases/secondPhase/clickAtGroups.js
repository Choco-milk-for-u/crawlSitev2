import path from "path";
import crypto from "crypto";
import * as fs from "fs/promises";
import clickAtOurID from "./clickAtOurID.js";
import wirteHTML from "./writeHTML.js";
import { sendLog } from "../../../telegramBot/index.js";

export default async function clickAtGroups(pageHTML, siteURL) {
  const HTML = await clickAtOurID(pageHTML);
  const url = siteURL.replace(/\//g, "_").replace(/:/g, "_").replace(".html", "").split("#")[0];
  const filePath = path.join("savedHTML", "shedulePage", `${url}.html`);
  try {
    const htmlFile = await fs.readFile(filePath, "utf8");
    const pageHash = crypto.createHash("sha256").update(HTML).digest("hex");
    const fileHash = crypto.createHash("sha256").update(htmlFile).digest("hex");
    if (pageHash === fileHash) {
      return;
    }
    await sendLog("Расписание было обновлено");
  } catch (error) {
    if (error.code !== "ENOENT") await sendError(error.message);
  }
  await wirteHTML(filePath, HTML);
}
