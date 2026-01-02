<?php
echo '
<script type="text/javascript" src="/_elements/highslide/highslide-with-gallery.js"></script>
<link rel="stylesheet" type="text/css" href="/_elements/highslide/highslide.css" />
<script type="text/javascript">
	hs.graphicsDir = \'/_elements/highslide/graphics/\';
	hs.align = \'center\';
	hs.transitions = [\'expand\', \'crossfade\'];
	hs.wrapperClassName = \'dark borderless floating-caption\';
	//hs.fadeInOut = true;
	//hs.dimmingOpacity = .75;
    hs.showCredits = false; 

	// Add the controlbar
	if (hs.addSlideshow) hs.addSlideshow({
		//slideshowGroup: \'group1\',
		interval: 5000,
		repeat: false,
		useControls: true,
		fixedControls: \'fit\',
		overlayOptions: {
			opacity: .6,
			position: \'bottom center\',
			hideOnMouseOut: true
		}
	});
</script>
';

function printGallery($gallery){
	$gallery  = trim($gallery,'/');
	if(@$_GET['update']=='gallery'){
		updateThumbs($gallery);
	}
	$i = 0;
	$thumbStr = printThumbs($gallery);
	while(!$thumbStr  && $i<2){
		updateThumbs($gallery);
		$i++;
		$thumbStr = printThumbs($gallery);
	}
	return "<div class=\"highslide-gallery\" style=\"text-align:center\" >$thumbStr<br /><a href=\"?update=gallery\" style=\"text-decoration:none;\" >.</a></div>";
}

function printThumbs($gallery){
	$thumbPath = $_SERVER['DOCUMENT_ROOT']."/$gallery/_thumbs/";
	$thumbArr = array();
	if($handle = @opendir($thumbPath)){
		while($file = readdir($handle)){
			if($file[0] != '.'){
				$thumbArr[$file] = "<a href=\"/$gallery/$file\" class=\"highslide\" onclick=\"return hs.expand(this)\"><img src=\"/$gallery/_thumbs/$file\" class=\"galleryThumb\" /></a>\n";
			}
		}
		ksort($thumbArr);
		return implode('',$thumbArr);
	}else{
		return false;
	}
}

function updateThumbs($gallery){
	$thumbPath = $_SERVER['DOCUMENT_ROOT']."/$gallery/_thumbs/";
	if(!is_dir($thumbPath)){ 
		mkdir($thumbPath); 
	}else{
		if($handle = @opendir($thumbPath)){
			while($file = readdir($handle)){
				if($file[0] != '.' && $file[0] != '_'){
					unlink("$thumbPath$file");
				}
			}
		}
	}
	$galPath = $_SERVER['DOCUMENT_ROOT']."/$gallery/";
	if($handle = @opendir($galPath)){
		while($file = readdir($handle)){
			if($file[0] != '.' && $file[0] != '_'){
				createthumb("$galPath$file","$thumbPath$file",100,100);
			}
		}
		return true;
	}else{
		return false;
	}
}

function createthumb($name,$path,$new_w,$new_h){
	$nameArr=explode(".",$name);
	if (preg_match("/JPG|jpg/",end($nameArr))){
		$src_img=imagecreatefromjpeg($name);
		$old_x=imagesx($src_img);
		$old_y=imagesy($src_img);
		if ($old_x > $old_y) 
		{
			$thumb_w=$new_w;
			$thumb_h=$old_y*($new_h/$old_x);
		}
		if ($old_x < $old_y) 
		{
			$thumb_w=$old_x*($new_w/$old_y);
			$thumb_h=$new_h;
		}
		if ($old_x == $old_y) 
		{
			$thumb_w=$new_w;
			$thumb_h=$new_h;
		}
		$dst_img=imagecreatetruecolor($thumb_w,$thumb_h);
		imagecopyresampled($dst_img,$src_img,0,0,0,0,$thumb_w,$thumb_h,$old_x,$old_y); 
		imagejpeg($dst_img,$path);
		imagedestroy($dst_img); 
		imagedestroy($src_img);
	}else{
		return false;
	}
}
?>