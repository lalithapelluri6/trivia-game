$(document).ready(function() {
    //event listeners
    $("#start").on("click", trivia.startGame);
    $(document).on("click", ".option", trivia.guessChecker);
});

let trivia = {
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
        q1: 'What is the collective name for a group of lions?',
        q2: 'What are the only two mammals that lay eggs?',
        q3: 'What kind of animal is a komodo dragon?',
        q4: 'Which bird has the largest wingspan of any living bird?',
        q5: "What is the largest shark?",
        q6: 'What type of animal is Mexican hairless?',
        q7: "What kind of creature is a portuguese man o' war?"
    },
    options: {
        q1: ['A pride', 'A flock', 'A group', 'A pack'],
        q2: ['cow and lion', 'tiger and fox', 'a spiny anteater and duck billed platypus', 'a blue whale and a komodo dragon'],
        q3: ['snake', 'frog', 'lizard', 'bird'],
        q4: ['crane', 'flamingo', 'wandering albatross', 'bald eagle'],
        q5: ['hammer head', 'tiger shark', 'great white', 'whale shark'],
        q6: ['a cat', 'a fox', 'a cow', 'a dog'],
        q7: ['shark', 'whale', 'a jelly fish', 'turtle']
    },
    answers: {
        q1: 'A pride',
        q2: 'a spiny anteater and a duck billed platypus',
        q3: 'lizard',
        q4: 'wandering albatross',
        q5: 'whale shark',
        q6: 'a dog',
        q7: 'a jellyfish'
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

        let questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent);

        let questionOptions = Object.values(trivia.options)[trivia.currentSet];

        $.each(questionOptions, function(index, key) {
            $('#options').append($('<button class="option btn btn-info btn-lg">' +key+ '</button>'));
        })
    },
    timerRunning : function() {
        if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
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
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet]+'</h3>h3>');

        }
        else if(trivia.currentSet === Object.keys(trivia.questions).length) {

            $('#results').html('<h3>Thank you for playing!</h3>' +
            '<p>Correct: ' + trivia.correct + '</p>' +
            '<p>Incorrect: '+ trivia.incorrect +'</p>' +
            '<p>Unanswered: '+ trivia.unanswered + '</p>' +
            '<p>Please play again!</p>');

            //hide game section
            $('#game').show();
        }
    },

    //method to evaluate option clicked

    guessChecker : function() {

        //timer Id for game Result

        let resultId;

        let currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

        if ($(this).text() === currentAnswer) {
            //turn button green for correct
            $(this).addClass('btn-success').removeClass('btn-info');

            trivia.correct++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Correct Answer!</h3>');
        } else {
            $(this).addClass('btn-danger').removeClass('btn-info');

            trivia.incorrect++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Better luck next time!' + currentAnswer + '</h3>');
        }
    },
        guessResult : function(){
            trivia.currentSet++;
          $('.option').remove();
          $('#results h3').remove();

          trivia.nextQuestion();

    }
};
