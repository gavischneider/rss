var feed = require("rss-to-json");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

interface FeedData {
  title: string;
  id: string;
  description: string;
  url: string;
  created: string;
  category: string[];
}

async function getFeeds(): Promise<Array<FeedData>> {
  var rss = await feed.load("http://feeds.feedburner.com/Metalsucks");
  console.log(rss.items[0]);
  return rss.items;
}

// Extracts the image source from 'description', which is HTML
function getImgfromHTML(description: string): string | null {
  const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
  const div: HTMLElement = dom.window.document.createElement("div");
  div.innerHTML = description;
  const image: HTMLElement = div.getElementsByTagName("img")[0];
  const imageSrc: string | null = image ? image.getAttribute("src") : "";
  return imageSrc;
}

getFeeds().then((feeds) => {
  feeds.map((ele) => {
    console.log(ele.title);
    const image = getImgfromHTML(ele.description);
    console.log(image);
  });
  console.log("Length: " + feeds.length);
});
