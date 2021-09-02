import React from 'react';
import './ResultsModal.css';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const ResultsModal = (  { 
    modalIsOpen, resultsState, setModalIsOpen, handleStick, playerNumber, computerScore  }  ) => {

        const handleClose = () => {
            setModalIsOpen(false)
            console.log("resultsState:",resultsState)
            if(resultsState[0] === 'You are bust better luck next time!') {
                handleStick()
            }
        }

        const displayResults = () => {
            const finalResults = resultsState.map(result => {
                return <p>{result}</p>
            })
            return finalResults
        }

        const displayModalTitle = () => {
            if(resultsState[0] === 'You are bust better luck next time!') {
                return <p>Player { Math.floor(playerNumber)}</p>
            } else {
                return <p><u>Results</u></p>
            }
        }

    return(
        <Modal className="modal" overlayClassName="overlay" isOpen={modalIsOpen} appElement={document.getElementById('root')}>
            {displayModalTitle()}
        {/* <p><u>Results</u></p> */}
        {/* {resultsState} */}
        {displayResults()}
        <button onClick={() => handleClose() }>Close</button>
        </Modal>
    )
}

export default ResultsModal;
