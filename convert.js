$(document).ready(function() {
  $("#submit").on("click", function() {
    var date1Entered = Date.parse($("#start-date").val());
    var date2Entered = Date.parse($("#end-date").val());
    var frequency = $("#freq").val();
    var freq_type = $("#freq-type").find(":selected").text();
    var convertType = $("#convertType").find(":selected").text();


    //if statements to catch input errors
    if (date1Entered < date2Entered) {
      var days = convertDate(date1Entered, date2Entered);
      var weeks = Math.abs(Math.round((days / 7) * 10) / 10);
      var months = Math.abs(Math.round((weeks / 4.34534) * 10) / 10);
      var units = getUnits(date1Entered, date2Entered, frequency, convertType, freq_type);

      $("#output-days").html(days + " days");
      $("#output-weeks").html(weeks + " weeks");
      $("#output-months").html(months + " months");
      $("#output-units").html(units + " units");
      console.log(units);

    } else if (isNaN(date1Entered) || isNaN(date2Entered) || isNaN(frequency)) { //catch if no date was entered
      $("#output-days").html("<h3>You will need to select a start date, end date, and frequency!</h3>");
      $("#output-weeks").html("");
      $("#output-months").html("");
      $("#output-units").html("");
    } else { //catch if end date is before start date
      $("#output-days").html("<h3>Your end date cannot be before your start date! <br> Please try again!</h3>");
      $("#output-weeks").html("");
      $("#output-months").html("");
      $("#output-units").html("");
    }

  });

  function convertDate(date1Entered, date2Entered) {

    //1 day in milliseconds
    var one_day = 1000 * 60 * 60 * 24;

    //Declare dates entered as a date (might be necessary)
    //var date1Entered = new Date();
    //var date1Entered = new Date();

    //Convert dates to milliseconds
    var date1_ms = new Date(date1Entered).getTime();
    var date2_ms = new Date(date2Entered).getTime();

    //find difference between dates in milliseconds
    var difference_ms = date2_ms - date1_ms;

    //add two days back in to account for the first and the last day
    var days = Math.abs(Math.round((difference_ms / one_day)) + 1);

    return days;

  }

  function getUnits(date1Entered, date2Entered, frequency, convertType, freq_type) {

    var foundDays = convertDate(date1Entered, date2Entered)
    var unitsInHour = 4;

    if (convertType == "hrs") {
      if (freq_type === "week") {
        console.log(Math.abs(Math.round((frequency * (foundDays / 7) * unitsInHour))));
        return Math.abs(Math.round((frequency * (foundDays / 7) * unitsInHour)));
      } else if (freq_type === "month") {
        console.log(Math.abs(Math.round((frequency * (foundDays / 30.4) * unitsInHour))));
        return Math.abs(Math.round((frequency * (foundDays / 30.4) * unitsInHour)));
      } else {
        console.log(Math.abs(Math.round((frequency * foundDays) * unitsInHour)));
        return Math.abs(Math.round((frequency * foundDays) * unitsInHour));
      }
    } else if (convertType === "units") {
      if (freq_type === "week") {
        console.log(Math.abs(Math.round((frequency * (foundDays / 7)))));
        return Math.abs(Math.round((frequency * (foundDays / 7))));
      } else if (freq_type === "month") {
        console.log(Math.abs(Math.round((frequency * (foundDays / 30.4)))));
        return Math.abs(Math.round((frequency * (foundDays / 30.4))));
      } else {
        console.log(Math.abs(Math.round((frequency * foundDays))));
        return Math.abs(Math.round((frequency * foundDays)));
      }
    }

  }

});
