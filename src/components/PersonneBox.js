import React from 'react';

const PersonneBox = ({ personne, onSelect, isSelected }) => {
  const handleClick = () => {
    onSelect(personne);
  };

  return (
    <div 
      className={`personne-box ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      <h3 className="nom">{personne.nom}</h3>
      <p className="poste">{personne.poste}</p>
      <p className="departement">{personne.departement}</p>
    </div>
  );
};

export default PersonneBox;