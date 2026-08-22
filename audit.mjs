import fs from "fs";
const html = fs.readFileSync("dist/index.html", "utf8");
const css = fs.readFileSync("dist/assets/" + fs.readdirSync("dist/assets").find(f=>f.endsWith(".css")), "utf8");
const ok = (c,m) => console.log((c ? "PASS " : "FAIL ") + m);

console.log("--- HEAD TAGS ---");
const dec = s => s.replace(/&amp;/g,"&").replace(/&mdash;/g,"—");
const title = dec(html.match(/<title>(.*?)<\/title>/s)?.[1] ?? "");
ok(!!title, `<title> present (${title.length} chars)`);
ok(title.length <= 65, `title length <= 65 (${title.length})`);
const desc = dec(html.match(/name="description"\s+content="([^"]*)"/s)?.[1] ?? "");
ok(!!desc, "meta description present");
ok(desc.length >= 120 && desc.length <= 320, `description length ${desc.length}`);
ok(/rel="canonical"\s+href="https:\/\//.test(html), "canonical tag absolute");
ok(/<html lang="en">/.test(html), "html lang set");
ok(/name="viewport"/.test(html), "viewport meta");
ok(/name="robots"/.test(html), "robots meta");

console.log("--- OPEN GRAPH / TWITTER ---");
for (const p of ["og:type","og:title","og:description","og:image","og:url","og:site_name","og:image:width","og:image:alt"])
  ok(new RegExp(`property="${p}"`).test(html), p);
for (const t of ["twitter:card","twitter:title","twitter:description","twitter:image","twitter:image:alt"])
  ok(new RegExp(`name="${t}"`).test(html), t);
ok(/content="summary_large_image"/.test(html), "twitter card = summary_large_image");

console.log("--- CRAWL FILES ---");
const rb = fs.readFileSync("dist/robots.txt","utf8");
ok(/User-agent:\s*\*/.test(rb), "robots.txt has User-agent");
ok(/Sitemap:\s*https:\/\//.test(rb), "robots.txt declares sitemap");
const sm = fs.readFileSync("dist/sitemap.xml","utf8");
ok(/<urlset[^>]*sitemaps\.org\/schemas\/sitemap\/0\.9/.test(sm), "sitemap.xml valid namespace");
ok(/<loc>https:\/\//.test(sm), "sitemap has absolute loc");
ok(fs.existsSync("dist/favicon.svg"), "favicon.svg shipped");
ok(fs.existsSync("dist/images/og-shariq-mehmood.jpg"), "OG image shipped");
ok(fs.existsSync("dist/Shariq-Mehmood-SEO-Specialist-Resume.pdf"), "resume PDF shipped");

console.log("--- CSS REQUIREMENTS ---");
ok(/\.hero-heading\{[^}]*linear-gradient\(180deg,#646973 0%,#BBCCD7 100%\)/i.test(css.replace(/\s/g,"")) ||
   /hero-heading/.test(css) && /646973/.test(css) && /BBCCD7/i.test(css), "hero-heading chrome gradient");
ok(/scroll-behavior:smooth/.test(css.replace(/\s/g,"")), "html scroll-behavior: smooth");
ok(/prefers-reduced-motion:reduce/.test(css.replace(/\s/g,"")), "reduced-motion media query");
ok(/word-break:normal/.test(css.replace(/\s/g,"")), "word-break: normal");
ok(/scroll-margin-top:80px/.test(css.replace(/\s/g,"")), "scroll-margin-top: 80px");
ok(/background-clip:text/.test(css.replace(/\s/g,"")), "background-clip: text");

console.log("--- ASSET WEIGHT ---");
const stat = p => (fs.statSync(p).size/1024).toFixed(1)+" kB";
console.log("hero portrait :", stat("dist/images/shariq-mehmood.jpg"));
console.log("og image      :", stat("dist/images/og-shariq-mehmood.jpg"));
const js = fs.readdirSync("dist/assets").find(f=>f.endsWith(".js"));
console.log("js bundle     :", stat("dist/assets/"+js));
console.log("css bundle    :", stat("dist/assets/"+fs.readdirSync("dist/assets").find(f=>f.endsWith(".css"))));
const fonts = fs.readdirSync("dist/assets").filter(f=>f.endsWith(".woff2"));
console.log("woff2 files   :", fonts.length, "(", fonts.reduce((a,f)=>a+fs.statSync("dist/assets/"+f).size,0)/1024|0, "kB total )");
