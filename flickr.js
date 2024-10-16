// these will be defined in config.js
const mykey = myconfig.MY_KEY;
const secretkey = myconfig.MY_SECRET;

// number of photos to retrieve
const numberOfPhotos = 200; 

// add function to the button
document.getElementById('searchBtn').addEventListener('click', searchPhotos, false);

// get the photos container element
const photosContainer = document.getElementById('photos');
// add event handler for all the photos
photosContainer.addEventListener('click', showPhoto, false);

function showPhoto(event) {

    // do nothing if the click was in the container element
    if (event.currentTarget === event.target) return;

    // get the url that is encoded at a data attribute
    const fullPhotoUrl = event.target.getAttribute('data-fullPhotoUrl');

    // Remove existing full-photo div if it exists
    const existingFullPhotoDiv = document.querySelector('.full-photo');
    if (existingFullPhotoDiv) {
        existingFullPhotoDiv.remove();
    }

    // Create a new full-photo div with the full photo and add it to the body of the document
    const fullPhotoDiv = document.createElement('div');
    fullPhotoDiv.className = 'full-photo';
    fullPhotoDiv.style.backgroundImage = `url(${fullPhotoUrl})`;
    fullPhotoDiv.style.display = 'none';
    document.body.appendChild(fullPhotoDiv);
    fullPhotoDiv.style.display = 'block';

    // Add a click event listener to the full-photo div to remove it when clicked on
    fullPhotoDiv.addEventListener('click', () => {
        fullPhotoDiv.remove()
    });
}

function searchPhotos() {
    const query = document.getElementById('searchInput').value;
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${mykey}&text=${query}&format=json&nojsoncallback=1&per_page=${numberOfPhotos}`;

    // Fetch the data from Flickr API and display the photos
    fetch(url)
        .then(response => response.json())
        .then(data => displayPhotos(data.photos.photo))
        .catch(error => console.error('Error fetching data:', error));
    }

    // Display the fetched photos on the page
    function displayPhotos(photos) {
        const photosContainer = document.getElementById('photos');
        photosContainer.innerHTML = ''; // Clear previous photos

        // Create a new div for each photo and add it to the photos container
        photos.forEach(photo => {
            const bgPhotoUrl   = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`;
            const fullPhotoUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;

            const photoDiv = document.createElement('div');
            photoDiv.className = 'photo';

            // store the full-sized photo url in the data attribute
            photoDiv.setAttribute("data-fullPhotoUrl", fullPhotoUrl); 

            // Set the background image of the photo div to the thumbnail url
            photoDiv.style.backgroundImage = `url(${bgPhotoUrl})`;
            photosContainer.appendChild(photoDiv);
        });
    }