const movies = [

    {
        id: 1,
        title: "Nightfall",
        year: 2026,
        type: "Movie",
        genre: "Thriller",
        rating: "8.7",
        duration: "2h 04m",
        poster:
            "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=85",
        description:
            "A city loses power at midnight. One signal remains alive — and someone is waiting for it.",
        video: ""
    },

    {
        id: 2,
        title: "After Zero",
        year: 2025,
        type: "Movie",
        genre: "Sci-Fi",
        rating: "8.4",
        duration: "1h 51m",
        poster:
            "https://images.unsplash.com/photo-1534791547706-4de854bfb523?auto=format&fit=crop&w=700&q=85",
        description:
            "Humanity receives one final message from a future that should not exist.",
        video: ""
    },

    {
        id: 3,
        title: "The Last Signal",
        year: 2026,
        type: "Series",
        genre: "Mystery",
        rating: "9.1",
        duration: "8 Episodes",
        poster:
            "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=700&q=85",
        description:
            "A vanished crew leaves behind a transmission that changes everything.",
        video: ""
    },

    {
        id: 4,
        title: "Blackout",
        year: 2025,
        type: "Movie",
        genre: "Action",
        rating: "8.2",
        duration: "2h 18m",
        poster:
            "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=700&q=85",
        description:
            "When the grid collapses, an ex-operative has six hours to cross the city.",
        video: ""
    },

    {
        id: 5,
        title: "Echoes",
        year: 2024,
        type: "Series",
        genre: "Horror",
        rating: "8.9",
        duration: "10 Episodes",
        poster:
            "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=700&q=85",
        description:
            "A house records every conversation — sometimes before it happens.",
        video: ""
    },

    {
        id: 6,
        title: "Redline",
        year: 2023,
        type: "Movie",
        genre: "Action",
        rating: "8.0",
        duration: "2h 01m",
        poster:
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=85",
        description:
            "One illegal race. One missing hour. One driver who remembers the impossible.",
        video: ""
    }

];


const recommended = [
    movies[0],
    movies[1],
    movies[2],
    movies[4]
];


const more = [
    movies[3],
    movies[5],
    movies[1],
    movies[4],
    movies[0],
    movies[2]
];


let recentlyWatched =
    JSON.parse(
        localStorage.getItem("void_recent")
    ) || [];


let selectedMovie = null;


/* RENDER MOVIES */

function renderMovies(
    container,
    list
) {

    const element =
        document.getElementById(container);


    if (!list.length) {

        element.innerHTML = `
            <div class="empty">
                Nothing here yet.
            </div>
        `;

        return;

    }


    element.innerHTML =
        list
            .map(movie => `

                <article
                    class="movie-card"
                    data-id="${movie.id}"
                >

                    <img
                        src="${movie.poster}"
                        alt="${movie.title}"
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
                            ${movie.type}
                            •
                            ★ ${movie.rating}
                        </div>

                    </div>

                </article>

            `)
            .join("");


    element
        .querySelectorAll(".movie-card")
        .forEach(card => {

            card.addEventListener(
                "click",
                () => {

                    const movie =
                        movies.find(
                            m =>
                                m.id ==
                                card.dataset.id
                        );

                    openDetails(movie);

                }
            );

        });

}


/* RECENT */

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

}


/* DETAILS */

function openDetails(movie) {

    selectedMovie = movie;


    document.getElementById(
        "detailPoster"
    ).src = movie.poster;


    document.getElementById(
        "detailTitle"
    ).textContent = movie.title;


    document.getElementById(
        "detailMeta"
    ).textContent =
        `${movie.year} • ${movie.type} • ${movie.duration} • ★ ${movie.rating}`;


    document.getElementById(
        "detailDescription"
    ).textContent =
        movie.description;


    document.getElementById(
        "movieModal"
    ).classList.remove("hidden");

}


/* CLOSE DETAILS */

function closeDetails() {

    document
        .getElementById("movieModal")
        .classList.add("hidden");

}


document
    .getElementById("closeButton")
    .addEventListener(
        "click",
        closeDetails
    );


document
    .getElementById("closeModal")
    .addEventListener(
        "click",
        closeDetails
    );


/* WATCH */

document
    .getElementById("watchButton")
    .addEventListener(
        "click",
        () => {

            if (!selectedMovie) {
                return;
            }


            addToRecentlyWatched(
                selectedMovie.id
            );


            closeDetails();


            openPlayer(
                selectedMovie
            );

        }
    );


/* RECENT WATCH */

function addToRecentlyWatched(id) {

    recentlyWatched =
        recentlyWatched.filter(
            movieId =>
                movieId !== id
        );


    recentlyWatched.unshift(id);


    recentlyWatched =
        recentlyWatched.slice(0, 6);


    localStorage.setItem(
        "void_recent",
        JSON.stringify(
            recentlyWatched
        )
    );


    renderRecent();

}


/* PLAYER */

function openPlayer(movie) {

    const player =
        document.getElementById(
            "player"
        );

    const video =
        document.getElementById(
            "videoPlayer"
        );

    const message =
        document.getElementById(
            "playerMessage"
        );


    player.classList.remove(
        "hidden"
    );


    if (movie.video) {

        video.src =
            movie.video;

        video.style.display =
            "block";

        message.style.display =
            "none";

        video.play().catch(
            () => {}
        );

    }

    else {

        video.removeAttribute(
            "src"
        );

        video.style.display =
            "none";

        message.style.display =
            "block";

        message.textContent =
            "Your licensed video will play here.";

    }

}


/* CLOSE PLAYER */

document
    .getElementById("playerClose")
    .addEventListener(
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


            video.pause();

            video.removeAttribute(
                "src"
            );


            player.classList.add(
                "hidden"
            );

        }
    );


/* MY LIST */

document
    .getElementById("listButton")
    .addEventListener(
        "click",
        () => {

            if (!selectedMovie) {
                return;
            }


            let list =
                JSON.parse(
                    localStorage.getItem(
                        "void_list"
                    )
                ) || [];


            if (
                list.includes(
                    selectedMovie.id
                )
            ) {

                list =
                    list.filter(
                        id =>
                            id !==
                            selectedMovie.id
                    );

                document.getElementById(
                    "listButton"
                ).textContent =
                    "+ My List";

            }

            else {

                list.push(
                    selectedMovie.id
                );

                document.getElementById(
                    "listButton"
                ).textContent =
                    "✓ In My List";

            }


            localStorage.setItem(
                "void_list",
                JSON.stringify(list)
            );

        }
    );


/* SEARCH */

document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        event => {

            const query =
                event.target.value
                    .toLowerCase()
                    .trim();


            if (!query) {

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


            const results =
                movies.filter(
                    movie =>
                        movie.title
                            .toLowerCase()
                            .includes(query)
                        ||
                        movie.genre
                            .toLowerCase()
                            .includes(query)
                        ||
                        movie.type
                            .toLowerCase()
                            .includes(query)
                );


            renderMovies(
                "recommended",
                results
            );


            document.getElementById(
                "recommended"
            )
            .parentElement
            .querySelector(
                ".section-title h2"
            )
            .textContent =
                "Search Results";


            document.getElementById(
                "recent"
            ).innerHTML = "";


            document.getElementById(
                "more"
            ).innerHTML = "";

        }
    );


/* VOICE SEARCH */

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


        recognition.maxAlternatives =
            1;


        voiceButton.classList.add(
            "listening"
        );


        recognition.start();


        recognition.onresult =
            event => {

                const text =
                    event.results[0][0]
                        .transcript;


                document.getElementById(
                    "searchInput"
                ).value = text;


                document.getElementById(
                    "searchInput"
                ).dispatchEvent(
                    new Event("input")
                );

            };


        recognition.onerror =
            () => {

                alert(
                    "Voice search could not be started."
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


/* START */

renderMovies(
    "recommended",
    recommended
);


renderRecent();


renderMovies(
    "more",
    more
);