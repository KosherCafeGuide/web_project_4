class Section {
    constructor({ /*items,*/ renderer }, containerSelector) {
        //this._items = items;
        this._renderer = renderer; //();
        this._container = document.querySelector(containerSelector);
    }
    addItem(element) {
        //project requirements include loose coupling 
        //with index.js and class inheritance being the only connection between classes!
        //so "const card = this._renderer(item)" is not permitted here!
        this._container.prepend(element);
    }
    renderItems(items) {
        items.forEach(item => {
            this._renderer(item);
        })

    }
}
export default Section;