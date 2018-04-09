$(document).ready(function() {

    var topics = ["Jackie Chan", "Jean-Claude Van-Damme", "Arnold Schwarzenegger", "Bruce Willis"];	
  
    //  create topics array buttons
    function renderButtons(){
      $('#buttons-view').empty();
  
      for (var i = 0; i < topics.length; i++) {
              //create all buttons
              var a = $('<button>');
              a.addClass('action-star');
              a.attr('data-name', topics[i]);
              a.text(topics[i]);
              $('#buttons-view').append(a);
            }
          }    
          renderButtons();
  
  //on button click
  $(document).on('click', '.action-star', function() {
  
      //new variable will log the text data from each button
      var actionStars= $(this).html(); 
      // console.log(actionStars);
  
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + actionStars + "&api_key=v3IAy1J1Kb7BoSFH0lTmiTiaTeC3HROv&limit=10";
      // console.log(queryURL);
  
      // Creating an AJAX call for the specific actor button being clicked
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
  
        var results = response.data;
          //console.log(results);
          //empties the div before adding more gifs
          $('#stars-view').empty();
          for ( var j=0; j < results.length; j++) {
                      var imageDiv = $('<div>');
                      var imageView = results[j].images.fixed_height.url;
                      var still = results[j].images.fixed_height_still.url;
                          // console.log(imageView);  
  
          var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                      gifImage.attr('data-state', 'still');
                      $('#stars-view').prepend(gifImage);
                      gifImage.on('click', playGif);
  
          // Pulling ratings for each gif
          var rating = results[j].rating;
              // console.log(rating);
          var displayRated= $('<p>').text("Rating: " + rating);
          $('#stars-view').prepend(displayRated);
    } // end for loop
  
  }); // done response
  
          //function to stop and animate gifs
          function playGif() { 
                      var state = $(this).attr('data-state');
                      // console.log(state);
                   if (state == 'still'){
                       $(this).attr('src', $(this).data('animate'));
                        $(this).attr('data-state', 'animate');
                   } else{
                       $(this).attr('src', $(this).data('still'));
                       $(this).attr('data-state', 'still');
                      }
  
                  } 
  
        }); 
  
            //adding new button to array
          $(document).on('click', '#add-star', function(){
              if ($('#star-input').val().trim() == ''){
                alert('Input can not be left blank');
             }
             else {
              var stars = $('#star-input').val().trim();
              topics.push(stars);
              $('#star-input').val('');
              renderButtons();
              return false;
  
              }
  
          });
                        
  
          }); 