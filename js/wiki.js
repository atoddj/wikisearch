/*global $*/
$(document).ready(function() {

    $('#search').click(function() { //when user clicks search
        var url = '//en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrlimit=10&prop=extracts&exintro&exsentences=1&exlimit=max&gsrsearch=searchTerm&callback=?';
        //Search wikipedia using the API endpoint
        var userInput = $('#userInput').val(); //get value of input
        // TODO:add error if blank
        url = url.replace('searchTerm', userInput); //adjust string based on user input
        $.ajax({ //Retrieve the url
            type: "GET",
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data, textStatus, jqXHR) {
                $('results').html(''); //Remove all html from the results
                $.each(data.query.pages, function(key, value) { //Iterate over the pages
                    var callout = $('<div>')
                    .attr('class', 'bs-callout bs-callout-default')
                    .attr('id', 'result-'+value.index); //Create and insert a callout div with id of the NS result
                    $('results').append(callout); //Add the callout div to the pages
                    var title = $('<h4>').html(value.title); //Get the title of the current iteration
                    $('#result-'+value.index).append(title); //Add the title to the callout div
                    var description = $('<p>').html(value.extract); //Add the summary to the callout in a paragraph tag
                    $('#result-'+value.index).append(description);
                    $('#result-'+value.index).append('<a href="https://en.wikipedia.org/?curid='+key+'" target="_blank" class="btn btn-primary">More</a>');
                });
            },
            error: function(errorMessage) {


            }
        });
    }); //end search click

    $("#userInput").keyup(function(event){
    if(event.keyCode == 13){ //If pushing 'enter' key in the input field, trigger a click event for the search button
        $("#search").click();
    }
});

});
