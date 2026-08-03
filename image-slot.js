/**
 * <image-slot>
 * Slot de imagem com placeholder elegante quando não há imagem real.
 *
 * Atributos:
 *  - src:   URL da imagem (opcional). Sem ela, mostra um placeholder com ícone.
 *  - label: legenda exibida abaixo do slot.
 *  - icon:  emoji/ícone usado no placeholder (padrão: 🦴).
 *  - ratio: proporção largura/altura do slot (padrão: "4/3").
 */
class ImageSlot extends HTMLElement {
  static get observedAttributes() {
    return ["src", "label", "icon", "ratio"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  render() {
    const src = this.getAttribute("src");
    const label = this.getAttribute("label") || "";
    const icon = this.getAttribute("icon") || "🦴";
    const ratio = this.getAttribute("ratio") || "4/3";

    this.innerHTML = `
      <figure class="image-slot ${src ? "image-slot--filled" : "image-slot--placeholder"}" style="--ratio:${ratio}">
        <div class="image-slot__frame">
          ${
            src
              ? `<img class="image-slot__img" src="${src}" alt="${label}" loading="lazy" decoding="async">`
              : `<span class="image-slot__icon" aria-hidden="true">${icon}</span>`
          }
        </div>
        ${label ? `<figcaption class="image-slot__label">${label}</figcaption>` : ""}
      </figure>
    `;
  }
}

customElements.define("image-slot", ImageSlot);

export { ImageSlot };
