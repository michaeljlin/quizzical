var questionBank;

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
               question = data.results[0];
            },
            error: function(data){
                console.log('something went wrong', data)
            }
        });
}

getTriviaQuestion(1,'easy');

function searchYoutube(string){
    $.ajax({
        url: 's-apis.learningfuze.com/hackathon/youtube/search.php',
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
            console.log('somthing went wrong with YT',data);
        }
    })
}

function searchWikipedia() {
    $.ajax({
        url: "https://en.wikipedia.org/w/api.php",
        data: {
            format: "json",
            action: "parse",
            page: 'Donald',
            prop: 'text',
            section: 0,
        },
        success: function (data) {
            console.log('Wiki success', data)
        },
        error: function (data) {
            console.log('wiki fail', data)
        },
    })
}