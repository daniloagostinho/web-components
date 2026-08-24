const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      --copyable-env-bg: #f7f7f4;
      --copyable-env-border: #c8c7bd;
      --copyable-env-text: #1f2933;
      --copyable-env-muted: #65717d;
      --copyable-env-accent: #0f766e;
      display: inline-block;
      max-width: 100%;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
    }

    .env {
      align-items: center;
      background: var(--copyable-env-bg);
      border: 1px solid var(--copyable-env-border);
      border-radius: 6px;
      color: var(--copyable-env-text);
      display: inline-grid;
      gap: 8px;
      grid-template-columns: auto minmax(0, 1fr) auto auto;
      max-width: 100%;
      padding: 8px;
    }

    .name,
    .value {
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .name {
      color: var(--copyable-env-muted);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0;
      text-transform: uppercase;
    }

    .value {
      font-size: 13px;
    }

    button {
      align-items: center;
      background: #ffffff;
      border: 1px solid var(--copyable-env-border);
      border-radius: 5px;
      color: var(--copyable-env-text);
      cursor: pointer;
      display: inline-flex;
      font: inherit;
      height: 28px;
      justify-content: center;
      min-width: 34px;
      padding: 0 8px;
    }

    button:hover {
      border-color: var(--copyable-env-accent);
      color: var(--copyable-env-accent);
    }

    .status {
      color: var(--copyable-env-accent);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      font-size: 12px;
      min-width: 46px;
    }
  </style>

  <span class="env">
    <span class="name"></span>
    <span class="value"></span>
    <button class="toggle" type="button" aria-label="Show value">Show</button>
    <button class="copy" type="button" aria-label="Copy value">Copy</button>
    <span class="status" role="status" aria-live="polite"></span>
  </span>
`;

export class CopyableEnvVar extends HTMLElement {
  static observedAttributes = ['name', 'value', 'masked'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.append(template.content.cloneNode(true));
    this.nameElement = this.shadowRoot.querySelector('.name');
    this.valueElement = this.shadowRoot.querySelector('.value');
    this.toggleButton = this.shadowRoot.querySelector('.toggle');
    this.copyButton = this.shadowRoot.querySelector('.copy');
    this.statusElement = this.shadowRoot.querySelector('.status');
    this.handleToggle = this.handleToggle.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
  }

  connectedCallback() {
    if (!this.hasAttribute('masked')) {
      this.setAttribute('masked', '');
    }

    this.toggleButton.addEventListener('click', this.handleToggle);
    this.copyButton.addEventListener('click', this.handleCopy);
    this.render();
  }

  disconnectedCallback() {
    this.toggleButton.removeEventListener('click', this.handleToggle);
    this.copyButton.removeEventListener('click', this.handleCopy);
  }

  attributeChangedCallback() {
    if (this.shadowRoot) {
      this.render();
    }
  }

  get masked() {
    return this.hasAttribute('masked');
  }

  get value() {
    return this.getAttribute('value') || '';
  }

  handleToggle() {
    this.toggleAttribute('masked');
  }

  async handleCopy() {
    try {
      await navigator.clipboard.writeText(this.value);
      this.statusElement.textContent = 'Copied';
      window.setTimeout(() => {
        this.statusElement.textContent = '';
      }, 1400);
    } catch {
      this.statusElement.textContent = 'Failed';
    }
  }

  render() {
    const name = this.getAttribute('name') || 'ENV_VAR';
    const visibleValue = this.masked ? '••••••••••••' : this.value;

    this.nameElement.textContent = name;
    this.valueElement.textContent = visibleValue;
    this.valueElement.title = this.masked ? 'Masked value' : this.value;
    this.toggleButton.textContent = this.masked ? 'Show' : 'Hide';
    this.toggleButton.setAttribute('aria-label', this.masked ? 'Show value' : 'Hide value');
  }
}

customElements.define('copyable-env-var', CopyableEnvVar);
