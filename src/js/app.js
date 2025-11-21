import { Tooltip } from "./tooltip";

const btn = document.querySelector(".btn");
const tooltip = new Tooltip(btn.title, btn.dataset.content);

btn.addEventListener("click", (e) => {
  e.preventDefault();
  tooltip.showTooltip(btn);
});
