const TECHNOLOGY_ALIASES = {
  "Go Modules": "Go",
  "Node.js / NPM": "Node.js",
  "NPM": null,
  "Python / pip": "Python",
  "Dart / Flutter": "Flutter",
  "BLE / flutter_blue_plus": "Bluetooth LE",
  "Kotlin Android": "Kotlin",
  "Gradle / Kotlin DSL": "Gradle",
  "Gradle Wrapper": "Gradle",
}

const NON_SOURCE_LANGUAGES = new Set([
  "JSON",
  "Markdown",
  "reStructuredText",
  "YAML",
  "XML",
  "TOML",
  "INI",
  "CMake",
  "Makefile",
  "Config",
])

export function normalizeTechnologies(technologies = []) {
  const result = []
  const seen = new Set()

  for (const raw of technologies) {
    const normalized = Object.prototype.hasOwnProperty.call(TECHNOLOGY_ALIASES, raw)
      ? TECHNOLOGY_ALIASES[raw]
      : raw

    if (!normalized || seen.has(normalized)) continue
    seen.add(normalized)
    result.push(normalized)
  }

  return result
}

export function detectedLanguages(languages = {}) {
  return Object.entries(languages)
    .filter(([name, meta]) => !NON_SOURCE_LANGUAGES.has(name) && (meta?.lines || 0) > 0)
    .sort((a, b) => (b[1]?.lines || 0) - (a[1]?.lines || 0))
    .map(([name]) => name)
}
