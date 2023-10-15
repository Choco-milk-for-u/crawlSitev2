import { sendLog } from "../telegramBot/index.js";
import firstPhase from "./phases/firstPhase.js";
import secondPhase from "./phases/secondPhase/secondPhase.js";

async function inInterval() {
  await sendLog("Начата проверка расписания сайта");
  global.state.busyDont = true;
  await global.state.createInstance();
  const page = await global.state.browser.newPage();
  await firstPhase(page);
  await secondPhase(page);
}
export default async function regularCheck() {
  await inInterval();
  setInterval(inInterval, 1800000);
}
