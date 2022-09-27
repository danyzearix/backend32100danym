const socket = io();

//Join chat
const { username } = Qs.parse(window.location.search,{
    ignoreQueryPrefix: true
});

socket.emit("join-chat",)