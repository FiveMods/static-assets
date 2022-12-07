// Login
function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
}
  
function startTime() {
    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();
    var date = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();

    // Make month text based
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    // Add a zero in front of numbers<10
    hours = checkTime(hours);
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);
    month = months[month];
    document.getElementById('datetime').innerHTML = `${hours}:${minutes}:${seconds} - ${month} ${date}, ${year}`;
    t = setTimeout(function() {
      startTime()
    }, 500);
}
startTime()
