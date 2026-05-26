import { luhnCheck } from './luhn';
import { detectCardType } from './cardType';

const CARD_TYPES = ['visa', 'mastercard', 'amex', 'discover', 'jcb', 'diners', 'mir'];

export default class CardWidget {
  constructor(container) {
    this.container = container;
    this.input = null;
    this.button = null;
    this.icons = {};
  }

  render() {
    this.container.innerHTML = `
      <div class="card-widget">
        <div class="card-icons">
          ${CARD_TYPES.map((type) => `
            <div class="card-icon card-icon--${type}" data-type="${type}" title="${type}"></div>
          `).join('')}
        </div>
        <div class="card-input-row">
          <input
            class="card-input"
            type="text"
            placeholder="Введите номер карты"
            maxlength="19"
            autocomplete="cc-number"
          />
          <button class="card-btn">Click to Validate</button>
        </div>
        <div class="card-result"></div>
      </div>
    `;

    this.input = this.container.querySelector('.card-input');
    this.button = this.container.querySelector('.card-btn');
    this.result = this.container.querySelector('.card-result');

    CARD_TYPES.forEach((type) => {
      this.icons[type] = this.container.querySelector(`[data-type="${type}"]`);
    });

    this.input.addEventListener('input', () => this.onInput());
    this.button.addEventListener('click', () => this.onValidate());
  }

  onInput() {
    const type = detectCardType(this.input.value);
    this.highlightIcon(type);
    this.result.textContent = '';
    this.result.className = 'card-result';
  }

  onValidate() {
    const { value } = this.input;
    const isValid = luhnCheck(value);
    const type = detectCardType(value);

    this.highlightIcon(type);
    this.result.className = `card-result card-result--${isValid ? 'valid' : 'invalid'}`;
    this.result.textContent = isValid
      ? `✓ Карта действительна${type ? ` (${type.toUpperCase()})` : ''}`
      : '✗ Номер карты недействителен';
  }

  highlightIcon(activeType) {
    CARD_TYPES.forEach((type) => {
      const icon = this.icons[type];
      if (activeType === type) {
        icon.classList.add('card-icon--active');
        icon.classList.remove('card-icon--inactive');
      } else {
        icon.classList.add('card-icon--inactive');
        icon.classList.remove('card-icon--active');
      }
    });

    if (!activeType) {
      CARD_TYPES.forEach((type) => {
        this.icons[type].classList.remove('card-icon--active', 'card-icon--inactive');
      });
    }
  }
}
