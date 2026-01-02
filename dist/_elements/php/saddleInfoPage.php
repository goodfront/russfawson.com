
<?php
class saddleInfoPage{
	private $pathFromDocRoot = '/saddles/info/';
	private $indexPage = '../';
	private $txtDir = 'text';
	private $phoDir = 'photos';
	private $thumDir = 'photos/_thumbs';
	private $thumbH = '176';
	private $thumbW = '129';
	private $previous = '';
	private $next = '';
	private $infoArr = array();
	private $thumbArr = array();
	private $mainPhoto = '';
	private $allFileNames = array();
	private $fullName = '';
	private $fileName = '';
	private $fileNameNums = array(0,-4);
	private $imgMainPat = '<img src="{@}" id="infoImage" />';
	private $imgThumbPat = '<div id="infoThumbs">{|}<img src="{@}" id="infoThumb{*}" />{|}</div><script language="javascript">thumbHover();</script>';
	private $bullPat = '<ul>{|}<li>{@}</li>{|}</ul>';
	private $titlePat = '<h1 id="infoHead">{@}</h1>';
	private $pricePat = '<h3 id="infoPrice">{@}</h3>';
	
	public function __construct($saddleName){
		if(preg_match('/saddles?\.russfawson\.com/',$_SERVER['HTTP_HOST'])){
			$this->pathFromDocRoot = '/info/';
		}
		$this->fileName = $saddleName;
		if($handle = @opendir($_SERVER['DOCUMENT_ROOT'].$this->pathFromDocRoot.$this->txtDir)){
			while($file = readdir($handle)){
				if($file[0] != '.' && $file[0] != '_'){
					$this->allFileNames[$file] = substr($file,$this->fileNameNums[0],$this->fileNameNums[1]);
				}
			}
			krsort($this->allFileNames);
			$lastName = '';
			$finish = false;
			foreach($this->allFileNames as $file => $thisName){
				if($finish){
					$this->next = $thisName;
					break;
				}
				if($thisName == $this->fileName){
					$this->infoArr = array_filter(array_map('trim',file($_SERVER['DOCUMENT_ROOT'].$this->pathFromDocRoot.$this->txtDir.'/'.$file)));
					$this->previous = $lastName;
					$finish = true;
				}
				$lastName = $thisName;
			}
			if(empty($this->next)){
				$this->next = reset($this->allFileNames);
			}
			if(empty($this->previous)){
				$this->previous = end($this->allFileNames);
			}
			if($handle = @opendir($_SERVER['DOCUMENT_ROOT'].$this->pathFromDocRoot.$this->phoDir)){
				while($file = readdir($handle)){
					if(strpos($file,$this->fileName)!==false){
						if(is_numeric(substr($file,-5,1))){
							if(!isset($checkFile)) $checkFile = $file;
							$this->thumbArr[$file][0]=$this->pathFromDocRoot.$this->phoDir.'/'.$file;
							$this->thumbArr[$file][1]=$this->pathFromDocRoot.$this->thumDir.'/'.$file;
						}else{
							$this->mainPhoto = $this->pathFromDocRoot.$this->phoDir.'/'.$file;
						}
					}
				}
				ksort($this->thumbArr);
				if(!is_file($_SERVER['DOCUMENT_ROOT'].$this->thumbArr[$checkFile][1])){
					$this->updateThumbs();
				}
			}
		}
	}
	
	public function updateThumbs(){
		foreach($this->thumbArr as $photo){
			$this->createthumb($_SERVER['DOCUMENT_ROOT'].$photo[0],$_SERVER['DOCUMENT_ROOT'].$photo[1],$this->thumbW,$this->thumbH);
		}
	}
	
	public function createthumb($name,$path,$new_w,$new_h){
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
	
	public function title(){
		return str_replace('{@}',$this->infoArr[0],$this->titlePat);
	}
	public function docTitle(){
		return $this->infoArr[0];
	}
	
	public function price(){
		return str_replace('{@}',$this->infoArr[1],$this->pricePat);
	}
	
	public function bullets(){
		$bullPatArr = explode('{|}',$this->bullPat);
		$returnStr = $bullPatArr[0];
		for($a=2;$a<count($this->infoArr);$a++){
			$itemArr = explode(':',$this->infoArr[$a]);
			if(count($itemArr)==2){
				$this->infoArr[$a] = '<strong>'.$itemArr[0].'</strong>: '.$itemArr[1];
			}
			$returnStr .= str_replace('{@}',$this->infoArr[$a],$bullPatArr[1]);
		}
		$returnStr .= $bullPatArr[2];
		return $returnStr;
	}
	
	public function thumbs(){
		$thumbPatArr = explode('{|}',$this->imgThumbPat);
		$returnStr = $thumbPatArr[0];
		$num=1;
		foreach($this->thumbArr as $file => $arr){
			$returnStr .= str_replace(array('{@}','{*}'),array($arr[1],$num++),$thumbPatArr[1]);
		}
		return $returnStr.$thumbPatArr[2];
	}
	
	public function mainImage(){
		return str_replace('{@}',$this->mainPhoto,$this->imgMainPat);
	}
	
	public function previous(){
		return $this->previous;
	}
	
	public function next(){
		return $this->next;
	}
	
	public function js(){
		?>
		<script language="javascript">
		var infoImageSrc = '';
		var loadImg = new Array();
		var timmer = null;
		function thumbHover(){
			var thumbs = $$('#infoThumbs img');
			var infoImage = $('infoImage');
			infoImageSrc = infoImage.src;
			for(var t=0;t<thumbs.length;t++){
				loadImg[t] = new Image;
				loadImg[t].src = thumbs[t].src.replace('_thumbs/','');
				thumbs[t].onmouseover = function(){
						if(timmer) clearTimeout(timmer);
						this.addClassName('thumbHover');
						infoImage.src = this.src.replace('_thumbs/','');
					}
				thumbs[t].onmouseout = function(){
						this.removeClassName('thumbHover');
						timmer = setTimeout('$("infoImage").src = infoImageSrc;',250);
					}
			}
		}
		</script>
		<?php
	}
	
	public function css(){
		?>
		<style type="text/css">
		#infoHolder {
			/*height: 600px;*/
			position: relative;
			margin:10px 0px;
		}
		#infoImage {
			position: absolute;
			right: 0px;
			border: 1px solid #544A3E;
			bottom: 0px;
		}
		#infoThumbs {
			height: 372px;
			width: 280px;
			position: absolute;
			left: 0px;
			right: 0px;
			bottom: 0px;
			overflow: visible;
			line-height: 0px;
		}
		#infoThumbs img {
			height: 176px;
			width: 130px;
			border: solid 1px #544A3E;
		}
		#infoThumbs img.thumbHover{
			cursor:pointer;
			border-width:3px;
			margin:-2px;
		}
		#infoThumb1 {
			position: absolute;
			left: 0px;
			top: 0px;
		}
		#infoThumb2 {
			position: absolute;
			top: 0px;
			right: 0px;
		}
		#infoThumb3 {
			position: absolute;
			right: 0px;
			bottom: 0px;
		}
		#infoThumb4 {
			position: absolute;
			bottom: 0px;
			left: 0px;
		}
		#infoNav img {
			margin-right: 20px;
			margin-left: 20px;
			border-style: none;
		}
		#infoHead {
			/*position: absolute;
			left: 0px;
			top: 0px;*/
			font-size:24px;
			margin: 0px 0px 2px 0px;
			padding: 0px;
		}
		#infoText {
			/*overflow: auto;
			position: absolute;
			height: 220px;
			left: 0px;
			top: 0px;*/
			width: 280px;
		}
		#infoText ul {
			margin-top: 0px;
			margin-bottom: 0px;
			margin-left: 0px;
			padding-left: 1.5em;
			font-family:Arial, Helvetica, sans-serif;
			font-size:12px;
			line-height:12px;
		}
		#infoText ul li {
			margin: 1px 0px 5px 0px;
			padding: 0px;
		}
		#infoPrice {
			/*position: absolute;
			width: 280px;
			left: 0px;
			top: 205px;*/
			margin: 4px 0px 0px 0px;
			padding: 0px;
			font-size:14px;
		}
		#infoNav {
			height: 30px;
			margin-bottom: 10px;
			text-align: center;
			border-top: 1px solid #544A3E;
			padding-top: 10px;
		}
		.infoSideSpace{
				float:right;
				height:575px;
				width:100px;
		}
		.infoUnderTextSpace{
			height:382px;
			width:100px;
		}
		</style>
		<!--[if IE 6]>
		<style type="text/css">
		.infoSideSpace{
			float: none;
			display:none;
		}
		.infoUnderTextSpace{
			display:none;
		}
		#infoText {
			overflow: auto;
			position: absolute;
			height: 220px;
			left: 0px;
			top: 0px;
			width: 280px;
		}
		#infoHolder {
			height: 600px;
		}
		</style>
		<![endif]-->
		<?php
	}
	
	public function jsCss(){
		$this->js();
		$this->css();
	}
	
	public function content(){
		?>
		<div id="infoHolder">
			<div class="infoSideSpace"></div>
			<div id="infoText">
			<?=$this->title()?>
			<?=$this->bullets()?>
			<?php //=$this->price()?>
			</div>
			<div class="infoUnderTextSpace"></div>
			<div style="clear:both"></div>
			<?=$this->mainImage()?>
			<?=$this->thumbs()?>
		</div>
		<div id="infoNav">
		<a href="?<?=$this->previous()?>"><img src="/_elements/images/info_nav/previous.png" width="36" height="30" /></a>
		<a href="<?=$this->indexPage?>"><img src="/_elements/images/info_nav/index.png" width="47" height="30" /></a>
		<a href="?<?=$this->next()?>"><img src="/_elements/images/info_nav/next.png" width="36" height="30" /></a>		</div>
		<?php
	}
}
?>
