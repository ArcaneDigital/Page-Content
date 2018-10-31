const cheerio = require("cheerio");
const traverse = require("traverse");
const WAE = require("web-auto-extractor").default;
module.exports = html => {
  if (!html) return null;

  var parsed = { rdfa: {}, jsonld: {}, microdata: {} };
  try {
    parsed = WAE().parse(html);
  } catch (e) {}
  const paragraphs = getParagraphs(html);
  const results = {
    markup: getMarkup(html),
    meta: getMetaTags(html),
    headers: getHeaders(html),
    paragraphs: paragraphs,
    links: getLinks(html),
    images: getImages(html),
    microdata: parsed.microdata,
    rdfa: parsed.rdfa,
    jsonld: parsed.jsonld,
    text: getText(html)
  };

  traverse(results).forEach(function(x) {
    if (this.isLeaf & (typeof x === "string")) this.update(tighten(x));
  });

  return results;
};

function getText(data) {
  const $ = cheerio.load(data);
  $("iframe,noscript").remove();
  return $
    .text()
    .replace(/[\u0021-\u002F;]/g, " ")
    .replace(/[\u2000-\u27F0;]/g, " ")
    .replace(/[\u0080-\u00BF;]/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();
}
function getMarkup(data) {
  const $ = cheerio.load(data);
  const markup = {
    strong: [],
    b: [],
    em: [],
    i: [],
    small: [],
    sub: [],
    sup: [],
    figcaption: []
  };

  $("strong, em, i, b, small, sub, sup, figcaption").each(function() {
    if (this.tagName && $(this).text().length > 0)
      markup[this.tagName].push($(this).text());
  });

  return markup;
}

function getMetaTags(html) {
  const $ = cheerio.load(html);
  const doc = html.match(/^<\!DOCTYPE.*?\>/i);
  return {
    title: $("title").text() || "",
    "print-css": $("link[media=print]").attr("href") || "",
    "meta-description": $("meta[name=description]").attr("content") || "",
    robots: $("meta[name=robots]").attr("content") || "",
    "link-canonical": $("link[rel=canonical]").attr("href") || "",
    "link-manifest": $("link[rel=manifest]").attr("href") || "",
    "link-amphtml": $("link[rel=amphtml]").attr("href") || "",
    "link-author": $("link[rel=author]").attr("href") || "",
    "link-publisher": $("link[rel=publisher]").attr("href") || "",
    "og-url":
      $('meta[property="og:url"]').attr("content") ||
      $('meta[name="og:url"]').attr("content") ||
      "",
    "og-type":
      $('meta[property="og:type"]').attr("content") ||
      $('meta[name="og:type"]').attr("content") ||
      "",
    "og-site-name":
      $('meta[property="og:site_name"]').attr("content") ||
      $('meta[name="og:site_name"]').attr("content") ||
      "",
    "og-image":
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="og:image"]').attr("content") ||
      "",
    "og-description":
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="og:description"]').attr("content") ||
      "",
    "og-title":
      $('meta[property="og:title"]').attr("content") ||
      $('meta[name="og:title"]').attr("content") ||
      "",
    "twitter-card":
      $('meta[property="twitter:card"]').attr("content") ||
      $('meta[name="twitter:card"]').attr("content") ||
      "",
    "twitter-site":
      $('meta[property="twitter:site"]').attr("content") ||
      $('meta[name="twitter:site"]').attr("content") ||
      "",
    "twitter-creator":
      $('meta[property="twitter:creator"]').attr("content") ||
      $('meta[name="twitter:creator"]').attr("content") ||
      "",
    "twitter-url":
      $('meta[property="twitter:url"]').attr("content") ||
      $('meta[name="twitter:url"]').attr("content") ||
      "",
    "twitter-title":
      $('meta[property="twitter:title"]').attr("content") ||
      $('meta[name="twitter:title"]').attr("content") ||
      "",
    "twitter-description":
      $('meta[property="twitter:description"]').attr("content") ||
      $('meta[name="twitter:description"]').attr("content") ||
      "",
    "twitter-image":
      $('meta[property="twitter:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") ||
      "",
    "twitter-player":
      $('meta[property="twitter:player"]').attr("content") ||
      $('meta[name="twitter:player"]').attr("content") ||
      "",
    "twitter-stream":
      $('meta[property="twitter:stream"]').attr("content") ||
      $('meta[name="twitter:stream"]').attr("content") ||
      "",
    "meta-charset": $("meta[charset]").attr("charset") || "",
    "meta-viewport":
      $('meta[property="viewport"]').attr("content") ||
      $('meta[name="viewport"]').attr("content") ||
      "",
    "meta-generator":
      $('meta[property="generator"]').attr("content") ||
      $('meta[name="generator"]').attr("content") ||
      "",
    "meta-theme":
      $('meta[property="theme-color"]').attr("content") ||
      $('meta[name="theme-color"]').attr("content") ||
      "",
    "meta-verification":
      $('meta[property="google-site-verification"]').attr("content") ||
      $('meta[name="google-site-verification"]').attr("content") ||
      "",
    "icon-16": $('link[rel="icon"][sizes="16x16"]').attr("href") || "",
    "icon-32": $('link[rel="icon"][sizes="32x32"]').attr("href") || "",
    "icon-96": $('link[rel="icon"][sizes="96x96"]').attr("href") || "",
    "icon-192": $('link[rel="icon"][sizes="192x192"]').attr("href") || "",
    "apple-touch-76":
      $('link[rel="apple-touch-icon"][sizes="76x76"]').attr("href") || "",
    "apple-touch-120":
      $('link[rel="apple-touch-icon"][sizes="120x120"]').attr("href") || "",
    "apple-touch-152":
      $('link[rel="apple-touch-icon"][sizes="152x152"]').attr("href") || "",
    "apple-touch-192":
      $('link[rel="apple-touch-icon"][sizes="192x192"]').attr("href") || "",
    "mask-icon": $('link[rel="mask-icon"]').attr("href") || "",
    "meta-ua-compatible":
      $('meta[http-equiv="x-ua-compatible"]').attr("content") || "",
    "meta-security-policy":
      $('meta[http-equiv="Content-Security-Policy"]').attr("content") || "",
    "meta-prefetch":
      $('meta[http-equiv="x-dns-prefetch-control"]').attr("content") || "",
    doctype: doc ? doc[0] : "",
    base: $("base").attr("href") || ""
  };
}

function getLinks(data) {
  let $ = cheerio.load(data);
  const links = [];
  $("form,button").remove();

  $("header a, .header a, #header a").each(function(index) {
    if (
      $(this)
        .text()
        .trim().length > 0
    ) {
      links.push({
        anchor: $(this).attr("href") || null,
        text: $(this).text() || "",
        rel: $(this).attr("rel") || null,
        location: "header"
      });
      $(this).remove();
    }
  });

  $("footer a, .footer a, #footer a").each(function(index) {
    if (
      $(this)
        .text()
        .trim().length > 0
    ) {
      links.push({
        anchor: $(this).attr("href") || null,
        text: $(this).text() || "",
        rel: $(this).attr("rel") || null,
        location: "footer"
      });
      $(this).remove();
    }
  });

  $("a").each(function(index) {
    if (
      $(this)
        .text()
        .trim().length > 0
    )
      links.push({
        anchor: $(this).attr("href") || null,
        text: $(this).text() || "",
        rel: $(this).attr("rel") || null,
        location: "body"
      });
  });
  return links;
}

function getImages(data) {
  let $ = cheerio.load(data);
  const images = [];
  $("img").each(function(index) {
    images.push({
      src: $(this).attr("src") || null,
      title: $(this).attr("title") || null,
      alt: $(this).attr("alt") || null,
      role: $(this).attr("role") || null,
      "aria-hidden": $(this).attr("aria-hidden") || null
    });
  });
  return images;
}

function getParagraphs(raw) {
  const data = raw.replace(/<br.*?>/gi, " ");
  let $ = cheerio.load(data);
  $("header,footer,form,button,nav, input, select, button").remove();
  const paragraphs = [];
  $("h1,h2,h3,h4,h5").each(function(index) {
    paragraphs.push(tighten($(this).text()));
    $(this).remove();
  });
  $("li").each(function(index) {
    $(this)
      .children("p")
      .each(function(index) {
        paragraphs.push(tighten($(this).text()));
        $(this).remove();
      });

    paragraphs.push(tighten($(this).text()));
    $(this).remove();
  });
  $("p").each(function(index) {
    paragraphs.push(tighten($(this).text()));
    $(this).remove();
  });
  $("a").remove();
  $("span *:not(:has(" * "))").each(function(index) {
    paragraphs.push(tighten($(this).text()));
    $(this).remove();
  });
  const p = paragraphs.reduce(function(acc, cur) {
    //Images are making it through previous filter. Blocking them here for now.
    const text = cur.replace(/<img .*?>/gim, "");
    const cleaned = tighten(text.replace(/\W/g, " "));
    const words = cleaned.split(" ");
    if (cleaned.length > 0 && words.length > 3) acc.push(text);
    return acc;
  }, []);

  return p;
}

function getHeaders(data) {
  let $ = cheerio.load(data);

  const headers = { H1: [], H2: [], H3: [], H4: [], H5: [] };
  $("h1, h2, h3, h4, h5").each(function(index) {
    headers[$(this).prop("tagName")] = headers[$(this).prop("tagName")] || [];
    if (
      $(this)
        .text()
        .trim().length > 0
    )
      headers[$(this).prop("tagName")].push(tighten($(this).text()));
  });
  $("h1, h2, h3, h4, h5").remove();

  return headers;
}

function tighten(text) {
  return text.replace(/\s+/g, " ").trim();
}
