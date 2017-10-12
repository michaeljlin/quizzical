$(document).ready(initializeGame);

function initializeGame() {


    $('#answer1').click(view.pressAnswerButton);
    $('#answer2').click(view.pressAnswerButton);
    $('#answer3').click(view.pressAnswerButton);
    $('#answer4').click(view.pressAnswerButton);

    // $('#submitName').click(view.setPlayerOneName);

    $('#option1').click(view.setAvatars);
    $('#option2').click(view.setAvatars);

    // view.setupButtons();
    view.setupNextQuestion();

    $('.btn').css({'outline': 'none'});

    $("#wiki").tooltip({title:'Search Wikipedia for help', placement: 'bottom'});
    $("#youtube").tooltip({title:'Ask Youtube for help', placement: 'bottom'});
    $("#twitter").tooltip({title:'Ask Twitter for help', placement: 'bottom'});

    $('[data-toggle="tooltip"]').tooltip();

    $(document).on('click', '#wiki', {type:'wiki'}, view.hintToggle);
    $(document).on('click', '#youtube', {type:'youtube'}, view.hintToggle);
    $(document).on('click', '#twitter', {type:'twitter'}, view.hintToggle);

    $(document).on('click', '#nextQuestionSubmit', null, view.getNextQuestion);

    $('#hint').on('hidden.bs.modal', view.clearModal);

    // view.nextQuestion();

    // $('#mainScreen').toggle('hidden');

    $('#setPlayers').modal('toggle');
    $('#setPlayers').on('hidden.bs.modal', view.nextQuestion);

    $('#nextQuestion').on('hidden.bs.modal', view.removeAnswerResult);

    $('#setPlayerInfo').click(view.setPlayerInfo);

    $('.mainHintContent').toggle('hidden');
    $('#searchButton').toggle('hidden');

    // $('.btn').css({'outline': 'none'});
    //
    // $('[data-toggle="tooltip"]').tooltip();
}

function Game(){
    var self = this;
    this.hintHTML = null;

    this.categories = ['General Knowledge', 'Science & Nature', 'History', 'Geography', 'Celebreties', 'Animals', 'Sports', 'Books', 'Music', 'Film'];
    this.categoryNum = [9, 17, 23, 22, 26, 27, 21, 10, 12, 11];

    this.setAnswerResult = function(result, correctAnswer){
        var resultIconElement = new $('<span>');
        var answerElement = new $('<div>');

        if(result === 'correct'){
            resultIconElement.addClass('answerIcon col-md-1 col-md-offset-5 glyphicon glyphicon-ok').css({
                'font-size':'70px',
                'color': 'green'
            });
        }
        else{
            resultIconElement.addClass('answerIcon col-md-1 col-md-offset-5 glyphicon glyphicon-remove').css({
                'font-size':'70px',
                'color': 'red'
            });
        }

        $('#nextQuestionBody .container .row').prepend(resultIconElement);
    };

    this.removeAnswerResult = function(){
        $('.answerIcon').remove();
    };

    this.setPlayerInfo = function(){
        var name1 = $('#username1').val();
        var name2 = $('#username2').val();

        if(name1 === ""){
            name1 = 'Player 1'
        }

        if(name2 === ""){
            name2 = 'Player 2'
        }

        var playerObject = [{
            name: name1
        },{
            name: name2
        }];

        controller.setPlayerInfo(playerObject);

    };

    this.setAvatars = function(){
        var avatarSrc = $(this)[0].currentSrc;

        controller.getPlayerAvatar(avatarSrc);
        console.log(avatarSrc);

    };

    this.getNextQuestion = function(){

        if($('#mainScreen').css('display') === 'none'){
            $('#mainScreen').toggle('hidden');
        }

        console.log("Next question called!");

        var raw = $('.categoryOptionList').val();

        var number = self.categories.indexOf(raw);

        var catNum = self.categoryNum[number];

        var diff = $("input[name=difficultyLevel]:checked").val();

        var questionObject = {category:catNum, difficulty: diff};

        console.log("raw value: "+raw);
        console.log("index value: "+number);
        console.log("category number: "+catNum);
        console.log("difficulty: "+diff);

        // console.log('question object: '+$(questionObject));

        controller.setCurrentQuestionInModel(questionObject);

        $('#nextQuestion').modal('toggle');
    };

    this.refreshPage = function(nextTurnInfo){
        self.updateStatus(nextTurnInfo.status);
        self.updateQuestion(nextTurnInfo.question);
        self.updateAnswers(nextTurnInfo.answers);
    };

    this.displayPlayerNameAndAvatars = function(player1Name, player2Name){
        $('#playerOneName').text(player1Name);
        $('#playerTwoName').text(player2Name);
        $('#setPlayers').modal('toggle');
    };

    this.updateStatus = function(turn, player1Points, player2Points){
        $('#turn').text('Player '+turn);
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
        self.toggleMainQuizSection();
    };

    this.toggleMainQuizSection = function(){
        $('article').toggle('hidden');
    };

    this.pressAnswerButton = function(){
        var chosenAnswer = $(this)[0].innerText.substr(0, $(this)[0].innerText.length-1);
        console.log(chosenAnswer);
        controller.answerButtonPressed(chosenAnswer);
    };

    this.setHintHTML = function(hintHTMLElement){
        self.hintHTML = hintHTMLElement;
    };

    this.clearModal = function(){

        $('#hintBody iframe').remove();
        $('.wikiContainer').remove();
        $('.tempTwitter').remove();

        // if($('.mainHintContent').css('display') === 'none'){
        //     console.log('Showing mainHintContent!');
        //     $('.mainHintContent').toggle('hidden');
        // }
        //
        // if($('#searchButton').css('display') === 'none'){
        //     $('#searchButton').toggle('hidden');
        // }

        self.removeLoadingIcon();
    };

    this.showHint = function(){

    };

    this.setupNextQuestion = function(){
        for(var i = 0; i < self.categories.length; i++){
            var newOptionElement = new $('<option>').attr('data-category', self.categoryNum[i]).text(self.categories[i]);
            $('.categoryOptionList').append(newOptionElement);
        }
    };

    this.nextQuestion = function(){

        $('#nextQuestion').modal('toggle');
    };

    this.hintToggle = function(hint){
        switch(hint.data.type){
            case 'wiki':
                controller.constructWikiHint();
                break;
            case 'youtube':
                controller.constructYoutubeHint();
                break;
            case 'twitter':
                controller.constructTwitterHint();
        }

        $('#hint').modal('toggle');
    };

    this.displayWikiHint = function(wikiElementContainer){
        $('#hintBody .row').append(wikiElementContainer);

        $('.wikiContainer a').attr(
            'href', 'https://en.wikipedia.org'+$('.wikiContainer a').attr('href')).attr(
            'target', '_blank'
        );
    };

    this.displayYoutubeHint = function(newIFrame){
        $('#hintBody').css('height', '80%').append(newIFrame);
    };


    this.displayTwitterHint = function(result){
        $('.tempTwitter').html(result);
    };

    this.prepareLoadingIcon = function(){
        var bootstrapElementHolder = $('<div>').addClass('spinHolder col-md-1 col-md-offset-5');
        var loadingIcon = $('<i>').addClass("fa fa-spinner fa-spin").css('font-size', '200px');

        bootstrapElementHolder.append(loadingIcon);

        $('#hintBody .container .row').append(bootstrapElementHolder);
    };

    this.removeLoadingIcon = function(){
        $('.spinHolder').remove();
    };

}

var view = new Game();

var controller = new Controller();

var model = new Model();