/*
1.此脚本仅适用于安卓最新版学习通app
2.脚本仅完成视频观看及视频中出现的题，对章节测验不做处理
3.脚本自动选择下一节进行播放
4.视频播放过程中不要退出该页面
5.移动数据环境下脚本正常运行
*/

//启动手机无障碍服务
auto();
toast("请在设置中打开本程序的无障碍开关！");

//启动学习通程序
var packageName = getPackageName("学习通");
if(!packageName){
	toast("未安装学习通软件！");
	exit();
}else{
	//输入课程信息
	var name = rawInput("课程名称", "用相声演绎中国文化");
	//替换上面的“用相声演绎中国文化”为你最近要看的课程，避免频繁输入
	if (name.length == 0 ){
		toastLog("未输入课程名");
		exit();
	}
	//默认从第一节开始刷
	var num = rawInput("起始课程章节", "1.1");
	if (num.length == 0){
		toastLog("未输入章节数");
		exit();
	}
	//第几章
	intZ = parseInt(num.split(".")[0]);
	//第几节
	intJ = parseInt(num.split(".")[1]);

	launchPackage("com.chaoxing.mobile");
}


//进入课程
className("android.widget.TextView").packageName("com.chaoxing.mobile").waitFor();
var me = id("tabButton").packageName("com.chaoxing.mobile").className("android.widget.TextView").text("我");
for (var x = 1; x < 10; x++) {
	if (me.exists()){
		click("我");
		sleep(200);
		click("课程");
		//选择课程
		var lessonPic = id("ga_icon").className("android.widget.ImageView");
		if (lessonPic.findOne(3000)==null){
			toastLog("网络状况不佳或未登录");
		}

		lessonPic.waitFor();
		if(text(name).exists()){
			click(name);
		}else{
			toastLog("未找到课程"+name);
			exit();
		}
		for(var i = 1;i <= 1000;i++){
			//选择章节
			num = intZ.toString() + "." + intJ.toString();
			if (text("章节").findOne(3000)==null){
				toastLog("网络状况不佳");
			}
			text("章节").waitFor();
			click("章节");

			var bk = false;
			for(var j = 1;j <= 50;j++){
				if(text(num).exists()){
					click(num);
					toastLog("开始刷" + num);
					break;
				}else if (id("tv_part_title").text("阅读").exists()){
					toastLog("本章结束，开始下一章");
					intZ += 1;
					intJ = 1;
					num = intZ.toString() + "." + intJ.toString();
					back();
					var bk = true;
					break;
				}else{
					scrollable(true).findOnce(1).scrollForward();
					sleep(200);
				}
			}
			if (bk) {
				break;
			}else{
				intJ += 1;
			}

			//播放视频
			waitForActivity("com.chaoxing.fanya.aphone.ui.chapter.KnowledgePagerActivity");
			while(!click("视频"));
			sleep(6000);
			
			//点击播放按钮
			click(549,890);
			sleep(500);

			//移动网络识别
			if (text("允许").id("btnOk").clickable().className("android.widget.Button"). exists()){
				text("允许").packageName("com.chaoxing.mobile").id("btnOk").clickable().className("android.widget.Button").click();
				toastLog("你正在使用移动网络");
			}

			//轮选题目
			while(sleep(1000)){
				//判断题
				if (id("test_tv_title").text("判断题:").exists()){
					click("A");
					sleep(50);
					click("提交");
					sleep(100);
					if (id("tv_wrong_answer").text("回答错误").exists()){
						sleep(50);
						click("B");
						sleep(50);
						click("提交");
					}
					sleep(50);
					click("继续");
					toastLog("回答完毕");
				}

				//单选题
				else if (id("test_tv_title").text("单选题:").exists()){
					click("A");
					sleep(50);
					click("提交");
					sleep(100);
					if (id("tv_wrong_answer").text("回答错误").exists()){
						click("B");
						sleep(50);
						click("提交");
						sleep(100);
						if (id("tv_wrong_answer").text("回答错误").exists()){
							click("C");
							sleep(50);
							click("提交");
							sleep(100);
							if (id("tv_wrong_answer").text("回答错误").exists()){
								click("D");
								sleep(50);
								click("提交");
							}
						}
					}
					sleep(50);
					click("继续");
					toastLog("回答完毕");
				}

				//多选题
				else if (id("test_tv_title").text("多选题:").exists()){
					click("D");
					sleep(50);
					click("C");
					sleep(50);
					click("B");
					sleep(50);
					click("A");
					sleep(50);
					click("提交");
					sleep(100);
					//ABCD
					if (text("回答错误").exists()){
						click("D");
						sleep(50);
						click("提交");
						sleep(100);
						//ABC
						if (text("回答错误").exists()){
							click("C");
							sleep(50);
							click("提交");
							sleep(100);
							//AB
							if (text("回答错误").exists()){
								click("D");
								sleep(50);
								click("提交");
								sleep(100);
								//ABD
								if (text("回答错误").exists()){
									click("B");
									sleep(50);
									click("提交");
									sleep(100);
									//AD
									if (text("回答错误").exists()){
										click("C");
										sleep(50);
										click("提交");
										sleep(100);
										//ACD
										if (text("回答错误").exists()){
											click("A");
											sleep(50);
											click("提交");
											sleep(100);
											//CD
											if (text("回答错误").exists()){
												click("D");
												sleep(50);
												click("A");
												sleep(50);
												click("提交");
												sleep(100);
												//AC
												if (text("回答错误").exists()){
													click("A");
													sleep(50);
													click("B");
													sleep(50);
													click("提交");
													sleep(100);
													//BC
													if (text("回答错误").exists()){
														click("D");
														sleep(50);
														click("提交");
														sleep(100);
														//BCD
														if (text("回答错误").exists()){
															click("C");
															sleep(50);
															click("提交");
															sleep(100);
															//BD
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
					sleep(50);
					click("继续");
					toastLog("回答完毕");
				}

				//判断视频是否播放完毕
				else if (id("chapter_title").exists()) {
					break;
				}
				sleep(1000);
			}
			back();
			sleep(1000)
		}
	}else{
		if (currentPackage()==("com.chaoxing.mobile")){
			back()
			sleep(1000)
		}else{
			launchPackage("com.chaoxing.mobile");	
		}
	}
}
