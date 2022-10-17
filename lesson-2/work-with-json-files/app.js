const books = require("./books");

const invokeActions = async ({action, id, title, author}) => {
    switch(action) {
        case "getAll":
            const allBooks = await books.getAll();
            console.log(allBooks);
            break;
        case "getById":
            const oneBook = await books.getById(id);
            console.log(oneBook);
            break;
        case "add":
            const newBook = await books.add({title, author});
            console.log(newBook);
            break;
        case "updateById":
            const updateBook = await books.updateById(id, {title, author});
            console.log(updateBook);
            break;
        case "removeById":
            const removeBook = await books.removeById(id);
            console.log(removeBook);
            break;
        default: 
            console.log("Unknown action");
    }
}

// invokeActions({action: "getAll"});
// invokeActions({action: "getById", id: "u9kgwNWGi3uUUwh0b8V48"})
// invokeActions({action: "add", title: "Хроники Амбера", author: "Роджер Желязны"})
// invokeActions({action: "updateById", id: "u4SckZAvhVJIVrIA0P5Jt", title: "Девять принцев Амбера", author: "Роджер Желязны"})
// invokeActions({action: "removeById", id: "u4SckZAvhVJIVrIA0P5Jt"})