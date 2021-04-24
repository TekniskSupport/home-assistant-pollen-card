# home-assistant-pollen-card
A Lovelace custom card for [custom component pollenniva](https://github.com/TekniskSupport/home-assistant-scrape-pollen/) in Home Assistant.

### Deprecation notice, recomend using:
[https://github.com/isabellaalstrom/lovelace-pollenprognos-card](https://github.com/isabellaalstrom/lovelace-pollenprognos-card) as alternative

<b>To use this card you have to have `value_as_text` has to be false.</b>

## Installation

For installation instructions [see this guide](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins).

## Example configuration
Pick the allergens you want to display.
```yaml
title: My awesome Lovelace!
resources:
  - url: /local/card-tools.js
    type: js
  - url: /local/home-assistant-pollen-card.js
    type: js
views:
  title: My view
  cards:
    - type: custom:home-assistant-pollen-card
      title: false
      city: Stockholm
      allergens:
        - Al
        - Alm
        - Ambrosia
        - Björk
        - Ek
        - Gråbo
        - Gräs
        - Hassel
        - Sälg / vide   # this one is important you write just like this.
```

## Options

| Name | Type | Default | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:home-assistant-pollen-card`
| city | string | **Required** | Lower case city from which you have sensors
| allergens | list | **Required** | List of allergens for which you have sensors
| title | boolean | **Optional** | Set to `false` to remove the heading from the card
| minimal | boolean | **Optional** | Set to `true` to show only todays pollen levels in a smaller card
| compact | boolean | **Optional** | Set to `false` to have the three day forecast with bigger images.
| show_state | boolean | **Optional** | Set to `false` if you don't want to show the state text under the images.


Like my work and want to say thanks? Do it here:

<a href="https://www.buymeacoffee.com/iq1f96D" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/purple_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
