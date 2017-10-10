function View()
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




}