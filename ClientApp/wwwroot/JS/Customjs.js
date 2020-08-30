var i;
var meddata = '';
var currentDate = new Date();

var datacontainer = document.getElementById("DynamicTable");
var count;
//getRequest
$.getJSON('https://localhost:44363/api/MedRecords', function (data) {
//creating dynamic grid view
    for (i = 0; i < data.length; i++)
    {
        var expDate = new Date(data[i].date);
        var diff = parseInt((expDate - currentDate) / 86400000);
        if (data[i].quantity <= 10 && diff <= 30) {
            console.log("both");
            meddata += ' <tr class="column customMixedColor" data-id=' + data[i].id + '><td><div><h3>' + data[i].name + '</h3><p>' + data[i].brand + '</p>';
            meddata += '<p>Price: ' + data[i].price + '</p><p>Quantity: ' + data[i].quantity + '</p><p>Expire Date: ' + data[i].date.split("T")[0] + '</p></div></td></tr > ';
        }
        else if (data[i].quantity <= 10 || diff <= 30) {
            if (diff <= 30) {
                meddata += ' <tr class="column customRedColor" data-id=' + data[i].id + '><td><div><h3>' + data[i].name + '</h3><p>' + data[i].brand + '</p>';
                meddata += '<p>Price: ' + data[i].price + '</p><p>Quantity: ' + data[i].quantity + '</p><p>Expire Date: ' + data[i].date.split("T")[0] + '</p></div></td></tr > ';
            }
            else {
                meddata += ' <tr class="column customYellowColor" data-id=' + data[i].id + '><td><div><h3>' + data[i].name + '</h3><p>' + data[i].brand + '</p>';
                meddata += '<p>Price: ' + data[i].price + '</p><p>Quantity: ' + data[i].quantity + '</p><p>Expire Date: ' + data[i].date.split("T")[0] + '</p></div></td></tr > ';
            }
        }
        else {
            meddata += ' <tr class="column" data-id=' + data[i].id + '><td><div><h3>' + data[i].name + '</h3><p>' + data[i].brand + '</p></div></p>';
            meddata += '<p>Price: ' + data[i].price + '</p><p>Quantity: ' + data[i].quantity + '</p><p>Expire Date: ' + data[i].date.split("T")[0] + '</p></div></td></tr > ';
        }
    }
    
    $("#DynamicTable").append(meddata);
});




// Get the elements with class="column"
var elements = document.getElementsByClassName("column");

// List View
function listView() {
  for (i = 0; i < elements.length;i++) {
        elements[i].style.width = "100%";
  }
}

// Grid View
function gridView() {
  for (i = 0; i < elements.length;i++) {
        elements[i].style.width = "50%";
  }
}

/* Optional: Add active class to the current button (highlight it) */
var container = document.getElementById("btnContainer");
var btns = container.getElementsByClassName("btn");
for (var i = 0; i < btns.length;i++) {
        btns[i].addEventListener("click", function () {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
}

//For searching purpose

var $block = $('.no-results');
$("#myInput").keyup(function () {
    var val = $(this).val();
    var isMatch = false;

    $("#DynamicTable tr").each(function (i) {
        var content = $(this).html();
        if (content.toLowerCase().indexOf(val) == -1) {
            $(this).hide();

        } else {
            isMatch = true;
            $(this).show();

        }
    });

    $block.toggle(!isMatch);
});


$("#DynamicTable").on("click", "tr", function () {
    //$(this).attr("data-id");
    window.location.href = "/medrecord.html?id="+$(this).attr("data-id");
});




