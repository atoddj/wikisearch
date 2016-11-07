$(document).ready(function() {
    var url = 'https://en.wikipedia.org/w/api.php?action=query&titles=searchTerm&prop=revisions&rvprop=content&format=json';

    $('#search').click(function() {  //when user clicks search
        var userInput = $('#userInput').val(); //get value of input
        // TODO:add error if blank
        url = url.replace('searchTerm', userInput); //adjust string based on user input
        $.get(url, function(){
            console.log('fetched');
        }).done(function() {
            console.log('success');
        });
    });//end search click

});
