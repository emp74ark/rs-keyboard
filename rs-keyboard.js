const rsText = {
    elements: {
        wrapper: null,
        area: null
    },

    createTextarea(){
        this.elements.wrapper = document.createElement('div');
        this.elements.wrapper.classList.add('text__wrapper');
        this.elements.area = document.createElement('textarea');
        this.elements.area.classList.add('text__input');

        this.elements.wrapper.append(this.elements.area);
        document.body.append(this.elements.wrapper);
    }
}

const layout_en = ['1','2','3','4','5','6','7','8','9','0','-','=','↚',
                    'q','w','e','r','t','y','u','i','o','p','🌎',
                    'a','s','d','f','g','h','j','k','l','↵',
                    '↥','z','x','c','v','b','n','m', ',', '.', '?','↑',
                    'ctrl','cmd','alt','↔','←','↓','→'];
const layout_ru = ['ё','1','2','3','4','5','6','7','8','9','0','-','=','↚',
                    'й','ц','к','к','е','н','г','ш','щ','з','х','ъ','🌎',
                    'ф','ы','в','а','п','р','о','л','д','ж','э','↵',
                    '↥','я','ч','с','м','и','т','ь','б','ю','↑',
                    'ctrl','cmd','alt','↔','←','↓','→'];


let layout = layout_en;
function changeLayout(){
    layout == layout_en ? layout = layout_ru: layout = layout_en;
    document.querySelector('.keyboard_wrapper').remove();
    rsKeyboard.createKeyboard();
} 


let upperCase = false;

const rsKeyboard = {
    parts: {
        wrapper: null,
        board: null
    },

    createKeyboard(){
        this.parts.wrapper = document.createElement('div');
        this.parts.wrapper.classList.add('keyboard_wrapper');
        this.parts.board = document.createElement('div');
        this.parts.board.classList.add('board');

        this.parts.wrapper.append(this.parts.board);
        document.body.append(this.parts.wrapper);

        this.createKeys();
    },
    
    removeKeyboard(){
        this.parts.wrapper.remove()
    },
    
    createKeys(){
        const rowBreakKeys = ['↚', '🌎', '↵', '↑']
        const douleWidth = ['↚', '↵', '↥', '🌎']
        const keys__dom = document.createDocumentFragment();

        layout.forEach(function(key){
            let keyElement = document.createElement('button');
            keyElement.classList.add('key__button');
            keyElement.innerText = key;
            keys__dom.append(keyElement);
            if (rowBreakKeys.includes(key)){
                let breakLine = document.createElement('br');
                keys__dom.append(breakLine);
            }
            if (douleWidth.includes(key)){
                keyElement.classList.add('key__button_double')
            }
            if (key == '↔'){
                keyElement.classList.add('key__button_space')
            }
            keyElement.addEventListener("click", this.keyAction)
        })

        this.parts.board.append(keys__dom);
    }
}

// Input action

// Virtual keys actions

function keyAction(key){
    const specialKeys = ['↚','↵','↥','↑','ctrl','cmd','alt','↔','←','↓','→']
    let currentText = document.querySelector('textarea');
    
    if (specialKeys.includes(this.innerText)){
        if (this.innerText === '↚'){
            currentText.value = currentText.value.replace(/.$/, '')
            // delete only last symbol
        }
        if (this.innerText === '↵'){
            currentText.value += '\n'
            // add new line only after all text
        }
        if (this.innerText === '↥' && upperCase == false){
            upperCase = true
        } else {
            upperCase = false
        }
        if (this.innerText === '↔'){
            currentText.value += ' '
        }
    }
    else if (this.innerText === '🌎'){
        changeLayout();
    } else {
        if (upperCase == true){
            currentText.value += this.innerText.toUpperCase();
        } else {
            currentText.value += this.innerText;
        }
    }
}

// Physical keys actions
document.addEventListener('keydown', (e)=>{
    let currentText = document.querySelector('textarea');
    if (e.ctrlKey && e.shiftKey){
        changeLayout();
    }
    if (e.code === 'Backspace'){
        document.querySelectorAll('.key__button')[layout.indexOf('↚')].classList.toggle('key__button_active');
    }
    if (e.code === 'Enter'){
        document.querySelectorAll('.key__button')[layout.indexOf('↵')].classList.toggle('key__button_active');
    }
    if (e.key === 'Shift'){
        document.querySelectorAll('.key__button')[layout.indexOf('↥')].classList.toggle('key__button_active');
    }
    if (e.code === 'ArrowUp'){
        document.querySelectorAll('.key__button')[layout.indexOf('↑')].classList.toggle('key__button_active');
    }
    if (e.key === 'Control'){
        document.querySelectorAll('.key__button')[layout.indexOf('ctrl')].classList.toggle('key__button_active');
    }
    if (e.key === 'Meta'){
        document.querySelectorAll('.key__button')[layout.indexOf('cmd')].classList.toggle('key__button_active');
    }
    if (e.key === 'Alt'){
        document.querySelectorAll('.key__button')[layout.indexOf('alt')].classList.toggle('key__button_active');
    }
    if (e.code === 'Space'){
        document.querySelectorAll('.key__button')[layout.indexOf('↔')].classList.toggle('key__button_active');
    }
    if (e.code === 'ArrowLeft'){
        document.querySelectorAll('.key__button')[layout.indexOf('←')].classList.toggle('key__button_active');
    }
    if (e.code === 'ArrowDown'){
        document.querySelectorAll('.key__button')[layout.indexOf('↓')].classList.toggle('key__button_active');
    }
    if (e.code === 'ArrowRight'){
        document.querySelectorAll('.key__button')[layout.indexOf('→')].classList.toggle('key__button_active');
    }
    for (let i=0; i<layout.length; i++){
        if (e.key === layout[i]){
            document.querySelectorAll('.key__button')[i].classList.toggle('key__button_active');
            currentText.value += e.key;
        }
    }
})
document.addEventListener('keyup', (e)=>{
    if (e.code === 'Backspace'){
        document.querySelectorAll('.key__button')[layout.indexOf('↚')].classList.toggle('key__button_active');
    }
    if (e.code === 'Enter'){
        document.querySelectorAll('.key__button')[layout.indexOf('↵')].classList.toggle('key__button_active');
    }
    if (e.key === 'Shift'){
        document.querySelectorAll('.key__button')[layout.indexOf('↥')].classList.toggle('key__button_active');
    }
    if (e.code === 'ArrowUp'){
        document.querySelectorAll('.key__button')[layout.indexOf('↑')].classList.toggle('key__button_active');
    }
    if (e.key === 'Control'){
        document.querySelectorAll('.key__button')[layout.indexOf('ctrl')].classList.toggle('key__button_active');
    }
    if (e.key === 'Meta'){
        document.querySelectorAll('.key__button')[layout.indexOf('cmd')].classList.toggle('key__button_active');
    }
    if (e.key === 'Alt'){
        document.querySelectorAll('.key__button')[layout.indexOf('alt')].classList.toggle('key__button_active');
    }
    if (e.code === 'Space'){
        document.querySelectorAll('.key__button')[layout.indexOf('↔')].classList.toggle('key__button_active');
    }
    if (e.code === 'ArrowLeft'){
        document.querySelectorAll('.key__button')[layout.indexOf('←')].classList.toggle('key__button_active');
    }
    if (e.code === 'ArrowDown'){
        document.querySelectorAll('.key__button')[layout.indexOf('↓')].classList.toggle('key__button_active');
    }
    if (e.code === 'ArrowRight'){
        document.querySelectorAll('.key__button')[layout.indexOf('→')].classList.toggle('key__button_active');
    }
    for (let i=0; i<layout.length; i++){
        if (e.key === layout[i]){
            document.querySelectorAll('.key__button')[i].classList.toggle('key__button_active');
            currentText.value += e.key;
        }
    }
})

rsText.createTextarea();
rsKeyboard.createKeyboard();