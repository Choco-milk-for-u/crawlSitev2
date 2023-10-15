import fetch from "node-fetch";
import { sendLog, sendError } from "../telegramBot/index.js";
import { callWhenNeeded } from "./callWhenNeed.js";

let count = 0;

async function inIterval() {
  if (!global.state.busyDont) {
    if (count === 29) {
      await sendLog(
        "Прошли еще <b>30 минут</b> с ежеменутной проверки сайта."
      );
      global.state.busyDont = true;
      count = -1;
    }
    const response = await fetch(global.state.url, {
      method: "HEAD",
      redirect: "follow",
    });
    if (response.ok && global.state.isDown) {
      global.state.isDown = false;
      global.state.reasonOfPhoto = `Сайт упал и при новом запуске что-то изменилось.`;
      await sendLog("Сайт снова начал работать");
      callWhenNeeded();
    }
    if (!response.ok) {
      await sendError(
        "Сайт в данный момент лежит. Проверка через <b>60 секунд...</b>"
      );
      global.state.isDown = true;
    }
    count++;
  }
}
export default async function checkIfSiteIsDown() {
  await sendLog("Начата проверка состояния сайта.");
  setInterval(inIterval, 60000);
}
