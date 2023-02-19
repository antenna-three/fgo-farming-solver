# News

## Added Web Font - 2023/02/13

The font differed depending on the environment, but now a web font (Noto Sans JP) is applied.

## Fixed Problem in ID Translation - 2022/06/06

Material calculator, farming solver and material simulator use different IDs for items, so they need to be translated, which is performed by simple addtion/subtraction. However, after new material is added and the items' attributes are changed, id translation failed and items are displayed in wrong names. In new releases, items ID translation is performed by statically saved data.
## Added Save-to-Cloud Function - 2022/03/15

Now input of material calculator and farming solver can be stored in server tagged with your Twitter account. You can use it to share your input between your devices.

## Added English Version - 2021/10/24

Added English version. Drop rates are JP server data regardless of languages.

## Changed UI Framework - 2021/10/18

Changed UI Framework from [MVP.css](https://andybrewer.github.io/mvp) to [Chakra UI](https://chakra-ui.com/) expecting consistent styles in more environments and imporovement in acessibility.

## Added Material Calculator - 2021/09/05

Added material calculator.
Moved farming solver from `/` to `/farming`.

## Added Drop Rate Selector - 2021/08/06

Added drop rate selector from old data, new data and old data + new data due to increase in drop rates since 6th anniversary.
