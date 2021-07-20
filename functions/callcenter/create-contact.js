const TokenValidator = require("twilio-flex-token-validator").functionValidator;

exports.handler = TokenValidator(function (context, event, callback) {
    
    const response = new Twilio.Response();
    response.appendHeader("Access-Control-Allow-Origin", "*");
    response.appendHeader("Access-Control-Allow-Methods", "OPTIONS POST");
    response.appendHeader("Content-Type", "application/json");
    response.appendHeader("Access-Control-Allow-Headers", "Content-Type");

    let client = context.getTwilioClient();
    console.log(event)
    client.sync
        .services(context.CONTACT_SYNC_SERVICE)
        .syncMaps(context.CONTACT_SYNC_MAP)
        .syncMapItems.create({
            key: event.phone,
            data: {
                fullname: event.fullname,
                workerorder: event.workerorder,
                phone: event.phone,
            },
        })
        .then((syncMapItem) => {
            response.body = JSON.stringify(syncMapItem);
            console.log(response.body)
            callback(null, response);
        })
        .catch((err) => {
            console.log(err);
            callback(err);
        });
});
