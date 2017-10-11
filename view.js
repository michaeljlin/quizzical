$(document).ready(initializeGame);

function initializeGame() {


    $('#answer1').click(view.pressAnswerButton);
    $('#answer2').click(view.pressAnswerButton);
    $('#answer3').click(view.pressAnswerButton);
    $('#answer4').click(view.pressAnswerButton);

    $('#submitName').click(view.setPlayerOneName);

    $('#option1').click(view.setAvatars);
    $('#option2').click(view.setAvatars);

    // view.setupButtons();
    view.setupNextQuestion();

    $('.btn').css({'outline': 'none'});

    $('[data-toggle="tooltip"]').tooltip();

    $(document).on('click', '#wiki', {type:'wiki'}, view.hintToggle);
    $(document).on('click', '#youtube', {type:'youtube'}, view.hintToggle);
    $(document).on('click', '#twitter', {type:'twitter'}, view.hintToggle);

    $(document).on('click', '#nextQuestionSubmit', null, view.getNextQuestion);

    $('#hint').on('hidden.bs.modal', view.clearModal);

    // $('.btn').css({'outline': 'none'});
    //
    // $('[data-toggle="tooltip"]').tooltip();
}

function Game(){
    var self = this;
    this.hintHTML = null;

    this.categories = ['General Knowledge', 'Science & Nature', 'History', 'Geography', 'Celebreties', 'Animals', 'Sports', 'Books', 'Music', 'Film'];
    this.categoryNum = [9, 17, 23, 22, 26, 27, 21, 10, 12, 11];

    this.setAvatars = function(){
        var avatarSrc = $(this)[0].currentSrc;

        controller.getPlayerAvatar(avatarSrc);
        console.log(avatarSrc);

        // return $(this);
    };

    this.getNextQuestion = function(){
        console.log("Next question called!");

        var raw = $('.categoryOptionList').val();

        var number = self.categories.indexOf(raw);

        var catNum = self.categoryNum[number];

        var diff = $("input[name=difficultyLevel]:checked").val();

        console.log("raw value: "+raw);
        console.log("index value: "+number);
        console.log("category number: "+catNum);
        console.log("difficulty: "+diff);

    };

    this.refreshPage = function(nextTurnInfo){
        self.updateStatus(nextTurnInfo.status);
        self.updateQuestion(nextTurnInfo.question);
        self.updateAnswers(nextTurnInfo.answers);
    };

    this.updateStatus = function(turn, player1Points, player2Points){
        $('#turn').text(turn);
        $('#playerOnePoints').text(player1Points);
        $('#playerTwoPoints').text(player2Points);
    };

    this.updateQuestion = function(category, question){
        $('#questionCategory').text(category);
        $('#question').text(question);
    };

    this.updateAnswers = function(answerArray){
        for(var i = 0; i < 4 ; i++){
            $('#answer'+(i+1)+'Text').text(answerArray[i]);
        }
    };

    this.pressAnswerButton = function(){
        var chosenAnswer = $(this)[0].innerText;
        console.log(chosenAnswer);
        // controller.getTheAnswer(chosenAnswer);
    };

    this.setHintHTML = function(hintHTMLElement){
        self.hintHTML = hintHTMLElement;
    };

    this.clearModal = function(){

        $('#hintBody iframe').remove();
        $('.wikiContainer').remove();
        $('.tempTwitter').remove();

        if($('.mainHintContent').css('display') === 'none'){
            console.log('Showing mainHintContent!');
            $('.mainHintContent').toggle('hidden');
        }

        if($('#searchButton').css('display') === 'none'){
            $('#searchButton').toggle('hidden');
        }
    };

    this.setPlayerOneName = function(){
        var name = $('#setName').val();

        controller.getPlayerName(name);
        console.log(name);
    };

    this.showHint = function(){

    };

    this.setupNextQuestion = function(){
        for(var i = 0; i < self.categories.length; i++){
            var newOptionElement = new $('<option>').attr('data-category', self.categoryNum[i]).text(self.categories[i]);
            $('.categoryOptionList').append(newOptionElement);
        }
    };

    this.setupButtons = function(){
        for (var i = 0; i < self.categories.length; i++){
            console.log("Running for: "+i);
                var newCategoryHolder = new $('<div>').addClass('col-md-1');
                var newButtonGroup = new $('<div>').addClass('btn-group');
                var newButton = new $('<button>').addClass('btn btn-default btn-block dropdown-toggle').attr({
                    "data-toggle":"dropdown",
                    "aria-haspopup": true,
                    "aria-expanded": false
                }).css("outline", "none").text(self.categories[i]+" ");

                // console.log(newButton);

                var newCaretElement = new $('<span>').addClass('caret');
                newButton.append(newCaretElement);
                newButtonGroup.append(newButton);

                var newUlElement = new $('<ul>').addClass('dropdown-menu');
                var newEasyElement = new $('<li>').html('<a href="#">Easy</a>');
                var newMediumElement = new $('<li>').html('<a href="#">Medium</a>');
                var newHardElement = new $('<li>').html('<a href="#">Hard</a>');

                newUlElement.append(newEasyElement, newMediumElement, newHardElement);

                newButtonGroup.append(newUlElement);

                if(i === 0){
                    newCategoryHolder.addClass('col-md-offset-1');
                }

                newCategoryHolder.append(newButtonGroup);

                console.log(newCategoryHolder);

                $('#catButtons').append(newCategoryHolder);

        }
    };

    this.nextQuestion = function(){
        $('#nextQuestion').modal('toggle');
    };

    this.hintToggle = function(hint){
        switch(hint.data.type){
            case 'wiki':
                self.constructWikiHint();
                break;
            case 'youtube':
                self.constructYoutubeHint();
                break;
            case 'twitter':
                self.constructTwitterHint();
        }

        $('#hint').modal('toggle');
    };

    this.constructWikiHint = function(){
        $('#hintTitle').text('Wikipedia');
        $('#search').attr('value', $('#question').text() );
        $('#searchButton').attr('data-original-title', 'Use 3 points');

        var questionText = $('#question').text();

        model.searchWikipedia(questionText, model.getWikipediaText, function(result){
            // console.log('raw result data: '+result);

            var convertedHTML = new $('<div>').html(result);

            // console.log('converted html: '+$(convertedHTML));

            var wikiElementContainer = $('<div>').addClass('wikiContainer col-md-12');

            wikiElementContainer.html( $(convertedHTML).find('p') );

            $('#hintBody .row').append(wikiElementContainer);

            $('.wikiContainer a').attr(
                'href', 'https://en.wikipedia.org'+$('.wikiContainer a').attr('href')).attr(
                    'target', '_blank'
            );
        });
    };

    this.constructYoutubeHint = function(){
        $('#hintTitle').text('Youtube');
        $('.mainHintContent').toggle('hidden');
        $('#searchButton').toggle('hidden');

        var questionText = $('#question').text();

        console.log("Question was: "+questionText);

        model.searchYoutube(questionText, function(result){
            console.log('Searched youtube!');
            // $('#hintBody').append(result);

            var newIFrame = $('<iframe>').attr({
                'src':result,
                // 'width':'560px',
                // 'height':'315px'
                'height': '110%',
                'width': '100%'
            });

            $('#hintBody').css('height', '80%').append(newIFrame);
        });

        // $('#searchButton').attr('data-original-title', 'Use 2 points');
    };

    this.constructTwitterHint = function(){
        $('#hintTitle').text('Twitter');
        $('#search').attr('value', $('#question').text() );
        $('#searchButton').attr('data-original-title', 'Use 1 point');

        var questionText = $('#question').text();

        console.log("Question was: "+questionText);

        var tempTwitterElement = new $('<div>').addClass('tempTwitter col-md-6 col-md-offset-4');

        $('.outerHintContent').append(tempTwitterElement);

        model.searchTwitter(questionText, model.getTwitterEmbed, function(result){
            console.log('raw embed data: '+result);
            $('.tempTwitter').html(result);
        });

    };
}

var view = new Game();

var controller = new Controller();

var model = new Model();