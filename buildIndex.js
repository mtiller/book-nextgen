var glob = require("glob");
var lunr = require("lunr");
var path = require("path");
var fs = require("fs");

// Put these in a module
async function getPages() {
    return new Promise((resolve, reject) => {
        glob(
            "**/*.fjson",
            {
                cwd: path.join(__dirname, "json"),
            },
            (err, files) => {
                if (err) reject(err);
                else resolve(files);
            },
        );
    });
}

async function getData(filename) {
    const raw = fs.readFileSync(path.join(__dirname, "json", filename));
    let str = raw.toString();
    // str = str.replace(imagesRE3, "/static/_images/");
    // str = str.replace(imagesRE2, "/static/_images/");
    // if (runMath) {
    //     const obj = JSON.parse(str);
    //     if (obj.body) {
    //         obj.body = await mathify(obj.body);
    //     }
    //     str = JSON.stringify(obj);
    // }
    return str;
}

async function buildIndex() {
    const pages = await getPages();
    let fileData = {};
    await Promise.all(
        pages.map(async page => {
            const data = await getData(page);
            fileData[page] = data;
        }),
    );
    var idx = lunr(function() {
        const obj = this;
        obj.field("id");
        obj.field("title");
        obj.field("body");

        pages.forEach(page => {
            console.log("Processing " + page);
            const data = JSON.parse(fileData[page]);
            if (data.title && data.body) {
                const addition = {
                    title: data.title,
                    body: data.body,
                    id: `/${data.current_page_name}/`,
                };
                // console.log("addition = ", addition);
                obj.add(addition);
            }
        });
    });
    fs.writeFileSync("test.idx", JSON.stringify(idx.toJSON()));
}

buildIndex().catch(err => console.error(err));
