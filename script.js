const movies = [
    {
                 id: 1,
                title: "Housefull 5",
                genre: "Comedy",
               
                duration: "2h 45m",
                rating: "9/10",
                description: "Housefull 5 is a Hindi-language comedy thriller set aboard a luxury cruise ship, where a billionaire’s murder triggers a chaotic whodunit filled with slapstick humor, comic misadventures, and suspense. Featuring an ensemble cast led by Akshay Kumar, Riteish Deshmukh, and Abhishek Bachchan, the film stands out for its unique twist—each theater may show a different ending with a different killer, making every viewing a new experience.",
                showtimes: ["10:00 AM", "1:30 PM", "5:00 PM", "8:30 PM"]
            },
            {
                id: 2,
                title: "Stolen",
                genre: "Thriller, Drama",
                duration: "1h 31m",
                rating: "7.3/10 (IMDb)",
                description: "Stolen is a taut, atmospheric thriller that follows two brothers who become entangled in the harrowing search for a kidnapped baby at a rural railway station. As suspicion and chaos spiral, the film explores the collision between privilege and powerlessness in contemporary India, delivering gripping tension and raw emotional impact through restrained storytelling and powerful performances",
                showtimes: ["11:00 AM", "2:15 PM", "6:00 PM", "9:45 PM"]
            },
                        {
                id: 3,
                title: "Chaava",
                genre: "Action, Drama, History",
                duration: "2h 41m",
                rating: "8.3/10 (IMDb)",
                description: "Based on the life of Chhatrapati Sambhaji Maharaj, the eldest son of Maratha warrior Chhatrapati Shivaji Maharaj. The film is an official adaptation of the Marathi novel Chhava by Shivaji Sawant and explores Sambhaji’s journey, leadership, and legacy.",
                showtimes: ["10:30 AM", "1:00 PM", "4:30 PM", "7:30 PM"]
            },
                        {
                id: 4,
                title: "Raid 2",
                genre: "Crime, Thriller, Drama",
                duration: "2h 20m",
                rating: "3/5 (TOI)",
                description: "IRS officer Amay Patnaik (Ajay Devgn) returns to take down a powerful nemesis, Dadabhai (Riteish Deshmukh), in this high-stakes crime drama. The film is noted for its intense cat-and-mouse chase and strong performances.",
                showtimes: ["12:00 PM", "3:30 PM", "7:00 PM", "10:15 PM"]
            },
                        {
                id: 5,
                title: "Sikandar",
                genre: "Action, Drama",
                duration: "2h 35m",
                rating: "9.3/10 (IMDb)",
                description: "Salman Khan stars as Sikandar, whose life spirals after a viral incident on a flight. The film follows his battle against a vengeful minister and the quest for justice, packed with action and emotional depth.",
                showtimes: ["11:00 AM", "2:15 PM", "6:00 PM", "9:45 PM"]
            }
                        
            //  {
            //     id: 6,
            //     title: "Kesari Chapter 2",
            //     genre: "Courtroom Drama, History",
            //     duration: "2h 30m",
            //     rating: "9/10 (IMDb)",
            //     description: "The sequel shifts from battlefield action to the courtroom, following C. Sankaran Nair’s legal battle against the British after the Jallianwala Bagh massacre, starring Akshay Kumar and R. Madhavan.",
            //     showtimes: ["11:00 AM", "2:15 PM", "6:00 PM", "9:45 PM"]
            // }
             

];

let selectedMovie = null;
let selectedShowtime = null;
let selectedSeats = [];
const ticketPrice = 3;


function init(){
    renderMovies();
}

function renderMovies(){
    const moviesGrid = document.getElementById('moviesGrid');
    moviesGrid.innerHTML='';
    movies.forEach(movie =>{
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML=`
         <div class="movie-poster">${movie.title}</div>
                    <h3 class="movie-title">${movie.title}</h3>
                    <div class="movie-meta">
                        <span>${movie.genre}</span>
                        <span>${movie.duration}</span>
                        <span>${movie.rating}</span>
                    </div>
                    <p class="movie-description">${movie.description}</p>
                    <button class="book-movie-btn" onclick="selectMovie(${movie.id})">Book Now</button>
        `;
 moviesGrid.appendChild(movieCard);
    }

    );

}


function selectMovie(movieId){
    selectedMovie = movies.find(m => m.id === movieId);
    document.getElementById('selectedMovieTitle').textContent= selectedMovie.title;
    document.getElementById('selectedMovieGenre').textContent = selectedMovie.genre;
            document.getElementById('selectedMovieDuration').textContent = selectedMovie.duration;
            document.getElementById('selectedMovieRating').textContent = selectedMovie.rating;

            renderShowtimes();
            
            document.getElementById('movies').style.display = 'none';
            document.getElementById('booking').style.display = 'block';


}


function renderShowtimes(){
    const showtimes = document.getElementById('showtimes');
    showtimes.innerHTML='';
    selectedMovie.showtimes.forEach(time =>{
const showtimeBtn = document.createElement('button');
showtimeBtn.className = 'showtime-btn';
                showtimeBtn.textContent = time;
                showtimeBtn.onclick = () => selectShowtime(time, showtimeBtn);
                showtimes.appendChild(showtimeBtn);
    });
}

function selectShowtime(time, btnElement){
    selectedShowtime = time;
            

            document.querySelectorAll('.showtime-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            btnElement.classList.add('selected');


            document.getElementById('seatSelection').style.display = 'block';
            renderSeats();

}


 function renderSeats() {
            const seatMap = document.getElementById('seatMap');
            seatMap.innerHTML = '';

            
            for (let i = 0; i < 100; i++) {
                const seat = document.createElement('div');
                seat.className = 'seat';
                seat.dataset.seat = i;

                
                if (Math.random() < 0.2) {
                    seat.classList.add('occupied');
                } else {
                    seat.classList.add('available');
                    seat.onclick = () => toggleSeat(i, seat);
                }

                seatMap.appendChild(seat);
            }
        }

function toggleSeat(seatNumber, seatElement) {
            if (seatElement.classList.contains('selected')) {
                seatElement.classList.remove('selected');
                seatElement.classList.add('available');
                selectedSeats = selectedSeats.filter(s => s !== seatNumber);
            } else {
                seatElement.classList.remove('available');
                seatElement.classList.add('selected');
                selectedSeats.push(seatNumber);
            }

            updateBookingSummary();
        }


function updateBookingSummary() {
            if (selectedSeats.length > 0) {
                document.getElementById('bookingSummary').style.display = 'block';
                
                document.getElementById('summaryMovie').textContent = selectedMovie.title;
                document.getElementById('summaryShowtime').textContent = selectedShowtime;
                document.getElementById('summarySeats').textContent = selectedSeats.map(s => `S${s + 1}`).join(', ');
                document.getElementById('summaryTicketCount').textContent = selectedSeats.length;
                document.getElementById('summaryTotal').textContent = `$${selectedSeats.length * ticketPrice}`;
            } else {
                document.getElementById('bookingSummary').style.display = 'none';
            }
        }


        function confirmBooking() {
            const bookingDetails = {
                movie: selectedMovie.title,
                showtime: selectedShowtime,
                seats: selectedSeats.map(s => `S${s + 1}`),
                ticketCount: selectedSeats.length,
                totalAmount: selectedSeats.length * ticketPrice,
                bookingTime: new Date().toLocaleString()
            };

            console.log('=== BOOKING CONFIRMED ===');
            console.log('Movie:', bookingDetails.movie);
            console.log('Showtime:', bookingDetails.showtime);
            console.log('Seats:', bookingDetails.seats.join(', '));
            console.log('Number of Tickets:', bookingDetails.ticketCount);
            console.log('Total Amount: $' + bookingDetails.totalAmount);
            console.log('Booking Time:', bookingDetails.bookingTime);
            console.log('========================');

            alert(`Booking confirmed!\nMovie: ${bookingDetails.movie}\nSeats: ${bookingDetails.seats.join(', ')}\nTotal: $${bookingDetails.totalAmount}\n\nCheck console for full details.`);
            
            // Reset and go back to movies
            backToMovies();
        }


  function backToMovies() {
            selectedMovie = null;
            selectedShowtime = null;
            selectedSeats = [];
            
            document.getElementById('booking').style.display = 'none';
            document.getElementById('movies').style.display = 'block';
            document.getElementById('seatSelection').style.display = 'none';
            document.getElementById('bookingSummary').style.display = 'none';
        }


        function scrollToMovies() {
            document.getElementById('movies').scrollIntoView({ behavior: 'smooth' });
        }


                window.onload = init;

