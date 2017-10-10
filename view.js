// <<<<<<< HEAD
// function View()
// {
//     this.playerOneName = null;
//     this.playerTwoName = null;
//     this.playerOneAvatar = null;
//     this.playerTwoAvatar = null;
//     this.playerOnePoint = 0;
//     this.playerTwoPoint = 0;
//     this.playerTurn = null;
//     this.helpsArray = [{title:"youtube",quantities:3},{title:"wikipedia",numbers:3},{title:"pass",numbers:3}];
//
//
//     this.getPlayerNameImage = function(turn,name,avatar)
//     {
//         if (turn === 1)
//         {
//             this.playerOneName = name;
//             this.playerOneAvatar = avatar;
//         }
//
//         if (turn === 2)
//         {
//             this.playerTwoName = name;
//             this.playerTwoAvatar = avatar;
//         }
//     };
//
//     this.updateDomElements = function()
//     {
//
//
//
//     };
//
//     this.askPlayerToSelectCategory = function()
//     {
//         var selectedQuestion = {};
//         selectedQuestion.category = null;
//         selectedQuestion.difficulty = null;
//         return selectedQuestion;
//     };
//
//     this.questionSelectionButtonClicked = function()
//     {
//         var questionRequest = {};
//         questionRequest.categoryId = this.id;
//         questionRequest.difficultydata = this.data;
//         return questionRequest;
//
//     };
//
//     this.UseHelps = function()
//     {
//         var help = null;
//         for (var i=0; i < this.helpsArray; i++)
//         {
//             if ( help === this.helpsArray[i].title && this.helpsArray[i].quantities > 0)
//             {
//                 this.helpsArray[i].quantities--;
//                 break;
//             }
//
//             if (this.helpsArray[i].quantities > 0)
//             {
//                 alert("you can not this hint anymore");
//             }
//         }
//
//
//     };
//
// }

$(document).ready(initializeGame);

function initializeGame(){
    $(document).on('click', '#wiki', {type:'wiki'}, newGame.hintToggle);
    $(document).on('click', '#youtube', {type:'youtube'}, newGame.hintToggle);
    $(document).on('click', '#twitter', {type:'twitter'}, newGame.hintToggle);

    // newGame.setupButtons();
    newGame.setupNextQuestion();

    $('.btn').css({'outline': 'none'});

    $('[data-toggle="tooltip"]').tooltip();
}

function Game(){
    var self = this;
    this.hintHTML = null;

    this.categories = ['General Knowledge', 'Science & Nature', 'History', 'Geography', 'Celebreties', 'Animals', 'Sports', 'Books', 'Music', 'Film'];



    this.setupNextQuestion = function(){
        for(var i = 0; i < self.categories.length; i++){
            var newOptionElement = new $('<option>').text(self.categories[i]);
            $('.form-control').append(newOptionElement);
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
        $('#searchButton').attr('data-original-title', 'Use 3 points');
    };

    this.constructYoutubeHint = function(){
        $('#hintTitle').text('Youtube');
        $('#searchButton').attr('data-original-title', 'Use 2 points');
    };

    this.constructTwitterHint = function(){
        $('#hintTitle').text('Twitter');
        $('#searchButton').attr('data-original-title', 'Use 1 point');
    };
}

var newGame = new Game();
