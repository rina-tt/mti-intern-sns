const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "Article";

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
  const param = {
      TableName,
      Limit: 100,
  };

  const command = new ScanCommand(param);

  try {
    // client.send()で全件取得するコマンドを実行
    const articles = (await client.send(command)).Items;
    
    if(articles.length === 0) {
      response.statusCode = 404;
      response.body = JSON.stringify({message: "該当するデータが見つかりませんでした。"});
      return response;
    }

    const parsedArticles = articles.map((item) => unmarshall(item));
    response.statusCode = 200;
    response.body = JSON.stringify(parsedArticles);

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
