# IM数据结构设计及redux store设计
## 服务端交互数据结构
1. 发送文本消息
Request Body:
```
{
    "targetType" : "users", // users 给用户发消息。chatgroups: 给集合(群组)发
    "target" : ["uId1", "uId2", "uId3"], // 发送对象，数组对象，即使只有一个用户，也要用数组 ['u1']，给用户发送时数组元素是用户Id，给集合(群组)发送时 ，数组元素是groupId
    "content" : {
        "type" : "txt", //消息类型 暂只支持文字类型
        "msg" : "Hello World!" //消息内容
        },
    "timestamp": new Date(), //消息发送时间
    "fromId" : "fId" //表示消息发送者Id
}
```

2. 聊天记录
Response  Body:
```
{
    "type": "chatmessage",
    "from": "test123", //发送人username
    "fromId": "uu1223", //发送人Id
    "msgId": "5I02W-16-8278a", //消息ID
    "chatType": "chat", //用来判断单聊还是群聊。chat: 单聊；groupchat: 群发
    "payload": {
        "bodies": [ //消息bodies
          {
            "msg": "hhhhhh", //消息内容
            "type": "txt" //消息类型。txt: 文本消息；img: 图片；loc: 位置；audio: 语音
          }
        ]
    },
    "timestamp": 1403099033211, //消息发送时间
    "to": "uu123" //接收人的Id或者接收group的ID
}
```


## redux store数据结构
1. 用户列表
```
usersListData:[
	{
		"userId": "userId",
		"userName": "xxxx",
		"avatar": "http://xxx.png",
		"message": { //最新一条消息便于预览
		    "msgId": "5I02W-16-8278a", //消息ID
		    "chatType": "chat", //用来判断单聊还是群聊。chat: 单聊；groupchat: 群发
		    "payload": {
		        "bodies": [ //消息bodies
		          {
		            "msg": "hhhhhh", //消息内容
		            "type": "txt" //消息类型。txt: 文本消息；img: 图片；loc: 位置；audio: 语音
		          }
		        ]
		    },
		    "timestamp": 1403099033211, //消息发送时间
		}
		...Other user information
	},
	//...
]
```

2. 消息列表
```
messagesListData: [
	{
		"fromId": "uu-xxxxx", //发送对象id
		"MessageList": [	//消息列表 最新向后加，消息记录往前加
			{//第一条
			    "msgId": "5I02W-16-8278a", //消息ID
			    "chatType": "chat", //用来判断单聊还是群聊。chat: 单聊；groupchat: 群发
			    "payload": {
			        "bodies": [ //消息bodies
			          {
			            "msg": "hhhhhh", //消息内容
			            "type": "txt" //消息类型。txt: 文本消息；img: 图片；loc: 位置；audio: 语音
			          }
			        ]
			    },
			    "timestamp": 1403099033211, //消息发送时间
			},
			{ //第二条
				//content...
			}
		]
	},
	{
		//第二个用户
	}
]
```