/* eslint-disable no-plusplus */
const rsText = {
  elements: {
    wrapper: null,
    area: null,
    layout_shortcut: null,
  },

  createTextarea() {
    this.elements.wrapper = document.createElement('div');
    this.elements.wrapper.classList.add('text__wrapper');
    this.elements.area = document.createElement('textarea');
    this.elements.area.classList.add('text__input');
    this.elements.layout_shortcut = document.createElement('div');
    this.elements.layout_shortcut.classList.add('text__wrapper');
    rsText.elements.layout_shortcut.innerText = 'Press Shift+Ctrl to change layout';

    this.elements.wrapper.append(this.elements.area);
    this.elements.wrapper.append(this.elements.layout_shortcut);
    document.body.append(this.elements.wrapper);
  },
};

const layoutEn = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '↚',
  '↹', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'del', '🌎',
  '⇈', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', '↵',
  '↥', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '↑',
  'ctrl', 'cmd', 'alt', '↔', '←', '↓', '→'];
const layoutRu = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '↚',
  '↹', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'del', '🌎',
  '⇈', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '↵',
  '↥', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '↑',
  'ctrl', 'cmd', 'alt', '↔', '←', '↓', '→'];

const specialKeys = ['↚', '↹', '⇈', '↵', '↥', '↑', 'ctrl', 'cmd', 'alt', '↔', '←', '↓', '→', 'del'];

let layout = layoutEn;

function changeLayout() {
  layout === layoutEn ? layout = layoutRu : layout = layoutEn;
  document.querySelector('.keyboard_wrapper').remove();
  rsKeyboard.createKeyboard();
}

let upperCase = false;

const rsKeyboard = {
  parts: {
    wrapper: null,
    board: null,
    system: null,
  },

  createKeyboard() {
    this.parts.wrapper = document.createElement('div');
    this.parts.wrapper.classList.add('keyboard_wrapper');
    this.parts.board = document.createElement('div');
    this.parts.board.classList.add('board');

    this.parts.system = document.createElement('div');
    this.parts.system.classList.add('signature');
    this.parts.system.innerText = 'Linux, KDE';

    this.parts.wrapper.append(this.parts.board);
    this.parts.wrapper.append(this.parts.system);
    document.body.append(this.parts.wrapper);

    this.createKeys();
  },

  removeKeyboard() {
    this.parts.wrapper.remove();
  },

  createKeys() {
    const rowBreakKeys = ['↚', '🌎', '↵', '↑'];
    const doubleWidth = ['↚', '⇈', '↵', '↥', 'Tab'];
    const keysDom = document.createDocumentFragment();

    layout.forEach((key) => {
      const keyElement = document.createElement('button');
      keyElement.classList.add('key__button');
      keyElement.innerText = key;
      keysDom.append(keyElement);
      if (rowBreakKeys.includes(key)) {
        const breakLine = document.createElement('br');
        keysDom.append(breakLine);
      }
      if (doubleWidth.includes(key)) {
        keyElement.classList.add('key__button_double');
      }
      if (key === '↔') {
        keyElement.classList.add('key__button_space');
      }
      if (key === '↑') {
        keyElement.classList.add('key__button_up');
      }
      if (upperCase === true && key === '⇈') {
        keyElement.classList.add('key__button_active');
      }

      keyElement.addEventListener('click', keyAction);
    });

    function keyAction() {
      const currentText = document.querySelector('textarea');

      if (specialKeys.includes(this.innerText)) {
        if (this.innerText === '↚') {
          currentText.value = currentText.value.replace(/.$/, '');
        }
        if (this.innerText === '↹') {
          currentText.value += '        ';
        }
        if (this.innerText === '⇈') {
          if (upperCase === true) {
            document.querySelectorAll('.key__button')[layout.indexOf('⇈')].classList.toggle('key__button_active');
            upperCase = false;
          } else {
            document.querySelectorAll('.key__button')[layout.indexOf('⇈')].classList.toggle('key__button_active');
            upperCase = true;
          }
        }
        if (this.innerText === '↵') {
          currentText.value += '\n';
        }
        if (this.innerText === '↔') {
          currentText.value += ' ';
        }
      } else if (this.innerText === '🌎') {
        changeLayout();
      } else if (upperCase === true) {
        currentText.value += this.innerText.toUpperCase();
      } else {
        currentText.value += this.innerText;
      }
    }

    this.parts.board.append(keysDom);
  },
  assignHwKeys() {
    document.addEventListener('keydown', (e) => {
      const currentText = rsText.elements.area;
      const keyButton = document.querySelectorAll('.key__button');
      e.preventDefault();

      if (e.ctrlKey && e.shiftKey) {
        changeLayout();
      }

      if (e.code === 'Backspace') {
        keyButton[layout.indexOf('↚')].classList.toggle('key__button_active');
        currentText.value = currentText.value.replace(/.$/, '');
      }
      if (e.code === 'Delete') {
        keyButton[layout.indexOf('del')].classList.toggle('key__button_active');
      }
      if (e.code === 'Tab') {
        keyButton[layout.indexOf('↹')].classList.toggle('key__button_active');
        currentText.value += '        ';
      }
      if (e.code === 'CapsLock') {
        if (upperCase === true) {
          document.querySelectorAll('.key__button')[layout.indexOf('⇈')].classList.remove('key__button_active');
          upperCase = false;
        } else {
          document.querySelectorAll('.key__button')[layout.indexOf('⇈')].classList.add('key__button_active');
          upperCase = true;
        }
      }
      if (e.code === 'Enter') {
        keyButton[layout.indexOf('↵')].classList.toggle('key__button_active');
        currentText.value += '\n';
      }
      if (e.key === 'Shift') {
        keyButton[layout.indexOf('↥')].classList.add('key__button_active');
      }
      if (e.code === 'ArrowUp') {
        keyButton[layout.indexOf('↑')].classList.toggle('key__button_active');
      }
      if (e.key === 'Control') {
        keyButton[layout.indexOf('ctrl')].classList.add('key__button_active');
      }
      if (e.key === 'Meta') {
        keyButton[layout.indexOf('cmd')].classList.toggle('key__button_active');
      }
      if (e.key === 'Alt') {
        keyButton[layout.indexOf('alt')].classList.toggle('key__button_active');
        return;
      }
      if (e.code === 'Space') {
        keyButton[layout.indexOf('↔')].classList.toggle('key__button_active');
        currentText.value += ' ';
      }
      if (e.code === 'ArrowLeft') {
        keyButton[layout.indexOf('←')].classList.toggle('key__button_active');
      }
      if (e.code === 'ArrowDown') {
        keyButton[layout.indexOf('↓')].classList.toggle('key__button_active');
      }
      if (e.code === 'ArrowRight') {
        keyButton[layout.indexOf('→')].classList.toggle('key__button_active');
      } else {
        for (let i = 0; i < layout.length; i++) {
          if (e.key.toLowerCase() === layoutEn[i] || e.key.toLowerCase() === layoutRu[i]) {
            keyButton[i].classList.toggle('key__button_active');
            if (upperCase === true || e.shiftKey === true) {
              currentText.value += layout[i].toLocaleUpperCase();
            } else {
              currentText.value += layout[i];
            }
          }
        }
      }
    });
    document.addEventListener('keyup', (e) => {
      const keyButton = document.querySelectorAll('.key__button');

      if (e.code === 'Backspace') {
        keyButton[layout.indexOf('↚')].classList.toggle('key__button_active');
      }
      if (e.code === 'Delete') {
        keyButton[layout.indexOf('del')].classList.toggle('key__button_active');
      }
      if (e.code === 'Tab') {
        keyButton[layout.indexOf('↹')].classList.toggle('key__button_active');
      }
      if (e.code === 'Enter') {
        keyButton[layout.indexOf('↵')].classList.toggle('key__button_active');
      }
      if (e.key === 'Shift') {
        keyButton[layout.indexOf('↥')].classList.remove('key__button_active');
      }
      if (e.code === 'ArrowUp') {
        keyButton[layout.indexOf('↑')].classList.toggle('key__button_active');
      }
      if (e.key === 'Control') {
        keyButton[layout.indexOf('ctrl')].classList.remove('key__button_active');
      }
      if (e.key === 'Meta') {
        keyButton[layout.indexOf('cmd')].classList.toggle('key__button_active');
      }
      if (e.key === 'Alt') {
        keyButton[layout.indexOf('alt')].classList.toggle('key__button_active');
        return;
      }
      if (e.code === 'Space') {
        keyButton[layout.indexOf('↔')].classList.toggle('key__button_active');
      }
      if (e.code === 'ArrowLeft') {
        keyButton[layout.indexOf('←')].classList.toggle('key__button_active');
      }
      if (e.code === 'ArrowDown') {
        keyButton[layout.indexOf('↓')].classList.toggle('key__button_active');
      }
      if (e.code === 'ArrowRight') {
        keyButton[layout.indexOf('→')].classList.toggle('key__button_active');
      } else {
        for (let i = 0; i < layout.length; i++) {
          if (e.key.toLowerCase() === layoutEn[i] || e.key.toLowerCase() === layoutRu[i]) {
            keyButton[i].classList.toggle('key__button_active');
          }
        }
      }
    });
  },
};

rsText.createTextarea();
rsKeyboard.createKeyboard();
rsKeyboard.assignHwKeys();
