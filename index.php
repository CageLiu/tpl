<?php
	require_once('./config/smarty.php');
	$page = isset($_GET['page']) ? $_GET['page'] : '';
	if ($page == ''){
		$smarty->assign('title','模块碎片');
		$smarty->display('index.html');
	}else{
		$smarty->assign('title',$page);
		$smarty->display($page.'.html');
	}
?>
