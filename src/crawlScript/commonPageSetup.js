export default async function commonPageSetup(page){
    page.setDefaultTimeout(0);
    page.setDefaultNavigationTimeout(0);
    await page.setCacheEnabled(false);
    await page.setJavaScriptEnabled(false); 
    await page.setViewport({ width: 640, height: 480 });
  }