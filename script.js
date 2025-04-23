let localStream;
let peer;
let currentPeerId = null;

// Initialize PeerJS (free STUN servers)
peer = new Peer();

peer.on('open', (id) => {
  console.log("My peer ID: " + id);
});

// Start video
document.getElementById('start-btn').addEventListener('click', async () => {
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  document.getElementById('local-video').srcObject = localStream;
});

// Connect to a random peer (simplified)
document.getElementById('next-btn').addEventListener('click', () => {
  if (!peer) return;
  
  // In a real app, use Firebase to match random users (see Step 3)
  const randomPeerId = prompt("Enter a friend's peer ID (for testing)"); 
  if (!randomPeerId) return;

  const conn = peer.connect(randomPeerId);
  const call = peer.call(randomPeerId, localStream);
  
  call.on('stream', (remoteStream) => {
    document.getElementById('remote-video').srcObject = remoteStream;
  });
});

// Receive calls
peer.on('call', (call) => {
  call.answer(localStream);
  call.on('stream', (remoteStream) => {
    document.getElementById('remote-video').srcObject = remoteStream;
  });
});
