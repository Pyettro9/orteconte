/**
 * <region-map>
 * Seletor interativo das 5 macrorregiões do Brasil.
 * Emite o evento "region-change" (bubbles) com o detalhe da região escolhida
 * sempre que o usuário seleciona uma opção.
 */
export const REGIONS = [
  {
    id: "norte",
    name: "Norte",
    icon: "🌳",
    states: "AC · AP · AM · PA · RO · RR · TO",
    blurb: "Cobertura logística para capitais e polos regionais da Amazônia.",
  },
  {
    id: "nordeste",
    name: "Nordeste",
    icon: "☀️",
    states: "AL · BA · CE · MA · PB · PE · PI · RN · SE",
    blurb: "Rede de distribuidores em todas as capitais nordestinas.",
  },
  {
    id: "centro-oeste",
    name: "Centro-Oeste",
    icon: "🌾",
    states: "DF · GO · MT · MS",
    blurb: "Atendimento direto a clínicas e hospitais do planalto central.",
  },
  {
    id: "sudeste",
    name: "Sudeste",
    icon: "🏙️",
    states: "ES · MG · RJ · SP",
    blurb: "Maior concentração de unidades e centro de distribuição principal.",
  },
  {
    id: "sul",
    name: "Sul",
    icon: "❄️",
    states: "PR · RS · SC",
    blurb: "Parcerias com clínicas de reabilitação em todo o território sulista.",
  },
];

class RegionMap extends HTMLElement {
  connectedCallback() {
    this.selected = this.getAttribute("selected") || REGIONS[3].id;
    this.render();
  }

  get regions() {
    return REGIONS;
  }

  currentRegion() {
    return REGIONS.find((r) => r.id === this.selected) || REGIONS[0];
  }

  select(id, { silent = false } = {}) {
    if (!REGIONS.some((r) => r.id === id) || id === this.selected) return;
    this.selected = id;
    this.updateActiveStates();
    if (!silent) {
      this.dispatchEvent(
        new CustomEvent("region-change", {
          detail: this.currentRegion(),
          bubbles: true,
        })
      );
    }
  }

  updateActiveStates() {
    this.querySelectorAll(".region-map__item").forEach((btn) => {
      const isActive = btn.dataset.region === this.selected;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });
  }

  render() {
    this.innerHTML = `
      <div class="region-map" role="list" aria-label="Selecione uma região do Brasil">
        ${REGIONS.map(
          (r) => `
          <button
            type="button"
            class="region-map__item ${r.id === this.selected ? "is-active" : ""}"
            data-region="${r.id}"
            role="listitem"
            aria-pressed="${r.id === this.selected}"
          >
            <span class="region-map__icon" aria-hidden="true">${r.icon}</span>
            <span class="region-map__name">${r.name}</span>
            <span class="region-map__states">${r.states}</span>
          </button>
        `
        ).join("")}
      </div>
    `;

    this.querySelectorAll(".region-map__item").forEach((btn) => {
      btn.addEventListener("click", () => this.select(btn.dataset.region));
    });
  }
}

customElements.define("region-map", RegionMap);

export { RegionMap };
