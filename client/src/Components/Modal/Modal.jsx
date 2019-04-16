import React from 'react';
import ReactDOM from 'react-dom';
import Styled from './ModalStyles.js';

const modalRoot = document.getElementById('modal');


class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }
    
    return ReactDOM.createPortal(
      <Styled.BackDropStyle>
          {this.props.children}
      </Styled.BackDropStyle>,
      this.el
      );
    }
  }
  
  export default Modal;
