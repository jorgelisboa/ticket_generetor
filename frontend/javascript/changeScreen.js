function changeUrl() {
    setTimeout(() => {
        window.open(
            "http://localhost:5500/frontend/index.html", "_self"
        );
        
    }, 5000);
}

changeUrl();