// Initial array of creatures
var mythicalCreatures = ["Dragon","Gremlin","Fairy","Werewolf","Mermaid",
                       "Jack O Lantern","Gargoyle","Big Foot","Medusa","Krampus"];

// displayCreatureInfo function re-renders the HTML to display the appropriate content
function displayCreatureInfo() 
{
  $("#creatures-view").empty();
  var creature = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + creature + 
                  "&api_key=dc6zaTOxFJmzC&limit=10";
  // Creating an AJAX call for the specific creature button being clicked
  $.ajax({url: queryURL, method: "GET"}).then(function(response) 
  {
    // Creating a div to hold the creature
    var creatureDiv = $("<div class='creature'>");
    var results = response.data;

    // Looping through each result item
    for (var i = 0; i < results.length; i++) 
    {
      // Creating and storing a div tag
      var creatureDiv = $("<div id='randgif'>");

      // Creating a paragraph tag with the result item's rating
      var p = $("<p>").text("Rating: " + results[i].rating);

      // Creating and storing an image tag
      var creatureImage = $("<img id='gifSize'>");
      // Setting the src attribute of the image to a property pulled off the result item
      creatureImage.attr("src", results[i].images.fixed_height.url);

      // Appending the paragraph and image tag to the creatureDiv
      creatureDiv.append(p);
      creatureDiv.append(creatureImage);

      // Prependng the creatureDiv to the HTML page in the "#creatures-view" div
      $("#creatures-view").prepend(creatureDiv);
    }
  });
}

// Function for rendering creature buttons
function renderButtons() {

  // Deleting the gifs prior to adding new creatures
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of mythical creatures
  for (var i = 0; i < mythicalCreatures.length; i++) 
  {

    // Then dynamicaly generating buttons for each creature in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button class='button button1'>");
    // Adding a class of creature-btn to our button
    a.addClass("creature-btn");
    // Adding a data-attribute
    a.attr("data-name", mythicalCreatures[i]);
    // Providing the initial button text
    a.text(mythicalCreatures[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a creature button is clicked
$("#add-creature").on("click", function(event) 
{
  event.preventDefault();
  // This line grabs the input from the textbox
  var creature = $("#creature-input").val().trim();
  // Prevent empty input
  if(creature === ""){ return; }

  // Adding creature from the textbox to our array
  mythicalCreatures.push(creature);

  // Calling renderButtons which handles the processing of our creature array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "creature-btn"
$(document).on("click", ".creature-btn", displayCreatureInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();