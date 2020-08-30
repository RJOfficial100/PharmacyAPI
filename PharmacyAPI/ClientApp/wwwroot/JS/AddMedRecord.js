//function for Add New Medicine.
function AddMed() {
    var Name = $("#Name").val();
    var Brand = $("#Brand").val()
    var Price = $("#Price").val();
    var Quantity = $("#Quantity").val();
    var Dat = $("#Date").val();
    var Notes = $("#Notes").val();

    //Validations
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
    else if (Dat=="") {
        $("#spanDate").text("Enter correct Date");
    }
    else {
        var tempPrice = parseFloat(Price).toFixed(2);
 //Post request
        var dataObj = { "name": Name, "brand": Brand, "price": parseFloat(tempPrice), "quantity": parseInt(Quantity), "date": Dat, "notes": Notes };
        $.ajax({
            url: 'https://localhost:44363/api/MedRecords',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify(dataObj),
            success: function (result) {
                alert("Successfully Added");
                location.reload();
            },
            error: function () {
                alert("Something went wrong... Name is already Present");
            } 
        });
    }   
}

//removing error message
$(".form-control").keypress(function () {
    $(".error").empty();
});
