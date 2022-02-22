import Vue from 'vue';
import axios from "vue-axios";
import {ToastProgrammatic as Toast} from "buefy";
import {SnackbarProgrammatic as Snackbar} from "buefy";

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

        let ajax = await Vue.axios[method](url, params, q)
            .then(function (response){
                self.processResponse(response);
                if(callback)
                {
                    if(response.data && !response.data.data)
                    {
                        response.data.data = false;
                    }
                    callback(response.data.data, response);
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

    //---------------------------------------------------------------------
    processResponse: function(response)
    {
        if(response.data.failed && response.data.messages)
        {
            this.toastErrors(response.data.messages);
        }
        if(response.data.success && response.data.messages)
        {
            this.toastSuccess(response.data.messages);
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
        if(messages.length > 1)
        {
            messages.forEach(function (error) {
                list_html += i+") "+error+"<br/>";
                i++;
            });
        } else
        {
            if(messages[0])
            {
                list_html += messages[0];
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
    //---------------------------------------------------------------------
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
