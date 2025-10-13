const moviesData = [
    {
        day: 1,
        title: "Your Name",
        year: 2016,
        rating: 8.0,
        genre: "Drama, Romance",
        plot: "Two teenagers share a profound, magical connection upon discovering they are swapping bodies. Things manage to become even more complicated when the boy and girl decide to meet in person.",
        director: "Makoto Shinkai",
        poster: "images/day_1/your_name.jpg", 
        screenshots: ["images/day_1/ss_1.jpg", "images/day_1/ss_2.jpg", "images/day_1/ss_3.jpg"],
        downloadLink: "https://gplinks.co/KJYI"
    },
    {
        day: 2,
        title: "Suzume",
        year: 1972,
        rating: 9.2,
        genre: "Crime, Drama",
        plot: "Ek umardaar sangathit apradh vansh ka neta apne gupt samrajya ka niyantran apne anichhuk bete ko deta hai.",
        director: "Francis Ford Coppola",
        poster: "images/day_2/suzume.jpg",
        screenshots: ["images/day_2/ss_1.jpg", "images/day_2/ss_2.jpg", "images/day_2/ss_3.jpg"],
        downloadLink: "https://gplinks.co/eQviE"
    },
    {
        day: 3,
        title: "coming soon",
        year: 2008,
        rating: 9.0,
        genre: "Action, Crime, Thriller",
        plot: "Jab The Joker naam ka khatra apne rahasyamay ateet se ubharta hai, toh woh Gotham ke logon par aafat aur afra-tafri macha deta hai.",
        director: "Christopher Nolan",
        poster: "images/poster_003.jpg",
        screenshots: ["images/ss_003a.jpg", "images/ss_003b.jpg"],
        downloadLink: "https://yourdownloadlink.com/movie_003"
    },
];

// ----------------------------------------------------
// 2. Functionality Logic (Search, Sort, Modal)
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // Page load hone par homepage setup karein
    setupHomePage();
});

// Helper function to close the modal (used by the X button in HTML)
function closeModal() {
    document.getElementById('movieDetailModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Background scrolling ko wapas shuru karein
}

// Function to open modal and fill content
function openModal(movie) {
    // Modal ke saare elements mein movie ka data fill karein
    document.getElementById('modalDayLabel').textContent = `DAY ${movie.day}`;
    document.getElementById('modalMoviePoster').src = movie.poster;
    document.getElementById('modalMovieTitle').textContent = movie.title;
    document.getElementById('modalReleaseYear').textContent = movie.year;
    document.getElementById('modalMovieGenre').textContent = movie.genre;
    document.getElementById('modalMovieRating').textContent = `${movie.rating} / 10`;
    document.getElementById('modalMoviePlot').textContent = movie.plot;
    document.getElementById('modalMovieDirector').textContent = movie.director;
    document.getElementById('modalDownloadButton').href = movie.downloadLink;

    // --- Screenshots Gallery load karein ---
    const gallery = document.getElementById('modalScreenshotGallery');
    gallery.innerHTML = ''; // Purane screenshots hata dein
    movie.screenshots.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${movie.title} Screenshot ${index + 1}`;
        img.className = 'screenshot-item';
        gallery.appendChild(img);
    });
    
    // Modal ko dikhayein aur background scrolling band karein
    document.getElementById('movieDetailModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Home Page Setup (Main function)
function setupHomePage() {
    const movieGrid = document.getElementById('movieGrid');
    const movieSearch = document.getElementById('movieSearch');
    const resultsCountElement = document.getElementById('searchResultsCount');
    const sortSelector = document.getElementById('sortSelector'); 

    // --- Sorting Function ---
    function sortMovies(movies, sortOrder) {
        return movies.sort((a, b) => {
            switch (sortOrder) {
                case 'rating-desc': return b.rating - a.rating; // Highest to Lowest Rating
                case 'year-desc': return b.year - a.year; // Newest to Oldest Year
                case 'title-asc': return a.title.localeCompare(b.title); // Alphabetical A-Z
                case 'day-asc':
                default: return a.day - b.day; // Day 1 to Day 100
            }
        });
    }

    // --- Rendering Function (Movie Cards ko HTML mein daalna) ---
    function renderMovies(movies) {
        movieGrid.innerHTML = ''; 
        resultsCountElement.textContent = `Showing ${movies.length} of ${moviesData.length} entries.`;
        
        if (movies.length === 0) {
            movieGrid.innerHTML = '<p class="no-results">😞 माफ़ कीजिये, इस नाम या दिन की कोई मूवी नहीं मिली।</p>';
            return;
        }

        movies.forEach((movie, index) => {
            const movieCard = document.createElement('div'); 
            movieCard.className = 'movie-card fade-in-up';
            movieCard.style.animationDelay = `${index * 0.08}s`; 
            
            // Card par click hone par Modal open karein
            movieCard.addEventListener('click', () => {
                openModal(movie);
            });
            
            // Movie Card ka HTML structure
            movieCard.innerHTML = `
                <div class="day-label">DAY ${movie.day}</div>
                <img src="${movie.poster}" alt="${movie.title} Poster" class="movie-poster">
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <p class="movie-rating"><i class="fas fa-star"></i> ${movie.rating} / 10</p>
                </div>
                
                <a href="${movie.downloadLink}" class="card-download-button" target="_blank" onclick="event.stopPropagation();">
                    <i class="fas fa-cloud-download-alt"></i> Download Now
                </a>
            `;
            
            movieGrid.appendChild(movieCard);
        });
    }

    // --- Main Filter and Sort Handler ---
    function handleFilterAndSort() {
        const searchTerm = movieSearch.value.toLowerCase();
        const sortOrder = sortSelector.value;

        // 1. Filtering Logic (Search)
        const filtered = moviesData.filter(movie => {
            const dayString = String(movie.day);
            // Title, Day, Director, ya Genre mein search karein
            return movie.title.toLowerCase().includes(searchTerm) || 
                   dayString.includes(searchTerm) || 
                   movie.genre.toLowerCase().includes(searchTerm) ||
                   movie.director.toLowerCase().includes(searchTerm);
        });
        
        // 2. Sorting Logic
        const sorted = sortMovies(filtered, sortOrder);
        
        // 3. Rendering
        renderMovies(sorted);
    }
    
    // Search aur Sort change hone par event listeners add karein
    movieSearch.addEventListener('input', handleFilterAndSort);
    sortSelector.addEventListener('change', handleFilterAndSort);
    
    // Modal ko bahar click karne par band karne ka logic
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('movieDetailModal');
        if (event.target === modal) {
            closeModal();
        }
    });

    // Page load hone par pehli baar movies dikhayein
    handleFilterAndSort();

}

