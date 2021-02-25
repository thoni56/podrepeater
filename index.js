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

function getPubDate(item) {
    const pubDate = new Date(item.datePublished * 1000);
    const formattedDate =
        pubDate.getFullYear() +
        "-" +
        (pubDate.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        pubDate.getDate().toString().padStart(2, "0");
    return formattedDate;
}

function getMetaData(item) {
    const title = item.title;
    const image = item.image;
    const description = item.description;
    const season = item.season;
    let episode = item.episode;
    const episodeType = item.episodeType;
    if (episodeType != "full") episode = episodeType;
    return { title, image, description, season, episode };
}

function populateEpisodes(data) {
    const items = data.items;
    items.reverse();
    items.forEach((item) => {
        const { title, image, description, season, episode } = getMetaData(
            item
        );
        const publicationDate = getPubDate(item);
        const listElement = document.createElement("div");
        listElement.className = "card is-horizontal";
        const episodeString = episode
            ? season
                ? "Season " + season + " Episode " + episode
                : "Episode " + episode
            : "";
        listElement.innerHTML = `<div class="card-image"><figure class="image is-square"><img src="
            ${image}
            "></figure></div>
            <div class="card-stacked"><div class="card-content"><p class="title is-size-5">
            ${title}
            </p><p class="subtitle is-size-6" style="margin-bottom:0.25rem">
            ${description.substring(0, 100) + "..."}
            </p><p><span class="is-italic is-size-6" style="float: left">
            ${episodeString}
            </span><span style="float:right">
            ${publicationDate}
            </span></p></div></div>
            <div class="button is-light" data-podcastid=
            "${42}"
            ><span class="icon has-text-success is-large"><i class="fas fa-2x fa-plus"></i></span></div>`;
        episodesList.appendChild(listElement);
        const button = listElement.getElementsByClassName("button")[0];
        button.addEventListener("click", () => {
            console.log(item.getElementsByTagName("guid")[0].innerHTML);
        });
    });
    if (items.length > 0) {
        switchToEpisodes();
    }
}

const episodesUrl =
    "https://api.podcastindex.org/api/1.0/episodes/byfeedid?id=";

async function fetchEpisodes(id) {
    clearEpisodes();
    fetch(episodesUrl + id, {
        method: "get",
        headers: createHeaders(),
    })
        .then((response) => response.json())
        .then((data) => populateEpisodes(data));
}
// Search and list Podcasts
const podcastList = document.querySelector("#podcast-list");

function clearSearches() {
    while (podcastList.firstChild) {
        podcastList.firstChild.remove();
    }
}

function populatePodcasts(data) {
    const matches = data.feeds;

    matches.forEach((match) => {
        let cardElement = document.createElement("div");
        cardElement.className = "card is-horizontal";
        cardElement.innerHTML = `<div class="card-image"><figure class="image is-square"><img src="
                ${match.artwork}
                "></figure></div>
                <div class="card-stacked"><div class="card-content"><p class="title is-size-4">
                ${match.title}
                </p><p class="subtitle is-size-6">
                ${match.description.substring(0, 110) + "..."}
                </p><div><p><span class="is-italic px-2">
                ${
                    match.categories
                        ? match.categories[Object.keys(match.categories)[0]]
                        : ""
                } (<a href="${episodesUrl}${match.id}">${match.id}</a>)
                </span></p></div></div></div>`;
        podcastList.appendChild(cardElement);
        cardElement.addEventListener("click", (event) => {
            podcastList.childNodes.forEach((p) => p.classList.remove("box"));
            event.target.closest(".card").classList.add("box");
            fetchEpisodes(match.id);
        });
    });
}
const searchUrl = "https://api.podcastindex.org/api/1.0/search/byterm?q=";

function createHeaders() {
    // From Podcast Index API example
    let apiKey = env.PODCASTINDEX_KEY;
    let apiSecret = env.PODCASTINDEX_SECRET;
    // ======== Hash them to get the Authorization token ========
    let apiHeaderTime = Math.floor(Date.now() / 1000);
    const data2Hash = apiKey + apiSecret + apiHeaderTime;
    const sha = sha1(data2Hash).toString();
    return {
        // not needed right now, maybe in future:  "Content-Type": "application/json",
        "X-Auth-Date": apiHeaderTime.toString(),
        "X-Auth-Key": apiKey,
        Authorization: sha,
        "User-Agent": "PodRepeater/0.0",
    };
}

async function fetchPodcasts(term) {
    const response = await fetch(searchUrl + term, {
        method: "get",
        headers: createHeaders(),
    });
    return response.json();
}

function doSearch() {
    const searchTerm = encodeURIComponent(searchField.value).replace(" ", "+");
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

// The Playlist (there can only be one... for now)
const playlist = [];
