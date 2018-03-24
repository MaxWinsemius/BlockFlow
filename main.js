let topBottomMargin = 20;
var columns = [];

for (var i = 0; i < 4; i++) {
    columns.push({
        dom: $("#column" + i),
        items: [],
        getBottomHeight: function() {
            var height = 0;
            for (var j = 0; j < this.items.length; j++) {
                height += this.items[j].getBottomHeight();
            }

            return height;
        }
    })
}

var items = [];

{
    //create items
    var amnt = Math.floor(Math.random()*20) + 10;
    for (var i = 0; i < amnt; i++) {
        items[i] = newItem(i);
    }

    function newItem(id) {
        var item = {
            index: id,
            height: getRandomHeight(),
            color: getRandomColor(),
            getBottomHeight: function() {
                return this.height + topBottomMargin;
            }
        }

        return item;
    }

    function getRandomHeight()
    {
        return Math.floor(Math.random() * 140) + 50;
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        
        return color;
    }

}

//Add every item to the column where it hangs best
for (var i = 0; i < items.length; i++) {
    //Check which column has the lowest (absolute) y-position
    var lowestColumn = 0;
    for (var j = 1; j < 4; j++) {
        if(columns[j].getBottomHeight() < columns[lowestColumn].getBottomHeight()) {
            lowestColumn = j;
        }
    }

    //add item to column
    columns[lowestColumn].items.push(items[i]);
}

//Fill columns
for (var i = 0; i < columns.length; i++) {
    //With items
    for (var j = 0; j < columns[i].items.length; j++) {
        //Add item to dom 
        $(columns[i].dom).append($("<div>")
            .addClass("item")
            .css("background-color", columns[i].items[j].color)
            .css("height", columns[i].items[j].height)
            .append($("<img>")
                .attr('src', 'http://via.placeholder.com/190x' + columns[i].items[j].height + '/' + columns[i].items[j].color.substr(1) + '/ffffff/?text=Item ' + columns[i].items[j].index)
                )
            );
    }
}