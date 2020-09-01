/**
 * Imports
 */
import globalConstants from './constants.js';


/**
 * Global variables
 */
const trendingImages = document.querySelector('.main__trending--container-images');
const { BASE_URL, API_KEY } = globalConstants;
const trendingURL = `${BASE_URL}trending${API_KEY}&limit=3&rating=g`;

/**
 * @method gifosRequest
 * @description performs the request to the API and turn everything into JSON
 * @param {}
 * @returns {Promise}
 */
const gifosRequest = () => {
    fetch(trendingURL)
    .then(response => response.json())
    .then(response => {
        console.log(response.data);
        gifoInfo(response.data);
    })
    .catch(error => console.log(error));
};

window.onload = gifosRequest;
 

/**
 * @method gifoInfo
 * @description Iterates over the response array and access all the needed info
 * @param {array} gifos This is the response array from the API request
 * @returns {string} HTMLElement 
 */
const gifoInfo = ((gifos) => {
    gifos.forEach((gifo => {
        //console.log(gifo.images.fixed_height.url)
        return trendingImages.innerHTML += cardMarkup(gifo.images.fixed_height.url, gifo.title, gifo.username);
    }));
});


/**
 * @method cardMarkup
 * @description Gifo´s card markup 
 * @param {string} url gifo image url
 * @param {string} user gifo image username
 * @param {string} title gifo image title
 * @returns {string} HTML markup 
 */
const cardMarkup = (url, user, title) => {
    return (
        `<div class="image-container">
            <img class="trending-image" src="${url}" alt="imagen gifos">
            <div class="trending-image-hover">
                <div class="hover-container"><button class="icon-hover icon-icon-fav-hover"></button></div>
                <div class="hover-container"><button class="icon-hover icon-icon-download"></button></div>
                <div class="hover-container"><button class="icon-hover icon-icon-max"></button></div> 
            </div>
            <p class="trending-user">${user}</p>
            <h4 class="trending-title">${title}</h4>
        </div>`
    );
};
