const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "User";

exports.handler = async (event, context) => {
  //レスポンスの雛形
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "" }),
  };
  if(event.headers.authorization !== "mtiToken") {
    response.statusCode = 401;
    response.body = JSON.stringify({message: "権限がありません。"})
    return response;
  }
  
  
  const params =event.queryStringParameters ? event.queryStringParameters : null;
  if(!params || !params.userId) {
    response.statusCode = 400;
    response.body = JSON.stringify({
      message: "パラメータに異常があります。"
    })
    return response;
  }

  const userId = params.userId; //見たいユーザのuserId

  //TODO: 取得対象のテーブル名と検索に使うキーをparamに宣言
  const param = {TableName, Key: marshall({userId})};

  // 指定したアイテムを取得するコマンドを用意
  const command = new GetItemCommand(param);

  try {
    //client.send()の実行でDBからデータを取得
    const user = (await client.send(command)).Item;
    
    if(!user) {
      response.statusCode = 404;
      response.body = JSON.stringify({message: "該当するデータが見つかりません"});
      return response;
    }
    delete user.password

    //TODO: 条件に該当するデータがあればパスワードを隠蔽をする処理を記述
    response.statusCode = 200;
    //TODO: レスポンスボディに取得したUserの情報を設定する
    response.body = JSON.stringify(unmarshall(user));
  } catch (e) {
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "予期せぬエラーが発生しました。",
      errorDetail: e.toString(),
    });
  }

  return response;
};
