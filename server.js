const http = require('http');
const WebSocket = require('ws');
const axios = require('axios');

var endPoint = 'https://api.coin.z.com/public';
var path     = '/v1/ticker?symbol=BTC';


// HTTPサーバーを作成
const server = http.createServer();
const wss = new WebSocket.Server({ server });

// WebSocket接続時の処理
wss.on('connection', (socket) => {
  console.log('WebSocket connected');
  
  // ビットコイン価格を取得し、WebSocketでクライアントに送信
  const getBitcoinPrice = async () => {
    try {
      const response = await axios.get(endPoint + path);
      const bitcoinPrice = response.data;
      socket.send(JSON.stringify({ price: bitcoinPrice }));
    } catch (error) {
      console.error('Failed to fetch Bitcoin price:', error);
    }
  };

  // 10秒ごとにビットコイン価格を取得し、WebSocketでクライアントに送信
  const intervalId = setInterval(getBitcoinPrice, 10000);

  // WebSocket切断時の処理
  socket.on('close', () => {
    console.log('WebSocket disconnected');
    clearInterval(intervalId); // インターバルをクリア
  });
});

// HTTPサーバーをポート3000でリスン
server.listen(3000, () => {
  console.log('Server is listening on http://localhost:3000');
});

