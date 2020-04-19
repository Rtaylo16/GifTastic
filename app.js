var topics = ["Cowboy Bebop","DuckTales","Spongebob Squarepants","Recess","Rocket Power",
"Teenage Mutant Ninja Turtles","Hey Arnold","Pokemon","Dragonball","Big O"];
var numberofcartoons = 10;
var rating = "PG";

function createbuttons(){
    for(var i = 0; i< topics.length; i++){
        var topicbutton = $("<button>");
        topicbutton.addClass("btntopic");
        topicbutton.addClass("toonbtn");
        topicbutton.text(topics[i]);
        $(".buttonrow").append(topicbutton);
    }
   
    
	$(".btntopic").on("click", function(){
		$(".toon-img").unbind("click");
        $("#gifcontainer").empty();
        $("#gifcontainer").removeClass("gify");
        createcartoongifs($(this).text());

    });


    


}

function addButton(cartoon){
    if(topics.indexOf(cartoon) === -1) {
        topics.push(cartoon);
        $(".buttonrow").empty();
        createbuttons();
    }
}

function createcartoongifs(cartoon){
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search?q=" + cartoon + 
		"&api_key=iY7ZR6oCXgLc6hbWzrJz8hDTMUmXgzCn&rating=" + rating + "&limit=" + numberofcartoons,
		method: "GET"
	}).then(function(response){
        response.data.forEach(function(element) {
            newdiv = $("<div>");
            newdiv.append("<p>Rating:" + element.rating.toUpperCase() + "</p>")
            var cartoonGif= $("<img src = '" + element.images.fixed_height_still.url + "'>");
            cartoonGif.addClass("toon-img");
			cartoonGif.attr("data-still", element.images.fixed_height_still.url);
            cartoonGif.attr("data-animate", element.images.fixed_height.url);
            cartoonGif.attr("data-state","still","animate");
            newdiv.append(cartoonGif);
            $("#gifcontainer").append(newdiv);
            
        });




    });

    
    $("#gifcontainer").on("click", ".toon-img", function() {
        
        if ($(this).attr("data-state") === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
        else if ($(this).attr("data-state") === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
    });


 }

 $(document).ready(function(){
	createbuttons();
	$("#submit").on("click", function(){
		event.preventDefault();
		addButton($("#gif-submit").val().trim());
		$("#gif-submit").val("");
    });
    
});