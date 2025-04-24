[![](https://data.jsdelivr.com/v1/package/gh/gartenkralle/mailcheck-plus-plus/badge?style=rounded)](https://www.jsdelivr.com/package/gh/gartenkralle/mailcheck-plus-plus)

# Mailcheck++

> A modern revival of the original [Mailcheck](https://github.com/mailcheck/mailcheck) — now maintained and improved!

Mailcheck++ suggests corrections when users misspell email domains — like `gmial.com` instead of `gmail.com`. It helps reduce signup errors, improve data quality, and enhance user experience.

This is a continuation of the [original Mailcheck project](https://github.com/mailcheck/mailcheck) by @derrickko, built under the MIT License. While that version is no longer actively maintained, this fork-free reboot brings it up to date with modern JavaScript standards and community-driven improvements.

## ✨ Features

- 🧠 Smart domain, top-level domain, and second-level domain corrections
- 🛠️ Written in modern, modular JavaScript (ESM)
- ⚡ Fast, lightweight, and dependency-free
- ✅ Tested with real-world typos and domains
- 🌍 Supports custom domain lists and localizations

## 📦 Installation

```bash
npm install mailcheck-plusplus
```

or

```bash
yarn add mailcheck-plusplus
```

## 🔧 Usage

```js
import { MailcheckPlusPlus } from "https://cdn.jsdelivr.net/gh/gartenkralle/mailcheck-plus-plus@1.0.1/js/modules/mailcheck-plus-plus.js";

const emailInput = document.getElementById('email');
const suggestion = document.getElementById('suggestion');

emailInput.addEventListener('blur', () => {
    const result = MailcheckPlusPlus.run(emailInput.value);

    suggestion.textContent = result ? 
        `Did you mean: ${result.full}?` : 
        'No suggestions available.';
});
```

## 🔍 What's New

- Fully ES Module-compatible
- Improved typo detection
- Rewritten for better performance and maintainability

## 🙌 Acknowledgements

This project is based on the original [Mailcheck](https://github.com/mailcheck/mailcheck) by derrickko. Licensed under the MIT License.

## 📃 License

MIT © Clemens Schneider
