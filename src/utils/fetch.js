import axios from 'axios';
import {
    message
} from "antd"
message.config({
    top: 250,
    duration: 2,
    maxCount: 3,
});

const fetch = (method, url, data = null, callback  = null) => {
    axios({
        method: method,
        url: url,
        data: data
    }).then((response) => {
        const information = response.data.information;

        switch (response.data.status) {
            case 1000:
                if (!!information) {
                    message.success(information)
                }
                !!callback ? callback(response) : callback = null;
                break;
            case 1002:
                message.error(information)
                break;
            default:
                break;
        }
    })
}

export default fetch