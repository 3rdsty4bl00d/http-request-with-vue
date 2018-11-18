import Vue from 'vue'
import vueResource from 'vue-resource';
import App from './App.vue'

// configuring the vue-resource
// we must import vueResource to use vue-resource

Vue.use(vueResource);

/*configuring the http globally*/

/*
    here we must insert .json at the end
    because google only listens to .json file
*/

Vue.http.options.root = 'https://http-request-af72d.firebaseio.com/';

/*using intercepts*/

/*using intercepts in request*/
/*only when registering locally we need
    $(dollar sign at the beginning*/
Vue.http.interceptors.push((request, next) => {
    console.log(request);
    if(request.method == 'POST'){
        request.method = 'PUT';
    }
    // using intercept in response
    next(response => {
        response.json = () => { return {messages: response.body} }
    });
});

new Vue({
  el: '#app',
  render: h => h(App)
})
