export const organigrammeData = {
    direction: {
      id: 1,
      nom: "Marie Dupont",
      poste: "Directrice Générale",
      departement: "Direction",
      email: "marie.dupont@entreprise.com"
    },
    managers: [
      {
        id: 2,
        nom: "Pierre Martin",
        poste: "Directeur Technique",
        departement: "IT",
        email: "pierre.martin@entreprise.com"
      },
      {
        id: 3,
        nom: "Sophie Lambert",
        poste: "Directrice RH",
        departement: "Ressources Humaines",
        email: "sophie.lambert@entreprise.com"
      },
      {
        id: 4,
        nom: "Thomas Dubois",
        poste: "Directeur Commercial",
        departement: "Ventes",
        email: "thomas.dubois@entreprise.com"
      }
    ],
    employes: [
      {
        id: 5,
        nom: "Julie Moreau",
        poste: "Développeuse Senior",
        departement: "IT",
        manager: "Pierre Martin",
        email: "julie.moreau@entreprise.com"
      },
      {
        id: 6,
        nom: "Antoine Rousseau",
        poste: "Designer UI/UX",
        departement: "IT",
        manager: "Pierre Martin",
        email: "antoine.rousseau@entreprise.com"
      },
      {
        id: 7,
        nom: "Camille Leroy",
        poste: "Responsable Recrutement",
        departement: "Ressources Humaines",
        manager: "Sophie Lambert",
        email: "camille.leroy@entreprise.com"
      },
      {
        id: 8,
        nom: "Nicolas Bernard",
        poste: "Commercial Senior",
        departement: "Ventes",
        manager: "Thomas Dubois",
        email: "nicolas.bernard@entreprise.com"
      }
    ]
  };