import firstPhase from "./phases/firstPhase.js";
import secondPhase from "./phases/secondPhase/secondPhase.js";

export async function callWhenNeeded() {
  await global.state.createInstance();
  const page = await global.state.browser.newPage();
  await firstPhase(page);
  await secondPhase(page);
}
