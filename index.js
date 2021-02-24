// tabbed content
const tabs = document.querySelectorAll('.tabs li');
const tabContentBoxes = document.querySelectorAll('#tab-content > div');

tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        tabs.forEach(item => item.classList.remove('is-active'))
        tab.classList.add('is-active')

        const target = tab.dataset.target;
        tabContentBoxes.forEach(box => {
            if (box.getAttribute('id') === target) {
                box.classList.remove('is-hidden');
            } else {
                box.classList.add('is-hidden');
            }
        })
    })
});

// Search

function populate(data) {
    const matches = data.results;
    const searchMatches = document.querySelector('#search-matches')

    while (searchMatches.firstChild) {
        searchMatches.firstChild.remove()
    }

    matches.forEach((match) => {
        let listElement = document.createElement('div')
        listElement.className = "card is-horizontal"
        listElement.innerHTML = `<div class="card-image"><figure class="image is-square"><img src="${match.artworkUrl100}"></figure></div>
            <div class="card-stacked"><div class="card-content"><div class="media-content"><p class="title is-4">${match.collectionName}</p>
            <p class="subtitle is-6">${match.artistName}</p></div>
            <div class="content"><p><span class="is-italic">${match.primaryGenreName}</span>
            <span>${'(' + match.trackCount + ' episodes)'}</span></p></div></div></div>`;
        searchMatches.appendChild(listElement);
    })
}
const url = 'https://itunes.apple.com/search?media=podcast&limit=200&term=';

async function fetchPodcasts(term) {
    const response = await fetch(url + term);
    return response.json();
}

const searchField = document.getElementById('search-field');
const searchButton = document.querySelector('#search-button')
searchButton.addEventListener('click', () => { doSearch(); })
searchField.addEventListener('keyup', (e) => { if (e.key === 'Enter') doSearch(); })
function doSearch() {
    const term = searchField.value;
    fetchPodcasts(term).then(data => populate(data));
}


