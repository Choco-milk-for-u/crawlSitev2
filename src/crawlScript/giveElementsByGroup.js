export default async function giveElementByGroup(fun, page) {
  const linkSelector = "a ::-p-text(Groups)";
  const elements = await page.$$(linkSelector);
  let hrefs = [];
  for (let element of elements) {
    const link = await page.evaluate((el) => {
      const tag = el.closest("a");
      return tag.getAttribute("href");
    }, element);
    hrefs.push(link);
  }
  for (let url of hrefs) {
    await fun(url, page);
  }
}
