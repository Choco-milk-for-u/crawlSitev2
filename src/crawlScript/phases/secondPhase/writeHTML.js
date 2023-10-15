import { sendError, sendFiles, sendLog } from "../../../telegramBot/index.js";
import * as fs from 'fs/promises';
import path from "path";
import sendScreenShot from "../../sendScreenShot.js";

export default async function wirteHTML(filePath, HTML) {
  try {
    const pathToFolder = path.join(filePath, '..');
    await fs.mkdir(pathToFolder, { recursive: true });
    const files = await fs.readdir(pathToFolder);
    const fullPaths = files.map((file) => path.join(pathToFolder, file));
    await sendFiles(fullPaths);
    await fullPaths.map(async (forLink) => await fs.unlink(forLink));
    await fs.writeFile(filePath, HTML);
    await sendLog("записан новый HTML расписания.");
    await sendScreenShot(filePath);
  } catch (error) {
    await sendError(`Произошла ошибка при записи HTML расписания: <b>${error.message}</b>`);
  }
}
