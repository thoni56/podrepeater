// Tabbed content
const tabs = document.querySelectorAll(".tabs li");
const tabContentBoxes = document.querySelectorAll("#tab-content > div");

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        tabs.forEach((item) => item.classList.remove("is-active"));
        tab.classList.add("is-active");

        const target = tab.dataset.target;
        tabContentBoxes.forEach((box) => {
            if (box.getAttribute("id") === target) {
                box.classList.remove("is-hidden");
            } else {
                box.classList.add("is-hidden");
            }
        });
    });
});

// Search
const searchMatches = document.querySelector("#search-matches");
const loadMore = document.querySelector("#load-more");
let batch = 0;
let searchTerm = "";

function parseRss(url) {
    fetch(url)
        .then((response) => response.text())
        .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
        .then((data) => console.log(data));
}

function clearSearches() {
    batch = 0;
    while (searchMatches.firstChild) {
        searchMatches.firstChild.remove();
    }
}

function handleLoadMore(data) {
    fetchMore(data.next).then((data) => populate(data));
}

function populate(data) {
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
            parseRss(match.feedUrl);
        });
    });

    if (matches.length === 50) {
        loadMore.classList.remove("is-hidden");
        loadMore.addEventListener("click", handleLoadMore);
    } else {
        loadMore.removeEventListener("click", handleLoadMore);
        loadMore.classList.add("is-hidden");
    }
}
const urlBase = "https://itunes.apple.com/";
const urlQuery = "search?media=podcast&term=";

async function fetchMore(next) {
    const response = await fetch(urlBase + next);
    return response.json();
}

async function fetchPodcasts(term) {
    const response = await fetch(urlBase + urlQuery + term);
    return response.json();
}

function doSearch() {
    searchTerm = encodeURIComponent(searchField.value);
    fetchPodcasts(searchTerm).then((data) => {
        clearSearches();
        populate(data);
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
