# Versioning plan

Format: `YEAR.MMDD.N`

| Part | Meaning | Example |
|------|---------|---------|
| `YEAR` | Year of the release | `2026` |
| `MMDD` | Month and day as one number, no leading zero | 10 Nov = `1110`, 5 Jan = `105` |
| `N` | Release counter for that day, starts at 0 | first release `0`, second `1` |

Examples: `2026.1110.0` (first release, 10 Nov 2026), `2026.1110.1` (second release the same day), `2027.105.0` (5 Jan 2027).

Why this shape: Homey needs a valid semver (three numbers). `MMDD` as a single number avoids leading zeros (not allowed in semver),
and every new release is a higher version than the previous one, also across year ends.

## Releasing
1. Test with `homey app run --remote`.
2. `node scripts/set-version.js "English changelog" "Nederlandse changelog"`  (sets the version, syncs `package.json`, adds the changelog entry)
3. `homey app validate --level publish`
4. `homey app publish`, then submit for certification in the developer tools.

Rules
- One version per published upload; never publish the same version twice.
- The changelog is written for users, one or two short sentences, in English and Dutch.
- Do not put a changelog in `README.txt`; the changelog entry is shown by the App Store.
- Use the same script for hotfixes: the counter `N` goes up automatically on the same day.

Trade-off: the number shows *when* a release was made, not whether it is a big or small change. Put that in the changelog.
