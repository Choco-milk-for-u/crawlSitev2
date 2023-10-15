import formatDay from "./formatDate.js";

export function sheduleMessage() {
  return `
Здраствуйте это ваш автоматизированый бот, вот новое расписание на число <b>${formatDay()}.</b>
Причина скриншота: ${global.state.reasonOfPhoto}
Кстати, есть второй бот, который принимает ваши сообщение и пишет их в эту группу как новость: <a href="t.me/gtunewsbot">Нажми что-бы написать</a>.
`;
};
export function errorMessage(err) {
  const errorMessage = `
  Произошла какая-то ошибка в приложении. Приложение перезапущенно. Ошибка: <b>${err}</b>
    `;
  return errorMessage;
}
export function logger(message) {
  const logger = `
    ${formatDay()}: <b>${message}</b>
      `;
  return logger;
}
