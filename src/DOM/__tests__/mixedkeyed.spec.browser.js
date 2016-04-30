import { render } from './../rendering';
import { createBlueprint } from './../../core/createBlueprint';

const Inferno = {
    createBlueprint
};

const spanNonKeyedBluePrint = createBlueprint({
    tag: 'span',
    className: 'TableCell',
    children: {arg: 0}
});

const spanWithKeyBluePrint = createBlueprint({
    tag: 'span',
    className: 'TableCell',
    key: {arg: 0},
    children: {arg: 1}
});

function spanTagWithText(text) {
    return spanNonKeyedBluePrint(text);
}

function spanTagWithKeyAndText(key, text) {
    return spanWithKeyBluePrint(key, text);
}

let template = function(child) {
    return {
        tag: 'div',
        children: child
    };
};

describe('Mixed of Keyed/Non-Keyed nodes', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
    });

    afterEach(() => {
        container.innerHTML = '';
    });

    it('should remove two keyed nodes, and move a non-key child node', () => {
        render(template([spanTagWithKeyAndText('d', 'b'), spanTagWithText('c')]), container);
        expect(container.textContent).to.equal('bc');
        expect(container.firstChild.childNodes.length).to.equal(2);
        render(template([spanTagWithKeyAndText('a', 'a'), spanTagWithKeyAndText('b', 'b'), spanTagWithKeyAndText('e', 'c'), spanTagWithText('c')]), container);
        expect(container.textContent).to.equal('abcc');
        expect(container.firstChild.childNodes.length).to.equal(4);
        render(template([spanTagWithKeyAndText('d', 'b'), spanTagWithText('c')]), container);
        expect(container.textContent).to.equal('bc');
        expect(container.firstChild.childNodes.length).to.equal(2);
        render(template([spanTagWithKeyAndText('a', 'a'), spanTagWithKeyAndText('b', 'b'), spanTagWithKeyAndText('e', 'c'), spanTagWithText('c')]), container);
        expect(container.textContent).to.equal('abcc');
        expect(container.firstChild.childNodes.length).to.equal(4);
    });

    it('should swap the last child and add three non-key children', () => {
        render(template([spanTagWithKeyAndText('a', 'a'), spanTagWithKeyAndText('b', 'b')]), container);
        expect(container.textContent).to.equal('ab');
        expect(container.firstChild.childNodes.length).to.equal(2);
        render(template([spanTagWithKeyAndText('d', 'b'), spanTagWithText('c'), spanTagWithKeyAndText('e', 'a'), spanTagWithKeyAndText('f', 'c')]), container);
        expect(container.textContent).to.equal('bcac');
        expect(container.firstChild.childNodes.length).to.equal(4);
        render(template([spanTagWithKeyAndText('a', 'a'), spanTagWithKeyAndText('b', 'b')]), container);
        expect(container.textContent).to.equal('ab');
        expect(container.firstChild.childNodes.length).to.equal(2);
    });

    it('should swap, and a keyed child at the end, and add one non-key child', () => {
        render(template([spanTagWithKeyAndText('d', 'b'), spanTagWithKeyAndText('e', 'a'), spanTagWithKeyAndText('f', 'c'), spanTagWithText('c')]), container);
        expect(container.textContent).to.equal('bacc');
        expect(container.firstChild.childNodes.length).to.equal(4);
        render(template([spanTagWithKeyAndText('a', 'a'), spanTagWithKeyAndText('b', 'b')]), container);
        expect(container.textContent).to.equal('ab');
        expect(container.firstChild.childNodes.length).to.equal(2);
        render(template([spanTagWithKeyAndText('d', 'b'), spanTagWithKeyAndText('e', 'a'), spanTagWithKeyAndText('f', 'c'), spanTagWithText('c')]), container);
        expect(container.textContent).to.equal('bacc');
        expect(container.firstChild.childNodes.length).to.equal(4);
        render(template([spanTagWithKeyAndText('a', 'a'), spanTagWithKeyAndText('b', 'b')]), container);
        expect(container.textContent).to.equal('ab');
        expect(container.firstChild.childNodes.length).to.equal(2);
    });

    it('should insert keyed nodes where the last key is a non-keyed node', () => {
        render(template([spanTagWithKeyAndText('a', 'a'), spanTagWithKeyAndText('f', 'b')]), container);
        expect(container.textContent).to.equal('ab');
        expect(container.firstChild.childNodes.length).to.equal(2);
        render(template([spanTagWithKeyAndText('a', 'c'), spanTagWithKeyAndText('e', 'c'), spanTagWithKeyAndText('d', 'b'), spanTagWithKeyAndText('e2', 'b'), spanTagWithText('g')]), container);
        expect(container.textContent).to.equal('ccbbg');
        expect(container.firstChild.childNodes.length).to.equal(5);
        render(template([spanTagWithKeyAndText('a', 'a'), spanTagWithKeyAndText('f', 'b')]), container);
        expect(container.textContent).to.equal('ab');
    });

    it('should remove the first keyed node child, and add two non-key child nodes', () => {
        render(template([spanTagWithKeyAndText('d', 'b'), spanTagWithText('c1'), spanTagWithText('c2'), spanTagWithKeyAndText('f', 'c')]), container);
        expect(container.textContent).to.equal('bc1c2c');
        expect(container.firstChild.childNodes.length).to.equal(4);
        render(template([spanTagWithKeyAndText('a', 'a'), spanTagWithKeyAndText('b', 'b'), spanTagWithKeyAndText('e', 'c')]), container);
        expect(container.textContent).to.equal('abc');
        expect(container.firstChild.childNodes.length).to.equal(3);
        render(template([spanTagWithKeyAndText('d', 'b'), spanTagWithText('c1'), spanTagWithText('c2'), spanTagWithKeyAndText('f', 'c')]), container);
        expect(container.textContent).to.equal('bc1c2c');
        expect(container.firstChild.childNodes.length).to.equal(4);

    });
});