/* =========================
   VOID CONTENT
========================= */

const movies = [

    {
        id: 1,
        title: "Iron Man",
        year: 2003,
        type: "Movie",
        genre: "Sci-Fi",
        rating: "8.3",
        duration: "2h 6m",
        format: "MKV",

        poster:
            "assets/posters/ironman.jpg",

        description:
            "Tony Stark builds a high-tech suit of armor to escape captivity and becomes the superhero Iron Man.",

        downloads: {

            "1080p": {
                url: "https://fs1.indishare.info/ptuVrYHdlLiV",
                size: "2.5 GB"
            },

            "720p": {
                url: "https://fs1.indishare.info/1IS9k81cf4cI",
                size: "1.2 GB"
            },

            "480p": {
                url: "https://fs1.indishare.info/1ZDhluOg5uLG",
                size: "439 MB"
            }

        }
    },


    {
        id: 2,
        title: "Iron Man 2",
        year: 2010,
        type: "Movie",
        genre: "Sci-Fi",
        rating: "6.4",
        duration: "2h 4m",
        format: "MKV",

        poster:
            "assets/posters/ironman2.jpg",

        description:
            "With the world now aware of his identity as Iron Man, Tony Stark must contend with both his declining health and a vengeful madman with ties to his father's legacy.",

        downloads: {

            "1080p": {
                url: "https://fs1.indishare.info/aKMZLrSnzXDe",
                size: "2.5 GB"
            },

            "720p": {
                url: "https://fs1.indishare.info/6REMcl5Z9roS",
                size: "1.2 GB"
            },

            "480p": {
                url: "https://fs1.indishare.info/HMBa0QJQsAts",
                size: "437 MB"
            }

        }
    },


    {
        id: 3,
        title: "Iron Man 3",
        year: 2013,
        type: "Movie",
        genre: "Sci-Fi",
        rating: "7.1",
        duration: "2h 10m",
        format: "MKV",

        poster:
            "assets/posters/ironman3.jpg",

        description:
            "When Tony Stark's world is torn apart by a formidable terrorist called the Mandarin, he starts an odyssey of rebuilding and retribution.",

        downloads: {

            "1080p": {
                url: "https://fs1.indishare.info/2zbmOK2tS2Py",
                size: "3 GB"
            },

            "720p": {
                url: "https://fs1.indishare.info/TOscNrCd6mmV",
                size: "1 GB"
            },

            "480p": {
                url: "https://fs1.indishare.info/txghwocqvwji",
                size: "423 MB"
            }

        }
    }

];


/* =========================
   HOME SECTIONS
========================= */

const recommended = [
    movies[0],
    movies[1],
    movies[2]
];


const more = [
    movies[2],
    movies[0],
    movies[1]
];


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
   MOVIE CARD
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

            <div class="card-info">

                <div class="card-title">
                    ${movie.title}
                </div>

                <div class="card-meta">

                    ${movie.year}
                    •
                    ${movie.type}
                    •
                    ${movie.genre}

                </div>

            </div>

        </article>

    `;
}


/* =========================
   RENDER MOVIES
========================= */

function renderMovies(
    containerId,
    list
) {

    const container =
        document.getElementById(
            containerId
        );


    if (!container) {
        return;
    }


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
   DETAILS PAGE
========================= */

function openDetails(movie) {

    selectedMovie = movie;


    document.getElementById(
        "detailPoster"
    ).src =
        movie.poster;


    document.getElementById(
        "detailPoster"
    ).alt =
        movie.title;


    document.getElementById(
        "detailTitle"
    ).textContent =
        movie.title;


    document.getElementById(
        "detailName"
    ).textContent =
        movie.title;


    document.getElementById(
        "detailRating"
    ).textContent =
        movie.rating ||
        "Not Rated";


    document.getElementById(
        "detailDuration"
    ).textContent =
        movie.duration ||
        "Not Available";


    document.getElementById(
        "detailFormat"
    ).textContent =
        movie.format ||
        "Not Available";


    document.getElementById(
        "detailDescription"
    ).textContent =
        movie.description ||
        "No description available.";


    document.getElementById(
        "size1080p"
    ).textContent =
        movie.downloads?.["1080p"]?.size ||
        "Size unavailable";


    document.getElementById(
        "size720p"
    ).textContent =
        movie.downloads?.["720p"]?.size ||
        "Size unavailable";


    document.getElementById(
        "size480p"
    ).textContent =
        movie.downloads?.["480p"]?.size ||
        "Size unavailable";


    document.getElementById(
        "movieModal"
    ).classList.remove(
        "hidden"
    );


    document.body.classList.add(
        "details-open"
    );


    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

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


    document.body.classList.remove(
        "details-open"
    );

}


/* =========================
   CLOSE BUTTON
========================= */

document.getElementById(
    "closeButton"
).addEventListener(
    "click",
    closeDetails
);


/* =========================
   DOWNLOADS
========================= */

document
    .querySelectorAll(
        ".download-option"
    )
    .forEach(
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


                    const download =
                        selectedMovie
                            .downloads[quality];


                    if (
                        !download ||
                        !download.url ||
                        download.url.startsWith(
                            "YOUR_"
                        )
                    ) {

                        alert(
                            quality +
                            " download is not available yet."
                        );

                        return;

                    }


                    window.open(
                        download.url,
                        "_blank",
                        "noopener,noreferrer"
                    );

                }
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
                            movie.genre,
                            movie.type,
                            movie.year,
                            movie.format
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

        if (!cursorGlow) {
            return;
        }


        cursorGlow.style.left =
            event.clientX + "px";


        cursorGlow.style.top =
            event.clientY + "px";

    }
);


/* =========================
   ESCAPE KEY
========================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            selectedMovie
        ) {

            closeDetails();

        }

    }
);


/* =========================
   INITIAL LOAD
========================= */

renderMovies(
    "recommended",
    recommended
);


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

                const loadingScreen =
                    document.getElementById(
                        "loadingScreen"
                    );


                if (loadingScreen) {

                    loadingScreen.classList.add(
                        "hidden"
                    );

                }

            },
            500
        );

    }
);
