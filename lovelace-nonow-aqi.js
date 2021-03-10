import {
  css,
  html,
  LitElement,
} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";
import dayjs from "https://unpkg.com/dayjs@1.8.24/esm/index.js?module";
import localizedFormat from "https://unpkg.com/dayjs@1.8.24/esm/plugin/localizedFormat/index.js";

dayjs.extend(localizedFormat);

class NonowAqi extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
    };
  }

  render() {
    const indexState = this.hass.states[this.config.index];
    const levelState = this.hass.states[this.config.level];
    const pollutantState = this.hass.states[this.config.pollutant];
    const index = indexState.state;
    const unit = indexState.attributes.unit_of_measurement;
    const polluant = pollutantState.state;
    const polluantIcon = pollutantState.attributes.icon;
    const level = levelState.state;
    const icon = levelState.attributes.icon;

    const color =
      index < 100
        ? "var(--label-badge-green)"
        : index < 200
        ? "var(--label-badge-yellow)"
        : index < 500
        ? "var(--label-badge-red)"
        : "";

    return html`
      <ha-card style="background-color: ${color}">
        <div class="aqi__wrapper"">
          <div class="aqi__index">
            ${index}
            <span class="aqi__unit">${unit}</span>
          </div>
          <div class="aqi__polluant">
            <ha-icon class="aqi__icon" icon="${polluantIcon}"></ha-icon>
            <span>${polluant}</span>
          </div>
          <div class="aqi__level">
            <ha-icon class="aqi__icon" icon="${icon}"></ha-icon>
            <span>${level}</span>
          </div>
        </div>
      </ha-card>
    `;
  }

  setConfig(config) {
    const { index, level, pollutant } = config;

    if (!index) {
      throw new Error("You must define an index sensor");
    }

    if (!level) {
      throw new Error("You must define a level sensor");
    }

    if (!pollutant) {
      throw new Error("You must define a pollutant sensor");
    }

    this.config = { index, level, pollutant };
  }

  static get styles() {
    return css`
      ha-card {
        background-image: linear-gradient(
          to bottom,
          rgba(100, 100, 100, 0),
          rgba(100, 100, 100, 0.4)
        );
        background-blend-mode: color-burn;
        color: #fff;
      }
      .aqi__wrapper {
        padding: 16px;
        margin: 0;
        box-sizing: border-box;
      }
      .aqi__icon {
        --mdc-icon-size: 16px;
        margin-right: 4px;
      }
      .aqi__index {
        font-size: 48px;
        line-height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .aqi__unit {
        text-align: center;
        font-size: 20px;
        font-weight: 300;
        margin-left: 8px;
      }
      .aqi__polluant {
        position: absolute;
        right: 22px;
        top: 50%;
        transform: translateY(-50%);
        padding: 4px 8px;
        border-radius: 16px;
        color: #fff;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 0.9em;
        display: flex;
        align-items: center;
        border: 1px solid rgba(255, 255, 255, 0.15);
      }
      .aqi__level {
        position: absolute;
        left: 22px;
        top: 50%;
        transform: translateY(-50%);
        padding: 4px 8px;
        border-radius: 16px;
        color: #fff;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 0.9em;
        display: flex;
        align-items: center;
        border: 1px solid rgba(255, 255, 255, 0.15);
      }
    `;
  }
}

customElements.define("lovelace-nonow-aqi", NonowAqi);
