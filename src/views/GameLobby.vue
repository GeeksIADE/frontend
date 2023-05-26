<template>
    <div class="container game-lobby">
        <div class="chat-bar">
            <!-- Chat messages display -->
            <div class="chat-messages">
                <div class="chat-message" v-for="message in chat_messages" :key="message.id">
                    <span class="chat-sender">{{ message.sender }}:</span>
                    <span class="chat-content">{{ message.content }}</span>
                </div>
            </div>
            <div class="chat-input">
                <input type="text" placeholder="Type your message" v-model="newMessage" @keydown.enter="sendMessage" />
                <button class="send-button" @click="sendMessage">Send</button>
            </div>
        </div>
        <div class="game-info">
            <h2>{{ room.room_name }}</h2>
            <!-- <p>Game URL: {{ gameUrl }}</p> -->
            <!-- Additional game information -->
        </div>
        <div class="room-members">
            <h2>Room Members</h2>
            <ul>
                <li v-for="user in users" :key="user.id">{{ user.user_name }}</li>
            </ul>
            <button class="leave-button" @click="leaveRoom">Leave</button>
        </div>
    </div>
</template>
  
  
  
<script>
import Cookies from 'js-cookie';
import { io } from 'socket.io-client';

export default {
    name: 'GameLobby',
    data() {
        return {
            room: {},
            gameUrl: '',
            newMessage: '',
            chat_messages: [],
            users: [],
        };
    },
    async created() {
        console.log('Created method executed');

        // Fetch room details and game URL from the backend
        const roomId = this.$route.params.roomId;
        try {
            const roomResponse = await fetch(`http://127.0.0.1:7000/api/rooms/${roomId}`);
            const roomData = await roomResponse.json();

            if (roomResponse.ok) {
                this.room = roomData;

                // Fetch the game URL based on the room details
                const token = Cookies.get('token');
                const gameUrlResponse = await fetch(`http://127.0.0.1:7000/api/games/${this.room.game_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const gameUrlData = await gameUrlResponse.json();

                if (gameUrlResponse.ok) {
                    this.gameUrl = gameUrlData.result;
                } else {
                    throw new Error('Failed to fetch game URL');
                }

                // Fetch room members
                const membersResponse = await fetch(`http://127.0.0.1:7000/api/rooms/${roomId}/members`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const membersData = await membersResponse.json();
                console.log(membersData);

                if (membersResponse.ok) {
                    this.users = membersData; // Update the users array with room members
                } else {
                    throw new Error('Failed to fetch room members');
                }
            } else {
                throw new Error('Failed to fetch room details');
            }

            // Connect to the WebSocket server
            this.socket = io('http://localhost:7001/chat');
            const token = Cookies.get('token');

            // Join the WebSocket channel for the current room
            const respUser = await fetch(`http://127.0.0.1:7000/api/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const currentUser = await respUser.json();
            this.currentUser = currentUser;
            this.socket.emit('join', { room_id: this.room.room_id, user_id: this.currentUser.id });

            // Listen for chat messages
            this.socket.on('chatMessage', (data) => {
                // Handle received chat message
                console.log('Received chat message:', data);

                // Update chat messages in the UI
                const { _, message, username } = data;
                const chatMessage = {
                    sender: username,
                    content: message,
                };
                this.chat_messages.push(chatMessage);
            });
        } catch (err) {
            console.error(err);
        }
    },
    methods: {
        async leaveRoom() {
            const roomId = this.$route.params.roomId;
            const token = Cookies.get('token');
            try {
                const response = await fetch(`http://127.0.0.1:7000/api/rooms/leave/${roomId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    // Handle the successful leave room response
                    console.log('Successfully left the room');
                    this.$router.push('/rooms/join');
                } else {
                    throw new Error('Failed to leave the room');
                }
            } catch (err) {
                console.error(err);
            }
        },
        sendMessage() {
            console.log('Sending chat message:', this.newMessage);
            const message = this.newMessage;
            const username = this.currentUser.username; // Get the username from currentUser

            // Send the chat message to the server
            this.socket.emit('chatMessage', { room_id: this.room.room_id, user_id: this.currentUser.id, username, message });
            // Clear the input field
            this.newMessage = '';
        },
    },
    beforeDestroy() {
        // Disconnect from the WebSocket server and leave the channel
        this.socket.emit('leave', { room_id: this.room.room_id, user_id: this.currentUser.id });
        this.socket.disconnect();
    },
};
</script>
    
<style scoped>
.room-members {
    width: 200px;
    border-left: 1px solid #ccc;
    padding: 10px;
    box-sizing: border-box;
}

.room-members h2 {
    font-size: 20px;
    margin-bottom: 10px;
}

.room-members ul {
    list-style-type: none;
    padding: 0;
}

.room-members li {
    padding: 5px 0;
    border-bottom: 1px solid #eee;
}

.leave-button {
    padding: 5px 10px;
    background-color: #dc3545;
    color: #fff;
    border: none;
    cursor: pointer;
    margin-top: 10px;
    width: 100%;
}

.leave-button:hover {
    background-color: #c82333;
}

.game-lobby {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.chat-bar {
    width: 100%;
    height: 400px;
    background-color: #f2f2f2;
    padding: 10px;
    box-sizing: border-box;
}

.chat-messages {
    height: calc(100% - 40px);
    overflow-y: auto;
}

.chat-message {
    color: black;
    margin-bottom: 10px;
}

.chat-sender {
    font-weight: bold;
    margin-right: 5px;
}

.chat-input {
    display: flex;
    align-items: center;
    justify-content: center;
}

.chat-input input {
    flex: 1;
    padding: 5px;
    margin-right: 10px;
}

.send-button {
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
}

.send-button:hover {
    background-color: #0056b3;
}

.game-info {
    margin-top: 20px;
    text-align: center;
}

.game-info h2 {
    font-size: 24px;
    margin-bottom: 10px;
}

.game-info p {
    font-size: 16px;
}

/* Additional styling for the game lobby */
</style>