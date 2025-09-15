import React, { useState } from 'react';
import PersonneBox from './PersonneBox';
import Modal from './Modal';
import { organigrammeData } from '../data/organigrammeData';

const Organigramme = () => {
  const [personneSelectionnee, setPersonneSelectionnee] = useState(null);
  const [modalOuverte, setModalOuverte] = useState(false);

  const handlePersonneSelect = (personne) => {
    setPersonneSelectionnee(personne);
    setModalOuverte(true);
  };

  const fermerModal = () => {
    setModalOuverte(false);
    setPersonneSelectionnee(null);
  };

  return (
    <div className="organigramme">
      <h1 className="titre-organigramme">Organigramme de l'Entreprise</h1>
      
      {/* Direction */}
      <div className="niveau-direction">
        <PersonneBox 
          personne={organigrammeData.direction}
          onSelect={handlePersonneSelect}
          isSelected={false}
        />
      </div>

      {/* Ligne de connexion */}
      <div className="ligne-connexion"></div>
      
      {/* Managers */}
      <div className="niveau-managers">
        {organigrammeData.managers.map((manager) => (
          <div key={manager.id} className="branche-manager">
            <PersonneBox 
              personne={manager}
              onSelect={handlePersonneSelect}
              isSelected={false}
            />
            
            {/* Employés sous ce manager */}
            <div className="employes-sous-manager">
              <div className="ligne-verticale"></div>
              <div className="employes-liste">
                {organigrammeData.employes
                  .filter(employe => employe.manager === manager.nom)
                  .map((employe) => (
                    <PersonneBox
                      key={employe.id}
                      personne={employe}
                      onSelect={handlePersonneSelect}
                      isSelected={false}
                    />
                  ))
                }
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal pour les détails */}
      <Modal 
        isOpen={modalOuverte}
        onClose={fermerModal}
        personne={personneSelectionnee}
      />
    </div>
  );
};

export default Organigramme;