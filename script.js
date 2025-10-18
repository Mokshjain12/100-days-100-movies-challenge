// --- 1. Movie Data (Updated with audioLink) ---
const moviesData = [
    {
        day: 1,
        title: "Your Name",
        year: 2016,
        rating: 8.5, 
        dateSeen: "2025-10-13", 
        genre: "Drama, Romance, Fantasy",
        plot: "Two teenagers share a profound, magical connection upon discovering they are swapping bodies. Things manage to become even more complicated when the boy and girl decide to meet in person.",
        director: "Makoto Shinkai",
        poster: "images/day_1/your_name.jpg", 
        screenshots: ["images/day_1/ss_1.jpg", "images/day_1/ss_2.jpg", "images/day_1/ss_3.jpg"],
        downloadLink: "https://gplinks.co/KJYI",
        audioLink: "images/day_1/your_name.m4a"
    },
    {
        day: 2,
        title: "Suzume",
        year: 2022,
        rating: 8.0,
        dateSeen: "2025-10-14",
        genre: "Adventure, Fantasy, Drama",
        plot: "A modern action adventure road story where a 17-year-old girl named Suzume helps a mysterious young man close doors from the other side that are releasing disasters all over in Japan.",
        director: "Makoto Shinkai",
        poster: "images/day_2/suzume.jpg",
        screenshots: ["images/day_2/ss_1.jpg", "images/day_2/ss_2.jpg", "images/day_2/ss_3.jpg"],
        downloadLink: "https://gplinks.co/KJYI",
        audioLink: "images/day_2/suzume.m4a"
    },
    {
        day: 3,
        title: "A Silent Voice",
        year: 2016,
        rating: 9.5,
        dateSeen: "2025-10-15",
        genre: "Romance, Drama",
        plot: "A deaf girl, Shoko, is bullied by the popular Shoya. As Shoya continues to bully Shoko, the class turns its back on him. Shoko transfers and Shoya grows up as an outcast. Alone and depressed, the regretful Shoya finds Shoko to make amends.",
        director: "Naoko Yamada",
        poster: "images/day_3/A_Silent_Voice.jpg",
        screenshots: ["images/day_3/ss_1.jpg", "images/day_3/ss_2.jpg", "images/day_3/ss_3.jpg"],
        downloadLink: "https://gplinks.co/cg40M",
        audioLink: "images/day_3/A_Silent_Voice.m4a" 
    },
    {
        day: 4,
        title: "I want to eat your pancreas",
        year: 2018,
        rating: 9.0,
        dateSeen: "2025-10-16",
        genre: "Animation, Drama, Family, Romance",
        plot: "A high school student discovers one of his classmates, Sakura Yamauchi, is suffering from a terminal illness. This secret brings the two together, as she lives out her final moments.",
        director: "Shin'ichirô Ushijima",
        poster: "images/day_4/I_want_to_eat_your_pancreas.jpg",
        screenshots: ["images/day_4/ss_1.jpg", "images/day_4/ss_2.jpg", "images/day_4/ss_3.jpg"],
        downloadLink: "https://gplinks.co/ychd",
        audioLink: "images/day_4/I_want_to_eat_your_pancreas.mp3"
    },
    {
        day: 5,
        title: "A Whisker Away",
        year: 2020,
        rating: 8.0,
        dateSeen: "2025-10-17",
        genre: "Animation, Romance, Melodrama, Adventure, Fantasy, Drama",
        plot: "Miyo Sasaki is in love with her classmate Kento Hinode and tries repeatedly to get Kento's attention by transforming into a cat, but at some point, the boundary between herself and the cat becomes ambiguous.",
        director: "Jun'ichi Satô, Tomotaka Shibayama",
        poster: "images/day_5/a_whisker_away.jpg",
        screenshots: ["images/day_5/ss_1.jpg", "images/day_5/ss_2.jpg", "images/day_5/ss_3.jpg"],
        downloadLink: "https://gplinks.co/vawYVLq",
        audioLink: "images/day_5/a_whisker_away.m4a"
    },   
    {
        day: 6,
        title: "Weathering with You",
        year: 2019,
        rating: 8.0,
        dateSeen: "2025-10-18",
        genre: "Anime, Animation, Romance,",
        plot: "Set during a period of exceptionally rainy weather, high-school boy Hodaka Morishima runs away from his troubled rural home to Tokyo and befriends an orphan girl who can manipulate the weather.",
        director: "Makoto Shinkai",
        poster: "images/day_6/weathering_with_you.jpg",
        screenshots: ["images/day_6/ss_1.jpg", "images/day_6/ss_2.jpg", "images/day_6/ss_3.jpg"],
        downloadLink: "https://gplinks.co/3mEl",
        audioLink: "images/day_6/weathering_with_you.mp3"
    },   
    {
        day: 7,
        title: "Coming Soon",
        year: 2016,
        rating: 9.5,
        dateSeen: "2025-10-18",
        genre: "Romance, Drama",
        plot: "Coming Soon",
        director: "Coming Soon",
        poster: "images/day_6/A_Silent_Voice.jpg",
        screenshots: ["images/day_7/ss_1.jpg", "images/day_7/ss_2.jpg", "images/day_7/ss_3.jpg"],
        downloadLink: "###",
        audioLink: null
    },
];
// --- End of Movie Data ---


// --- 2. DOM Elements and Utility Functions ---
const movieCollection = document.getElementById('movieCollection');
const movieSearch = document.getElementById('movieSearch');
const sortSelector = document.getElementById('sortSelector');
const modal = document.getElementById('movieDetailModal');
const searchResultsCount = document.getElementById('searchResultsCount');
const noResultsGlobal = document.getElementById('noResultsGlobal');
// NEW: Notification Element
const downloadNotification = document.getElementById('downloadNotification');


// Helper function to format rating (STARS REMOVED)
function getRatingText(rating) {
    return `<span class="movie-rating">${rating.toFixed(1)} / 10</span>`;
}

// Helper function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString('en-US', options);
}

// --- 3. Sorting Logic ---
function sortMovies(movies, order) {
    const sorted = [...movies];
    sorted.sort((a, b) => {
        switch (order) {
            case 'day-asc':
                return a.day - b.day;
            case 'rating-desc':
                return b.rating - a.rating;
            case 'title-asc':
                return a.title.localeCompare(b.title);
            case 'date-desc':
                return new Date(b.dateSeen) - new Date(a.dateSeen);
            default:
                return a.day - b.day;
        }
    });
    return sorted;
}

// --- 4. Rendering Logic ---
function renderMovies(movies) {
    
    const horizontalContainers = document.querySelectorAll('.horizontal-scroll-container');
    horizontalContainers.forEach(container => container.innerHTML = '');

    noResultsGlobal.style.display = 'none';

    const container1_10 = document.getElementById('day-range-1-10');
    const section1_10 = document.querySelector('.movie-section[data-range="1-10"]');
    
    let totalRenderedMovies = 0;

    if (container1_10) {
        movies.forEach(movie => {
            if (movie.day >= 1 && movie.day <= 10 || movieSearch.value) {
                const movieCard = createMovieCard(movie);
                container1_10.appendChild(movieCard);
                totalRenderedMovies++;
            }
        });

        if (totalRenderedMovies > 0 || !movieSearch.value) {
            section1_10.style.display = 'block';
        } else {
            section1_10.style.display = 'none';
        }
    }


    if (movieSearch.value && totalRenderedMovies === 0) {
        noResultsGlobal.style.display = 'block';
    } else {
        noResultsGlobal.style.display = 'none';
    }
    
    searchResultsCount.textContent = `Showing ${totalRenderedMovies} of ${moviesData.length} movies`;
}


// --- 5. Movie Card Creation ---
function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card fade-in-up';
    movieCard.setAttribute('data-day', movie.day);
    // Card click will now call the updated openModal
    movieCard.onclick = () => openModal(movie);
    
    movieCard.innerHTML = `
        <div class="day-label">DAY ${String(movie.day).padStart(2, '0')}</div>
        <img src="${movie.poster}" alt="${movie.title} Poster" class="movie-poster">
        <div class="movie-info">
            <h3>${movie.title}</h3>
            ${getRatingText(movie.rating)} <div class="date-seen"><i class="far fa-calendar-alt"></i> Seen: ${formatDate(movie.dateSeen)}</div>
        </div>
        
        `;
    return movieCard;
}

// NEW: Function to show animated notification
function showDownloadNotification() {
    downloadNotification.classList.remove('fade-out'); // Remove old fade-out
    downloadNotification.style.display = 'block';
    downloadNotification.classList.add('slide-up');
    
    // Hide after 3 seconds
    setTimeout(() => {
        downloadNotification.classList.remove('slide-up');
        downloadNotification.classList.add('fade-out');
        // Wait for fade-out to finish before setting display:none
        setTimeout(() => {
            downloadNotification.style.display = 'none';
            downloadNotification.classList.remove('fade-out');
        }, 500); // .5s matches CSS fade-out duration
    }, 3000); // Display time: 3 seconds
}

// --- 6. Modal Functions (Updated for Stylish Audio Player & Notification) ---
window.openModal = function(movie) {
    document.getElementById('modalDayLabel').textContent = `DAY ${String(movie.day).padStart(2, '0')}`;
    document.getElementById('modalMoviePoster').src = movie.poster;
    document.getElementById('modalMovieTitle').textContent = movie.title;
    
    document.getElementById('modalDateSeen').textContent = formatDate(movie.dateSeen);
    document.getElementById('modalMovieRating').textContent = `${movie.rating.toFixed(1)} / 10`; 
    
    document.getElementById('modalReleaseYear').textContent = movie.year;
    document.getElementById('modalMovieGenre').textContent = movie.genre;
    document.getElementById('modalMovieDirector').textContent = movie.director;
    document.getElementById('modalMoviePlot').textContent = movie.plot;
    document.getElementById('modalDownloadButton').href = movie.downloadLink;

    // Screenshot Gallery
    const gallery = document.getElementById('modalScreenshotGallery');
    gallery.innerHTML = ''; 
    if (movie.screenshots && movie.screenshots.length > 0) {
        movie.screenshots.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = 'Screenshot';
            img.className = 'screenshot-item';
            gallery.appendChild(img);
        });
    } else {
        gallery.innerHTML = '<p style="color:var(--text-secondary);">No screenshots available.</p>';
    }
    
    // NEW: Stylish Audio Player Setup Logic
    const audioContainer = document.getElementById('modalAudioPlayerContainer');
    
    // Clear existing content and remove any previous audio element
    audioContainer.innerHTML = '<h2><i class="fas fa-music"></i> MOVIE INTRODUCTION (AUDIO)</h2>';
    
    if (movie.audioLink) {
        // Audio available: create and append the audio element
        const audioPlayer = document.createElement('audio');
        audioPlayer.controls = true;
        audioPlayer.className = 'audio-player';
        audioPlayer.id = 'modalMovieAudioPlayer';

        const source = document.createElement('source');
        source.src = movie.audioLink;
        source.type = 'audio/mpeg';

        audioPlayer.appendChild(source);
        audioContainer.appendChild(audioPlayer);
        
        audioContainer.style.display = 'block';

        // UPDATED: Call the new notification function on play
        audioPlayer.onplay = () => {
             showDownloadNotification();
        };

    } else {
        // Audio NOT available (Coming Soon)
        const comingSoonText = document.createElement('p');
        comingSoonText.className = 'audio-coming-soon';
        comingSoonText.textContent = 'Audio Summary Coming Soon for this movie!';
        audioContainer.appendChild(comingSoonText);
        audioContainer.style.display = 'block'; // Show the container with the 'Coming Soon' message
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

window.closeModal = function() {
    // Stop the modal audio when closing the modal
    const modalAudio = document.getElementById('modalMovieAudioPlayer');
    if (modalAudio) {
        modalAudio.pause();
        modalAudio.currentTime = 0;
    }

    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}


// --- 7. Main Filter and Sort Handler ---
function handleFilterAndSort() {
    const searchTerm = movieSearch.value.toLowerCase();
    const sortOrder = sortSelector.value;

    const filtered = moviesData.filter(movie => {
        const dayString = String(movie.day);
        const dateString = formatDate(movie.dateSeen).toLowerCase();
        
        return movie.title.toLowerCase().includes(searchTerm) || 
               dayString.includes(searchTerm) || 
               movie.genre.toLowerCase().includes(searchTerm) ||
               movie.director.toLowerCase().includes(searchTerm) ||
               dateString.includes(searchTerm);
    });
    
    const sorted = sortMovies(filtered, sortOrder);
    
    renderMovies(sorted);
}

// --- 8. Event Listeners & Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    movieSearch.addEventListener('input', handleFilterAndSort);
    sortSelector.addEventListener('change', handleFilterAndSort);
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    handleFilterAndSort();
});


