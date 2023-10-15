import { sendShedule } from "../telegramBot/index.js";
import path from 'path';

export default async function sendScreenShot(filePath) {
  const page = await global.state.browser.newPage();
  const liveHost = path.join(process.cwd(), filePath)
  await page.goto(`file://${liveHost}`);
  const binary = await page.screenshot({
    fullPage: true,
    quality: 100,
    type: "jpeg",
    omitBackground: true
  });
  await sendShedule(binary);
}
