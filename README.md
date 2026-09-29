[README.md](https://github.com/user-attachments/files/32830155/README.md)
Injection Guard

Injection Guard is a free, open source Chrome extension that scans every web page for prompt injection attacks aimed at AI browser agents. When the extension finds one, you get a red alert, a badge count on the toolbar icon, and a detailed list in the popup. Hidden injections are stripped from the page so an agent reading the page never sees them.

![Injection Guard alert on the test page](docs/screenshot.png)

## Why this exists



## What the extension detects

| Technique | Example | Severity | Action |
|---|---|---|---|
| Text colored to match the background | white text on white | High | Removed |
| `display: none`, `visibility: hidden`, near-zero opacity | hidden `<div>` | High | Removed |
| 1px or clipped boxes, off-screen positioning, text-indent tricks | screen-reader-only span | High | Removed |
| Font too small to read | `font-size: 1px` | High | Removed |
| HTML comments with instructions | `<!-- AI agent: ... -->` | High | Removed |
| Attributes with instructions | `alt`, `aria-label`, `data-*`, meta content | High | Attribute removed |
| Invisible Unicode tag characters (U+E0000 block) | ASCII smuggling | High | Stripped, hidden message decoded and shown |
| Clusters of zero-width characters | 10+ zero-width chars in one text node | Medium | Stripped |
| Right-to-left override characters | U+202E | Low | Reported |
| Visible text with strong injection phrases | a blog post quoting an attack | Medium or Low | Outlined in red, left in place |

Pages keep getting scanned as content changes, so injections added by scripts after load are caught too.



## Weekly rule updates

New injection techniques show up often, so the rules update on their own:

1. The detection rules live in `extension/rules/rules.json` as data, never code. Chrome's Manifest V3 policy forbids remote code, and data-only rules keep the update channel safe.
2. Each installed copy checks the rules URL in `extension/config.js` once a week. The extension accepts the download only when the file passes validation (schema, size limit, every regex compiles) and the `revision` number is higher than the current one.
3. A GitHub Action runs every Monday. The action validates the rules and opens a "Weekly threat review" issue with a checklist for adding new techniques.
4. Anyone reports a missed injection or false positive with the "Report a new prompt injection" issue template.

Merging a rule change to `main` with a higher `revision` delivers the change to every installed copy within a week. The popup shows the current rule revision and has a "Check for rule updates" button.

##

1. Download or clone this repo.
2. Open `chrome://extensions` and turn on **** (top right).
3. Click **Load unpacked** and choose the `extension` folder.
4. Pin Injection Guard to the toolbar from the puzzle-piece menu.
5. Reload any tabs you had open before installing.

To test local files such as `test-page/index.html`, open the extension's **Details** page and turn on **Allow access to file URLs**.

## Set up weekly updates for your fork

Open `extension/config.js` and replace `YOUR-GITHUB-USERNAME` with your GitHub user name. Until you do, the extension uses the bundled rules and skips remote checks.

## Using the popup

- **Scan pages**: turns scanning on or off.
- **Remove hidden injections**: off means alert only.
- **Trust this site**: skips scanning on a site you trust, and on its subdomains.
- **Rescan page**: runs the scan again.

## Development

```bash
npm test            # validate rules.json and run tests/samples.json
npm install
npx playwright install chromium
npm run test:e2e    # load the extension in Chromium and scan test-page/index.html
npm run package     # build injection-guard-extension.zip for the Chrome Web Store
```

## Project layout

```
extension/            the Chrome extension (load this folder)
  manifest.json
  background.js       badge, per-tab findings, weekly rule updates
  content.js          page scanner, neutralizer, alert banner
  rules-validate.js   rule schema checks shared with CI
  rules/rules.json    detection rules (edit these for new threats)
  config.js           rule update URL and interval
  popup.*             toolbar popup
scripts/              rule validator and end-to-end test
tests/samples.json    phrases that must match, and phrases that must not
test-page/            a page full of sample injections
.github/              CI, weekly review workflow, issue template
```

## Limits

- Injection Guard lowers risk. No filter catches every attack. Attackers reword instructions, and pattern matching misses phrasing outside the rules.
- The extension runs after the page's HTML loads. An agent that reads a page in the first instant before the scan finishes sees the original content.
- Text inside images, PDFs, canvas drawings, closed shadow DOM, and cross-origin iframes without the content script is not scanned.
- Visible matches are outlined, not removed, because security articles quote attacks on purpose.

Keep human approval turned on for purchases, logins, and form submissions in any AI agent you use.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Security issues: see [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE)
