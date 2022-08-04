const { validateRequest } = require('./lib/validator')

const next = (msg) => {
    if (msg['_payload']) msg['payload'] = msg['_payload']
    return ([msg, null])
}

const reject = (msg, payload, httpStatus = 400) => {
    msg['payload'] = payload
    msg['statusCode'] = httpStatus
    return [null, msg]
}

module.exports = function (RED) {
    function requestValidator(config) {

        RED.nodes.createNode(this, config);
        var node = this;

        node.on('input', function (msg) {

            try {

                if (msg['payload']) msg['_payload'] = msg['payload']
                
                if (config.method && config.method !== msg.req?.method) {
                    node.send(reject(msg, { isError: true,errors:{message:`Request method must be a ${config.method}`,errorCode:400}}))
                    return
                }
                let requestQueryParam = msg.req?.query;
                let requestBody = msg.req?.body;
                let requestParam = msg.req?.params;
                // check query Params
                const request = {...requestQueryParam, ...requestBody, ...requestParam}


                const bodySchema = JSON.parse(config.reqbody);

                if(bodySchema.length > 0 || Object.keys(bodySchema).length > 0){
                    if(Object.keys(request).length > 0 || request.length > 0){
                        validateRequest(request, bodySchema,function(isError,errors){
                            if(isError){
                                node.send(reject(msg, { isError,errors }))
                                return
                            }else{
                                node.send(next(msg))
                                return
                            }
                        })
                    }else{
                        node.send(next(msg))
                        return
                    }

                }else{
                    node.send(next(msg))
                    return
                }
            } catch (error) {
                node.error("\nERROR on request-validation Node:");
                node.error(error)
                node.trace("\nError Trace")
                node.send(reject(msg, { isError:true,errors: error }, 500))
                return
            }

        });

    }
    RED.nodes.registerType("requestValidator",requestValidator);

}