# Contributing to Injection Guard

Thanks for helping. New attack samples and rule fixes are the most useful contributions.

## Add or change a detection rule

1. Add a sample to `tests/samples.json`:
   - `shouldMatch`: text the rules must catch, with the minimum weight (1 weak, 2 medium, 3 strong).
   - `shouldNotMatch`: normal text the rules must leave alone.
2. Edit `extension/rules/rules.json`. Each pattern has:
   - `id`: short name, lowercase letters, numbers, and dashes
   - `weight`: 1, 2, or 3
   - `label`: plain-language description shown to users
   - `pattern`: a JavaScript regular expression, written as a JSON string (escape backslashes)
   - `flags`: any of `i`, `m`, `s`, `u`
3. Increase `revision` by 1 and set `updated` to today's date. Installed copies only accept a higher revision.
4. Run `npm test`. The script checks the schema, runs every sample, and fails any pattern that runs slow on long input.
5. Open a pull request.

### Weights and severity

| Where the text sits | Weight 3 | Weight 2 | Weight 1 |
|---|---|---|---|
| Hidden from the user | High, removed | High, removed | High, removed |
| Visible on the page | Medium, outlined | Low, reported | Ignored |

Keep weight 1 for phrases common on normal pages, such as "click now".

### Regex tips

- Use bounded gaps such as `[^.\n]{0,40}` instead of `.*` to prevent slow matching.
- Avoid nested quantifiers such as `(a+)+`.
- Add at least one `shouldNotMatch` sample for every new pattern.

## Code changes

Run `npm run test:e2e` before opening a pull request. Page text is attacker-controlled, so the popup and banner must use `textContent`, never `innerHTML`.
