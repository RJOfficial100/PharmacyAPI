
var paramValue;
$(document).ready(function () {

    $('#MedForm input').attr('readonly', 'readonly');
    var url_string = window.location.href;
    var url = new URL(url_string);
 //get parameter
    paramValue = url.searchParams.get("id");
//Get Request
    $.getJSON('https://localhost:44363/api/MedRecords/'+paramValue, function (data) {
        $("#Name").val(data.name);
        $("#Brand").val(data.brand);
        $("#Price").val(data.price);
        $("#Quantity").val(data.quantity);
        var date = data.date.split('T')[0];
        $("#Date").val(date);
    });
    
});
//update record function
function UpdateDB() {
    var Name = $("#Name").val();
    var Brand = $("#Brand").val()
    var Price = $("#Price").val();
    var Quantity = $("#Quantity").val();
    var Dat = $("#Date").val();
//validations
    if (Name == "") {
        $("#spanName").text("Please add valid Name");
    }
    else if (Price <= 0) {
        $("#spanPrice").text("Price Must be greater then 0");
    }
    else if (Quantity <= 0) {
        $("#spanQuantity").text("Quantity Must be greater then 0");
    }
    else if (new Date(Dat) < new Date()) {
        $("#spanDate").text("Date must be in future");
    }
    else if (Dat == "") {
        $("#spanDate").text("Enter correct Date");
    }

    else {
        var tempPrice = parseFloat(Price).toFixed(2);
        console.log(tempPrice);
//Put Request
        var dataObj = { "id": parseInt(paramValue), "name": Name, "brand": Brand, "price": parseFloat(tempPrice), "quantity": parseInt(Quantity), "date": Dat };
        $.ajax({
            url: 'https://localhost:44363/api/MedRecords/' + paramValue,
            type: 'PUT',
            contentType: "application/json",
            data: JSON.stringify(dataObj),
            success: function (result) {
                alert("Successfully Updated");
                $('#MedForm input').attr('readonly', 'readonly');
                $("#UpdateButton").html("Edit");
                $("#UpdateButton").removeAttr("onClick");
                $("#UpdateButton").attr("id", "EditButton");
                location.reload();
            }
        });
    }

}
//edit button
$("#EditButton").click(function () {
    $('#MedForm input').removeAttr('readonly');
    $(this).html("Update");
    $(this).attr("id","UpdateButton");
    $(this).attr("onClick", "UpdateDB()");

});
//delete button
$("#DeleteButton").click(function () {
    //delete request
    $.ajax({
        url: 'https://localhost:44363/api/MedRecords/'+paramValue,
        type: 'DELETE',
        success: function (result) {
            location.href = "/index.html";
        }
    });
});
//removing errors
$(".form-control").keypress(function () {
    $(".error").empty();
});



