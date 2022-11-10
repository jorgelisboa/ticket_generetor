function changeUrl() {
    setTimeout(console.log("Olá mundo"), 5000)
    window.open(
        "http://localhost:5500/frontend/index.html", "_self"
    );
}

changeUrl();