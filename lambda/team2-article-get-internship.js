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
    const article = (await client.send(command)).Items;
 
    if (article.length == 0) {
      response.body = JSON.stringify({ article: [] });
    } else {
      const unmarshalledArticlesItems = article.map((item) => unmarshall(item));
      response.body = JSON.stringify({ articles: unmarshalledArticlesItems});
    }
  } catch (e) {
    response.statusCode = 500;
    response.body = JSON.stringify({
      message: "予期せぬエラーが発生しました。",
      errorDetail: e.toString(),
    });
  }

  return response;
};
