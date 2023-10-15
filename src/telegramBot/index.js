import { errorMessage, logger, sheduleMessage } from "./staticMessages.js";

export async function sendShedule(data) {
  try {
    await global.state.bot.sendPhoto(
      "-1001899418990",
      data,
      {
        parse_mode: "HTML",
        caption: sheduleMessage(),
      },
      { filename: "shedule", contentType: "img/png" }
    );
  } catch (error) {
    sendError(error.message)
      .then()
      .catch((r) => console.log(r));
  }
}
export async function sendError(err) {
  try {
    await global.state.bot.sendMessage("-1001943801354", errorMessage(err), {
      parse_mode: "HTML",
    });
  } catch (error) {
    sendError(error.message)
      .then()
      .catch((r) => console.log(r));
  }
}
export async function sendLog(message) {
  try {
    await global.state.bot.sendMessage("-1001943801354", logger(message), {
      parse_mode: "HTML",
    });
  } catch (error) {
    sendError(error.message)
      .then()
      .catch((r) => console.log(r));
  }
}
export async function sendFiles(files) {
  try {
    if (files.length > 0) {
      const media = [];
      for (const file of files) {
        media.push({ type: "document", media: file });
      }
      await global.state.bot.sendMediaGroup("-1001943801354", media, {
        parse_mode: "HTML",
        caption: logger("Вот файлы перед их удалением"),
      });
    }
  } catch (error) {
    sendError(error.message)
      .then()
      .catch((r) => console.log(r));
  }
}
