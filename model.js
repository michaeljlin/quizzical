var questionBank;
var test;

function getTriviaQuestion(category, difficultyLevel){
        console.log('this ran');
        $.ajax({
            url: 'https://opentdb.com/api.php?amount=1&type=multiple',
            data:{
                category: category,
                difficulty: difficultyLevel
            },
            dataType: 'json',
            method: 'Post',
            success: function(data){
                console.log('success',data);
               console.log(data.results[0]);
               questionBank = data.results[0];
            },
            error: function(data){
                console.log('something went wrong', data)
            }
        });
}

getTriviaQuestion(11,'easy');

function searchYoutube(string){
    $.ajax({
        url: 'http://s-apis.learningfuze.com/hackathon/youtube/search.php',
        dataType: 'json',
        data:{
            q: string,
            maxResults: 5,
            type: 'video',
            detailLevel: 'verbose'
        },
        method: 'Post',
        success: function(data){
            console.log('YT success', data);
        },
        error: function(data){
            console.log('something went wrong with YT',data);
        }
    })
}

function searchWikipedia(string) {
    $.ajax({
        url: "https://en.wikipedia.org/w/api.php",
        data: {
            format: "json",
            action: "query",
            // page: string,
            prop: 'info',
            list: 'search',
            srsearch: string,
            // section: 0,
            origin: '*',
        },
        success: function (data) {
            console.log('Wiki success', data)
            test = 'https://en.wikipedia.org/?curid='+data.query.search[0].pageid;
        },
        error: function (data) {
            console.log('wiki fail', data)
        },
    })
}