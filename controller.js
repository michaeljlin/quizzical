function Controller()
{
    this.playerOneName = null;
    this.playerTwoName = null;
    this.playerOnePoint = 0;
    this.playerTwoPoint = 0;
    this.difficultyLevel = null;
    this.help = null;
    this.playerTurn = null;
    this.helpsArray = [{title:"youtube",quantities:3},{title:"wikipedia",numbers:3},{title:"pass",numbers:3}];

    /***************************************************************************************************
     * method name: setPlayerInfo
     * functionality: get players name from playersInfo in model object and call displayPlayerNameAndAvatars method of model object
     * @params {array(playerInfoArray)}
     * @returns: nothing
     */

    this.setPlayerInfo = function(playerInfoArray){
        model.playersInfo[0].name = playerInfoArray[0].name;
        model.playersInfo[1].name = playerInfoArray[1].name;

        view.displayPlayerNameAndAvatars(model.playersInfo[0].name, model.playersInfo[1].name);
    };

    /***************************************************************************************************
     * method name: getHelpType
     * functionality: get hint which is clicked by player from view as parameter and transfer it to a number by switch statement for future calculations
     * @params {string(helpName)}
     * @returns: nothing
     */

    this.getHelpType = function(helpName)
    {
        switch (helpName)
        {
            case ("wiki"):
                this.help = 1;
                break;
            case("youtube") :
                this.help = 2;
                break;
            case("twitter") :
                this.help = 3;
                break;
        }
    };

    /***************************************************************************************************
     * method name: answerButtonPressed
     * functionality: check the received address from view is correct or not + update points + changing turn by calling
      setActivePlayerStatus of view object + call updateStatus and nextQuestion methods from view object
     * @params {string(chosenAnswerText)}
     * @returns: nothing
     */

    this.answerButtonPressed = function(chosenAnswerText){
        var currentTurn = model.playersInfo[2];
        var winnerName = null;

        if(chosenAnswerText === model.currentAnswer){
            this.pointing(currentTurn,this.difficultyLevel,this.help);
            model.correctAudioObject.play();
            view.setAnswerResult('correct', model.currentAnswer);
            console.log('Player '+ (currentTurn+1) + ' got the question correct! Toggling next question modal!');

            if(model.questionCount == 30){
                console.log('Game has reached 15 questions!');

                if(model.playersInfo[0].points > model.playersInfo[1].points){
                    winnerName = model.playersInfo[0].name;
                }
                else if(model.playersInfo[0].points < model.playersInfo[1].points){
                    winnerName = model.playersInfo[1].name;
                }
                else{
                    winnerName = undefined;
                }

                model.gameAudioObject.pause();
                view.triggerWinner(winnerName);
                return;
            }

            this.changeCurrentTurn();
            view.setActivePlayerStatus(model.playersInfo[2]);
            view.updateStatus(model.playersInfo[2] + 1, model.playersInfo[0].points, model.playersInfo[1].points);
            view.nextQuestion();
        }
        else{
            model.wrongAudioObject.play();
            view.setAnswerResult('wrong', model.currentAnswer);
            console.log('Player '+ (currentTurn+1) + ' got the question wrong! Toggling next question modal!');

            if(model.questionCount == 30){
                console.log('Game has reached 15 questions!');

                if(model.playersInfo[0].points > model.playersInfo[1].points){
                    winnerName = model.playersInfo[0].name;
                }
                else if(model.playersInfo[0].points < model.playersInfo[1].points){
                    winnerName = model.playersInfo[1].name;
                }
                else{
                    winnerName = undefined;
                }

                model.gameAudioObject.pause();
                view.triggerWinner(winnerName);
                return;
            }

            this.changeCurrentTurn();
            view.setActivePlayerStatus(model.playersInfo[2]);
            view.updateStatus(model.playersInfo[2] + 1, model.playersInfo[0].points, model.playersInfo[1].points);
            view.nextQuestion();
        }
    };

    /***************************************************************************************************
     * method name: setCurrentQuestionInModel
     * functionality: getting question objects from view as parameter which is including category and difficulty level
      and transfer it to model object by calling getTriviaQuestion and asking model to send back the generated question
     by calling back function which is placed in parameters of getTriviaQuestion method
     * @params {object(questionObject)}
     * @returns: nothing
     */
    this.setCurrentQuestionInModel = function(questionObject){

        model.updatePlayersStats(questionObject);
        this.difficultyLevel = questionObject.difficulty;

        if(questionObject === undefined){

            return;
        }
        else{
            view.toggleMainQuizSection();

            model.getTriviaQuestion(questionObject.category, questionObject.difficulty, function(dataBank){

                // var quoteFix = questionBank.question.replace(/&quot;/g,'\"');
                // var apostFix = quoteFix.replace(/&#039;/g,'\"');

                var fixedIncorrectAnswers = [];

                for(var i = 0; i < dataBank.incorrect_answers.length; i++){
                    fixedIncorrectAnswers.push(he.decode(dataBank.incorrect_answers[i]));
                }

                model.setCurrentQuestion(he.decode(dataBank.question));
                model.setCurrentAnswer(he.decode(dataBank.correct_answer));
                model.setCurrentWrongAnswers(fixedIncorrectAnswers);
                model.setCurrentCategory(dataBank.category);
                model.setCurrentDifficulty(dataBank.difficulty);

                view.updateQuestion(model.currentCategory, model.currentQuestion);

                var temp = model.currentWrongAnswers.slice();
                temp.push(model.currentAnswer);

                for(var i = 0; i < temp.length; i++){
                    var randomPosition = Math.floor(Math.random()*(temp.length-1));
                    var hold = temp[i];
                    temp[i] = temp[randomPosition];
                    temp[randomPosition] = hold;
                }

                view.updateQuestionDiffPanel(model.currentDifficulty);
                view.updateAnswers(temp);
            });
        }
    };


    /***************************************************************************************************
     * method name: setCurrentQuestionInModel
     * functionality: getting question objects from view as parameter which is including category and difficulty level
     and transfer it to model object by calling getTriviaQuestion and asking model to send back the generated question
     by calling back function which is placed in parameters of getTriviaQuestion method
     * @params {object(questionObject)}
     * @returns: nothing
     */

    this.sanitizeText = function(rawString){
        var quoteFix = rawString.replace(/&quot;/g,'\"');
        var apostFix = quoteFix.replace(/&#039;/g,'\"');

        return apostFix;
    };


    this.getPlayerName = function(avatarAddress)
    {
        model.getPlayerName(avatarAddress);
        this.changeCurrentTurn();

    };



    this.changeCurrentTurn = function()
    {
        model.playersInfo[2] = 1-model.playersInfo[2];
    };




    this.questionSelectionButtonClicked = function()
    {
        var questionRequest = {};
        questionRequest.categoryId = this.id;
        questionRequest.difficultydata = this.data;
        return questionRequest;

    };

    this.UseHelps = function()
    {
        var help = null;
        for (var i=0; i < this.helpsArray; i++)
        {
            if ( help === this.helpsArray[i].title && this.helpsArray[i].quantities > 0)
            {
                this.helpsArray[i].quantities--;
                break;
            }

            if (this.helpsArray[i].quantities > 0)
            {
                alert("you can not this hint anymore");
            }
        }
    };




    this.checkTheAnswer = function(playerAnswer,realAnswer)
    {
        if (playerAnswer !== realAnswer)
        {
            return true;
        }

        return false;

    };

    /***************************************************************************************************
     * method name: cpointing
     * calculating the point of answer based on the difficulty level, hint for each player based on their turns and update scores
      by calling method updatePlayerInfo from model object
     * @params : (number[0 or 1](turn),string[easy,difficult, medium],number[1,2,3](help))
     * @returns: nothing
     */

    this.pointing = function(turn,difficultylevel,help)
    {
        var  difficultylevelNum = 1;
        switch (difficultylevel)
        {
            case ("easy") :
                difficultylevelNum = 1;
                break;
            case ("medium") :
                difficultylevelNum = 2;
                break;
            case ("hard") :
                difficultylevelNum = 3;
                break;
        }
        if ( turn === 0 && (help === null || help === 3))
        {
            this.playerOnePoint += difficultylevelNum*10;
        }

        if ( turn === 0 && help === 1)
        {
            this.playerOnePoint += difficultylevelNum*10*.5;
        }

        if ( turn === 0 && help === 2)
        {
           this.playerOnePoint += difficultylevelNum*10*.75;
        }

        if ( turn === 1 && (help === null || help === 3))
        {
            this.playerTwoPoint += difficultylevelNum*10;
        }

        if ( turn === 1 && help === 1)
        {
            this.playerTwoPoint += difficultylevelNum*10*.5;
        }

        if ( turn === 1 && help === 2)
        {
            this.playerTwoPoint += difficultylevelNum*10*.75;
        }

        model.updatePlayerInfo(this.playerOnePoint,this.playerTwoPoint);

    };





    this.questionSelection = function(viewData)
    {
        var questionInfo = {};
        questionInfo.category = viewData.categoryId;
        questionInfo.difficulty = viewData.difficultydata;
        return questionifo;

    };



    this.printQuestionAndAnswers = function()
    {
        var tempObj = modal.getTriviaQuestion();
        $("#question").text(tempObj.question);
        $("#answer1").text();
        $("#answer2").text();
        $("#answer3").text();
        $("#answer4").text();

    };


    /***************************************************************************************************
     * method name: constructWikiHint
     * getting the wikipedia search result from model object by calling searchWikipedia method of model and recieve the
      result by call back function and then pass it to view by calling displayWikiHint method of modal
     * @params : empty
     * @returns: nothing
     */



    this.constructWikiHint = function(){

        this.help = 1;

        $('#hintTitle').text('Wikipedia');

        view.prepareLoadingIcon();

        var questionText = $('#question').text();

        model.searchWikipedia(questionText, model.getWikipediaText, function(result){

            var convertedHTML = new $('<div>').html(result);


            var wikiElementContainer = $('<div>').addClass('wikiContainer col-md-11');

            view.removeLoadingIcon();
            wikiElementContainer.html( $(convertedHTML).find('p') );

            view.displayWikiHint(wikiElementContainer);

        });
    };

    /***************************************************************************************************
     * method name: constructYoutubeHint
     * getting the youtube search result from model object by calling searchYoutube method of model and recieve the
     result by call back function and then pass it to view by calling displayYouTubeHint method of modal
     * @params : empty
     * @returns: nothing
     */

    this.constructYoutubeHint = function(){
        this.help = 2;
        $('#hintTitle').text('Youtube');

        var questionText = $('#question').text();

        view.prepareLoadingIcon();

        console.log("Question was: "+questionText);

        model.searchYoutube(questionText, function(result){
            console.log('Searched youtube!');
            // $('#hintBody').append(result);

            var newIFrame = $('<iframe>').attr({
                'src':result+'?autoplay=1',
                // 'width':'560px',
                // 'height':'315px'
                'height': '110%',
                'width': '100%'
            });

            view.removeLoadingIcon();
            view.displayYoutubeHint(newIFrame);

            // $('#hintBody').css('height', '80%').append(newIFrame);
        });
    };

    this.randomThree = function(string){
        var newStringArray = [];
        var wordCount = 0;
        var newString = '';
        newStringArray = string.split(' ');
        console.log(newStringArray);

        for(var i = 0; i < 3; i++){
            newString += newStringArray[Math.floor(Math.random()*(newStringArray.length-1) )];

            if(i !== 2){
                newString+='+';
            }
        }

        return newString;
    };

    /***************************************************************************************************
     * method name: constructTwitterHint
     * getting the Twitter search result from model object by calling searchTwitter method of model and recieve the
     result by call back function and then pass it to view by calling displayWikiHint method of modal
     * @params : empty
     * @returns: nothing
     */

    this.constructTwitterHint = function() {

        this.help =3;

        $('#hintTitle').text('Twitter');

        view.prepareLoadingIcon();

        var questionText = $('#question').text();

        var answerString = "";

        for (var i = 0; i < model.currentWrongAnswers.length; i++) {
            answerString += model.currentWrongAnswers[i] + " ";
        }

        answerString += model.currentAnswer;

        console.log('answer string is: ' + answerString);

        // console.log("Question was: "+questionText);

        var tempTwitterElement = new $('<div>').addClass('tempTwitter col-md-6 col-md-offset-4');

        $('.outerHintContent').append(tempTwitterElement);

        questionText = this.randomThree(questionText);


        model.searchTwitter(questionText, model.getTwitterEmbed, function (result) {
            console.log('raw embed data: ' + result);

            view.removeLoadingIcon();
            view.displayTwitterHint(result);


            // $('.tempTwitter').html(result);
        });
    }


}

