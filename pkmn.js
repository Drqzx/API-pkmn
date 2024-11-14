document.addEventListener('DOMContentLoaded', function () {
    // Appel à l'API pour récupérer les Pokémon de la première génération
    fetch('https://tyradex.vercel.app/api/v1/gen/1')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received:', data); // Affiche la structure des données dans la console
        
        const pokemonList = document.getElementById('pokemon-list');
        
        // Vérifier que les données sont valides
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('Invalid data format or empty data');
        }

        // Créer le contenu HTML pour afficher la liste des Pokémon
        let html = '';
        data.forEach(pokemon => {
          // Vérifier le nom du Pokémon
          const pokemonName = pokemon.name && typeof pokemon.name === 'object' ? pokemon.name.fr : pokemon.name;
          
          // Ajouter les éléments à la liste
          html += `
            <li>
              <div class="pokemon-name">${pokemonName || 'Nom indisponible'}</div>
              <img class="pokemon-image" src="${pokemon.sprites.regular || 'image_placeholder.png'}" alt="${pokemonName || 'Nom indisponible'}">
              <div class="pokemon-types">
                ${pokemon.types ? pokemon.types.map(typeInfo => `<div class="pokemon-type ${typeInfo.name.toLowerCase()}">${typeInfo.name}</div>`).join('') : '<div class="pokemon-type">Types indisponibles</div>'}
              </div>
            </li>
          `;
        });

        // Insérer le contenu HTML dans la page
        pokemonList.innerHTML = html;
      })
      .catch(error => {
        // Gérer les erreurs de requête ou de données
        console.error('Une erreur s\'est produite lors de la récupération des données:', error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Une erreur s\'est produite lors de la récupération des données.';
        document.body.appendChild(errorMessage);
      });
});
