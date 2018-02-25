import { renderComponent, expect } from '../test_helper';
import CommentBox from '../../src/components/comment_box';

describe('CommentBox', () => {
    let component;
    
    beforeEach(() => {
        component = renderComponent(CommentBox);
    });
    
    it('has the correct class', () => { 
        // const component = renderComponent(CommentBox);
        expect(component).to.have.class('comment-box');
    });
    
    it('has a text area', () => {
        // const component = renderComponent(CommentBox);
        expect(component.find('textarea')).to.exist;
    });
    
    it('has a button', () => {
        //const component = renderComponent(CommentBox);
        expect(component.find('button')).to.exist;
    });

    describe('entering some text', () => {
        beforeEach(() => {
            component.find('textarea').simulate('change', 'new comment');
        });

        it('shows that text in textarea', () => {
            expect(component.find('textarea')).to.have.value('new comment');
        });

        it('when submitted, clears the input', () => {
            // console.log(component) - component is a form -top level element
            component.simulate('submit');
            expect(component.find('textarea')).to.have.value('');
        });
    })
});