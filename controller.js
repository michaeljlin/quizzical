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

    this.getPlayerAvatar = function(avatarAddress)
    {
        model.getPlayerAvatar(avatarAddress);
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

