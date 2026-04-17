import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ResultModal = (props) => {
    const { show, setShow, resultData } = props
    const handleClose = () => { setShow(false) }
    // resetDeleteData();


    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
        >
            <Modal show={show} onHide={handleClose} backdrop='static'>
                <Modal.Header closeButton>
                    <Modal.Title>Result</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div>Total question: <b>{resultData.countTotal}</b></div>
                    <div>Total correct answers: <b>{resultData.countCorrect}</b></div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" >Show answers</Button>
                    <Button variant="primary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

}
export default ResultModal;