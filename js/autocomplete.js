/**
 * Imports
 */
import globalConstants from './constants.js';


/**
 * Global Variables
 */
const searchBar = document.querySelector('.section__searchbar-input');
const { BASE_URL, API_KEY } = globalConstants;


/**
 * @method autocompleteSearchRequest 
 * @description perfoms the request to the endpoint to get autocomplete suggestions
 * @param {String} searchWord Value of the search input bar
 * @returns {Promise} 
 */
const autocompleteSearchRequest = (searchWord) => {
    const autocompleteURL = `${BASE_URL}search/tags${API_KEY}&q=${searchWord}`;
    fetch(autocompleteURL)
    .then(response => response.json())
    .then(response => console.log(response.data))
    .catch(error => console.log(error))
};


/**
 * Listener
 */
searchBar.addEventListener('keyup', () => {
    let searchInput = document.querySelector('.section__searchbar-input').value;
    //console.log(e);
    console.log(searchInput);
    autocompleteSearchRequest(searchInput);
});

//console.log(searchBar);