let count = 0;

function load_document(url) {
    return fetch("https://github.com" + url).then(function (r) {
        return r.text();
    }).then(function (r) {
        return $(r).find("tbody");
    }).then(function (r) {
        if (r.length === 1) {
            return r[0].children;
        } else {
            return []
        }
    }).then(function (r) {
        count += r.length;
        let counter = document.getElementById("LOC_counter");
        counter.innerText = count.toString() + " LOC";
    })
}

function load_dir(url) {
    fetch("https://github.com" + url).then(function (r) {
        return r.text();
    }).then(function (r) {
        return $(r).find("tbody");
    }).then(function (r) {
        if (r.length === 2) {
            return r[1].children;
        } else {
            return []
        }
    }).then(function (r) {
        for (let e of r) {
            let spans = e.children[1].children;
            if (spans.length === 1) {
                let sub_url = spans[0].children[0].getAttribute("href");
                if (sub_url.includes("blob")) {
                    load_document(sub_url);
                } else {
                    load_dir(sub_url);
                }
            }
        }
    })
}

let repohead = document.getElementsByClassName("public")[0];
let counter = document.createElement("strong");
counter.id = "LOC_counter";
counter.innerText = count.toString();
repohead.appendChild(counter);

$("div.file-wrap").find("a").each(
    function(i) {
        if (i !== 0) {
            let url = $(this).attr("href");
            if (url.includes("/tree/")) {
                load_dir(url)
            } else if (url.includes("/blob/")) {
                load_document(url)
            }
        }
    }
);


