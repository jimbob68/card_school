import React from 'react';
import './ResultsModal.css';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const ResultsModal = (  { 
    modalIsOpen, resultsState, setModalIsOpen, handleStick  }  ) => {

        const handleClose = () => {
            setModalIsOpen(false)
            console.log("resultsState:",resultsState)
            if(resultsState === 'You are bust better luck next time!') {
                handleStick()
            }
        }

    return(
        <Modal isOpen={modalIsOpen} appElement={document.getElementById('root')}>
        <p>Results Modal</p>
        {resultsState}
        <button onClick={() => handleClose() }>Close</button>
        </Modal>
    )
}

export default ResultsModal;
