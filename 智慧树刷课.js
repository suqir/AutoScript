//适用于最新版知到
//启动手机无障碍服务
auto();
toast("请在设置中打开本程序的无障碍开关！");

//检查知到程序
var packageName = getPackageName("知到");
if(!packageName){
	toast("未安装知到！");
	exit();
}else{
	//输入课程信息
	var name = rawInput("课程名称", "C君带你玩编程");
	//替换上面的“用相声演绎中国文化”为你最近要看的课程，避免频繁输入
	if (name.length == 0 ){
		toastLog("未输入课程名");
		exit();
	}

	//启动知到程序
	launchPackage("com.able.wisdomtree");
}


//进入课程
className("android.widget.TextView").packageName("com.able.wisdomtree").waitFor();
var study = id("bottom_tv").packageName("com.able.wisdomtree").className("android.widget.TextView").text("学习");
if (study.exists()){
	click("学习");
	sleep(200);

	//选择课程
	var lessonPic = id("rl_course_credit_pic").className("android.widget.RelativeLayout");
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

		//点击继续播放按钮
		waitForActivity("com.able.wisdomtree.course.course.studycourse.activity.StudyCourseVideoActivity");
		while(!click(id("continue_study_btn").className("android.widget.ImageButton")));

		//全屏按钮
		var openPic = id("ijk_layout_controller_cover_screen_btn").className("android.widget.ImageView");
		waitFor(openPic);
		click(openPic);
		
		//调整播放速度
		var speedX = id("ijk_layout_controller_cover_rate_btn")className("android.widget.TextView");
		if (speedX.exists()) {
			for (var s = 0; s < 3.length; s++) {
				if (speedX.text == "1.5x") {
					break;
				}
				click(speedX);
			}
		}else{
			click(id("content").className("android.widget.FrameLayout"));
		}

		//移动网络识别
		if (text("正在使用非WI-FI网络，精彩内容不容错过").exists()){
			click(556,500);
			sleep(2000);
			toastLog("你正在使用移动网络");
		}

		var closeQs = id("image_close").className("android.widget.ImageView");

		//轮选题目
		while(true){
			//单选题
			if (id("left_type").text("单选题:").exists()){
				click("A");
				sleep(100);

				click("B");
				sleep(100);
				
				click("C");
				sleep(100);

				click("D");
				sleep(100);
				
				click(closeQs);
				toastLog("出现单选题，依次选择后继续观看视频！");
			}

			//监控屏幕，间隔时间1s
			sleep(1000);
		}
	}
}else{
	if (currentPackage()==("com.able.wisdomtree")){
		back()
		sleep(1000)
	}else{
		launchPackage("com.able.wisdomtree");	
	}
}
