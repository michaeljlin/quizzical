function Controller()
{
    this.playerOneName = null;
    this.playerTwoName = null;
    this.playerOneAvatar = null;
    this.playerTwoAvatar = null;
    this.playerOnePoint = 0;
    this.playerTwoPoint = 0;
    this.playerTurn = null;
    this.helpsArray = [{title:"youtube",quantities:3},{title:"wikipedia",numbers:3},{title:"pass",numbers:3}];

    this.setPlayerInfo = function(playerInfoArray){
        model.playersInfo[0].name = playerInfoArray[0].name;
        model.playersInfo[1].name = playerInfoArray[1].name;

        view.displayPlayerNameAndAvatars(model.playersInfo[0].name, model.playersInfo[1].name);
    };

    this.answerButtonPressed = function(chosenAnswerText){
        var currentTurn = model.playersInfo[2];

        if(chosenAnswerText === model.currentAnswer){
            model.correctAudioObject.play();
            console.log('Player '+ (currentTurn+1) + ' got the question correct! Toggling next question modal!');
            model.playersInfo[currentTurn].points+=1;
            this.changeCurrentTurn();
            view.updateStatus(model.playersInfo[2] + 1, model.playersInfo[0].points, model.playersInfo[1].points);
            view.nextQuestion();
        }
        else{
            model.wrongAudioObject.play();
            console.log('Player '+ (currentTurn+1) + ' got the question wrong! Toggling next question modal!');
            this.changeCurrentTurn();
            view.updateStatus(model.playersInfo[2] + 1, model.playersInfo[0].points, model.playersInfo[1].points);
            view.nextQuestion();
        }
    };

    this.setCurrentQuestionInModel = function(questionObject){
        if(questionObject === undefined){

            return;
        }
        else{
            model.getTriviaQuestion(questionObject.category, questionObject.difficulty, function(dataBank){

                var quoteFix = questionBank.question.replace(/&quot;/g,'\"');
                var apostFix = quoteFix.replace(/&#039;/g,'\"');

                var fixedIncorrectAnswers = [];

                for(var i = 0; i < dataBank.incorrect_answers.length; i++){
                    fixedIncorrectAnswers.push(controller.sanitizeText(dataBank.incorrect_answers[i]));
                }

                model.setCurrentQuestion(controller.sanitizeText(questionBank.question));
                model.setCurrentAnswer(controller.sanitizeText(dataBank.correct_answer));
                model.setCurrentWrongAnswers(fixedIncorrectAnswers);
                model.setCurrentCategory(dataBank.category);

                view.updateQuestion(model.currentCategory, model.currentQuestion);

                var temp = model.currentWrongAnswers.slice();
                temp.push(model.currentAnswer);

                for(var i = 0; i < temp.length; i++){
                    var randomPosition = Math.floor(Math.random()*(temp.length-1));
                    var hold = temp[i];
                    temp[i] = temp[randomPosition];
                    temp[randomPosition] = hold;
                }

                view.updateAnswers(temp);
            });
        }
    };

    this.sanitizeText = function(rawString){
        var quoteFix = rawString.replace(/&quot;/g,'\"');
        var apostFix = quoteFix.replace(/&#039;/g,'\"');

        return apostFix;
    };

    this.getPlayerNameImage = function(turn,name,avatar)
    {
        if (turn === 1)
        {
            this.playerOneName = name;
            this.playerOneAvatar = avatar;
        }

        if (turn === 2)
        {
            this.playerTwoName = name;
            this.playerTwoAvatar = avatar;
        }
    };

    this.getPlayerName = function(avatarAddress)
    {
        model.getPlayerName(avatarAddress);
        this.changeCurrentTurn();

    };

    this.getPlayerAvatar = function(avatarAddress)
    {
        model.getPlayerAvatar(avatarAddress);
        this.changeCurrentTurn();

    };

    this.changeCurrentTurn = function()
    {
        model.playersInfo[2] = 1-model.playersInfo[2];
    };

    this.updateDomElements = function()
    {



    };

    this.askPlayerToSelectCategory = function()
    {
        var selectedQuestion = {};
        selectedQuestion.category = null;
        selectedQuestion.difficulty = null;
        return selectedQuestion;
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

    this.pointing = function(turn,difficultylevel,help)
    {
        if ( turn === 1 && help === flase)
        {
            playerOnePoint *= difficultylevel*10;
        }

        if ( turn === 1 && help === true)
        {
            playerOnePoint *= (difficultylevel*10)/2;
        }
    };





    this.questionSelection = function(viewData)
    {
        var questionInfo = {};
        questionInfo.category = viewData.categoryId;
        questionInfo.difficulty = viewData.difficultydata;
        return questionifo;

    };

    this.getAndPassPlayersInfo = function()
    {
        var playersInfo = [];



    };

    this.printQuestionAndAnswers = function()
    {
        var tempObj = modal.getTriviaQuestion();
        $("#question").text(tempObj.question);
        $("#answer1").text();
        $("#answer2").text();
        $("#answer3").text();
        $("#answer4").text();

    }


    this.getTheAnswer = function ()
    {
        this.checktheAnswer();
    }








}

