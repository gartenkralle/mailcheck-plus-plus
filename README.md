# Mailcheck++

> A modern revival of the original [Mailcheck](https://github.com/mailcheck/mailcheck) — now maintained and improved!

Mailcheck++ suggests corrections when users misspell email domains — like `gmial.com` instead of `gmail.com`. It helps reduce signup errors, improve data quality, and enhance user experience.

This is a continuation of the [original Mailcheck project](https://github.com/mailcheck/mailcheck) by @Kicksend, built under the MIT License. While that version is no longer actively maintained, this fork-free reboot brings it up to date with modern JavaScript standards and community-driven improvements.

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
import Mailcheck from './mailcheck.js';

const result = Mailcheck.run({ email: 'example@example.com' });
console.log(result);
```

## 🔍 What's New

- Fully ES Module-compatible
- Improved typo detection
- Rewritten for better performance and maintainability

## 🙌 Acknowledgements

This project is based on the original [Mailcheck](https://github.com/mailcheck/mailcheck) by Kicksend. Licensed under the MIT License.

## 📃 License

MIT © Clemens Schneider
