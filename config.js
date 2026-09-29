// Where the extension looks for updated detection rules.
// After you publish the repo, replace YOUR-GITHUB-USERNAME with your GitHub user name.
// The extension skips remote updates while the placeholder is still here.
self.IG_CONFIG = {
  RULES_URL: 'https://raw.githubusercontent.com/YOUR-GITHUB-USERNAME/injection-guard/main/extension/rules/rules.json',
  UPDATE_EVERY_MINUTES: 60 * 24 * 7, // weekly
  MAX_RULES_BYTES: 200 * 1024
};
