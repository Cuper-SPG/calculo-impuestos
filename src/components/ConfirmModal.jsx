import Modal from './Modal';
export default function ConfirmModal({ title, text, onAccept, onCancel }) {
  return (
    <Modal title={title} onClose={onCancel}>
      <p className="note">{text}</p>
      <div className="btn-row btn-row--end">
        <button className="btn" onClick={onCancel}>Cancelar</button>
        <button className="btn btn--primary" onClick={onAccept}>Eliminar</button>
      </div>
    </Modal>
  );
}
