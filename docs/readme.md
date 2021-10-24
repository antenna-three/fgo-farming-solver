
# FGO Farming Solver

A website to calculate the most efficient combination of quest runs from items you want to collect in mobile game "Fate/Grand Order" (FGO).

## How to use

### Material Calculator

1. Select servants you want to level.
2. Check targets (ascension/skill/append skill) and input from what number to what number you want to level.
3. Modify settings for each servant.
4. Push "Calculate Materials" button.
5. You got all the materials required.
6. Input materials you have to calculate shortfalls.
7. Push "Calculate Quest Runs" button to move to farming solver.

### Farming Solver

1. Select the target to minimize. You can choose to minimize total comsumed ap or total quest runs.
2. Input the number of items you want to collect.
3. Choose quests to farm. For example, you can exclude training ground and minimize total runs.
4. Since 6th anniversary in August 2021, drop rates have been increased by about 10%. You can choose which data to use for calculation.
   Old data have a large sample size but a little lower drop rate. In contrast, New data reflects the drop rate increase but may have smaller sample size.
   Lack of data will be compensated each other.
5. Push "Calculate Quest Runs" button. It may take a few seconds.
6. Results will be shown. They consists of two categories:
   
    - Quest Runs

        The most efficient combination of quest runs.

    - Item Gain

        Expected values of gained items. Some values may be exceed required numbers because of a trade-off between items.

## Functions

- Form inputs will be automatically saved to browser.
- "Export" page is useful when you save inputs, or import/export inputs to other devices or browsers.
- You can share results on Twitter.

## Privacy Policy

- Input values sended and received will be encrypted.
- Submitted values will be saved to our database. They may be referenced to improve services.
- Input values may be included in URLs to bookmark or share.

## Disclaimer

- Drop rates are from [FGOアイテム効率劇場](https://sites.google.com/view/fgo-domus-aurea).
- Material data are from [Atlas Academy API](https://api.atlasacademy.io).
- Data will be revalidated automatically but not guaranteed to be correct and newest.
- This website has no relations to development and operation of "Fate/Grand Order".
- We do not take any responsibility or liability for any damage or loss caused through our service.

## Feedback/Bugs

Contact me on [Twitter](https://twitter.com/antenna_games) or [GitHub](https://github.com/antenna-three/fgo-farming-solver/issues)

## Contact

[@antenna_games](https://twitter.com/antenna_games)

## Contributing

See [CONTRIBUTING](contributing.md).

## License

MIT License. See [LICENSE](../LICENSE) for more information.