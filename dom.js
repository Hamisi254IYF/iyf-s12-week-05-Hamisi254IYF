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

// ===== Task 10.1: Event Listeners =====

// --- Basic events ---
const clickButton = document.createElement("button");
clickButton.textContent = "Click Me";
document.body.appendChild(clickButton);

clickButton.addEventListener("click", function () {
    console.log("Button clicked!");
});

clickButton.addEventListener("click", () => {
    console.log("Clicked again!");
});

function handleClick() {
    console.log("Handled!");
}
clickButton.addEventListener("click", handleClick);
// Uncomment to test removal (only logs first two clicks):
// clickButton.removeEventListener("click", handleClick);

// --- Build: Click Counter ---
function buildCounter() {
    const wrapper = document.createElement("div");
    wrapper.style.margin = "20px 0";

    const display = document.createElement("span");
    display.textContent = "0";
    display.style.margin = "0 10px";
    display.style.fontWeight = "bold";

    const plus = document.createElement("button");
    plus.textContent = "+";

    const minus = document.createElement("button");
    minus.textContent = "-";

    const reset = document.createElement("button");
    reset.textContent = "Reset";

    let count = 0;

    plus.addEventListener("click", () => {
        count++;
        display.textContent = count;
    });
    minus.addEventListener("click", () => {
        if (count > 0) count--;
        display.textContent = count;
    });
    reset.addEventListener("click", () => {
        count = 0;
        display.textContent = count;
    });

    wrapper.append(minus, display, plus, reset);
    document.body.appendChild(wrapper);
}
buildCounter();

// ===== Task 10.2: The Event Object =====

// Ctrl+S → "Saved!" alert (prevent save dialog)
document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        alert("Saved!");
    }

    // Ctrl+Enter → submit form
    if (event.ctrlKey && event.key === "Enter") {
        const form = document.getElementById("contact-form");
        if (form) form.requestSubmit(); // triggers submit event
    }

    // Escape → clear all form inputs
    if (event.key === "Escape") {
        document.querySelectorAll("input").forEach((input) => {
            input.value = "";
        });
    }
});

// ===== Task 10.3: Bubbling & Delegation =====

// --- Exercise 1: Bubbling demo (console only) ---
// Add this HTML to dom-practice.html:
//   <div id="grandparent">Grandparent
//     <div id="parent">Parent
//       <div id="child">Child</div>
 //   </div>
//    </div>
["grandparent", "parent", "child"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.padding = "20px";
    el.style.border = "1px solid #999";
    el.style.margin = "4px";
    el.addEventListener("click", () => console.log(`${id} clicked`));
});
// Click "Child" → logs: child → parent → grandparent

// --- Exercise 2: Delegation ---
function buildDelegatedTaskList() {
    const list = document.createElement("ul");
    list.id = "delegated-list";
    list.innerHTML = `
        <li>Task one <button class="delete">✕</button></li>
        <li>Task two <button class="delete">✕</button></li>
    `;
    document.body.appendChild(list);

    // ONE listener on the parent
    list.addEventListener("click", function (event) {
        const li = event.target.closest("li");
        if (!li) return; // clicked the gap

        if (event.target.classList.contains("delete")) {
            li.remove();
            return;
        }
        li.classList.toggle("completed");
    });
}
buildDelegatedTaskList();

// ===== Task 10.4: Form Handling =====
const Form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
 emailInput = document.getElementById("email");

// --- error helpers (stable via id, not sibling position) ---

function showError(input, message) {
    input.classList.add("error");
    input.style.borderColor = "red";

    const errId = input.id + "-error";
    let err = document.getElementById(errId);

    if (!err) {
        err = document.createElement("small");
        err.id = errId;
        err.className = "error-msg";
        err.style.color = "red";
        err.style.display = "block";
        // insert right after the input, once
        input.insertAdjacentElement("afterend", err);
    }

    err.textContent = message;
}

function clearError(input) {
    input.classList.remove("error");
    input.style.borderColor = "";

    const err = document.getElementById(input.id + "-error");
    if (err) err.remove();
}

// --- real-time validation ---

nameInput.addEventListener("input", (e) => {
    const value = e.target.value;

    if (value.length === 0) {
        clearError(nameInput);          // don't nag while empty
    } else if (value.length < 2) {
        showError(nameInput, "Name must be at least 2 characters");
    } else {
        clearError(nameInput);
    }
});

emailInput.addEventListener("input", (e) => {
    const value = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value.length === 0) {
        clearError(emailInput);
    } else if (!emailRegex.test(value)) {
        showError(emailInput, "Please enter a valid email");
    } else {
        clearError(emailInput);
    }
});

// --- submission ---

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log("Form data:", data);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // validate everything on submit, not just on input
    let valid = true;

    if (!data.name || data.name.trim().length < 2) {
        showError(nameInput, "Name must be at least 2 characters");
        valid = false;
    } else {
        clearError(nameInput);
    }

    if (!data.email || !emailRegex.test(data.email)) {
        showError(emailInput, "Please enter a valid email");
        valid = false;
    } else {
        clearError(emailInput);
    }

    if (!valid) {
        alert("Please fix the errors before submitting.");
        return;
    }

    alert("Form submitted successfully!");

    // reset values AND clear any lingering messages
    form.reset();
    clearError(nameInput);
    clearError(emailInput);
});