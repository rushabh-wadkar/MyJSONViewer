onload=function(){
		setDefaultParams();
		console.log("JSON Viewer has loaded");
}


function saveSettingsForColorScheme(meta){
	// Check browser support
	if (typeof(Storage) !== "undefined") {
		var scheme = localStorage.getItem("ColorScheme");
		scheme = changeColorScheme(scheme);
		localStorage.setItem("ColorScheme", scheme);
	} else {
		console.log("Sorry, your browser does not support Web Storage...");
	}
}

function getColorSchemeImageEl(){
	var el = document.getElementById('lightordarkimg');
	return el;
}

function setDefaultParams(){
	// Check browser support
	if (typeof(Storage) != undefined) {
		var scheme = localStorage.getItem("ColorScheme");
		if(isValidObject(scheme) == null){
			scheme = 'Light';
			localStorage.setItem("ColorScheme", scheme);
		}
		setColorSchemeImageEl(scheme);
	} else {
		console.log("Sorry, your browser does not support Web Storage...");
	}
}

function setColorSchemeImageEl(scheme){
		//reloadToolTips();
		var titleText = setTitleTextForColorScheme(scheme);
		var imgSrc = setImageForColorScheme(scheme);
		var imgEl = getColorSchemeImageEl();
		//console.warn(titleText);
		$(imgEl).attr('title', titleText).data('bs.tooltip');
		$(imgEl).attr('src', imgSrc);
}

function reloadToolTips(){
	$('#lightordarkimg').tooltip('disable');
	$('#lightordarkimg').tooltip('enable');
	$('#lightordarkimg').tooltip('show');
	//$('[data-toggle="tooltip"]').tooltip('dispose');
	//$('[data-toggle="tooltip"]').tooltip();
}

function changeScheme(){
	$('.item').addClass('animated bounceIn');
	var scheme = localStorage.getItem("ColorScheme");
	scheme = changeColorScheme(scheme);
	localStorage.setItem("ColorScheme", scheme);
	if(scheme == 'Dark'){
		$('#myText').addClass('jsontxtArea');
	} else {
		$('#myText').removeClass('jsontxtArea');
	}
	setColorSchemeImageEl(scheme);
	setNavBarStyle(scheme);
	$('.item').removeClass('animated bounceIn');
}

function reloadJSON(){
		var textAreaDiv = document.getElementById('myText');
		if(textAreaDiv.value == "{}"){
			$.notify({
					//title: '<strong>Heads up!</strong>',
					message: 'Nothing to clear, Boss! Please take a walk.'
				}, {
				allow_dismiss: true,
				type: "warning",
				z_index: 1031,
				animate: {
					enter: 'animated fadeInRight',
					exit: 'animated fadeOutRight'
				}
			});
		} else {
			console.warn("Reloading JSON");
			textAreaDiv.value = "{}";
			treeBuilder.jsonChange(document.getElementById('jsonForm'));
		}
}

function setNavBarStyle(scheme){
	var navEl = document.getElementById('myNav');
	if(scheme == 'Dark'){
		document.getElementById('header').style.color = 'white';
		$(navEl).addClass("bg-dark");
		$(navEl).removeClass("lightCss");
		$(navEl).addClass("darkCss");
		$('body').addClass('bodyDarkCSS');
	}
	else{
		document.getElementById('header').style.color = 'black';
		$(navEl).removeClass("bg-dark");
		$(navEl).removeClass("darkCss");
		$(navEl).addClass("lightCss");
		$('body').removeClass('bodyDarkCSS');
	}
}
function changeColorScheme(color){
	if(color == 'Light')
		return 'Dark';
	else if(color == 'Dark')
		return 'Light';
	else 
		return 'Light';
}

function getColorScheme(){
	var scheme = localStorage.getItem("ColorScheme");
	return scheme;
}

function setTitleTextForColorScheme(sch){
	var sc = getColorScheme();
	if(sc == 'Dark'){
		return 'Switch to Light Mode';
	} else if(sc == 'Light'){
		return 'Switch to Dark Mode';
	} else {
		return 'Something went wrong!';
	}
}


function setImageForColorScheme(sch){
	var sc = getColorScheme();
	if(sc == 'Dark'){
		return './images/light-bulb-on.png';
	} else if(sc == 'Light'){
		return './images/light-bulb.png';
	} else {
		return 'Something went wrong!';
	}
}

function isValidObject(obj){
	if(obj == null || obj == undefined || obj == "")
		return null;
	else 
		return obj;
}