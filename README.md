# Page Content

Extract content from an HTML page.

## Install

```
npm install page-content --save
```

## Usage

### From A URL

```javascript
const pc = require("page-content");

pc.parseFromUrl("http://example.com").then(res => {
  console.log(res);
});
```

**Result**

```json
{
  "microdata": {},
  "rdfa": {},
  "markup": {
    "strong": [],
    "em": [],
    "i": [],
    "small": [],
    "sub": [],
    "sup": [],
    "b": [],
    "figcaption": []
  },
  "meta": {
    "title": "Example Domain",
    "print-css": "",
    "meta-description": "",
    "robots": "",
    "link-canonical": "",
    "link-manifest": "",
    "link-amphtml": "",
    "link-author": "",
    "link-publisher": "",
    "og-url": "",
    "og-type": "",
    "og-site-name": "",
    "og-image": "",
    "og-description": "",
    "og-title": "",
    "twitter-card": "",
    "twitter-site": "",
    "twitter-creator": "",
    "twitter-url": "",
    "twitter-title": "",
    "twitter-description": "",
    "twitter-image": "",
    "twitter-player": "",
    "twitter-stream": "",
    "meta-charset": "utf-8",
    "meta-viewport": "width=device-width, initial-scale=1",
    "meta-generator": "",
    "meta-theme": "",
    "meta-verification": "",
    "icon-16": "",
    "icon-32": "",
    "icon-96": "",
    "icon-192": "",
    "apple-touch-76": "",
    "apple-touch-120": "",
    "apple-touch-152": "",
    "apple-touch-192": "",
    "mask-icon": "",
    "meta-ua-compatible": "",
    "meta-security-policy": "",
    "meta-prefetch": "",
    "doctype":
      "<!doctype html> <html> <head> <title>Example Domain</title> <meta charset=\"utf-8\" /> <meta http-equiv=\"Content-type\" content=\"text/html; charset=utf-8\" /> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" /> <style type=\"text/css\"> body { background-color: #f0f0f2; margin: 0; padding: 0; font-family: \"Open Sans\", \"Helvetica Neue\", Helvetica, Arial, sans-serif; } div { width: 600px; margin: 5em auto; padding: 50px; background-color: #fff; border-radius: 1em; } a:link, a:visited { color: #38488f; text-decoration: none; } @media (max-width: 700px) { body { background-color: #fff; } div { width: auto; margin: 0 auto; border-radius: 0; padding: 1em; } } </style> </head> <body> <div> <h1>Example Domain</h1> <p>This domain is established to be used for illustrative examples in documents. You may use this domain in examples without prior coordination or asking for permission.</p> <p><a href=\"http://www.iana.org/domains/example\">More information...</a></p> </div> </body> </html>",
    "base": ""
  },
  "headers": {
    "H1": ["Example Domain"],
    "H2": [],
    "H3": [],
    "H4": [],
    "H5": []
  },
  "paragraphs": [
    "This domain is established to be used for illustrative examples in documents. You may use this domain in examples without prior coordination or asking for permission."
  ],
  "links": [
    {
      "anchor": "http://www.iana.org/domains/example",
      "text": "More information...",
      "rel": null
    }
  ],
  "images": [],
  "jsonld": {},
  "text":
    "example domain example domain this domain is established to be used for illustrative examples in documents you may use this domain in examples without prior coordination or asking for permission more information"
}
```

### From HTML

```javascript
const pc = require("page-content");

const res = pc.parseFromHTML(
  "<html><head></head><body><h1>Hello World</h1></body></html>"
);
console.log(res);
```

**Result**

```json
{
  "microdata": {},
  "rdfa": {},
  "markup": {
    "strong": [],
    "em": [],
    "i": [],
    "small": [],
    "sub": [],
    "sup": [],
    "b": [],
    "figcaption": []
  },
  "meta": {
    "title": "",
    "print-css": "",
    "meta-description": "",
    "robots": "",
    "link-canonical": "",
    "link-manifest": "",
    "link-amphtml": "",
    "link-author": "",
    "link-publisher": "",
    "og-url": "",
    "og-type": "",
    "og-site-name": "",
    "og-image": "",
    "og-description": "",
    "og-title": "",
    "twitter-card": "",
    "twitter-site": "",
    "twitter-creator": "",
    "twitter-url": "",
    "twitter-title": "",
    "twitter-description": "",
    "twitter-image": "",
    "twitter-player": "",
    "twitter-stream": "",
    "meta-charset": "",
    "meta-viewport": "",
    "meta-generator": "",
    "meta-theme": "",
    "meta-verification": "",
    "icon-16": "",
    "icon-32": "",
    "icon-96": "",
    "icon-192": "",
    "apple-touch-76": "",
    "apple-touch-120": "",
    "apple-touch-152": "",
    "apple-touch-192": "",
    "mask-icon": "",
    "meta-ua-compatible": "",
    "meta-security-policy": "",
    "meta-prefetch": "",
    "doctype": "",
    "base": ""
  },
  "headers": {
    "H1": ["Hello World"],
    "H2": [],
    "H3": [],
    "H4": [],
    "H5": []
  },
  "paragraphs": [],
  "links": [],
  "images": [],
  "jsonld": {},
  "text": "hello world"
}
```

## Maintainers

- [Jay Goodfellow](https://github.com/jaygoodfellow)
- [Arcane Digital Inc](https://github.com/arcanedigital)

## License

Copyright (c) 2018, Arcane & Jay Goodfellow.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
