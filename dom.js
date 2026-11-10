// ===== Task 9.1: Selecting Elements =====

// Starter code (already given)
const header = document.getElementById("main-header");
console.log("getElementById:", header);

const contents = document.getElementsByClassName("content");
console.log("getElementsByClassName:", contents);

const paragraphs = document.getElementsByTagName("p");
console.log("getElementsByTagName:", paragraphs);

const firstLink = document.querySelector(".nav-link");
console.log("querySelector:", firstLink);

const allLinks = document.querySelectorAll(".nav-link");
console.log("querySelectorAll:", allLinks);

// --- practice answers ---
// 1. The h1 element
const h1 = document.querySelector("h1");
console.log("1. h1:", h1);

// 2. All elements with class "content"
const allContent = document.querySelectorAll(".content");
console.log("2. all .content:", allContent);

// 3. The form with id "contact-form"
const form = document.getElementById("contact-form");
console.log("3. form:", form);

// 4. The email input
const emailInput = document.getElementById("email");
console.log("4. email input:", emailInput);

// 5. All list items in the nav
const navItems = document.querySelectorAll("nav ul li");
console.log("5. nav lis:", navItems);

// 6. The first .nav-link
const firstNavLink = document.querySelector(".nav-link");
console.log("6. first nav link:", firstNavLink);

// 7. The last paragraph
const allPs = document.querySelectorAll("p");
const lastParagraph = allPs[allPs.length - 1];
console.log("7. last paragraph:", lastParagraph);

// ===== Task 9.2: Traversing the DOM =====

// Practice tasks
// 1. Select the header, then navigate to the nav inside it
const headerEl = document.querySelector("header");
const navEl = headerEl.querySelector("nav");
console.log("1. nav inside header:", navEl);

// 2. Select the first nav-link, then get its parent li
const linkEl = document.querySelector(".nav-link");
const parentLi = linkEl.parentElement;
console.log("2. parent li:", parentLi);

// 3. Select the article, then get its next sibling (section)
const articleEl = document.querySelector("article");
const sectionSibling = articleEl.nextElementSibling;
console.log("3. article's next sibling:", sectionSibling);

// 4. Select the ul, then get all its child li elements
const ulEl = document.querySelector(".nav-list");
const childLis = ulEl.children; // HTMLCollection
console.log("4. child lis:", childLis);

// 5. Start from the footer and navigate up to the body
const footerEl = document.querySelector("footer");
console.log("5. footer → body:", footerEl.parentElement); // footer's parent IS body
// If you want the full chain:
console.log("   footer.parentElement.tagName:", footerEl.parentElement.tagName); // "BODY"

// ===== Task 9.3: Modifying Content =====

// --- Exercise 1: Text Content ---
const h1Title = document.querySelector("h1");
console.log("textContent:", h1Title.textContent);
console.log("innerText:", h1Title.innerText);
// (Don't actually change it here — or do, and note it in the README)

// --- Exercise 2: HTML content & the security lesson ---
const articleEl2 = document.querySelector("article");
console.log("article innerHTML:", articleEl2.innerHTML);

// SECURITY DEMO
// const userInput = `<img src="x" onerror="alert('hacked!')">`;
// articleEl2.innerHTML = userInput;   // 🚨 runs code
// articleEl2.textContent = userInput; // ✅ safe

// --- Exercise 3: Attributes ---
const navLink = document.querySelector(".nav-link");
console.log("href attr:", navLink.getAttribute("href"));
console.log("href property:", navLink.href);

navLink.setAttribute("href", "https://developer.mozilla.org");
console.log("has target:", navLink.hasAttribute("target"));

// Data attributes demo
const dataEl = document.querySelector("[data-id]");
if (dataEl) {
    console.log("data-id:", dataEl.dataset.id);
    console.log("data-category:", dataEl.dataset.category);
    dataEl.dataset.newAttr = "value";
}

// --- Exercise 4: Styles ---
const container = document.querySelector(".container");
container.style.backgroundColor = "#f0f0f0";
container.style.padding = "30px";
container.style.borderRadius = "8px";

// ===== Task 9.4: Adding & Removing Elements =====

// --- Exercise 1: Creating elements ---
const newParagraph = document.createElement("p");
newParagraph.textContent = "This is a new paragraph!";
newParagraph.className = "content highlight";

const articleEl3 = document.querySelector("article");
articleEl3.appendChild(newParagraph); // adds at end

// --- Exercise 2: Removing elements ---
// newParagraph.remove();

// --- Exercise 3: Cloning ---
const navItem = document.querySelector(".nav-link").parentElement;
const clone = navItem.cloneNode(true); // deep clone
clone.querySelector("a").textContent = "New Link";
document.querySelector(".nav-list").appendChild(clone);

// --- Build: addNavItem ---
function addNavItem(text, href) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "nav-link";
    a.textContent = text;
    a.setAttribute("href", href);
    li.appendChild(a);
    document.querySelector(".nav-list").appendChild(li);
}
addNavItem("Blog", "/blog");
addNavItem("Portfolio", "/portfolio");