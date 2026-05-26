import './style.css';
import CardWidget from './CardWidget';

const container = document.getElementById('app');
if (!container) throw new Error('Element #app not found');

const widget = new CardWidget(container);
widget.render();
