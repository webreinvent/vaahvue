import Vue from 'vue';
import axios from "vue-axios";
import qs from 'qs';
import {ToastProgrammatic as Toast} from "buefy";
import {SnackbarProgrammatic as Snackbar} from "buefy";
import {store} from "../../store/store";
import moment from "moment-timezone";

let debug = document.getElementById('debug').getAttribute('content');
debug = parseInt(debug);

const VhHelper = {

    //---------------------------------------------------------------------
    options: {},
    //---------------------------------------------------------------------
    setOptions (options) {
        this.options = options;
        return this;
    },

    //---------------------------------------------------------------------
    async ajax(url, params, callback=null,
               method='get', query=null,
               headers=null)
    {

        let self = this;

        //To make axios request as ajax request
        Vue.axios.defaults.headers.common = {
            'X-Requested-With': 'XMLHttpRequest',
        };

        let q = {
            params: query
        };

        if(headers)
        {
            q.headers = headers;
        }

        if(method === 'get')
        {
            let query = {
                params: params
            };
            params = query;
            q = null;
            Vue.axios.interceptors.request.use(
                function (config) {
                    config.paramsSerializer = function (params) {
                        return qs.stringify(params, {
                            arrayFormat: 'brackets',
                            encode: false,
                            skipNulls: true
                        })
                    }
                    return config;
                },
                function (error) {
                    return Promise.reject(error)
                }
            );
        }

        if(method === 'delete')
        {
            params = {
                data: params
            };
        }

        let ajax = await Vue.axios[method](url, params, q)
            .then(function (response){
                self.processResponse(response);
                if(callback)
                {
                    if(response.data && response.data.data)
                    {
                        callback(response.data.data, response);

                    } else{
                        self.log(response, 'response--->');
                        callback(false, response);
                    }
                }
                return response;
            }).catch(function (error){
                self.processError(error);
                if(callback)
                {
                    callback(false, error);
                }
                return error;
            });

        return ajax;
    },

    //---------------------------------------------------------------------
    processResponse: function(response)
    {
        if(response.data.messages)
        {
            this.toastSuccess(response.data.messages);
        }

        if(response.data.errors)
        {
            this.toastErrors(response.data.errors);
        }

    },

    //---------------------------------------------------------------------
    processError: function(error)
    {
        if(error.response
            && error.response.status
            && error.response.status === 419)
        {
            this.toastErrors(['Session Expired. Please sign in again.']);
            location.reload();
            return;
        }

        if(debug === 1)
        {
            this.toastErrors([error]);
        } else
        {
            this.toastErrors(['Something went wrong']);
        }
    },
    //---------------------------------------------------------------------
    getMessageAndDuration(messages)
    {
        let i = 1;
        let list_html = "";
        let duration = 1000;

        if(Object.keys(messages).length > 0)
        {
            for(let k in messages)
            {
                list_html += i+") "+messages[k]+"<br/>";
                i++;
            }
        }

        let chars = list_html.length
        let readable = 10; // readable character per second.

        duration = duration*(chars/readable);

        return {
            html: list_html,
            duration: duration
        };
    },
    //---------------------------------------------------------------------
    toastSuccess(messages){
        let data = this.getMessageAndDuration(messages);
        if(data && data.html !== "")
        {
            Toast.open({
                position: 'is-top',
                message: data.html,
                type: 'is-success',
                duration: data.duration
            });
        }
    },
    //---------------------------------------------------------------------
    toastErrors(messages){
        let data = this.getMessageAndDuration(messages);
        if(data && data.html !== "")
        {
            Snackbar.open({
                position: 'is-top',
                message: data.html,
                type: 'is-danger',
                duration: data.duration
            });
        }
    },
    //---------------------------------------------------------------------
    clone(source)
    {
        return JSON.parse(JSON.stringify(source));
    },
    //---------------------------------------------------------------------
    ago: function (value) {

        if(!value)
        {
            return null;
        }

        const utcTime = moment.utc(value);

        const clientTime = utcTime.local();

        return clientTime.fromNow();
    },
    //---------------------------------------------------------------------
    agoLocalTime: function (value) {

        const utcTime = moment.utc(value);

        const clientTime = utcTime.local();

        return clientTime.fromNow();
    },
    //---------------------------------------------------------------------
    localTimeShortFormat: function (value) {

        const utcTime = moment.utc(value);

        const date = utcTime.format('DD');
        const dateYear = utcTime.format('YYYY');

        const current = moment();

        const currentDate = current.format('DD');
        const currentYear = current.format('YYYY');

        if(date === currentDate){
            return utcTime.local().format('hh:mm A');
        } else if(dateYear === currentYear){

            return utcTime.local().format('MMM DD');
        } else{
            return utcTime.local().format('MMM DD YYYY');
        }


    },
    //---------------------------------------------------------------------
    toLocalDateTime: function (value) {

        const utcTime = moment.utc(value);

        return utcTime.local().format('YYYY-MM-DD hh:mm A');

    },
    //---------------------------------------------------------------------
    log(data, label=null)
    {
        if(debug)
        {
            console.log(label, data);
        }
    }
    //---------------------------------------------------------------------


};


export default {
    install: function(Vue, options) {
        let vh = VhHelper.setOptions(options);
        Vue.prototype.$vh = vh;
        Vue.vh = vh;
    }
}

export {
    VhHelper
}
