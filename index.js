// Handling the tabs
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

// Fetch and List Episodes
const episodesList = document.querySelector("#episode-list");

function clearEpisodes() {
    while (episodesList.firstChild) {
        episodesList.firstChild.remove();
    }
}

function populateEpisodes(data) {
    items = [].slice.call(data);
    items.sort((a, b) => {
        return (
            a.getElementsByTagName("itunes:episode") >
            b.getElementsByTagName("itunes:episode")
        );
    });
    items.forEach((item) => {
        const title = item.getElementsByTagName("title")[0].textContent;
        const image = item
            .getElementsByTagName("itunes:image")[0]
            .getAttribute("href");
        let description = item.getElementsByTagName("itunes:subtitle");
        if (description && description.length > 0)
            description = description[0].textContent;
        let season = item.getElementsByTagName("itunes:season");
        if (season && season.length > 0)
            season = "Season " + season[0].textContent + ":";
        else season = null;
        let episode = item.getElementsByTagName("itunes:episode");
        if (episode && episode.length > 0)
            episode = "Episode " + episode[0].textContent;
        else episode = null;
        const listElement = document.createElement("div");
        listElement.className = "card is-horizontal";
        listElement.innerHTML = `<div class="card-image"><figure class="image is-square"><img src="
            ${image}
            "></figure></div>
            <div class="card-stacked"><div class="card-content"><div class="media-content"><p class="title is-size-5">
            ${title}
            </p><p class="subtitle is-size-6" style="margin-bottom:0.25rem">
            ${description}
            </p><p><span class="is-italic is-size-7">
            ${season}${episode}
            </span></p></div></div></div>`;
        episodesList.appendChild(listElement);
    });
    if (items.length > 0) {
        switchToEpisodes();
    }
}

function parseRss(data) {
    const items = data.getElementsByTagName("item");
    populateEpisodes(items);
}

function fetchRss(url) {
    clearEpisodes();
    fetch(url)
        .then((response) => response.text())
        .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
        .then((data) => parseRss(data));
}

// Search and list Podcasts
const podcastList = document.querySelector("#podcast-list");

function clearSearches() {
    while (podcastList.firstChild) {
        podcastList.firstChild.remove();
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
                <div class="card-stacked"><div class="card-content"><div class="media-content"><p class="title is-size-4">
                ${match.collectionName}
                </p><p class="subtitle is-size-6">
                ${match.artistName}
                </p></div><div><p><span class="is-italic px-2">
                ${match.primaryGenreName}
                </span><span>
                ${"(" + match.trackCount + " episodes)"}
                </span><a href="${match.feedUrl}">
                ${match.feedUrl}
                </a></p></div></div></div>`;
        podcastList.appendChild(cardElement);
        cardElement.addEventListener("click", (event) => {
            podcastList.childNodes.forEach((p) => p.classList.remove("box"));
            event.target.closest(".card").classList.add("box");
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
