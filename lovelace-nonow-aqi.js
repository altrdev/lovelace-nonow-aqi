import {
  css,
  html,
  LitElement,
} from 'https://esm.run/lit-element@2.0.1/lit-element.js';
import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/+esm';
import localizedFormat from "https://cdn.jsdelivr.net/npm/dayjs@1.11.13/esm/plugin/localizedFormat/index.js/+esm";

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
    const index = indexState.state;
    const unit = "AQI";
    const polluant = "PM2.5";
    const polluantIcon = "mdi:molecule";

    const level =
      index < 51
        ? { color: "var(--label-badge-green)", desc: "Buona", icon: "mdi:emoticon" }
        : index < 101
        ? { color: "var(--label-badge-yellow)", desc: "Moderato", icon: "mdi:emoticon-happy" }
        : index < 151
        ? { color: "var(--label-badge-orange)", desc: "Malsano gruppi sensibili", icon: "mdi:emoticon-neutral" }
        : index < 201
        ? { color: "var(--label-badge-red)", desc: "Malsano", icon: "mdi:emoticon-sad" }
        : index < 301
        ? { color: "var(--label-badge-purple)", desc: "Molto malsano", icon: "mdi:emoticon-angry" }
        : { color: "var(--label-badge-maroon)", desc: "Pericoloso", icon: "mdi:emoticon-dead" };


    return html`
      <ha-card style="background-color: ${level.color}">
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
            <ha-icon class="aqi__icon" icon="${level.icon}"></ha-icon>
            <span>${level.desc}</span>
          </div>
        </div>
      </ha-card>
    `;
  }

  setConfig(config) {
    const { index } = config;

    if (!index) {
      throw new Error("You must define an index sensor");
    }

    this.config = { index };
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
