# copyable-env-var

`copyable-env-var` is a small Web Component for showing environment variables with a masked value, a show/hide control, and a copy button.

## Why this component?

Generic buttons, cards, tabs, and modals already exist everywhere. This component is intentionally narrow: it helps docs, admin panels, onboarding pages, and internal developer tools display configuration values without building the same tiny UI again.

I searched for `copyable-env-var` on webcomponents.org/npm-oriented results before creating this example and did not find a matching package name.

## Web Components in one minute

Web Components are browser-native components. You define a custom HTML tag with JavaScript, isolate its internal markup/styles with Shadow DOM, and use it in regular HTML without needing React, Vue, Angular, or a build step.

The main browser APIs are:

- Custom Elements: define tags like `<copyable-env-var>`.
- Shadow DOM: keep the component's HTML and CSS scoped.
- HTML Templates: clone reusable markup into each component instance.

## Is webcomponents.org like npm?

Not exactly. npm is the package registry where JavaScript packages are published and installed. webcomponents.org is closer to a catalog/discovery site for Web Components: it indexes components, shows README/demo information, and points users to package and repository links.

## Usage

```html
<script type="module" src="./src/copyable-env-var.js"></script>

<copyable-env-var
  name="OPENAI_API_KEY"
  value="sk-proj-example-1234567890"
></copyable-env-var>
```

## Attributes

- `name`: the environment variable name.
- `value`: the value copied to the clipboard.
- `masked`: when present, hides the value until the user clicks `Show`.

## Local demo

```bash
npm install
npm run dev
```

## Publishing notes

To make this discoverable, publish it as an npm package and keep a public GitHub repository with a README, license, demo, and tagged release. webcomponents.org can then use that public package/repository metadata as the component's catalog entry.
