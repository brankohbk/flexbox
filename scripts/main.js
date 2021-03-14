// **********************
// REFERENCES
const html = document.querySelector(":root");
const container = document.querySelector(".container");
const containerForm = document.querySelector("#container-form");
const itemForm = document.querySelector("#item-form");
const flexItems = document.querySelectorAll(".item");
const hat = document.querySelector(".🎩");
let selectedItem;

// **********************
// EVENT HANDLERS
function changeColors() {  
  const randomInt= Math.floor(Math.random() * (360 - 1) + 1);
  const color1 = `--color-1: hsl(${randomInt}, 94%, 51%)`;
  const color2 = `--color-2: hsl(${randomInt + 90}, 73%, 50%)`;
  html.setAttribute("style",`${color1};${color2};`);
}

function resetSelection() {
  flexItems.forEach((flexItem) => flexItem.classList.remove("selected"));
  selectedItem = "";
}
function selectItem(event) {
  event.stopPropagation();
  resetSelection();
  selectedItem = event.target;
  selectedItem.classList.add("selected");
  const computedStyle = window.getComputedStyle(selectedItem);
  itemForm.elements["width"].value = computedStyle.width.replace("px", "");
  itemForm.elements["grow"].value = computedStyle.flexGrow;
  itemForm.elements["shrink"].value = computedStyle.flexShrink;
  itemForm.elements["order"].value = computedStyle.order;
  itemForm.elements["justify-self"].value = computedStyle.justifySelf;
  itemForm.elements["align-self"].value = computedStyle.alignSelf;
}
function containerFormHandler(event) {
  container.setAttribute(
    "style",
    `
    flex-wrap:${
      containerForm.elements["flex-wrap"].checked ? "nowrap" : "wrap"
    };
    flex-direction:${
      containerForm.elements["flex-direction"].checked ? "column" : "row"
    }
    `
  );
}
function itemFormHandler(event) {
  let width = `${itemForm.elements["width"].value}px`;
  let grow = itemForm.elements["grow"].value;
  let shrink = itemForm.elements["shrink"].value;
  let order = itemForm.elements["order"].value;
  let justifySelf = itemForm.elements["justify-self"].value;
  let alignSelf = itemForm.elements["align-self"].value;

  const itemStyles = {
    width: width,
    "flex-grow": grow,
    "flex-shrink": shrink,
    order: order,
    "justify-self": justifySelf,
    "align-self": alignSelf,
  };

  selectedItem.setAttribute(
    "style",
    JSON.stringify(itemStyles)
      .replaceAll(",", ";")
      .replaceAll('"', "")
      .replaceAll("{", "")
      .replaceAll("}", "")
  );
}

// **********************
// ADDING EVENT LISTENERS
hat.addEventListener("click", () => {
  changeColors();
});
itemForm.addEventListener("reset", () => {
  resetSelection();
});
container.addEventListener("click", () => {
  itemForm.reset();
});
flexItems.forEach((flexItem) => {
  flexItem.addEventListener("click", (e) => {
    selectItem(e);
  });
});
Array.from(containerForm.elements).forEach((el) => {
  el.addEventListener("change", containerFormHandler);
});
Array.from(itemForm.elements).forEach((el) => {
  el.addEventListener("change", itemFormHandler);
});


// **********************
// EXTRA
const consoleColor = Math.floor(Math.random() * (180 - 30) + 30);
console.log("%c Hello, fellow Dev! \n ( ͡° ͜ʖ ͡°)つ",`background-color: #090909; color:hsl(${consoleColor}, 94%, 51%);font-size:2em;padding:2rem`);
console.log(`
%cI hope you found this snippet useful.\n
In that case, you can drop a like or follow me on:\n
- Twitter: 🐦 @branko_h \n
- Github: 🐱‍🚀 /brankohbk \n
- LinkedIn: 👨‍💼 /in/branko-haberkon \n
so you don´t miss when i upload a new one. \n
See you soon!\n\n`
,`color:black;background-color: hsl(${consoleColor}, 94%, 51%);font-size:1.5em; margin: .5rem`);
