<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
                <h1>HTTP</h1>
                <div class="form-group">
                    <label for="name">Username</label>
                    <input type="text" class="form-control" v-model="user.username">
                </div>
                <div class="form-group">
                    <label for="name">Mail</label>
                    <input type="text" class="form-control" v-model="user.mail">
                </div>
                <button class="btn btn-primary" @click="submit">Submit</button>
                <hr>
                <button class="btn btn-success" @click="fetchData">Get Data</button>
                <br><br>
                <ol class="list-group">
                    <li class="list-group-item" v-for="u in users">{{ u.username }} - {{ u.mail }}</li>
                </ol>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    username: '',
                    mail: ''
                },
                users: [],
                resource: {}
            }
        },
        methods: {
            submit() {
                /*
                    this gets called when
                    the user hits the submit
                    button
                    the main url is globally configured
                    here we use the dollar sign $
                    because the http is registered locally
                    here this.user means 
                    the value in user
                    i.e. user.username and
                    user.mail
                    are stored in the data base
                */
                /* this.$http.post('data.json', this.user)
                    .then(response => {
                        console.log(response);
                    }); */

                /* 
                    the above code works perfectly fine
                    but the below code is 
                    I was trying to understand 
                    why vue-resource is called vue-resource
                */
               /* 
                    the first parameter
                    is anything we want to pass to that url
                    the second parameter
                    is the data i actually want to pass
               */
               this.resource.save({}, this.user);
            },

            /*
                now, this is the fetch data
                this function is called 
                whenever the get data button is clicked
                
            */
            fetchData() {
                this.$http.get('data.json')
                    .then(response => {
                        /*
                            at first we must return the response.json
                            by doing this we can get
                            access to the data of the database
                        */
                        return response.json();
                    })
                    .then(data => {
                        /*
                            by creating the array
                            resultArray we store the dat first in this array
                        */
                        const resultArray = [];
                        /*
                            by using for loop
                            we are storing the data in resultArray
                            by pushing the data[key]
                            in the resultArray
                            
                            here the data[key]
                            is the unique key identifier
                            given by firebase
                            
                        */
                        for (let key in data) {
                            resultArray.push(data[key]);
                        }

                        /*
                            finally this.users will attract the data 
                            from resultArray
                            and it is printed
                            from list tag
                        */
                        this.users = resultArray;
                    });
            }
        },
        created() {
            /* 
                here, again the dollar $
                sign refers to that the resource is coming from
                a root file
                in this case
                vue-resource
            */
            this.resource = this.$resource('data.json');
        }
    }

</script>

<style>

</style>
