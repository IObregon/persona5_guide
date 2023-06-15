var fs = require('fs');
var cheerio = require('cheerio');

const main = () => {
    const $ = cheerio.load(fs.readFileSync('input.html'));
    const replacer = new RegExp(';', 'g');

    const all = $('div[id*="SectionContainer"]');
    const result = all.map(function () {
        const title = $(this).children('div').children('div').children('h3').text();
        const header = $(this).children('div').children('div').children('div').children('div').children('table').children('thead').children('tr').children('th').text();
        const other = $(this).children('div').children('div').children('div').children('div').children('table').children('tbody').children('tr');
        const extra = other.map(function () {
            let result2 = {};
            const algo = $(this).children('td');
            if (algo.length === 1) {
                result2.subHeader = algo.text().replace(/((\s+)?\n(\s+$)?)/g, '').replace(/ +(?= )/g, '').replace(replacer, '; \n');
            } else if (algo.length > 1 && algo.length <= 3) {
                result2 = algo.map(function () { return $(this).text() }).toArray()
                    .reduce((prev, next, index) => {
                        if(next === 'Date' || next === 'Day' || next === 'Night'){
                            return;
                        }
                        if (index === 0) {
                            prev.date = next;
                        } else if (index === 1) {
                            prev.day = next.replace(/((\s+)?\n(\s+$)?)/g, '').replace(/ +(?= )/g, '').replace(replacer, '; \n');
                        } else {
                            prev.night = next.replace(/((\s+)?\n(\s+$)?)/g, '').replace(/ +(?= )/g, '').replace(replacer, '; \n');
                        }
                        return prev;
                    }, {})
            }
            return result2;
        }).toArray();
        let subHeader = "";
        if(extra.length && extra[0].subHeader !== undefined){
            subHeader = extra[0].subHeader;
            extra.shift();
        }
        return { title, header, subHeader, extra };
    }).toArray();


    fs.writeFileSync("../persona_5_guide_ui/public/data.json", JSON.stringify(result.slice(2, 12)));
    return result;
}

main();
