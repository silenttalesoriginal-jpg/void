/* =========================
   VOID CONTENT
========================= */

const movies = [

    {
        id: 1,
        title: "EKAKI Chapter 1",
        year: 2025,
        type: "Series",
        chapter: "Chapter 1",
        genre: "Horror",
        rating: "IMDb",
        duration: "Chapter 1",

        poster:
            "assets/posters/ekaki-chapter-1.jpg",

        description:
            "The story begins. A strange presence starts to reveal itself.",

        video:
            "https://fembed.co/embed/cKs_RM7jvf-sB",

        downloads: {
            "480p": "",
            "720p": "https://www.mediafire.com/file/uzwfl9bw3zv31eo/ekaki+chapter+1+[720p].mp4/file",
            "1080p": "https://www.mediafire.com/file/bzqxdxc4gk8me36/EKAKI+CHAPTER+1+[1080P].mp4/file"
        }
    },

    {
        id: 2,
        title: "EKAKI Chapter 2",
        year: 2025,
        type: "Series",
        chapter: "Chapter 2",
        genre: "Horror",
        rating: "IMDb",
        duration: "Chapter 2",
        poster:
            "assets/posters/ekaki-chapter-2.jpg",
        description:
            "The mystery deepens and the presence becomes harder to escape.",
        video:
            "https://fembed.co/embed/zl_7v-EMrBI0F",

        downloads: {
            "480p": "",
            "720p": "",
            "1080p": ""
        }    
    },

    {
        id: 3,
        title: "EKAKI Chapter 3",
        year: 2025,
        type: "Series",
        chapter: "Chapter 3",
        genre: "Horror",
        rating: "IMDb",
        duration: "Chapter 3",
        poster:
            "assets/posters/ekaki-chapter-3.jpg",
        description:
            "New clues emerge and the characters discover that the danger is closer than they thought.",
        video: ""
    },

    {
        id: 4,
        title: "EKAKI Chapter 4",
        year: 2025,
        type: "Series",
        chapter: "Chapter 4",
        genre: "Horror",
        rating: "IMDb",
        duration: "Chapter 4",
        poster:
            "assets/posters/ekaki-chapter-4.jpg",
        description:
            "The investigation reaches a dangerous turning point.",
        video: ""
    },

    {
        id: 5,
        title: "EKAKI Chapter 5",
        year: 2025,
        type: "Series",
        chapter: "Chapter 5",
        genre: "Horror",
        rating: "IMDb",
        duration: "Chapter 5",
        poster:
            "assets/posters/ekaki-chapter-5.jpg",
        description:
            "The fifth chapter brings the story closer to its terrifying truth.",
        video: ""
    }

];


/* =========================
   RECOMMENDED / MORE
========================= */

const recommended = [

    movies[0],
    movies[1],
    movies[2],
    movies[3],
    movies[4]

];


const more = [

    movies[4],
    movies[3],
    movies[2],
    movies[1],
    movies[0]

];


/* =========================
   RECENTLY WATCHED
========================= */

let recentlyWatched =
    JSON.parse(
        localStorage.getItem(
            "void_recent"
        )
    ) || [];


/* =========================
   SELECTED MOVIE
========================= */

let selectedMovie = null;


/* =========================
   DOM
========================= */

const searchInput =
    document.getElementById(
        "searchInput"
    );

const homeContent =
    document.getElementById(
        "homeContent"
    );

const searchSection =
    document.getElementById(
        "searchSection"
    );


/* =========================
   CARD
========================= */

function movieCard(movie) {

    return `

        <article
            class="movie-card"
            data-id="${movie.id}"
        >

            <img
                src="${movie.poster}"
                alt="${movie.title}"
                loading="lazy"
            >

            <div class="card-play">
                ▶
            </div>

            <div class="card-info">

                <div class="card-title">
                    ${movie.title}
                </div>

                <div class="card-meta">

                    ${movie.year}
                    •
                    ${movie.chapter}
                    •
                    ${movie.genre}

                </div>

            </div>

        </article>

    `;
}


/* =========================
   RENDER
========================= */

function renderMovies(
    containerId,
    list
) {

    const container =
        document.getElementById(
            containerId
        );


    if (!list.length) {

        container.innerHTML = "";

        return;

    }


    container.innerHTML =
        list
            .map(movieCard)
            .join("");


    container
        .querySelectorAll(
            ".movie-card"
        )
        .forEach(card => {

            card.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            card.dataset.id
                        );

                    const movie =
                        movies.find(
                            m =>
                                m.id === id
                        );

                    if (movie) {

                        openDetails(
                            movie
                        );

                    }

                }
            );

        });

}


/* =========================
   RECENT
========================= */

function renderRecent() {

    const recentMovies =
        recentlyWatched
            .map(id =>
                movies.find(
                    movie =>
                        movie.id === id
                )
            )
            .filter(Boolean);


    renderMovies(
        "recent",
        recentMovies
    );


    document
        .getElementById(
            "recentEmpty"
        )
        .classList.toggle(
            "hidden",
            recentMovies.length !== 0
        );

}


/* =========================
   ADD RECENT
========================= */

function addRecent(id) {

    recentlyWatched =
        recentlyWatched.filter(
            x => x !== id
        );


    recentlyWatched.unshift(id);


    recentlyWatched =
        recentlyWatched.slice(
            0,
            10
        );


    localStorage.setItem(
        "void_recent",
        JSON.stringify(
            recentlyWatched
        )
    );


    renderRecent();

}


/* =========================
   DETAILS
========================= */

function openDetails(movie) {

    selectedMovie = movie;


    document.getElementById(
        "detailPoster"
    ).src = movie.poster;


    document.getElementById(
        "detailTitle"
    ).textContent =
        movie.title;


    document.getElementById(
        "detailMeta"
    ).textContent =
        `${movie.year} • ${movie.type} • ${movie.chapter} • ${movie.genre}`;


    document.getElementById(
        "detailDescription"
    ).textContent =
        movie.description;


    document.getElementById(
        "movieModal"
    ).classList.remove(
        "hidden"
    );

}


/* =========================
   CLOSE DETAILS
========================= */

function closeDetails() {

    document.getElementById(
        "movieModal"
    ).classList.add(
        "hidden"
    );

}


document.getElementById(
    "closeButton"
).addEventListener(
    "click",
    closeDetails
);


document.getElementById(
    "closeModal"
).addEventListener(
    "click",
    closeDetails
);


/* =========================
   WATCH
========================= */

document.getElementById(
    "watchButton"
).addEventListener(
    "click",
    () => {

        if (!selectedMovie) {
            return;
        }


        addRecent(
            selectedMovie.id
        );


        closeDetails();


        openPlayer(
            selectedMovie
        );

    }
);


/* =========================
   PLAYER
========================= */

function openPlayer(movie) {

    const player =
        document.getElementById("player");

    const video =
        document.getElementById("videoPlayer");

    const message =
        document.getElementById("playerMessage");


    player.classList.remove("hidden");


    if (!movie.video) {

        video.style.display = "none";

        message.style.display = "block";

        message.textContent =
            "Video stream will be connected here.";

        return;

    }


    message.style.display = "none";

    video.style.display = "block";

    video.src = movie.video;

}


/* =========================
   CLOSE PLAYER
========================= */

document.getElementById(
    "playerClose"
).addEventListener(
    "click",
    () => {

        const player =
            document.getElementById(
                "player"
            );

        const video =
            document.getElementById(
                "videoPlayer"
            );


        video.src = "";


        player.classList.add(
            "hidden"
        );

    }
);


/* =========================
   SEARCH
========================= */

searchInput.addEventListener(
    "input",
    () => {

        const query =
            searchInput.value
                .toLowerCase()
                .trim();


        /* EMPTY SEARCH */

        if (!query) {

            homeContent.classList.remove(
                "hidden"
            );

            searchSection.classList.add(
                "hidden"
            );

            renderMovies(
                "recommended",
                recommended
            );

            renderRecent();

            renderMovies(
                "more",
                more
            );

            return;

        }


        /* SEARCH MODE */

        homeContent.classList.add(
            "hidden"
        );

        searchSection.classList.remove(
            "hidden"
        );


        const results =
            movies.filter(
                movie => {

                    const text =
                        [
                            movie.title,
                            movie.chapter,
                            movie.genre,
                            movie.type
                        ]
                        .join(" ")
                        .toLowerCase();


                    return text.includes(
                        query
                    );

                }
            );


        document.getElementById(
            "searchTitle"
        ).textContent =
            `Results for "${searchInput.value}"`;


        renderMovies(
            "searchResults",
            results
        );


        document.getElementById(
            "noResults"
        ).classList.toggle(
            "hidden",
            results.length !== 0
        );

    }
);


/* =========================
   VOICE SEARCH
========================= */

const voiceButton =
    document.getElementById(
        "voiceButton"
    );


voiceButton.addEventListener(
    "click",
    () => {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;


        if (!SpeechRecognition) {

            alert(
                "Voice search is not supported in this browser."
            );

            return;

        }


        const recognition =
            new SpeechRecognition();


        recognition.lang =
            "en-IN";

        recognition.interimResults =
            false;

        recognition.continuous =
            false;


        voiceButton.classList.add(
            "listening"
        );


        recognition.start();


        recognition.onresult =
            event => {

                const text =
                    event.results[0][0]
                        .transcript;


                searchInput.value =
                    text;


                searchInput.dispatchEvent(
                    new Event(
                        "input"
                    )
                );

            };


        recognition.onerror =
            () => {

                console.log(
                    "Voice search error"
                );

            };


        recognition.onend =
            () => {

                voiceButton.classList.remove(
                    "listening"
                );

            };

    }
);


/* =========================
   CURSOR GLOW
========================= */

const cursorGlow =
    document.getElementById(
        "cursorGlow"
    );


document.addEventListener(
    "mousemove",
    event => {

        cursorGlow.style.left =
            event.clientX + "px";

        cursorGlow.style.top =
            event.clientY + "px";

    }
);


/* =========================
   INITIAL LOAD
========================= */

renderMovies(
    "recommended",
    recommended
);


renderRecent();


renderMovies(
    "more",
    more
);


/* =========================
   LOADING COMPLETE
========================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                document
                    .getElementById(
                        "loadingScreen"
                    )
                    .classList.add(
                        "hidden"
                    );

            },
            500
        );

    }
);
const downloadButton =
    document.getElementById("downloadButton");

const downloadMenu =
    document.getElementById("downloadMenu");


downloadButton.addEventListener(
    "click",
    () => {

        downloadMenu.classList.toggle("hidden");

    }
);


document.querySelectorAll(
    ".download-option"
).forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                if (
                    !selectedMovie ||
                    !selectedMovie.downloads
                ) {
                    return;
                }


                const quality =
                    button.dataset.quality;


                const url =
                    selectedMovie.downloads[quality];


                if (!url) {

                    alert(
                        quality +
                        " download is not available yet."
                    );

                    return;

                }


                window.open(
                    url,
                    "_blank"
                );


                downloadMenu.classList.add(
                    "hidden"
                );

            }
        );

    }
);