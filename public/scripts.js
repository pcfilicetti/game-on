$(document).ready(function () {

    // ALL THE HIDDEN ITEMS
    $("#resultsDiv").hide();
    $("#gameSportsRow").hide();
    $("#createEventDiv").hide();
    $("#dynamicDiv").hide();
    $("#findEventDiv").hide();
    $('.datepicker').hide();

    function createLogo() {
        var logo = $("<img>", {
            src: "./logo.png",
            id: "logo",
            alt: "logo image",
            class: "logoImage slide-in-blurred-bottom"
        });
        $("#logoDiv").append(logo);
    }
    createLogo();

    function createFindGroup() {
        var findGroup = $("<button>", {
            class: "btn-large slide-in-blurred-left",
            id: "findGroup",
            text: "Find an event near you!"
        });
        $("#findDiv").append(findGroup);
    }
    createFindGroup();

    function createCreateGroup() {
        var createGroup = $("<button>", {
            class: "btn-large slide-in-blurred-right",
            text: "Create an event!",
            id: "createGroup"
        });
        $("#createDiv").append(createGroup);
    }
    createCreateGroup();

    function createSearchDiv() {
        $("#findGroup").click(function () {
            $("#findDiv").empty();
            $("#createDiv").empty();
            // show - hide
            $("#dynamicDiv").show();
            $("#findEventDiv").show();
            // $("#resultsDiv").show();
            $("#gameSportsRow").show();
            $("#submitBtnRow").show();
        });
    }
    createSearchDiv();

    function createEventInfo() {
        $("#createGroup").click(function () {
            $("#findDiv").empty();
            $("#createDiv").empty();
            $('.datepicker').show();
            // show - hide
            $("#createEventDiv").show();
            $("#dynamicDiv").show();
        });
    }
    createEventInfo();
    // create:
    // name X
    // address X
    // email X
    // sports or gaming X
    // title X
    // description X
    // date and time
    // submit button X


    var submit = $("#submitCreateDiv");

    submit.on("click", function (event) {

        event.preventDefault();

        var title = $("#title").val();
        var address = $("#address").val();
        var zip = parseInt($("#zip").val());
        var contact = $("#email").val();
        var desc = $("#description").val();
        var date = $("#datepicker").val();

        if (!title || !address || !zip || !contact || !desc || !date) {
            window.alert("Please complete each data field.");
            return false;
        }

        if ($("#sportRadio").prop('checked')) {
            firebase.database().ref('events/sports/' + zip + '/' + title).set({
                address: address,
                contactInfo: contact,
                description: desc,
                dateTime: date,
                zip: zip
            });
            window.alert("Event submitted!");
        } else if ($("#gameRadio").prop("checked")) {
            firebase.database().ref('events/gaming/' + zip + '/' + title).set({
                address: address,
                contactInfo: contact,
                description: desc,
                dateTime: date,
                zip: zip
            });
            window.alert("Event submitted!");
        }
    });

    var resultDistance;

    // This is the code for querying the zip codes to return actual coherent data
    function queryFirebase(num) {
        var zipCode = $("#zipCode").val();
        var upZip = '' + parseInt(parseInt(zipCode) + 5);
        var botZip = '' + parseInt(parseInt(zipCode) - 5);
        if (num == 0) {
            firebase.database().ref('events/sports').on('value', function (snap) {
                results.push(snap.val());
            });
        } else if (num == 1) {
            firebase.database().ref('events/gaming').on('value', function (snap) {
                results.push(snap.val());
            });
        }
        setTimeout(function () {
            for (var i in results[0]) {
                if (parseInt(i) > upZip || parseInt(i) < botZip) {
                    delete results[0][i];
                }
                console.log('for in ran');
            }
            result = results[0];
            console.log("these are the results within 5 zips");
            console.log(result);
            var resultAdd, resultTitle, resultContact, resultDateTime, resultDate, resultTime, resultDesc;
            var today = new Date();
            for (var i in result) {
                console.log("zipcode")
                console.log(result[i]);

                for (var j in result[i]) {
                    resultDateTime = new Date(result[i][j].dateTime);
                    if (today > resultDateTime) {
                        delete result[i][j];
                        if (jQuery.isEmptyObject(result[i])) {
                            delete result[i];
                        }
                        console.log("results by title");
                        console.log(result);
                    }

                    resultZip = result[i][j].zip;

                    distanceObject = {
                        firstZip: zipCode,
                        secondZip: resultZip
                    }

                    console.log("this is our distance info" + distanceObject.firstZip);

                    // $.get("/api/distance", function (res) {
                    //     console.log(res);
                    //     // resultDistance = distanceData;
                    // });

                    $.post("/api/distance", distanceObject, function (res) {
                        resultDistance = res;
                        console.log("the distance from user is " + resultDistance);
                    });

                    console.log("distance data is = " + resultDistance);
                    //GOOGLE DISTANCE MATRIX HERE

                    resultAdd = result[i][j].address;
                    resultTitle = j;
                    resultContact = result[i][j].contactInfo;
                    resultDate = dateFormat(resultDateTime, "dddd, mmmm dS, yyyy");
                    resultTime = dateFormat(resultDateTime, "h:MM TT");
                    resultDesc = result[i][j].description;


                    // generateResults(resultTitle, resultAdd, resultContact, resultDate, resultTime, resultDesc);
                    console.log(resultTitle, resultAdd, resultContact, resultDate, resultTime, resultDesc);

                    //================================

                    var cards = $("#results");
                    cards.append(createCard());

                    function createCard(cards) {

                        var cardContent = `
                    <div class="col m4">
                        <div class="card medium">
                            <div class="card-image">
                            <img src="http://liherald.com/uploads/original/1433962027_7dd2.jpg">
                                <span class="card-title">${resultTitle}</span>
                            </div>
                            <div class="card-content">
                            <p>${resultAdd}</p>
                            <p>${resultDesc}</p>
                            <p>${resultDate}</p>
                            <p>${resultTime}</p>
                            <p>${resultContact}</p>
                            <p>${resultZip}</p>
                            <p>${resultDistance}</p>
                            </div>
                        </div>
                    </div>
                    `
                        console.log(cardContent);
                        console.log(resultTitle + "oooooooooogabooga")

                        // return newCard.append(cardContent);
                        return cardContent;
                    }




                    //================================
                }
            }
        }, 1000);
    }

    var results = [];
    var result;
    $("#sportsBtn").on("click", function () {
        queryFirebase(0);
    });
    $("#gamingBtn").on("click", function () {
        queryFirebase(1);
    });

}); //end document.ready