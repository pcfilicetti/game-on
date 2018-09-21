$(document).ready(function() {

    function createLogo() {
        var logo = $("<img>", {
            src: "./assets/images/logo.png",
            id: "logo",
            alt: "logo image",
            class: "logoImage slide-in-blurred-bottom"
        });
        $("#logoDiv").append(logo);
    };
    createLogo();
    
    function createFindGroup() {
        var findGroup = $("<button>", {
            class: "btn-large",
            id: "findGroup",
            text: "Find a game near you!"
        });
        $("#findDiv").append(findGroup);
    };
    createFindGroup();


    function createCreateGroup() {
        var createGroup = $("<button>", {
            class: "btn-large",
            text: "Create an event!",
            id: "createGroup"
        });
        $("#createDiv").append(createGroup);
    };
    createCreateGroup();

}); //end document.ready