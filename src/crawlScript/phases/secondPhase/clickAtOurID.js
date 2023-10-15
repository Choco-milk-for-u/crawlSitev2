import * as cheerio from "cheerio";

export default async function clickAtOurID(pageHTML) {;
  const $ = cheerio.load(pageHTML);
  const anchor = $('a:contains("108159")').attr('href');
  return $(`table${anchor}`).prop('outerHTML');
}
