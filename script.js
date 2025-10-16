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
        downloadLink: "https://gplinks.co/KJYI"
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
        downloadLink: "https://gplinks.co/KJYI"
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
        downloadLink: "https://gplinks.co/cg40M"
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
        downloadLink: "https://gplinks.co/ychd"
    },
    {
        day: 5,
        title: "Coming Soon",
        year: 2016,
        rating: 9.5,
        dateSeen: "2025-10-17",
        genre: "Romance, Drama",
        plot: "Coming Soon",
        director: "Coming Soon",
        poster: "images/day_5/A_Silent_Voice.jpg",
        screenshots: ["images/day_5/ss_1.jpg", "images/day_5/ss_2.jpg", "images/day_5/ss_3.jpg"],
        downloadLink: "###"
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

// Helper function to format rating (STARS REMOVED)
function getRatingText(rating) {
    // Ab sirf plain text rating dikhayega (e.g., 8.5 / 10)
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

// --- 4. Rendering Logic (MODIFIED to only use the 1-10 section) ---
function renderMovies(movies) {
    
    // Clear the only existing container (for 1-10)
    const horizontalContainers = document.querySelectorAll('.horizontal-scroll-container');
    horizontalContainers.forEach(container => container.innerHTML = '');

    noResultsGlobal.style.display = 'none';

    // Since only 1-10 section is present, all movies go to the first container
    const container1_10 = document.getElementById('day-range-1-10');
    const section1_10 = document.querySelector('.movie-section[data-range="1-10"]');
    
    let totalRenderedMovies = 0;

    if (container1_10) {
        movies.forEach(movie => {
            // Check if movie is within the 1-10 range OR if search is active (to show all search results in 1-10)
            if (movie.day >= 1 && movie.day <= 10 || movieSearch.value) {
                const movieCard = createMovieCard(movie);
                container1_10.appendChild(movieCard);
                totalRenderedMovies++;
            }
        });

        // Toggle visibility of the 1-10 section based on search results
        if (totalRenderedMovies > 0 || !movieSearch.value) {
            section1_10.style.display = 'block';
        } else {
            section1_10.style.display = 'none';
        }
    }


    // Handle Global No Results (for search)
    if (movieSearch.value && totalRenderedMovies === 0) {
        noResultsGlobal.style.display = 'block';
    } else {
        noResultsGlobal.style.display = 'none';
    }
    
    searchResultsCount.textContent = `Showing ${totalRenderedMovies} of ${moviesData.length} movies`;
}


// --- 5. Movie Card Creation (STARS REMOVED) ---
function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card fade-in-up';
    movieCard.setAttribute('data-day', movie.day);
    movieCard.onclick = () => openModal(movie);

    movieCard.innerHTML = `
        <div class="day-label">DAY ${String(movie.day).padStart(2, '0')}</div>
        <img src="${movie.poster}" alt="${movie.title} Poster" class="movie-poster">
        <div class="movie-info">
            <h3>${movie.title}</h3>
            ${getRatingText(movie.rating)} <div class="date-seen"><i class="far fa-calendar-alt"></i> Seen: ${formatDate(movie.dateSeen)}</div>
        </div>
        <a href="${movie.downloadLink}" class="card-download-button" target="_blank" onclick="event.stopPropagation();">
             <i class="fas fa-download"></i> Get Link
        </a>
    `;
    return movieCard;
}


// --- 6. Modal Functions (STARS REMOVED) ---
window.openModal = function(movie) {
    document.getElementById('modalDayLabel').textContent = `DAY ${String(movie.day).padStart(2, '0')}`;
    document.getElementById('modalMoviePoster').src = movie.poster;
    document.getElementById('modalMovieTitle').textContent = movie.title;
    
    document.getElementById('modalDateSeen').textContent = formatDate(movie.dateSeen);
    
    // RATING STARS REMOVED - Using plain text
    document.getElementById('modalMovieRating').textContent = `${movie.rating.toFixed(1)} / 10`; 
    
    document.getElementById('modalReleaseYear').textContent = movie.year;
    document.getElementById('modalMovieGenre').textContent = movie.genre;
    document.getElementById('modalMovieDirector').textContent = movie.director;
    document.getElementById('modalMoviePlot').textContent = movie.plot;
    document.getElementById('modalDownloadButton').href = movie.downloadLink;

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

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

window.closeModal = function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}


// --- 7. Main Filter and Sort Handler ---
function handleFilterAndSort() {
    const searchTerm = movieSearch.value.toLowerCase();
    const sortOrder = sortSelector.value;

    // 1. Filtering Logic (Day search is working correctly)
    const filtered = moviesData.filter(movie => {
        const dayString = String(movie.day);
        const dateString = formatDate(movie.dateSeen).toLowerCase();
        
        return movie.title.toLowerCase().includes(searchTerm) || 
               dayString.includes(searchTerm) || 
               movie.genre.toLowerCase().includes(searchTerm) ||
               movie.director.toLowerCase().includes(searchTerm) ||
               dateString.includes(searchTerm);
    });
    
    // 2. Sorting Logic
    const sorted = sortMovies(filtered, sortOrder);
    
    // 3. Rendering
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


