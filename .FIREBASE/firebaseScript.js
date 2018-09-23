$(document).ready(function () {
    // var database = firebase.database();
    // //gameBin: '0' = sports; '1' = gaming
    // function writeUserData(address, zip, contact, gameBin, title, desc, date, time) {
    //     if (gameBin == 0) {
    //         database.ref('events/sports/' + title).set({
    //             address: address,
    //             zipCode: zip,
    //             contactInfo: contact,
    //             description: desc,
    //             date: date,
    //             time: time
    //         }); 
    //     } else if (gameBin == 1) {
    //         database.ref('events/gaming/' + title).set({
    //             address: address,
    //             zipCode: zip,
    //             contactInfo: contact,
    //             description: desc,
    //             date: date,
    //             time: time
    //         });
    //     }
    // }

    var submit = $("#testSubmit");
    var results = $("#testResults");

    submit.on("click", function (event) {
        var title = $("#inputTitle").val();
        var address = $("#inputAddress").val();
        var zip = parseInt($("#inputZip").val());
        var contact = $("#inputContact").val();
        var desc = $("#inputDescription").val();
        var date = $("#inputDateTime").val();
        if ($("#sports").prop('checked')) {
            firebase.database().ref('events/sports/' + title).set({
                address: address,
                zipCode: zip,
                contactInfo: contact,
                description: desc,
                dateTime: date
            });
        } else if ($("#gaming").prop("checked")) {
            firebase.database().ref('events/gaming/' + title).set({
                address: address,
                zipCode: zip,
                contactInfo: contact,
                description: desc,
                dateTime: date,
                time: time
            });
        }
        results.text("Finished Pushing Data");
    });
});