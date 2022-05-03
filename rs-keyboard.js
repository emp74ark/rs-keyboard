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
const rsKeyboard = {
    parts: {
        wrapper: null,
        board: null,
        // layout: 'layout_en',
        keys: []
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

    createKeys(){
        const layout_en = ['1','2','3','4','5','6','7','8','9','0','-','=','&nlarr;',
                    'q','w','e','r','t','y','u','i','o','p',
                    'a','s','d','f','g','h','j','k','l','&crarr;',
                    '&mapstoup;','z','x','c','v','b','n','m', ',', '.', '?','&uarr;',
                    'ctrl','cmd','alt','&harr;','&larr;','&darr;','&rarr;'];
        const layout_ru = ['ё','1','2','3','4','5','6','7','8','9','0','-','=','backspace',
                    'й','ц','к','к','е','н','г','ш','щ','з','х','ъ',
                    'ф','ы','в','а','п','р','о','л','д','ж','э','enter',
                    'shift','я','ч','с','м','и','т','ь','б','ю','up',
                    'ctrl','meta','alt','space','left','down','right'];

        const rowBreakKeys = ['&nlarr;', 'p', '&crarr;', '&uarr;']
        const douleWidth = ['&nlarr;', '&crarr;', '&mapstoup;']
        
        const keys__dom = document.createDocumentFragment();

        let layout = layout_en;
        
        layout.forEach(function(key){
            let keyElement = document.createElement('button');
            keyElement.classList.add('key__button');
            keyElement.innerHTML = key;
            keys__dom.append(keyElement);
            if (rowBreakKeys.includes(key)){
                let breakLine = document.createElement('br');
                keys__dom.append(breakLine);
            }
            if (douleWidth.includes(key)){
                keyElement.classList.add('key__button_double')
            }
            if (key == '&harr;'){
                keyElement.classList.add('key__button_space')
            }
        })

        this.parts.board.append(keys__dom);
    }
}

rsText.createTextarea();
rsKeyboard.createKeyboard();