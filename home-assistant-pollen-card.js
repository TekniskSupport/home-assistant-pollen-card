const LitElement = customElements.get('home-assistant-main')
  ? Object.getPrototypeOf(customElements.get('home-assistant-main'))
  : Object.getPrototypeOf(customElements.get('hui-view'));
const html = LitElement.prototype.html;

class PollenKollCard  extends LitElement {

  setConfig(config) {
    if (!config.allergens) {
      throw new Error('Please define allergens (list)');
    }
    if (!config.city) {
      throw new Error('Please define city');
    }
    if (config.threshold && (typeof(config.threshold) != 'number')) {
      throw new Error('Threshold must be a number')
    }
    this.config = config;
  }

  render(){
    if(this.sensors.length < 1) {
      console.log("No sensor data (above threshold or at all), not rendering card.")
      return;
    }
    return html
    `
    ${this.config.minimal == false || this.config.minimal == null
      ? this._renderStyle()
      : this._renderMinimalStyle()}
    ${this.config.minimal == false || this.config.minimal == null
      ? this._renderCard()
      : this._renderMinimalCard()}

    `
  }

  _renderMinimalCard(){
    return html
    `
    <ha-card>
      ${this.config.title == null || this.config.title == true ?
      html`
      <div class="header">
        <div class="name">
        ${this.header}
        </div>
      </div>`
      : ""
    }
      <div class="flex-container">
        ${this.sensors.map(sensor => html`
        <div class="sensor">
          <p class="box">${sensor.allergen_locale}</p>
          <img class="box" src="/local/pollen_img/${sensor.allergens.toLowerCase()}_${sensor.day1.state == "unknown" || sensor.day1.state == "i.u." ? 0 : sensor.day1.state}.svg"/>
          ${this.config.show_state == true || this.config.show_state == null
            ? html`<p class="box">${sensor.day1.state == "unknown" || sensor.day1.state == "i.u." ? sensor.day1.state : sensor.day1.attributes.description}</p>`
            : ""}
        </div>
      `)}
      </div>
    </ha-card>
    `
  }

  _renderMinimalStyle() {
    return html
    `
    <style>
    ha-card {
      padding: 16px;
    }
    .header {
      padding: 0;
      @apply --paper-font-headline;
      line-height: 40px;
      color: var(--primary-text-color);
      padding: 4px 0 12px;
    }
    .forecast {
      width: 100%;
      padding: 7px;
      height: 100%;
    }
    td {
      padding: 3px;
      text-align: center;
    }
    .flex-container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      text-align: center;
      justify-content: space-evenly;
      align-items: center;
    }
    .sensor {
      margin: 10px;
      flex: 1 1 0;
      flex-direction: column;
      justify-content: space-evenly;
      display: flex;
      align-self: flex-start;
    }
    @supports not (-ms-flex: 1) {
      .flex-container {
        height: auto; /* 2 */
        // min-height: 24em; /* 2 */
      }
    }
    img {
      max-height: 50px;
    }
    .sensor {
      display: block;
      min-width: 16.66%;
      flex: 1;
    }
    </style>`
  }

  _renderCard(){
    return html
    `
    <ha-card>
    ${this.config.title == null || this.config.title == true ?
      html`
      <div class="header">
        <div class="name">
        ${this.header}
        </div>
      </div>`
      : ""
    }
    <table class="forecast">
        <thead>
          <th>Pollen</th>
          <th>Idag</th>
          <th>Imorgon</th>
          <th>${this.sensors[0].day3.state == "unknown" ? "I övermorgon" : this.sensors[0].day3.attributes.day}</th>
        </thead>
        ${this.sensors.map(sensor => html`
            <tr class="allergen">
              <td><img class="allergen" src="/local/pollen_img/${sensor.allergens.toLowerCase()}_${sensor.day1.state == "unknown" || sensor.day1.state == "i.u." ? 0 : sensor.day1.state}.svg"/><p>${sensor.allergen_locale}</p></td>
              ${sensor.day1.state == "unknown" || sensor.day1.state == "i.u." ? html`<td>${sensor.day1.state}</td>` :
              html`<td>
                <img src="/local/pollen_img/${sensor.day1.state + ".svg"}"/>
                ${this.config.show_state == true || this.config.show_state == null ? html`<p class="state-text">${sensor.day1.attributes.description} </p>`: ""}
                </td>`
      }
              ${sensor.day2.state == "unknown" || sensor.day2.state == "i.u." ? html`<td>${sensor.day2.state}</td>` :
              html`<td>
                <img src="/local/pollen_img/${sensor.day2.state + ".svg"}"/>
                ${this.config.show_state == true || this.config.show_state == null ? html`<p class="state-text">${sensor.day2.attributes.description} </p>`: ""}
                </td>`
      }
              ${sensor.day3.state == "unknown" || sensor.day3.state == "i.u." ? html`<td>${sensor.day3.state}</td>` :
              html`<td>
                <img src="/local/pollen_img/${sensor.day3.state + ".svg"}"/>
                ${this.config.show_state == true || this.config.show_state == null ? html`<p class="state-text">${sensor.day3.attributes.description} </p>`: ""}
                </td>`
      }
            </tr>`)}
            </div>
            </div>
            </ha-card>`
  }

  _renderStyle() {
    return html
    `<style>
      ha-card {
        padding: 8px;
      }
      p {
        margin-bottom: 3px;
      }
      .header {
        padding: 0;
        @apply --paper-font-headline;
        line-height: 40px;
        color: var(--primary-text-color);
        padding: 4px 0 12px;
      }
      .forecast {
        width: 100%;
        height: 100%;
      }
      td {
        padding: 3px;
        text-align: center;
        width: 100px;
      }
      img {
        width: 100px;
      }
      img.allergen {
        width: 50px;
        height: 50px;
      }
      ${this.config.compact == true ?
        html
        `
        img {
          width: 50px;
          height: 50px;
        }
        p {
          margin-top: 3px;
        }
        td {
          width: 100px;
        }
        `
      : ``
    }
    </style>
    `
  }
  _tryParseInt(str,defaultValue) {
    var retValue = defaultValue;
    if(str !== null) {
        if(str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseInt(str);
            }
        }
    }
    return retValue;
  }
  set hass(hass) {
    
    this._hass = hass;
    var sensors = [];

    if (this.config.title == null || this.config.title == true) {
      var header_city = this.config.city
      this.header = `Pollenprognos ${header_city.charAt(0).toUpperCase() + header_city.slice(1)}`;
    }

    const cityConf = this.config.city.toLowerCase();
    var cityReplace1 = cityConf.replace('å', 'a')
    var cityReplace2 = cityReplace1.replace('ä', 'a')
    var city = cityReplace2.replace('ö', 'o')

    const allergens = this.config.allergens;
    for (var i = 0; i < allergens.length; i++) {
      var dict = {};
      dict.allergen_locale = (allergens[i].charAt(0).toUpperCase() + allergens[i].slice(1));
      var allergen = allergens[i].replace(' / ', '_').toLowerCase();
      
      var allergenReplace = allergen.replace('å', 'a')
      var allergenReplace2 = allergenReplace.replace('ä', 'a')
      var allergenReplaced = allergenReplace2.replace('ö', 'o')
      
      dict.allergens = allergenReplaced
      dict.day1 = hass.states[`sensor.${allergenReplaced}_${city}_day_0`],
      dict.day2 = hass.states[`sensor.${allergenReplaced}_${city}_day_1`],
      dict.day3 = hass.states[`sensor.${allergenReplaced}_${city}_day_2`]

      if (dict.day1.state == "unknown" || dict.day2.state == "unknown" || dict.day3.state == "unknown") {
        var log_text = `A sensor for "${allergens[i]}" (sensor.${allergenReplaced}_${city}_day_0) is returning unknown, you should probably check your config for that sensor in the custom component.`;
        console.log(log_text)
      }

      if (this.config.threshold != null) {
        if (this._tryParseInt(dict.day1.state, 0) >= this.config.threshold || this._tryParseInt(dict.day2.state, 0) >= this.config.threshold || this._tryParseInt(dict.day3.state, 0) >= this.config.threshold) {
          sensors.push(dict)
        }
      }
      else {
        sensors.push(dict)
      }
    }

    this.sensors = sensors;
    this.requestUpdate();
  }



  // @TODO: This requires more intelligent logic
  getCardSize() {
    return 1;
  }
}

customElements.define('pollenkoll-card', PollenKollCard);
  
