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

    $('.btn').css({'outline': 'none', 'margin-bottom': '10px'});

    $('[data-toggle="tooltip"]').tooltip();
}

function Game(){
    var self = this;
    this.hintHTML = null;
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
    };

    this.constructYoutubeHint = function(){
        $('#hintTitle').text('Youtube');
    };

    this.constructTwitterHint = function(){
        $('#hintTitle').text('Twitter');
    };
}

var newGame = new Game();
