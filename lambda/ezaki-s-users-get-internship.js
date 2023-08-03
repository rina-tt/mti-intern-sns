const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");
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
  
  if(event.headers.authorization !== "mtiToken") {
    response.statusCode = 401;
    response.body = JSON.stringify({message: "権限がありません。"});
    return response;
  }

  //TODO: 取得対象のテーブル名をparamに宣言
  const param = {TableName};

  const command = new ScanCommand(param);

  try {
    // client.send()で全件取得するコマンドを実行
    const users = (await client.send(command)).Items;
    
    if(users.length === 0) {
      response.statusCode = 404;
      response.body = JSON.stringify({message: "該当するデータが見つかりませんでした。"});
      return response;
    }

    //TODO: 全ユーザのpasswordを隠蔽する処理を記述
    const parseUsers = users.map(({userId, nickname, age}) => {return unmarshall({userId, nickname, age})});
    response.statusCode = 200;
    response.body = JSON.stringify(parseUsers);

    //TODO: レスポンスボディを設定する
  } catch (e) {
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "予期せぬエラーが発生しました。",
      errorDetail: e.toString(),
    });
  }

  return response;
};
