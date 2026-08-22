import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

const dist = "dist";
const html = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const jsFile = fs.readdirSync(path.join(dist, "assets")).find(f => f.endsWith(".js"));
const js = fs.readFileSync(path.join(dist, "assets", jsFile), "utf8");

const errors = [];
const dom = new JSDOM(html, {
  runScripts: "outside-only",
  pretendToBeVisual: true,
  url: "https://shariqmehmood.com/",
});
const { window } = dom;

window.addEventListener("error", e => errors.push("window error: " + e.message));
const origError = console.error;
window.console.error = (...a) => errors.push("console.error: " + a.join(" "));
window.console.warn = (...a) => errors.push("console.warn: " + a.join(" "));

// minimal shims jsdom lacks
window.matchMedia = window.matchMedia || (q => ({
  matches: false, media: q, onchange: null,
  addListener(){}, removeListener(){}, addEventListener(){}, removeEventListener(){}, dispatchEvent(){return false;}
}));
window.IntersectionObserver = class { constructor(cb){this.cb=cb;} observe(el){ this.cb([{isIntersecting:true, target:el, intersectionRatio:1, boundingClientRect:{}, rootBounds:{}}], this); } unobserve(){} disconnect(){} takeRecords(){return [];} };
window.ResizeObserver = class { observe(){} unobserve(){} disconnect(){} };
window.scrollTo = () => {};
if (!window.navigator.clipboard) Object.defineProperty(window.navigator, "clipboard", { value: { writeText: async () => {} } });

try {
  window.eval(js);
} catch (e) {
  errors.push("THROWN: " + e.message);
}

await new Promise(r => setTimeout(r, 700));

const d = window.document;
const root = d.getElementById("root");
const text = root ? root.textContent : "";

console.log("=== RENDER ===");
console.log("root children:", root ? root.children.length : 0);
console.log("rendered chars:", text.length);
console.log("h1 count:", d.querySelectorAll("h1").length);
console.log("h1 text:", [...d.querySelectorAll("h1")].map(h => h.textContent.trim()));
console.log("h2 count:", d.querySelectorAll("h2").length);
console.log("h3 count:", d.querySelectorAll("h3").length);
console.log("h4 count:", d.querySelectorAll("h4").length);
console.log("sections:", [...d.querySelectorAll("section[id], footer[id]")].map(s => s.id));
const imgs = [...d.querySelectorAll("img")];
console.log("images:", imgs.length, "| missing alt:", imgs.filter(i => !i.getAttribute("alt")).length);
console.log("img details:", imgs.map(i => ({src:i.getAttribute("src"), alt:i.getAttribute("alt"), w:i.getAttribute("width"), h:i.getAttribute("height"), loading:i.getAttribute("loading")})));
const ld = [...d.querySelectorAll('script[type="application/ld+json"]')];
console.log("json-ld blocks:", ld.length);
if (ld.length) { const p = JSON.parse(ld[0].textContent); console.log("schema @type:", p["@type"], "| name:", p.name, "| sameAs:", p.sameAs); }
const links = [...d.querySelectorAll("a[href]")].map(a => a.getAttribute("href"));
console.log("VIEW LIVE SITE links:", [...d.querySelectorAll("a")].filter(a=>a.textContent.includes("VIEW LIVE SITE")).map(a=>a.getAttribute("href")));
console.log("empty/# hrefs:", links.filter(h => !h || h === "#" || h === ""));
console.log("project numbers rendered:", (text.match(/\b0[1-5]\b/g)||[]).slice(0,12));
console.log("=== ERRORS ===");
console.log(errors.length ? errors : "none");
