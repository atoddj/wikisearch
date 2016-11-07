$(document).ready(function() {

    $('#search').click(function() { //when user clicks search
        var url = 'http://en.wikipedia.org/w/api.php?action=query&titles=searchTerm&format=json&prop=extracts&exsentences=1&callback=?';
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
                $.each(data.query.pages, function(key, value) {
                    $('results').append('<h2>'+value.title+'</h2>');
                    $('results').append(value.extract);
                    $('results').append('<a href="https://en.wikipedia.org/?curid='+key+'" target="_blank">More</a>');
                });
            },
            error: function(errorMessage) {

            }
        });
    }); //end search click

});
