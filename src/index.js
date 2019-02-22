
//-------------------------------------------------//
// Event Listener
//-------------------------------------------------//

document.addEventListener('DOMContentLoaded', () => {
  event.preventDefault();

  const pkmnSearch = document.querySelector('#pokemon-search-form')
  pkmnSearch.addEventListener('input', handlePkmnSearch)

  const pkmnContainer = document.querySelector('#pokemon-container')
  pkmnContainer.addEventListener('mouseover', mouseOver)
  pkmnContainer.addEventListener('mouseout', mouseOut)

})



//-------------------------------------------------//
// Handle Event Listener Function
//-------------------------------------------------//
function handlePkmnSearch(event) {
  event.preventDefault();
  const pkmnInput = event.target.value

  fetch('http://localhost:3000/pokemon').then(function(response){
    return response.json();
  }).then(function(pokemon){
    const pkmnContainer = document.querySelector('#pokemon-container')
    pkmnContainer.innerHTML= ""
    for (var i = 0; i < pokemon.length; i++) {
      if (pokemon[i]['name'].includes(pkmnInput)){
        renderSinglePokemon(pokemon[i])
      }
    }
  })
}

function mouseOver(event) {
  fetch('http://localhost:3000/pokemon').then(function(response){
    return response.json();
  }).then(function(pokemon){
    for (var i = 0; i < pokemon.length; i++) {
      if (pokemon[i]['name'] === event.target.innerText){
        console.log(pokemon[i])
        event.target.querySelector('img').src = pokemon[i].sprites.back
      }
    }
  })
}

function mouseOut(event) {
  fetch('http://localhost:3000/pokemon').then(function(response){
    return response.json();
  }).then(function(pokemon){
    for (var i = 0; i < pokemon.length; i++) {
      if (pokemon[i]['name'] === event.target.innerText){
        console.log(pokemon[i])
        event.target.querySelector('img').src = pokemon[i].sprites.front
      }
    }
  })
}

//-------------------------------------------------//
// Helper Methods
//-------------------------------------------------//

function renderAllPokemon(pokemonArray) {
  return pokemonArray.map(renderSinglePokemon)
}

function renderSinglePokemon(pokemon) {
  const pkmnContainer = document.querySelector('#pokemon-container')
  const pkmnCard = document.createElement('div')
  pkmnCard.classList.add('pokemon-card')
  const pkmnFrame = document.createElement('div')
  pkmnFrame.classList.add('pokemon-frame')
  const pkmnH1 = document.createElement('h1')
  pkmnH1.classList.add('center-text')
  pkmnH1.innerText = `${pokemon.name}`
  const pkmnImgDiv = document.createElement('div')
  pkmnImgDiv.classList.add('pokemon-image')

  const pkmnImg = document.createElement('img')
  pkmnImg.setAttribute("data-id", `${pokemon.id}`)
  pkmnImg.setAttribute("data-action", "flip")
  pkmnImg.setAttribute("src", `${pokemon.sprites.front}`)
  pkmnImg.classList.add("toggle-sprite")

  pkmnImg.addEventListener('mouseover', mouseOver)
  pkmnImg.addEventListener('mouseout', mouseOut)

  pkmnImgDiv.append(pkmnImg)
  pkmnFrame.append(pkmnH1,pkmnImgDiv)
  pkmnCard.append(pkmnFrame)
  pkmnContainer.append(pkmnCard)
}
