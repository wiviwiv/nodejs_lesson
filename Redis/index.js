
//Redis  内存缓存数据库的一种，消息中介


///etc/redis/redis.conf 或者编译目录里编辑 daemonize = yes 开启守护进程启动
//redis-server redis.conf
//ps aux 获取进程信息可以检查是否在运行，以及TCP端口号

//cli连接
	//redis-cli -h 127.0.0.1 -p 6379

//命令：-----设置：set k v  get k-->v  -----获取所有k:keys * -----清除数据:flushdb  flushall


// nodejs 里 redis的基本使用

var redis = require('redis')

//创建连接客户端
var client = redis.createClient(6379,'localhost')

//存储，获取数值

	client.set('name','wivwiv');

	//获取v,是个阻塞的操作，所以需要回调控制读取
	client.get('name',function(err,v){
		console.log(v);
	});



//清除数据
	//清除当前数据库
	// client.flushdb()

	//清除所有数据
	// client.flushall()



//操作列表
		
	// 数据操作方法 push pop range

	//右压入
	client.rpush('list',0);
	client.rpush('list',1);
	client.rpush('list',2);
	client.rpush('list',3);
	client.rpush('list',5);
	client.rpush('list',4);

	//左压入，注意a将插入到左边
	client.lpush('list','a')

	//此时list里面的数据：[ 'a', '0', '1', '2', '3', '5', '4' ]


	//从右读取时将逆序读取 指定读取范围：( x>=0 左边开始计数) 0 ~ -1
	console.log('开始读取插入结果：');
	client.lrange('list',0,-1,function(err,v){
		console.log(v);
	})


	//右出栈操作（删除数据）
	client.rpop('list',function(err,v){
		console.log('出栈的数据：'+v);
	})

	//读取出栈后的结果：结果是：[ 'a', '0', '1', '2', '3', '5' ]
	console.log('出栈后的结果：');
	client.lrange('list',0,-1,function(err,v){
		console.log(v);
	})



//操作集合

	//集合里具有唯一性约束，相同数据将不会再次插入，且集合将排序读取输出
	client.sadd('set',2);
	client.sadd('set',3);
	client.sadd('set',4);
	client.sadd('set',1);
	client.sadd('set',1);
	client.sadd('set',5);
	client.smembers('set',function(err,v){
		console.log('\n\n集合里面的元素：'+v);
	})

	//输出为：1,2,3,4,5


//消息中介
	//消息中介不会储存在数据队列中

	//发布（先订阅，再读取）
	console.log('发布');
	client.publish('test','message from member_01,do you get it ?')

	//读取
	/*
			//引入redis包
			var redis = require('redis')
			//创建连接客户端
			var client = redis.createClient(6379,'localhost')
				


			console.log('开始订阅消息：\n');
			//订阅消息，使用同一个频道
			client.subscribe('test');
			//监听
			client.on('message',function(channel,message){
				console.log(channel+" says " + message);
			})

	*/


//更多：官网查看获取。
