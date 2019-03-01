$(document).ready(function() {
    //event listeners
    $("#time-remain").on("click", trivia.startGame);
    $(document).on("click", ".option", trivia.quessChecker);
})

var trivia = {
    //trivia properties
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId: '',
    //questions options and answers data
    questions: {
        q1: 'Who is actually a chef?',
        q2: 'What does Joey love to eat?',
        q3: 'How many times has Ross been divorced?',
        q4: 'How many types of towels does Monica have?',
        q5: "Who stole Monica's thunder after she got engaged?",
        q6: 'Who hates Thanks giving?',
        q7: "Who Thinks they're always the last to find out everything?"
    },
    options: {
        q1: ['', '', '', ''],
        q2: ['', '', '', ''],
        q3: ['', '', '', ''],
        q4: ['', '', '', ''],
        q5: ['', '', '', ''],
        q6: ['', '', '', ''],
        q7: ['', '', '', '']
    },
    answers: {
        q1: 'Monica',
        q2: '',
        q3: '',
        q4: '',
        q5: '',
        q6: '',
        q7: ''
    },
    //trivia methods
    startGame: function () {
        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);

        //show game section
        $('#game').show();

        //empty last results
        $('#results').html('');

        //show timer
        $('#timer').text(trivia.timer);

        //remove start button
        $('#start').hide();

        $('#time-remain').show();

        //ask first question
        trivia.nextQuestion();
    },

    nextQuestion: function() {
        //set timer to 20 sec for each question
        trivia.timer = 10;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);

        //to prevent timer speed up
        if(!trivia.timerOn){
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }

        var questionContent = object.values(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent);

        var questionOptions = object.values(trivia.options)[trivia.currentSet];

        $.each(questionOptions, function(index, key) {
            $('#options').append($('<button class="option btn btn-info btn-lg">' +key+ '</button>'));
        })
    },
    timeRunning : function() {
        if(trivia.timer > -1 && trivia.currentSet < object.keys(trivia.questions).length) {
            $('#timer').text(trivia.timer);
            trivia.timer--;
             if(trivia.timer === 4) {
                 $('#timer').addClass('last-seconds');
             }
        }

        else if(trivia.timer === -1) {
            trivia.unanswered++;
            trivia.result = false;
            clearInterval(trivia.timerId);

        }
    }
}
