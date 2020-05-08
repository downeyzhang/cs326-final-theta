function addRequirement() {
    var require = $("#require").val();
    if (require.length == 0) {
        alert("Any input field should not be empty");
    } else {
        $("#requirements").append('<li class="list-group-item">'+require+'</li>');
    }
}
function addScore() {
    var scoreName = $("#scoreName").val();
    var scoreValue = $('#scoreValue').val();
    if (scoreValue.length == 0 || scoreValue.length == 0) {
        alert("Any input field should not be empty");
    } else {
        $("#score").append('<li class="list-group-item"><div class="form-row"><div class="col"><span>'+scoreName+'</span></div><div class="col"><span>'+scoreValue+'%</span></div></div></li>');
    }
}
function addProject() {
    var project = $("#projectInput").val();
    if (project.length == 0) {
        alert("Any input field should not be empty");
    } else {
        $("#project").append('<li class="list-group-item">'+project+'</li>');
    }
}
function addTeammate() {
    var name = $("#teammateName").val();
    var position = $('#teammatePosition').val();
    if (name.length == 0 || position.length == 0) {
        alert("Any input field should not be empty");
    } else {
        $("#teammates").append('<li class="list-group-item"><div class="form-row"><div class="col"><span>'+name+'</span></div><div class="col"><span>'+position+'</span></div></div></li>');
    }
}