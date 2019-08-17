<template>
    <div>
        <div class="card mt-3">
            <div class="card-body">
                <div class="card-title">
                    <h3>Chat Group</h3>
                    <hr>
                </div>
                <div class="card-body">
                    <div class="messages" v-for="(msg, index) in messages" :key="index">
                        
                        <p v-if="msg.message_type == 'text'"><span  class="font-weight-bold">{{ msg.user }}: </span>{{ msg.message }}</p>
                        <p v-if="msg.message_type == 'goodnight'"><span   class="font-weight-bold">{{ msg.user }}: </span><img class="goodnight_img" :src="msg.message" alt="good night"></p>
    
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <form @submit.prevent="sendMessage">
                    <div class="gorm-group">
                        <label for="user">User:</label>
                        <input type="text" v-model="user" class="form-control">
                    </div>
                    <div class="gorm-group pb-3">
                        <label for="message">Message:</label>
                        <input type="text" v-model="message" class="form-control">
                        <span class = "goodNight" @click="sendGn">
                            gn
                        </span>
                    </div>
                    <button type="submit" class="btn btn-success">Send</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import io from 'socket.io-client';

export default {
    data() {
        return {
            user: '',
            message: '',
            messages: [],
            socket: io('localhost:3000')
        }
    },
    methods: {
        sendGn() {
            this.socket.emit('SEND_MESSAGE', {
                user: this.user,
                message_type: "goodnight"
            })
        },

        sendMessage(e) {
            e.preventDefault();

            this.socket.emit('SEND_MESSAGE', {
                user: this.user,
                message_type: "text",
                message: this.message
            })
            this.message = ''
        }
    },
    mounted() {
        this.socket.on('MESSAGE', (data) => {
            this.messages = [...this.messages, data];
        })
    },
}
</script>

<style scoped>
    .goodNight {
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        text-align: center;
        background-color: lightblue;
        border-radius: 50px;
        cursor: pointer;
        width: 50px;
        padding-bottom: 3px;
        padding-right: 10px;
        margin-left: 10px;
        border:thin
    }
    .goodNight:hover {
        background-color: blue;
        transition: 1s;
    }
    .goodnight_img {
        border-radius: 50px;
        width: 100px;
        height: 100px;
    }

</style>