const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "User";

exports.handler = async (event, context) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };
  
  
  const body = event.body ? JSON.parse(event.body) : null;
  if(!body || !body.userId || !body.nickname || !body.password || !body.age) {
    response.statusCode = 400;
    response.body = JSON.stringify({
      message: "パラメータに異常があります。"
    })
    return response;
  }

  // TODO: リクエストボディの中身をJavaScriptオブジェクトに変換し、1つ、あるいは複数の変数に代入する
  const {userId, nickname, age, password} =body;
  // TODO: DBに登録するための情報をparamオブジェクトとして宣言する（中身を記述）
  const param = {TableName, Item: marshall({userId, nickname, password, age})};

  // DBにデータを登録するコマンドを用意
  const command = new PutItemCommand(param);

  try {
    // client.send()でDBにデータを登録するコマンドを実行
    await client.send(command);
    // TODO: 登録に成功した場合の処理を記載する。(status codeの設定と、response bodyの設定)
   response.statusCode = 200;
   response.body = JSON.stringify({
     userId,nickname,age, token: "mtiToken"
   })
  } catch (e) {
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "予期せぬエラーが発生しました。",
      errorDetail: e.toString(),
    });
  }

  return response;
};
