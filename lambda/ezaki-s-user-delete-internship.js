const {
  DynamoDBClient,
  DeleteItemCommand,
} = require("@aws-sdk/client-dynamodb");
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
  if(event.headers.authorization !== "mtiToken") {
    response.statusCode = 401;
    response.body = JSON.stringify({message: "権限がありません。"});
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

  const userId = params.userId;

  // TODO: 削除対象のテーブル名と削除したいデータのkeyをparamに設定
  const param = {TableName, Key: marshall({userId})};

  // データを削除するコマンドを用意
  const command = new DeleteItemCommand(param);

  try {
    // client.send()を用いてデータを削除するコマンドを実行
    await client.send(command);
    // TODO: 成功後の処理を記載(status codeを指定する。)
    response.status = 200;
  } catch (e) {
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "予期せぬエラーが発生しました。",
      errorDetail: e.toString(),
    });
  }

  return response;
};
