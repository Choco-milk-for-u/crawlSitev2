import fetch from "node-fetch";
import { sendError, sendLog } from "../../../telegramBot/index.js";
import giveElementByGroup from "../../giveElementsByGroup.js";
import clickAtGroups from "./clickAtGroups.js";

export async function whenClicked(url) {
  let html = "";
  try {
    const response = await fetch(url, { redirect: "follow" });
    if (!response.ok) {
      await sendError(
        "There has been a problem with your fetch operation:" +
          `<b>сайт тогда лежал</b>`
      );
    }
    html = await response.text();
  } catch (error) {
    await sendError(
      "There has been a problem with your fetch operation:" + `<b>${error}</b>`
    );
  }
  await clickAtGroups(html, url);
}
export default async function secondPhase(page) {
  await giveElementByGroup(async (url, page) => await whenClicked(url), page);
  await sendLog("Проверка расписания закончилась");
  await global.state.browser.close();
  global.state.busyDont = false;
}
