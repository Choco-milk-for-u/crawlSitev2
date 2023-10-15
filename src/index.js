import TelegramBot from "node-telegram-bot-api";
import puppeteer from "puppeteer";
import checkIfSiteIsDown from "./crawlScript/checkIfSiteDown.js";
import regularCheck from "./crawlScript/regularCheck.js";

class State {
  url = "https://leqtori.gtu.ge";
  reasonOfPhoto = "Обновилось расписание.";
  bot = null;
  browser = null;
  isDown = false;
  busyDont = false;

  async createInstance() {
    this.browser = await puppeteer.launch({
      headless: "new",
      devtools: false,
      defaultViewport: {
        width: 1,
        height: 1,
      },
      args: [
        "--disable-renderer-backgrounding",
        "--disable-accelerated-2d-canvas",
        "--disable-canvas-aa",
        "--disable-breakpad",
        "--disable-infobars",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--ignore-certificate-errors",
        "--ignore-ssl-errors",
        "--disable-gpu",
        "--disable-web-security",
        "--disable-features=DefaultPassthroughCommandDecoder",
        '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
        "--single-process",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-dev-shm-usage",
        "--disable-features=IsolateOrigins, site-per-process",
        "--hide-scrollbars",
        "--metrics-recording-only",
        "--disable-sync",
        "--mute-audio",
        "--disable-audio-output",
        "--disable-extensions",
        "--disable-cache",
      ],
    });
  }
  async createBot() {
    this.bot = new TelegramBot(
      "6523778057:AAG5as9Yco5hKqdpRtj1bnBElYvBHnKBIHw",
      { polling: false }
    );
  }
}
global.state = new State();
await global.state.createBot();

checkIfSiteIsDown();
regularCheck();
