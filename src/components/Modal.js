import React from 'react';

const Modal = ({ isOpen, onClose, personne }) => {
  if (!isOpen || !personne) return null;

  const handleBackdropClick = (e) => {
    // Ferme la modal si on clique sur l'arrière-plan
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-contenu">
        {/* Bouton fermer */}
        <button className="modal-fermer" onClick={onClose}>
          ×
        </button>
        
        {/* Contenu de la modal */}
        <div className="modal-header">
          <h2>{personne.nom}</h2>
        </div>
        
        <div className="modal-body">
          <div className="info-ligne">
            <span className="info-label">Poste :</span>
            <span className="info-valeur">{personne.poste}</span>
          </div>
          
          <div className="info-ligne">
            <span className="info-label">Département :</span>
            <span className="info-valeur">{personne.departement}</span>
          </div>
          
          <div className="info-ligne">
            <span className="info-label">Email :</span>
            <span className="info-valeur">
              <a href={`mailto:${personne.email}`}>{personne.email}</a>
            </span>
          </div>
          
          {personne.manager && (
            <div className="info-ligne">
              <span className="info-label">Manager :</span>
              <span className="info-valeur">{personne.manager}</span>
            </div>
          )}
          
          <div className="info-ligne">
            <span className="info-label">ID :</span>
            <span className="info-valeur">{personne.id}</span>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="btn-fermer" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;