import fs from "fs"

fs.writeFile ("hello.txt", "Hello, USer", (err) => {

  if (err) {
    console.log ("Eror Writing File", err)
    return
  }
  console.log ("File Writen Succesfuly")
})

fs.readFile ("hello.txt", "utf8", (err, data) => {
  if (err) {
    console.log ("Error Reading the file", err)
    return
  }
  console.log ("File Contents: ", data)
}) 

console.log(fs.existsSync ("hello.txt"))