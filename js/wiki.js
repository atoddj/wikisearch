/*global $*/
$(document).ready(function() {

    $('#search').click(function() { //when user clicks search
        var url = '//en.wikipedia.org/w/api.php?action=query&titles=searchTerm&format=json&prop=extracts&exsentences=1&callback=?';
        var userInput = $('#userInput').val(); //get value of input
        // TODO:add error if blank
        url = url.replace('searchTerm', userInput); //adjust string based on user input
        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data, textStatus, jqXHR) {
                $('results').html('');
                $.each(data.query.pages, function(key, value, index) {
                    console.log(value);
                    var callout = $('<div>')
                    .attr('class', 'bs-callout bs-callout-default')
                    .attr('id', 'result-'+value.ns);
                    $('results').append(callout);
                    var title = $('<h4>').html(value.title);
                    $('#result-'+value.ns).append(title);
                    var description = $('<p>').html(value.extract);
                    $('#result-'+value.ns).append(description);
                    $('#result-'+value.ns).append('<a href="https://en.wikipedia.org/?curid='+key+'" target="_blank">More</a>');
                });
            },
            error: function(errorMessage) {
                

            }
        });
    }); //end search click

    $("#userInput").keyup(function(event){
    if(event.keyCode == 13){
        $("#search").click();
    }
});
    
});
