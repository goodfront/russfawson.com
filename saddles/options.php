<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><!-- InstanceBegin template="/Templates/main.dwt.php" codeOutsideHTMLIsLocked="false" -->
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<!-- InstanceBeginEditable name="doctitle" -->
<title>Russ Fawson - Saddle Options</title>
<!-- InstanceEndEditable -->
<link href="/_elements/css/main.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/_elements/js/prototype.js"></script>
<script type="text/javascript" src="/_elements/js/rotate.js"></script>
<!-- InstanceBeginEditable name="head" -->
<script type="text/javascript">
function showPhoto(fileName){
	$$('#thePhotos img[src$="'+fileName+'.jpg"]').invoke('show');
}
function setPhotoLinks(){
	$$('.linkHolderL a, .linkHolderR a, .linkHolder a').each( function(l){
						l.observe('mouseover',function(){ showPhoto(this.innerHTML); });
						l.observe('mouseout',function(){ $$('#thePhotos img').invoke('hide'); });
					});
}
document.observe("dom:loaded", function() {
	setPhotoLinks();
	checkLoading();
});

function checkLoading(){
	var allImg = $$('img');
	var complete = true;
	for(i=0;i<allImg.length;i++){
		if(!allImg[i].complete) complete=false;
	}
	if(complete){
		$('photosLoading').hide();
	}else{
		$('photosLoading').show();
		setTimeout('checkLoading()',500);
	}
}

</script>
<style type="text/css">
.linkHolderL a, .linkHolderR a, .linkHolder a{
	display:block;
	cursor:pointer;
}
.linkHolderL a:hover, .linkHolderR a:hover, .linkHolder a:hover{
	color:#CC0000;
}
.linkHolderL{
	position:absolute;
	left: 22px;
	text-align:left;
}

.linkHolderR{
	position:absolute;
	right: 30px;
	text-align:right;
}
.linkHolder{
	position:absolute;
	text-align:left;
}

#thePhotos{
	position:absolute; top:117px; left:147px; width:424px;
}
#thePhotos img{
	border:solid 2px #544B3E;
}
#thePhotos img#photosLoading{
	border:none;
	display:block;
	margin:100px auto;
}
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
		<h1>Saddle Options</h1>
		<p>Here are just a few of the options available for your custom made saddle.</p>
		<div style="border: dashed 1px #544B3E;">
			<div style="border:solid 2px #544B3E; text-align:left; background-color:#FFFFFF; position:relative; padding:15px 0px; height:620px">
				<img src="/_elements/images/content/saddle_options.jpg" width="692" height="620" border="0" style="position:absolute;top: 15px;left:13px" />
				<!-- links -->
				<div style="top:46px;" class="linkHolderL">
					<a>Brass </a>
					<a>Plain </a>
				<a>Rawhide </a>				(many size options)</div>
				<div style="top:49px;" class="linkHolderR">
				<a>Chyenne</a><a>Rawhide</a><a>Straight</a></div>
				<div style="top:362px;" class="linkHolderL"> <a>Exposed Straps</a><a>Regular</a></div>
				<div style="top:152px;" class="linkHolderL">
					<a>Association</a>
					<a>Roper</a><a>Slick Fork</a></div>
				<div style="top:535px; text-align:right;" class="linkHolderR"><a>Brass Covered</a>
					<a>Leather Wrap</a>
					<a>Plain</a></div>
			<div style="top:285px;" class="linkHolderR"> <a>Brass</a><a>Engraved</a><a>Leather</a><a>Stainless</a></div>
				<div style="top:246px;" class="linkHolderL"> <a>D-Ring</a> <a>Dropped O-ring</a><a>Flat Plate</a><a>Inskirt</a><a>Sam Stagg</a></div>
				<div style="top:398px;" class="linkHolderR"> <a>D-Ring </a> <a>Leather Slot</a><a>O-Ring </a></div>
				<div style="top:53px; left:388px;" class="linkHolder"> <a>Half Seat</a><a>Patch</a><a>Plain  </a></div>
				<div style="top:166px;" class="linkHolderR"> <a>Round</a><a>Square </a><a>Rounded Square</a></div>
				<div id="thePhotos">
					<img src="/_elements/images/loading.gif" id="photosLoading">
					<img src="/saddles/options/Cantle/Chyenne.jpg" style="display:none" />
					<img src="/saddles/options/Cantle/Rawhide.jpg" style="display:none" />
					<img src="/saddles/options/Cantle/Straight.jpg" style="display:none" />
					<img src="/saddles/options/Conchos/Brass.jpg" style="display:none" />
					<img src="/saddles/options/Conchos/Engraved.jpg" style="display:none" />
					<img src="/saddles/options/Conchos/Leather.jpg" style="display:none" />
					<img src="/saddles/options/Conchos/Stainless.jpg" style="display:none" />
					<img src="/saddles/options/Fenders/Exposed Straps.jpg" style="display:none" />
					<img src="/saddles/options/Fenders/Regular.jpg" style="display:none" />
					<img src="/saddles/options/Fork/Association.jpg" style="display:none" />
					<img src="/saddles/options/Fork/Roper.jpg" style="display:none" />
					<img src="/saddles/options/Fork/Slick Fork.jpg" style="display:none" />
					<img src="/saddles/options/Horn/Brass .jpg" style="display:none" />
					<img src="/saddles/options/Horn/Plain .jpg" style="display:none" />
					<img src="/saddles/options/Horn/Rawhide .jpg" style="display:none" />
					<img src="/saddles/options/Rigging-front/D-Ring.jpg" style="display:none" />
					<img src="/saddles/options/Rigging-front/Dropped O-ring.jpg" style="display:none" />
					<img src="/saddles/options/Rigging-front/Flat Plate.jpg" style="display:none" />
					<img src="/saddles/options/Rigging-front/Inskirt.jpg" style="display:none" />
					<img src="/saddles/options/Rigging-front/Sam Stagg.jpg" style="display:none" />
					<img src="/saddles/options/Rigging-rear/D-Ring .jpg" style="display:none" />
					<img src="/saddles/options/Rigging-rear/Leather Slot.jpg" style="display:none" />
					<img src="/saddles/options/Rigging-rear/O-Ring .jpg" style="display:none" />
					<img src="/saddles/options/Seats/Half Seat.jpg" style="display:none" />
					<img src="/saddles/options/Seats/Patch.jpg" style="display:none" />
					<img src="/saddles/options/Seats/Plain  .jpg" style="display:none" />
					<img src="/saddles/options/Skirting/Round.jpg" style="display:none" />
					<img src="/saddles/options/Skirting/Rounded Square.jpg" style="display:none" />
					<img src="/saddles/options/Skirting/Square .jpg" style="display:none" />
					<img src="/saddles/options/Stirrups/Brass Covered.jpg" style="display:none" />
					<img src="/saddles/options/Stirrups/Leather Wrap.jpg" style="display:none" />
					<img src="/saddles/options/Stirrups/Plain.jpg" style="display:none" />
					</div>
			</div>
		</div>
		&nbsp;
		<!-- InstanceEndEditable -->
	</div>

</div>

<?php include($_SERVER['DOCUMENT_ROOT'].'/_elements/php/stats.php'); ?>
</body>
<!-- InstanceEnd --></html>
