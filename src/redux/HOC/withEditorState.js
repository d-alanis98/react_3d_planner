import React from 'react';
import { connect } from 'react-redux';
//Redux
import { setEditorTypeAction, setEditorWidthAction, setEditorHeightAction } from '../reducers/editorDuck';

const withEditorState = WrappedComponent => {
    const WithEditorState = props => {
        let {
            editor,
            setEditorTypeAction, 
            setEditorWidthAction, 
            setEditorHeightAction,
            ...ownProps
        } = props;

        return <WrappedComponent 
            editorState = { editor }
            setEditorType = { setEditorTypeAction }
            setEditorWidth = { setEditorWidthAction }
            setEditorHeight = { setEditorHeightAction }
            { ...ownProps }
        />
    }

    const mapStateToProps = (state, ownProps) => {
        return {
            editor: state.editor,
            ...ownProps,
        }
    }

    let WithState = connect(
        mapStateToProps, 
        { 
            setEditorTypeAction, 
            setEditorWidthAction, 
            setEditorHeightAction 
        }
    )(WithEditorState);

    return WithState;
}

export default withEditorState;