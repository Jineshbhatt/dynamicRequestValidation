Create Schemas to validate request method, body and query parameters.
Schemas are configured in this node Properties. 

---

### Properties

- Method (GET, POST, PUT, DELETE) - the expected method of the request to be validated.

- Validation Schema/Rules - Schema to validate Rules.

### Outputs

1. Valid Request (top output) 
    * `msg (any)` - the original msg of request.
2. Invalid Request (bottom output)
    * `payload (json)` - the error message.
    * `statusCode (400 | 500)` - the status code of error.


## Examples

### Body schema example


    {
        value: '', // provide dot string path of your values which need to validate
        required: {
            value: "", // value should be true / false
            message: "", // specified return msg
            errCode: "" // // specified return error Code
        },
        regex: {
            value: {type: String}, // provide regex
            message: "", // specified return msg
            errCode: "" // // specified return error Code
        },
        minLength: {
            value: {type: Int32},
           message: "", // specified return msg
            errCode: "" // // specified return error Code
        },
        maxLength: {
            value: {type: Int32},
            message: "", // specified return msg
            errCode: "" // // specified return error Code
        },
        equal: {
            value: {type: String},
            message: "", // specified return msg
            errCode: "" // // specified return error Code
            defaultValue: {type: String}
        },
        notEqual: {
            value: {type: String},
            message: "", // specified return msg
            errCode: "" // // specified return error Code
            defaultValue: {type: String}
        },
        isBefore: {
            value: {type: String},
            message: "", // specified return msg
            errCode: "" // // specified return error Code
            defaultValue: {type: String}
        },
        greaterThan: {
            value: {type: String},
            message: "", // specified return msg
            errCode: "" // // specified return error Code
            defaultValue: {type: String}
        },
        lessThan: {
            value: {type: String},
            message: "", // specified return msg
            errCode: "" // // specified return error Code
            defaultValue: {type: String}
        },
        greaterThanEqual: {
            value: {type: String},
            message: "", // specified return msg
            errCode: "" // // specified return error Code
            defaultValue: {type: String}
        },
        lessThanEqual: {
            value: {type: String},
            message: "", // specified return msg
            errCode: "" // // specified return error Code
            defaultValue: {type: String}
        }
    }