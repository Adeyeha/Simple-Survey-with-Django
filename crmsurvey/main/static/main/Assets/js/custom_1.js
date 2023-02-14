function submit(){
var data = {}
$("#form :not(:radio)").each(function(){
  var input = $(this); //This is the jquery object of the input, do what you will
  data[input.attr('name')] = input.val();
 });
 $("#form :checked").each(function(){
  var input = $(this); //This is the jquery object of the input, do what you will
  data[input.attr('name')] = input.val();
 });
 const requestOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json"},
  body: JSON.stringify(data),
};
fetch("/api",requestOptions )
  .then((res) => res.json())
  .then((data) => {})
}


var emojiContainer = document.querySelectorAll(".emoji-container label");

for (var i = 0; i < emojiContainer.length; i++) {
  emojiContainer[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");

    // If there's no active class
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }

    // Add the active class to the current/clicked button
    this.className += " active";
  });
};


$(document).ready(function () {
  // Fields to be displayed based on user selection are first hidden onload
  $(".satisfactionFeedback").hide();
  $(".question2").hide();
  $(".question4").hide();
  $(".question5").hide();
  $(".notSolved").hide();
  $(".suggestion").hide();
  $("#caseClosed").hide();
  $("#caseReopened").hide();
  $(".submit-button").hide();
  $(".end").hide();

  function deActivateQuesOne() {
    $('input[name=isResolved]').attr("disabled", true);
    $('.question1 label').hover(function () { $(this).addClass('no-hover'); })
  }

  //Start of Logic to display  fields based on user's response to question1
  $('input[type=radio][name=isResolved]').change(function () {
    var answerOne = $(".question1 .isResolved:checked").val();

    // This is the flow if user selects "Yes" to question 1
    if (answerOne == "Yes") {
      $(".question1").show();
      $(".satisfactionFeedback").show();
      $(".progress-bar").css("width", "100%");
      $(".submit-button").show();
      $(".question2").hide();
      $(".question4").hide();
      $(".question5").hide();
      $(".suggestion").hide();
      $(".notSolved").hide();

      //User selects "Yes" to question1 and is required to select satisfaction level
      if ($(".satisfactionFeedback").is(":visible")) {
        $(".submit-button").show();
        $('input[type=radio][name=isSatisfied]').change(function () {
          $(".satisfactionFeedbackWarning").hide();
          deActivateQuesOne();
        });

        $(".submitBtn").click(function () {
          let satisfactionFeedback = $(".satisfactionFeedback .emojiRadioButton:checked").val();

          submit();

          //User is required to select satisfaction level to proceed
          //The program continues the same way regardless of what user selects
          if (satisfactionFeedback) {
  
            $(".question1").hide();
            $(".satisfactionFeedback").hide();
            $(".end").show();
            setTimeout(function () {
              $("#caseClosed").show();
              $(".end").hide();
            }, 3000);

            $(".loader-bar").animate({ 'width': '100%' }, 2000);
            // $("#caseClosed").show();
            $(".submit-button").hide();
          }
          else {
            $(".satisfactionFeedbackWarning").html("Please provide an answer to proceed");
          }
        });
      }
    }
    //End of the "Yes" flow based on question1

    // This is the flow if user selects "No" to question1
    else if (answerOne == "No") {
      $(".satisfactionFeedback").hide();
      $(".question1").show();
      $(".submit-button").hide();
      $(".question2").show();
      $(".question4").show();
      $(".question5").hide();
      $(".suggestion").show();
      $(".notSolved").show();
      $(".progress-bar").css("width", "75%");

      if ($(".question2").is(":visible")) {
        $('input[type=radio][name=isHelpful]').change(function () {
          $(".questionTwo").html("");
          deActivateQuesOne();
        });

        checkIfReopen();
        $('input[type=radio][name=isReopen]').change(function () {
          var isReopen = $(".question4 .isReopen:checked").val();
          if (isReopen == "Yes") {
            $(".submit-button").show();
            $(".submit-button").unbind("click");
            $(".question5").hide();
            $(".progress-bar").css("width", "100%");

            $(".submit-button").click(function () {
              submit();
              let isHelpful = $(".question2 .isHelpful:checked").val();
              if (isHelpful) {
                $(".question1").hide();
                $(".satisfactionFeedback").hide();
                $(".notSolved").hide();
                $(".end").show();
                setTimeout(function () {
                  $("#caseReopened").show();
                  $(".end").hide();
                }, 3000);

                $(".loader-bar").animate({ 'width': '100%' }, 2000);
                $(".submit-button").hide();
              }
              else {
                $(".questionTwo").html("Please provide an answer to proceed");
              }
            });
          }

          // if (isReopen == "No") {
          else {
            // $(".notSolved").hide();
            $(".back-button").show();
            $(".submit-button").unbind("click");
            $(".submit-button").show();
            $(".question5").show();
            $(".progress-bar").css("width", "100%");

            $(".submit-button").click(function () {
              submit();
              let isHelpful = $(".question2 .isHelpful:checked").val();
              let phoneNumber = $(".question5 .phoneNumber").val();
              if (isHelpful) {
                if (phoneNumber.length > 0) {
                  $(".question5").hide();
                  $(".question1").hide();
                  $(".satisfactionFeedback").hide();
                  $(".notSolved").hide();
                  $(".end").show();
                  setTimeout(function () {
                    $("#caseClosed").show();
                    $(".end").hide();
                  }, 3000);

                  $(".loader-bar").animate({ 'width': '100%' }, 2000);
                  $(".submit-button").hide();
                }
                else {
                  $(".questionFive").html("Please provide an answer to proceed");
                }
              }
              else {
                $(".questionTwo").html("Please provide an answer to proceed");
              }

            });
          }


        });

        function checkIfReopen() {
          if ($("input[type=radio][name=isReopen]").is(":checked")) {
            var checkIsReopen = $(".question4 .isReopen:checked").val();
            if (checkIsReopen == "Yes") {
              $(".submit-button").show();
              $(".progress-bar").css("width", "100%");
              $(".question5").hide();
            }
            if (checkIsReopen == "No") {
              $(".submit-button").show();
              $(".question5").show();
              $(".progress-bar").css("width", "75%");
            }
          }
        }
      }
    }

    // The warning span is displayed to ensure the user makes a selection for question1
    else {
      $(".questionOne").html("Please provide an answer to proceed");
    }
  });

});
