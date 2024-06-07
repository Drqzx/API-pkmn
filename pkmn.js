fetch('https://tyradex.tech/api/v1/gen/1')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log('Data received:', data); // Affiche la structure des données dans la console
    const pokemonList = document.getElementById('pokemon-list');
    
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Invalid data format or empty data');
    }

    let html = '';
    data.forEach(pokemon => {
      const pokemonName = pokemon.name && typeof pokemon.name === 'object' ? pokemon.name.fr : pokemon.name;
      html += `
        <li>
          <h2>${pokemonName || 'Nom indisponible'}</h2>
          <img src="${pokemon.sprites.regular || 'image_placeholder.png'}" alt="${pokemonName || 'Nom indisponible'}">
          <p>${pokemon.types ? pokemon.types.map(typeInfo => typeInfo.name).join(', ') : 'Types indisponibles'}</p>
        </li>
      `;
    });
    pokemonList.innerHTML = html;
  })
  .catch(error => {
    console.error('Une erreur s\'est produite lors de la récupération des données:', error);
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Une erreur s\'est produite lors de la récupération des données.';
    document.body.appendChild(errorMessage);
  });

  