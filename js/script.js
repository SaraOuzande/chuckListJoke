
const apiUrl = 'https://api.chucknorris.io/jokes/random';
const fetchJokeBtn = document.getElementById('fetchJokeBtn');
const jokesList = document.getElementById('jokesList');
const clearAllBtn = document.getElementById('clearAllBtn');

// Cargar chistes almacenados al cargar la página
document.addEventListener('DOMContentLoaded', loadJokesFromLocalStorage);

// Manejador del botón "Obtener Chiste"
fetchJokeBtn.addEventListener('click', fetchJoke);

// Manejador del botón "Eliminar Todos"
clearAllBtn.addEventListener('click', clearAllJokes);

// Función para obtener un chiste desde la API
async function fetchJoke() {
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {  // Verifica si la respuesta fue exitosa
      throw new Error('Error en la respuesta de la API');
    }

    const data = await response.json();
    const joke = data.value;
    addJokeToDOM(joke);
    saveJokeToLocalStorage(joke);
  } catch (error) {
    console.error('Error al obtener el chiste:', error);
    alert('No se pudo obtener el chiste. Inténtalo de nuevo más tarde.');
  }
}

// Función para agregar un chiste al DOM
function addJokeToDOM(joke) {
  const li = document.createElement('li');
  li.textContent = joke;

  // Botón de eliminar para cada chiste
  const deleteBtn = document.createElement('span');
  deleteBtn.textContent = ' ❌';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', () => {
    li.remove();
    removeJokeFromLocalStorage(joke);
  });

  li.appendChild(deleteBtn);
  jokesList.appendChild(li);
}

// Función para guardar un chiste en localStorage
function saveJokeToLocalStorage(joke) {
  const jokes = JSON.parse(localStorage.getItem('chuckJokes')) || [];
  jokes.push(joke);
  localStorage.setItem('chuckJokes', JSON.stringify(jokes));
}

// Función para cargar chistes desde localStorage
function loadJokesFromLocalStorage() {
  const jokes = JSON.parse(localStorage.getItem('chuckJokes')) || [];
  jokes.forEach(joke => addJokeToDOM(joke));
}

// Función para eliminar un chiste del localStorage
function removeJokeFromLocalStorage(jokeToRemove) {
  let jokes = JSON.parse(localStorage.getItem('chuckJokes')) || [];
  jokes = jokes.filter(joke => joke !== jokeToRemove);
  localStorage.setItem('chuckJokes', JSON.stringify(jokes));
}

// Función para eliminar todos los chistes
function clearAllJokes() {
  jokesList.innerHTML = '';
  localStorage.removeItem('chuckJokes');
}
