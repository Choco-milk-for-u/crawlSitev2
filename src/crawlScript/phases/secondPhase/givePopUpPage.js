import commonPageSetup from "../../commonPageSetup.js";

export default async function givePopUpPage(element) {
  await element.click();
  const newWindowTarget = await global.state.browser.waitForTarget(
    (target) => target.type() === "page"
  );
  const newPage = await newWindowTarget.page();
  await commonPageSetup(newPage);
  return newPage;
}
