$(document).ready(initializeGame);

function initializeGame(){
    $(document).on('click', '#wiki', {type:'wiki'}, newGame.hintToggle);
    $(document).on('click', '#youtube', {type:'youtube'}, newGame.hintToggle);
    $(document).on('click', '#twitter', {type:'twitter'}, newGame.hintToggle);

    $('#answer1').click(newGame.pressAnswerButton);
    $('#answer2').click(newGame.pressAnswerButton);
    $('#answer3').click(newGame.pressAnswerButton);
    $('#answer4').click(newGame.pressAnswerButton);

    $('#submitName').click(newGame.setPlayerOneName);

    $('#option1').click(newGame.setAvatars);
    $('#option2').click(newGame.setAvatars);

    // newGame.setupButtons();
    newGame.setupNextQuestion();

    $('.btn').css({'outline': 'none'});

    $('[data-toggle="tooltip"]').tooltip();
}

function Game(){
    var self = this;
    this.hintHTML = null;

    this.categories = ['General Knowledge', 'Science & Nature', 'History', 'Geography', 'Celebreties', 'Animals', 'Sports', 'Books', 'Music', 'Film'];

    this.setAvatars = function(){
        var avatarSrc = $(this)[0].currentSrc;

        // controller.
        console.log(avatarSrc);

        // return $(this);
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

    this.setPlayerOneName = function(){
        var name = $('#setName').val();

        controller.getPlayerNameImage(name);
        console.log(name);
    };

    this.showHint = function(){

    };

    this.setupNextQuestion = function(){
        for(var i = 0; i < self.categories.length; i++){
            var newOptionElement = new $('<option>').text(self.categories[i]);
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
    };

    this.constructYoutubeHint = function(){
        $('#hintTitle').text('Youtube');
        $('#searchButton').attr('data-original-title', 'Use 2 points');
    };

    this.constructTwitterHint = function(){
        $('#hintTitle').text('Twitter');
        $('#search').attr('value', $('#question').text() );
        $('#searchButton').attr('data-original-title', 'Use 1 point');
    };
}

var newGame = new Game();

var controller = new Controller();

var model = new Model();