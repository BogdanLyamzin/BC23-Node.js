const fs = require("fs/promises");

const fileOperation = async({filepath, action, data}) => {
    switch(action) {
        case "read":
            const text = await fs.readFile(filepath, "utf-8");
            console.log(text);
            // const buffer = await fs.readFile(filepath);
            // const text = buffer.toString();
            // console.log(text);
            break;
        case "add":
            await fs.appendFile(filepath, data);
            break;
        case "replace":
            await fs.writeFile(filepath, data);
            break;
        default: 
            console.log("Unknown action");
    }
}

// fileOperation({filepath: "./files/file.txt", action: "read"})
// fileOperation({filepath: "./files/file.txt", action: "add", data: "\nЗаписная книжка дьявола"})
// fileOperation({filepath: "./files/file.txt", action: "replace", data: "Дальше действовать будем мы"})

// fileOperation({filepath: "./files/file2.txt", action: "add", data: "\nЗаписная книжка дьявола"})
// fileOperation({filepath: "./files/file3.txt", action: "replace", data: "Дальше действовать будем мы"})

// fs.readFile("./files/file.txt")
//     .then(data => console.log(data))
//     .catch(error => console.log(error.message))

// fs.readFile("./files/file.txt", (error, data)=> {
//     console.log(error);
//     console.log(data);
// })