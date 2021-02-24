// Tabbed content
const tabs = document.querySelectorAll(".tabs li");
const tabContentBoxes = document.querySelectorAll("#tab-content > div");

function activateTab(id) {
    tabs.forEach((tab) => {
        if (tab.dataset.target === id) tab.classList.add("is-active");
        else tab.classList.remove("is-active");
    });
    tabContentBoxes.forEach((box) => {
        if (box.getAttribute("id") === id) box.classList.remove("is-hidden");
        else box.classList.add("is-hidden");
    });
}

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        activateTab(tab.dataset.target);
    });
});

function switchToEpisodes() {
    activateTab("episodes");
}

// List Episodes
const episodesList = document.querySelector("#episodes");

function populateEpisodes(items) {
    items.forEach((item) => {
        let cardElement = document.createElement("div");
        cardElement.className = "list-item tags";
        cardElement.innerHTML = `<span class='tag is-white'><i class="fas fa-database"></i></span> 
            <li class="title">${item.title}</li>`;
        episodesList.appendChild(cardElement);
    });
    if (items.length > 0) {
        switchToEpisodes();
    }
}

function parseRss(data) {
    console.log(data);
    const items = data.querySelectorAll("item");
    populateEpisodes(items);
}

function fetchRss(url) {
    fetch(url)
        .then((response) => response.text())
        .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
        .then((data) => parseRss(data));
}

// Search for Podcasts
const searchMatches = document.querySelector("#search-matches");

function clearSearches() {
    batch = 0;
    while (searchMatches.firstChild) {
        searchMatches.firstChild.remove();
    }
}

function populatePodcasts(data) {
    const matches = data.results;

    matches.forEach((match) => {
        let cardElement = document.createElement("div");
        cardElement.className = "card is-horizontal";
        cardElement.innerHTML = `<div class="card-image"><figure class="image is-square"><img src="
                ${match.artworkUrl100}
                "></figure></div>
                <div class="card-stacked"><div class="card-content"><div class="media-content"><p class="title is-4">
                ${match.collectionName}
                </p><p class="subtitle is-6">
                ${match.artistName}
                </p></div><div class="content"><p><span class="is-italic px-2">
                ${match.primaryGenreName}
                </span><span>
                ${"(" + match.trackCount + " episodes)"}
                </span><a href="${match.feedUrl}">
                ${match.feedUrl}
                </a></p></div></div></div>`;
        searchMatches.appendChild(cardElement);
        cardElement.addEventListener("click", () => {
            fetchRss(match.feedUrl);
        });
    });
}
const url = "https://itunes.apple.com/search?media=podcast&term=";

async function fetchMore(next) {
    const response = await fetch(url + next);
    return response.json();
}

async function fetchPodcasts(term) {
    const response = await fetch(url + term);
    return response.json();
}

function doSearch() {
    searchTerm = encodeURIComponent(searchField.value);
    fetchPodcasts(searchTerm).then((data) => {
        clearSearches();
        populatePodcasts(data);
    });
}

// Set up search button
const searchField = document.getElementById("search-field");
const searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", () => {
    doSearch();
});
searchField.addEventListener("keyup", (e) => {
    if (e.key === "Enter") doSearch();
});
