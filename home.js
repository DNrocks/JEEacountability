function openPlayer(player) {
    localStorage.setItem("selectedPlayer", player);
    window.location.href = "player.html";
}