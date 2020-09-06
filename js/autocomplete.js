/**
 * Imports
 */
import globalConstants from './constants.js';


/**
 * Global Variables
 */
const { BASE_URL, API_KEY } = globalConstants;
const activeSearchbar = document.querySelector('.section__searchbar-active');
const searchbar = document.querySelector('.section__searchbar');
const searchbarInput = document.querySelector('.section__searchbar-input');
const activeSearchbarInput= document.querySelector('.section__searchbar-active-input');
const closeButtonSearchbar = document.getElementById('searchbar-active-close-button');

const suggestionsList = document.querySelector('.search-list');

//console.log(suggestions)
/**
 * @method autocompleteSearchRequest 
 * @description perfoms the request to the endpoint to get autocomplete suggestions
 * @param {String} searchWord Value of the search input bar
 * @returns {Promise} 
 */
const autocompleteSearchRequest = (searchWord) => {
    const autocompleteURL = `${BASE_URL}search/tags${API_KEY}&q=${searchWord}&limit=4`;
    fetch(autocompleteURL)
    .then(response => response.json())
    .then(response => {
        console.log(response.data);
        autocompleteSuggestions(response.data)
    })
    .catch(error => console.log(error))
};


/**
 * @method autocompleteSuggestions 
 * @description iterates over all the data from the API request and returns the HTML markup
 * @param {Array} suggestions this is the response.data from the API request of suggestions
 * @returns {String} HTML markup with the name for every suggestion
 */
const autocompleteSuggestions = (suggestions) => {
    suggestions.forEach(suggestion => {
        return suggestionsList.innerHTML += `<i class="icon-icon-search"></i><p class="search-list-options">${suggestion.name}</p>`
    });
};







/**
 * @method changeSearchbarStyle
 * @description changes the class CSS style when enters a word
 * @param {String} word input value or word written
 */
const changeSearchbarStyle = (word) => {
    searchbar.classList.add("hide");
    activeSearchbar.classList.add("show");
    activeSearchbarInput.value = `${word}`;
    activeSearchbarInput.focus();
    suggestionsList.textContent = '';
}


/**
 * @method cleanSearchbar
 * @description cleans the searchbar input when clicking the close button and set styles as initial
 * @param {} 
 */
function cleanSearchbar(){
    searchbar.classList.remove("hide");
    activeSearchbar.classList.remove("show");
    searchbarInput.value = ""; 
    searchbarInput.focus();  
}


/**
 * Listener
 */
searchbarInput.addEventListener('keyup', () => {
    let searchInput = searchbarInput.value;
    changeSearchbarStyle(searchInput);
    autocompleteSearchRequest(searchInput);
    console.log(searchInput);
});

activeSearchbarInput.addEventListener('keyup', () => {
    let activeSearchInput = activeSearchbarInput.value;
    autocompleteSearchRequest(activeSearchInput);
    suggestionsList.innerHTML = '';
    console.log(activeSearchInput);
});

closeButtonSearchbar.addEventListener('click', cleanSearchbar);
