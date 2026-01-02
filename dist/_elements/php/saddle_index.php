<?php
function printIndex($infoFolder){
	$saddlePre = 'CustomSaddle-';
	$textDir = '/text';
	$photoDir = '/photos';
	$thumbDir = '/photos/_thumbs';
	$infoFolder  = '/'.trim($infoFolder,'/');
	$infoFolderDR = '/'.trim($_SERVER['DOCUMENT_ROOT'],'/').$infoFolder;
	if(!is_dir($infoFolderDR.$thumbDir)){ 
		mkdir($infoFolderDR.$thumbDir);
	}
	$photoArr = array();
	if($handle = @opendir($infoFolderDR.$textDir)){
		while($file = readdir($handle)){
			if($file[0] != '.' && $file[0] != '_' ){
				$thisPhoto = substr($file,0,-4);
				if(!isset($checkFile)) $checkFile = $thisPhoto;
				$photoArr[$thisPhoto][0] = $infoFolderDR.$photoDir.'/'.$saddlePre.$thisPhoto.'.jpg';
				$photoArr[$thisPhoto][1] = $infoFolderDR.$thumbDir.'/'.$saddlePre.$thisPhoto.'.jpg';
				$thumbArr[$thisPhoto] = "<img src=\"$infoFolder$thumbDir/$saddlePre$thisPhoto.jpg\" />\n";
				$nameArr[$thisPhoto] = current(file($infoFolderDR.$textDir.'/'.$file));
			}
		}
		krsort($photoArr);
		krsort($thumbArr);
	}
	if(@$_GET['update']=='gallery' || !is_file($photoArr[$checkFile][1])){
		updateThumbs($photoArr);
	}
	$thumbStr = '<table class="saddleIndex"><tr>';
	$rowCount = 1;
	foreach($thumbArr as $file => $thumb){
		$fileArr = explode('-',$file);
		if($rowCount > 4){
			$thumbStr .= '</tr><tr>';
			$rowCount = 1;
		}
		$rowCount++;
		$thumbStr .= "<td><a href=\"$infoFolder/?$file\">";
		$thumbStr .= $thumb;
		$thumbStr .= '<span class="saddleNum">Saddle '.$fileArr[0].':</span> ';
		$thumbStr .= '<span class="saddleName">'.$nameArr[$file].'</span> ';
		$thumbStr .= '</a></td>';
	}
	$thumbStr .= '</tr></table><a href="?update=gallery" style="text-decoration:none;" >.</a>';
	return $thumbStr;
}

function priceList($infoFolder){
	$textDir = '/text';
	$infoFolder  = '/'.trim($infoFolder,'/');
	$infoFolderDR = '/'.trim($_SERVER['DOCUMENT_ROOT'],'/').$infoFolder;
	if($handle = @opendir($infoFolderDR.$textDir)){
		while($file = readdir($handle)){
			if($file[0] != '.' && $file[0] != '_' ){
				$thisArr = array_filter(array_map('trim',file($infoFolderDR.$textDir.'/'.$file)));
				if(strpos($thisArr[1],'AVAILABLE')===0)
					$saddleArr[] = $thisArr[0].' '.str_replace('AVAILABLE','',$thisArr[1]);
			}
		}
	}
	sort($saddleArr);
	return $saddleArr;
}

function updateThumbs($photoArr){
	foreach($photoArr as $photo){
		createthumb($photo[0],$photo[1],166,300);
	}
}

function createthumb($name,$path,$new_w,$new_h){
	$nameArr=explode(".",$name);
	if (preg_match("/JPG|jpg/",end($nameArr))){
		$src_img=imagecreatefromjpeg($name);
		$old_x=imagesx($src_img);
		$old_y=imagesy($src_img);
		if ($old_y > $new_h) 
		{
			$thumb_h=$new_h;
			$thumb_w=$new_h/($old_y/$old_x);
		}
		if ($thumb_w >= $new_w)
		{
			$thumb_w=$new_w;
			$thumb_h=$new_w/($old_x/$old_y);
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