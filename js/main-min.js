function getMovies(t) {
  axios
    .get("https://www.omdbapi.com/?apikey=8d5cb2e&s=" + t)
    .then((t) => {
      let e = t.data.Search,
        i = "";
      $.each(e, (t, e) => {
        i += `\n            
  <div class="poster"> 
  <div class="flip-card_i">
      <div class="flip-card-inner_i">
          <div class="flip-card-front_i">   
               
           <img src="${e.Poster}">\n     
           </div>  
           <div class="flip-card-back_i">       
             <h5>${e.Title}</h5>\n 
             <p>${e.Plot} </p>             
               <a onclick="movieSelected('${e.imdbID}')" class ="btn btn-danger" href="#">Movie Details</a>\n    
        

        
        <button class="btn btn-danger" onclick="openMovieWin1('${e.Type}', '${e.imdbID}')">▶Play</button>
        <script type="text/javascript">
          function openMovieWin1(type, imdbID) {
            // Embedding Google Drive video using <iframe>
            var embeddedVideo = document.createElement("iframe");
            var url = 'https://vidsrc.to/embed/';
            if (type !== 'movie') {
                type = 'tv'; // Change e.Type to 'tv' if it's not 'movie'
            }
            url += type;
            url += '/' + imdbID;
        
            embeddedVideo.src = url;
            embeddedVideo.width = 640;
            embeddedVideo.height = 480;
            embeddedVideo.allow = "autoplay";
            embeddedVideo.style.borderColor = 'transparent';
            embeddedVideo.style.boxShadow = '0 0 15px red';
        
            // Opening a new window with the embedded video
            var newWindow = window.open("", "_blank", "top=100,left=250,height=540,width=720,channelmode=yes,fullscreen=yes,menubar=no,toolbar=no,location=no,status=no,scrollbars=no,noopener=no");
            
            newWindow.document.title = '${e.Title}';
            newWindow.document.body.style.backgroundColor = "black";
            // Appending the <iframe> to the new window's document body
            newWindow.document.body.appendChild(embeddedVideo);
        
            // Creating a button to toggle fullscreen
            var fullscreenButton = newWindow.document.createElement("button");
            fullscreenButton.innerHTML = "Fullscreen ↔️";
            fullscreenButton.style.padding = "10px 15px";
            fullscreenButton.style.fontSize = "16px";
            fullscreenButton.style.backgroundColor = "#8a2b2b";
            fullscreenButton.style.color = "#101820";
            fullscreenButton.style.border = "none";
            fullscreenButton.style.borderRadius = "5px";
            fullscreenButton.style.cursor = "pointer";
        
            newWindow.document.body.appendChild(fullscreenButton);
        
            // Function to toggle fullscreen
            function toggleFullscreen() {
              if (embeddedVideo.requestFullscreen) {
                embeddedVideo.requestFullscreen();
              } else if (embeddedVideo.webkitRequestFullscreen) {
                embeddedVideo.webkitRequestFullscreen();
              } else if (embeddedVideo.mozRequestFullscreen) {
                embeddedVideo.mozRequestFullscreen();
              }
            }
        
            // Adding click event listener to toggle fullscreen on the button
            fullscreenButton.addEventListener("click", toggleFullscreen);
          }
        </script>
         </div>
       </div>\n                
      </div>
        
    </div>\n    
    </div>            `;
      }),
        $("#movies").html(i);
    })
    .catch((t) => { });
}








function movieSelected(t) {
  return (
    sessionStorage.setItem("movieID", t),
    (window.location = "movie-min.html"),
    !1
  );
}

function getMovie() {
  let t = sessionStorage.getItem("movieID");
  axios
    .get("https://www.omdbapi.com/?apikey=8d5cb2e&i=" + t)
    .then((t) => {
      let e = t.data,
        i = `\n            <div class ="row">\n            <div class="col-md-4">\n            <img src="${e.Poster}" class='thumbnail'>\n            </div>\n            <div class="col-md-8">\n            <h2>${e.Title}</h2>\n            <ul class="list-group">\n            <li class="list-group-item"><strong>Genre:</strong>${e.Genre}</li>\n            <li class="list-group-item"><strong>Released:</strong>${e.Released}</li>\n            <li class="list-group-item"><strong>Rated:</strong>${e.Rated}</li>\n            <li class="list-group-item"><strong>ImdbRating:</strong>${e.imdbRating}</li>\n            <li class="list-group-item"><strong>Director:</strong>${e.Director}</li>\n            <li class="list-group-item"><strong>Writer:</strong>${e.Writer}</li>\n            <li class="list-group-item"><strong>Actors:</strong>${e.Actors}</li>\n            </ul>\n            </div>\n            </div>\n            <div class="row">\n            <div class="well">\n            <h3>Plot</h3>\n            \n            ${e.Plot}\n            \n            <hr>\n            <a href="http://imdb.com/title/${e.imdbID}" target="_blank" class="btn bg-danger">View IMDB</a>\n            <a href ="index.html" class="btn btn-danger">Go Back To Search</a>\n            </div>\n            </div>\n            `;
      $("#movie").html(i);
    })
    .catch((t) => { });
}
$(document).ready(() => {
  $("#searchForm").on("submit", (t) => {
    getMovies($("#searchText").val()), t.preventDefault();
  });
});
