const fs = require('fs')
const cjs = require('crypto-js')
const imageDataURI = require('image-data-uri')

//fill these in as necessary
const type = ""
const fileNameOrString = ""
const cipherKey = ""
const componentName = ""


//below here is the magic
var toEncryptText = ""


//determine what the to encrypt text will be based on datatype
if (type == "img") {

    let buff = fs.readFileSync(fileNameOrString)
    let datatype = fileNameOrString.substring(fileNameOrString.lastIndexOf(".") + 1)//+1 to exclude the .
    toEncryptText = "img;" + imageDataURI.encode(buff, datatype)

} else if (type == "text") {

    toEncryptText = "text;" + fileNameOrString
}


//encrypt the string
encryptedText = cjs.AES.encrypt(toEncryptText, cipherKey)


//build the file from the template
var file = fs.readFileSync("decrypttemplate.jstemplate").toString()
file = file.replace(/classname/g, componentName)
file = file.replace(/secretdata/g, encryptedText)

fs.writeFileSync(componentName + ".js", file)