/**
 * Base HTML layout template
 */
function baseLayout({ title, metaDescription = '', head = '', mainContent, sideContent = '', sideNav = true }) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<title>${title}</title>
${metaDescription ? `<meta name="description" content="${metaDescription}" />` : ''}
<link href="/_elements/css/main.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/_elements/js/prototype.js"></script>
<script type="text/javascript" src="/_elements/js/rotate.js"></script>
${head}
</head>

<body>
<div class="z_mainFrame">
	<div class="z_top">
		<a href="/" title="Home"><img src="/_elements/images/russ_fawson.jpg" alt="Russ Fawson Saddle Maker" width="254" height="149" border="0" class="z_logo" /></a>
		<div id="rotate1" class="z_rotate"><img src="/_elements/images/rotate/cowboy_rotate_01.jpg" width="744" height="149"  /></div>
		<div id="rotate2" class="z_rotate"><img src="/_elements/images/rotate/cowboy_rotate_02.jpg" width="744" height="149"  /></div>
		<div id="rotate3" class="z_rotate"><img src="/_elements/images/rotate/cowboy_rotate_03.jpg" width="744" height="149"  /></div>
		<div id="rotate4" class="z_rotate"><img src="/_elements/images/rotate/cowboy_rotate_04.jpg" width="744" height="149"  /></div>
		<div id="rotate5" class="z_rotate"><img src="/_elements/images/rotate/cowboy_rotate_05.jpg" width="744" height="149"  /></div>
		<div id="rotate6" class="z_rotate"><img src="/_elements/images/rotate/cowboy_rotate_06.jpg" width="744" height="149"  /></div>
		<div id="rotate7" class="z_rotate"><img src="/_elements/images/rotate/cowboy_rotate_07.jpg" width="744" height="149"  /></div>
		<div id="rotate8" class="z_rotate"><img src="/_elements/images/rotate/cowboy_rotate_08.jpg" width="744" height="149"  /></div>
		<script type="text/javascript">$$('.z_rotate').invoke('setOpacity','0');</script>
	</div>
	${sideNav ? `<div class="z_side">
		${navigation()}
		${sideContent}
	</div>` : ''}
	<div class="z_content">
		${mainContent}
	</div>
</div>
</body>
</html>`;
}

/**
 * Navigation component
 */
function navigation() {
  return `<p><a href="/">Home</a></p>
<p><a href="/saddles/">Saddles</a></p>
<p class="l2nav"><a href="/saddles/options.html">Options</a></p>
<p><a href="/accessories/photos.html">Accessories</a></p>
<p><a href="/holsters/photos.html">Holsters & Scabbards</a></p>
<p><a href="/testimonials/">Testimonials</a></p>
<p><a href="/about/">About Russ</a></p>
<p><a href="/contact/">Contact</a></p>
<script type="text/javascript">
	var x = $$('.z_side a');
	for(i=0;i<x.length;i++){
		thisLink = x[i];
		if(thisLink.href == location.href){
			thisLink.addClassName('sel');
		}else if(thisLink.href == location.href+'index.html'){
			thisLink.addClassName('sel');
		}else if(thisLink.href+'index.html' == location.href){
			thisLink.addClassName('sel');
		}
	}
</script>`;
}

/**
 * Saddle detail page CSS
 */
function saddleDetailCSS() {
  return `<style type="text/css">
#infoHolder {
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
	font-size:24px;
	margin: 0px 0px 2px 0px;
	padding: 0px;
}
#infoText {
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
<![endif]-->`;
}

/**
 * Saddle detail page JavaScript for thumbnail hover
 */
function saddleDetailJS() {
  return `<script language="javascript">
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
</script>`;
}

/**
 * Saddle detail page template
 */
function saddleDetailPage(saddle) {
  const bulletsHTML = saddle.bullets.map(bullet =>
    `<li>${bullet.formatted}</li>`
  ).join('\n');

  const thumbsHTML = saddle.photos.thumbs.slice(0, 4).map((thumb, index) =>
    `<img src="${thumb.thumbPath}" id="infoThumb${index + 1}" />`
  ).join('\n');

  const mainContent = `<div id="infoHolder">
	<div class="infoSideSpace"></div>
	<div id="infoText">
		<h1 id="infoHead">${saddle.title}</h1>
		<ul>
${bulletsHTML}
		</ul>
	</div>
	<div class="infoUnderTextSpace"></div>
	<div style="clear:both"></div>
	${saddle.photos.main ? `<img src="${saddle.photos.main.path}" id="infoImage" />` : ''}
	${saddle.photos.thumbs.length > 0 ? `<div id="infoThumbs">
${thumbsHTML}
	</div>` : ''}
</div>
<div id="infoNav">
	<a href="${saddle.previous.slug}.html"><img src="/_elements/images/info_nav/previous.png" width="36" height="30" /></a>
	<a href="../"><img src="/_elements/images/info_nav/index.png" width="47" height="30" /></a>
	<a href="${saddle.next.slug}.html"><img src="/_elements/images/info_nav/next.png" width="36" height="30" /></a>
</div>${saddle.photos.thumbs.length > 0 ? '<script type="text/javascript">thumbHover();</script>' : ''}`;

  return baseLayout({
    title: `Russ Fawson - ${saddle.title}`,
    head: saddleDetailCSS() + saddleDetailJS(),
    mainContent,
    sideNav: true
  });
}

/**
 * Saddle index page template
 */
function saddleIndexPage(saddles) {
  const saddleRows = [];

  for (let i = 0; i < saddles.length; i += 4) {
    const rowSaddles = saddles.slice(i, i + 4);
    const cells = rowSaddles.map(saddle => {
      if (!saddle.photos.main) return '<td></td>';

      return `<td>
	<a href="info/${saddle.slug}.html">
		<img src="${saddle.photos.main.thumbPath}" width="130" height="176" alt="${saddle.title}" /><br />
		<span class="saddleNum">#${saddle.id}</span>
		<span class="saddleName">${saddle.title}</span>
	</a>
</td>`;
    }).join('\n');

    saddleRows.push(`<tr>\n${cells}\n</tr>`);
  }

  const mainContent = `<h1>Russ Fawson Custom Saddles</h1>
<p>Browse through examples of Russ Fawson's custom saddle work. Each saddle is hand-crafted with quality materials and attention to detail.</p>

<table class="saddleIndex">
${saddleRows.join('\n')}
</table>`;

  return baseLayout({
    title: 'Russ Fawson - Custom Saddles Gallery',
    metaDescription: 'Browse custom handmade saddles by Russ Fawson. Quality western saddles, old west reproductions, and custom leather work.',
    mainContent,
    sideNav: true
  });
}

module.exports = {
  baseLayout,
  navigation,
  saddleDetailPage,
  saddleIndexPage
};
