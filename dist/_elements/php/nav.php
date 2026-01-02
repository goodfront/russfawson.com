<?php
if(preg_match('/saddles?\.russfawson\.com/',$_SERVER['HTTP_HOST'])){
	?>
	<p><a href="/">Russ' Saddles</a></p>
	<p><a href="/options.php">Saddle Options</a></p>
	<p>&nbsp;</p>
	<p>&nbsp;</p>
	<hr />
	<p>&nbsp;</p>
	<div class="extraNav">
	<h2>Other Resources</h2>
	<!--<p><a href="https://www.russfawson.com/saddles/prices.php">Saddle Prices</a></p>-->
	<p><a href="https://www.russfawson.com/accessories/">Saddle Accesories</a></p>
	<p><a href="https://www.russfawson.com/contact/">Contact Russ Fawson</a></p>
	</div>
<?php
}else{
	?>
	<p><a href="/">Home</a></p>
	<p><a href="/saddles/">Saddles</a></p>
	<?php 
	$base = current(explode('/',trim($_SERVER['REQUEST_URI'],'/')));
	if($base=='saddles'){
		//echo '<p class="l2nav"><a href="/saddles/prices.php">Price List</a></p>';
		echo '<p class="l2nav"><a href="/saddles/options.php">Options</a></p>';
	}
	?>
	<p><a href="/accessories/photos.php">Accessories</a></p>
	<p><a href="/holsters/photos.php">Holsters & Scabbards</a></p>
	<p><a href="/testimonials/">Testimonials</a></p>
	<p><a href="/about/">About Russ</a></p>
	<p><a href="/contact/">Contact</a></p> 
	<?php
}
?>
<script type="text/javascript">
	var x = $$('.z_side a');
	for(i=0;i<x.length;i++){
		thisLink = x[i];
		if(thisLink.href == location.href){
			thisLink.addClassName('sel');
		}else if(thisLink.href == location.href+'index.php'){
			thisLink.addClassName('sel');
		}else if(thisLink.href+'index.php' == location.href){
			thisLink.addClassName('sel');
		}
	}
</script>
