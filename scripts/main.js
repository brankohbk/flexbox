// **********************
// REFERENCES
const html = document.querySelector(":root");
const container = document.querySelector(".container");
const containerForm = document.querySelector("#container-form");
const itemForm = document.querySelector("#item-form");
const selectedItemLegend = document.querySelector(".selected-item");
const flexItems = document.querySelectorAll(".item");
const hat = document.querySelector(".🎩");
let selectedItem;

// **********************
// AUX FUNCTIONS
function toHex(n) {
  n = parseInt(n,10);
  if (isNaN(n)) return "00";
  n = Math.max(0,Math.min(n,255));
  return "0123456789ABCDEF".charAt((n-n%16)/16)
       + "0123456789ABCDEF".charAt(n%16);
 }
 function rgbaToHex(rgba){
  const processed = rgba.replaceAll("rgb","").replaceAll("a","").replaceAll("(","").replaceAll(")","")
  const array = processed.split(",");
  const arrayHex = [];
  for (let index = 0; index < 3; index++) {
    arrayHex.push( toHex(array[index]))    
  }
  return `#${arrayHex.join("")}`;
}
 

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
  selectedItemLegend.innerText ="";
}

function selectItem(event) {
  event.stopPropagation();
  resetSelection();
  selectedItem = event.target;
  selectedItemLegend.innerText=` Selected ${selectedItem.innerText}`
  selectedItem.classList.add("selected");
  const computedStyle = window.getComputedStyle(selectedItem);
  itemForm.elements["width"].value = computedStyle.width.replace("px", "");
  itemForm.elements["height"].value = computedStyle.height.replace("px", "");
  itemForm.elements["margin"].value = computedStyle.margin.replace("px", "");
  itemForm.elements["grow"].value = computedStyle.flexGrow;
  itemForm.elements["shrink"].value = computedStyle.flexShrink;
  itemForm.elements["order"].value = computedStyle.order;
  itemForm.elements["justify-self"].value = computedStyle.justifySelf;
  itemForm.elements["align-self"].value = computedStyle.alignSelf;
  itemForm.elements["bg-color"].value = rgbaToHex(computedStyle.backgroundColor);
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
  let height = `${itemForm.elements["height"].value}px`;
  let margin = `${itemForm.elements["margin"].value}px`;
  let bgColor = itemForm.elements["bg-color"].value;
  let grow = itemForm.elements["grow"].value;
  let shrink = itemForm.elements["shrink"].value;
  let order = itemForm.elements["order"].value;
  let justifySelf = itemForm.elements["justify-self"].value;
  let alignSelf = itemForm.elements["align-self"].value;

  const itemStyles = {
    width: width,
    height: height,
    margin: margin,
    "flex-grow": grow,
    "flex-shrink": shrink,
    order: order,
    "justify-self": justifySelf,
    "align-self": alignSelf,
    "background-color": bgColor,
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
// const consoleColor = Math.floor(Math.random() * (180 - 30) + 30);
// console.log("%c Hello, fellow Dev! \n ( ͡° ͜ʖ ͡°)つ",`background-color: #090909; color:hsl(${consoleColor}, 94%, 51%);font-size:2em;padding:2rem`);
// console.log(`
// %cI hope you found this snippet useful.
// In that case, you can drop a like or follow me on:
// - Twitter: 🐦 @branko_h 
// - Github: 🐱‍🚀 /brankohbk 
// - LinkedIn: 👨‍💼 /in/branko-haberkon 
// so you don´t miss when i upload a new one. 
// See you soon!`
// ,`color:black;background-color: hsl(${consoleColor}, 94%, 51%);font-size:1.5em; padding: .5rem`);
