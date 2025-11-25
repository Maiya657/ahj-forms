export class Tooltip {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }

  renderItem() {
    return `
      <div class="popover">
        <div class="popover-content">
          <h1 class="popover-title">${this.title}</h1>
          <div class="popover-value">${this.content}</div>
        </div>
        <div class="arrow"></div>
      </div>
    `;
  }

  showTooltip(element) {
    const tooltipEl = this.renderItem();
    const tooltip = document.querySelector(".popover");

    if (!tooltip) {
      element.insertAdjacentHTML("beforebegin", tooltipEl);

      const popover = document.querySelector(".popover");
      const { top, left } = element.getBoundingClientRect();

      popover.style.top = `${top - popover.offsetHeight - 5}px`;
      popover.style.left = `${left + element.offsetWidth / 2 - popover.offsetWidth / 2}px`;
    } else {
      tooltip.remove();
    }
  }
}
