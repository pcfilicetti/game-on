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

        if ($("#gameRadio").prop('checked') && $("#image").val() == "") {
            var image = "https://i.amz.mshcdn.com/VN4DYfj6y_-7pAft3TwiTbipdFg=/950x534/filters:quality(90)/https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com%2Fuploads%2Fcard%2Fimage%2F664750%2F8fcbb4ea-e47d-453b-9eda-46d8c333ae80.jpg";
        } else if ($("#sportRadio").prop('checked') && $("#image").val() == "") {
            var image = "https://www.michaelgleibermd.com/news/wp-content/uploads/2015/01/year-round-sports.jpg";
        } else {
            var image = $("#image").val();
        }

        if ($("#sportRadio").prop('checked')) {
            firebase.database().ref('events/sports/' + zip + '/' + title).set({
                address: address,
                contactInfo: contact,
                description: desc,
                dateTime: date,
                zip: zip,
                image: image
            });
            window.alert("Event submitted!");
        } else if ($("#gameRadio").prop("checked")) {
            firebase.database().ref('events/gaming/' + zip + '/' + title).set({
                address: address,
                contactInfo: contact,
                description: desc,
                dateTime: date,
                zip: zip,
                image: image
            });
            window.alert("Event submitted!");
        }
    });

    var resultDistance;
    var mymap;

    function createMap(lat, long) {
        mymap = L.map('mapid').setView([lat, long], 15);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoicGNmaWxpY2V0dGkiLCJhIjoiY2ptaHQydGIyMDhuYTN2azFkc2s3Zjd4YSJ9.gXDzvNNZXObU1c-_1srBRQ'
        }).addTo(mymap);
    }

    function createMarker(lat, long, title, address, contact, date, time, description) {
        var marker = L.marker([lat, long]).addTo(mymap);
        marker.bindPopup("<b>" + title + "</b><br/>Address: " + address + "<br/>Description: " + description + "<br/>Date: " + date + "<br/>Time: " + time + "<br/>Email: " + contact);
    }

    function geocode(zip) {
        // Input of location from User
        // If then Statement.  If Input of Current Location is empty, then run the following, if not Alert the user. Reset the Field first before proceeding.
        var location = "zip " + zip;
        // Turn location into City and State.
        axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
                params: {
                    address: location,
                    key: "AIzaSyBZsXrosKvRGdreWJo2EPOxhvxor5LBaBQ"
                }
            })
            .then(function (response) {
                var latResult = response.data.results[0].geometry.location.lat;
                var lngResult = response.data.results[0].geometry.location.lng;
                createMap(latResult, lngResult);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function geocodeAddress(address, title, contact, date, time, description) {
        var location = address;

        axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
                params: {
                    address: location,
                    key: "AIzaSyBZsXrosKvRGdreWJo2EPOxhvxor5LBaBQ"
                }
            })
            .then(function (response) {

                var latResult = response.data.results[0].geometry.location.lat;
                var lngResult = response.data.results[0].geometry.location.lng;
                createMarker(latResult, lngResult, title, address, contact, date, time, description);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    var cardCount = 0;
    var ajaxCount = 0;
    // This is the code for querying the zip codes to return actual coherent data
    function queryFirebase(num) {
        var zipCode = $("#zipCode").val();
        var upZip = '' + parseInt(parseInt(zipCode) + 30);
        var botZip = '' + parseInt(parseInt(zipCode) - 30);
        results = [];
        if (num == 0) {
            firebase.database().ref('events/sports').on('value', function (snap) {
                results.push(snap.val());
            });
        } else if (num == 1) {
            firebase.database().ref('events/gaming').on('value', function (snap) {
                results.push(snap.val());
            });
        }
        geocode(zipCode);
        setTimeout(function () {
            for (var k in results[0]) {
                if (parseInt(k) > upZip || parseInt(k) < botZip) {
                    delete results[0][k];
                }
            }
            result = results[0];

            var resultAdd, resultTitle, resultContact, resultDateTime, resultDate, resultTime, resultDesc = '';
            var today = new Date();
            for (var i in result) {

                for (var j in result[i]) {
                    resultDateTime = new Date(result[i][j].dateTime);
                    if (today > resultDateTime) {
                        delete result[i][j];
                        if (jQuery.isEmptyObject(result[i])) {
                            delete result[i];
                        }
                    }

                    console.log(result[i][j]);

                    //GOOGLE DISTANCE MATRIX HERE

                    resultAdd = result[i][j].address;
                    resultTitle = j;
                    resultContact = result[i][j].contactInfo;
                    resultDate = dateFormat(resultDateTime, "dddd, mmmm dS, yyyy");
                    resultTime = dateFormat(resultDateTime, "h:MM TT");
                    resultDesc = result[i][j].description;
                    resultZip = i;
                    resultImage = result[i][j].image;
                    geocodeAddress(resultAdd, resultTitle, resultContact, resultDate, resultTime, resultDesc);

                    var cards = $("#results");

                    function createCard() {

                        var cardContent = `
                            <div class="col m4">
                                <div class="card medium">
                                    <div class="card-image">
                                        <div class="postergrad">
                                        <img class="poster" src="${resultImage}">
                                        </div>
                                        <span class="card-title"><b>${resultTitle}</b></span>
                                    </div>
                                    <div class="card-content" id="card${cardCount}">
                                        <p><b>Address: </b>${resultAdd}</p>
                                        <p><b>Zip: </b>${resultZip}</p>
                                        <p><b>Description: </b>${resultDesc}</p>
                                        <p><b>Date: </b>${resultDate}</p>
                                        <p><b>Time: </b>${resultTime}</p>
                                        <p><b>Contact: </b>${resultContact}</p>
                                    </div>
                                </div>
                            </div>  
                            `;

                        // return newCard.append(cardContent);
                        return cardContent;
                    }

                    cards.append(createCard());
                    cardCount++;
                    $.ajax({
                        "url": "https://calm-thicket-12645.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + zipCode + "&destinations=" + resultAdd + "&key=AIzaSyBZsXrosKvRGdreWJo2EPOxhvxor5LBaBQ",
                        "method": "GET"
                    }).then(function (data) {
                        // console.log(data);
                        // console.log(data.rows[0].elements[0].distance.text);
                        resultDistance = data.rows[0].elements[0].distance.text;
                        var distanceTag = $("<p>").html("<b>Distance: </b>" + resultDistance);
                        $("#card" + ajaxCount).append(distanceTag);
                        console.log("ran", ajaxCount, resultDistance);
                        ajaxCount++;
                    });
                }
            }
        }, 1000);
    }

    var results = [];
    var result;
    $("#sportsBtn").on("click", function () {
        $('#results').empty();
        queryFirebase(0);
    });
    $("#gamingBtn").on("click", function () {
        $('#results').empty();
        queryFirebase(1);
    });

}); //end document.ready