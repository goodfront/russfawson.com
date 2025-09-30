<?php include('../../_elements/php/saddleInfoPage.php'); ?>
<?php $i = new saddleInfoPage(key($_GET));?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><!-- InstanceBegin template="/Templates/main.dwt.php" codeOutsideHTMLIsLocked="false" -->
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<!-- InstanceBeginEditable name="doctitle" -->
<title>Russ Fawson - <?=$i->docTitle()?></title>
<!-- InstanceEndEditable -->
<link href="/_elements/css/main.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/_elements/js/prototype.js"></script>
<script type="text/javascript" src="/_elements/js/rotate.js"></script>
<!-- InstanceBeginEditable name="head" -->
<?php $i->jsCss(); ?>
<style type="text/css">
<!--
-->
</style>
<!-- InstanceEndEditable --><!-- InstanceParam name="SideNav" type="boolean" value="true" -->
</head>

<body>
<div class="z_mainFrame">
	<div class="z_top">
		<a href="/" title="Home"><img src="/_elements/images/russ_fawson.jpg" alt="Russ Fawson Saddle Maker" width="254" height="149" border="0" class="z_logo" /></a>
		<div id="rotate1" class="z_rotate"><img src="/_elements/images/rotate/cowboy_rotate_01.jpg" width="744" height="149"  /></div> <div id="rotate2" class="z_rotate"><img src="/_elements/images/rotate/cowboy_rotate_02.jpg" width="744" height="149"  /></div> <div id="rotate3" class="z_rotate"><img src="/_elements/images/rotate/cowboy_rotate_03.jpg" width="744" height="149"  /></div> <div id="rotate4" class="z_rotate"><img src="/_elements/images/rotate/cowboy_rotate_04.jpg" width="744" height="149"  /></div> <div id="rotate5" class="z_rotate"><img src="/_elements/images/rotate/cowboy_rotate_05.jpg" width="744" height="149"  /></div> <div id="rotate6" class="z_rotate"><img src="/_elements/images/rotate/cowboy_rotate_06.jpg" width="744" height="149"  /></div> <div id="rotate7" class="z_rotate"><img src="/_elements/images/rotate/cowboy_rotate_07.jpg" width="744" height="149"  /></div> <div id="rotate8" class="z_rotate"><img src="/_elements/images/rotate/cowboy_rotate_08.jpg" width="744" height="149"  /></div><script type="text/javascript">$$('.z_rotate').invoke('setOpacity','0');</script>
	</div>
	<div class="z_side">

		<?php include($_SERVER['DOCUMENT_ROOT'].'/_elements/php/nav.php'); ?>

	<!-- InstanceBeginEditable name="SideContent" --><!-- InstanceEndEditable -->
	</div>
	<div class="z_content">
	<!-- InstanceBeginEditable name="MainContent" -->
		<?php $i->content() ?>
		<!-- InstanceEndEditable -->
	</div>

</div>

<?php include($_SERVER['DOCUMENT_ROOT'].'/_elements/php/stats.php'); ?>
</body>
<!-- InstanceEnd --></html>
