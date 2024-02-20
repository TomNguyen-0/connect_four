


function navbar(){
    var title=document.title;
    var game, syntax = '';
    var isMobile = navigator.userAgent.toLowerCase().match(/mobile/i);
    // screen.width  used to check screen size
    if(isMobile){
        game = ``;
    }else{
        game = `<a class="nav-link" href="/developer/games.html" id="games">Games</a>`;
    }
    syntax=`
    <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <a class="nav-link" aria-current="page" href="/developer/home.html" id="homePage">Home</a>
                <a class="nav-link" href="/developer/resume.html" id="resumePage">Resume</a>
                <a class="nav-link" href="/developer/projects.html" id="projectsPage">Projects</a>
                <a class="nav-link" href="/developer/awards.html" id="awardsPage">Awards</a>
                ${game}
                <a class="nav-link" href="/developer/tools.html" id="tools">Tools</a>
                <a class="nav-link" href="/developer/contact.html" id="contactPage">Contact Me</a>
            </div>
        </div>
    </div>

    `;

    $(".navbar").append(syntax);
    if(title=="Home"){
        $("#homePage").addClass("active");
    }else if(title =="Resume"){
        $("#resumePage").addClass("active");
    }else if(title =="Projects"){
    $("#projectsPage").addClass("active");
    }else if(title =="Awards"){
        $("#awardsPage").addClass("active");
    }else if(title =="References"){
        $("#referencesPage").addClass("active");
    }else if(title =="Games" || title=='Badge Collector!' || title=='Fix Errors and Computers'){
        $("#games").addClass("active");
    }else if(title =="Tools"){
        $("#tools").addClass("active");
    }else if(title =="Contact Me"){
        $("#contactPage").addClass("active");
    }
}

{/* <a class="nav-link" href="references.html" id="referencesPage">References</a> */}