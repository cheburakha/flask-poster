var postForm, sendURL, toggler, is_sending_file, fileInput;

var init = function() {
	var toggleCB = function(e) {
		// console.log(e);
		is_sending_file = $(event.target).is(':checked');
		is_sending_file ?
			fileInput.prop('disabled', false) :
			fileInput.prop('disabled', true);
	};
	var fileCB = function(e) {
		console.log(e.target.files);
	    var file = e.target.files[0];
	    if (file.size > 1024*1024*5) {
	        alert('max upload size is 5mb');
	    }
	};

	console.log('ready');

	// Variables set
	postForm = $('#postForm');
	toggler = $('#sendTypeToggler');
	fileInput = $('#sendfile');
	sendURL = $('#sendURL');

	// Callbacks set
	toggler.on('change', toggleCB);
	$('form :file').on('change', fileCB);
	toggleCB();


	initForm();
}

var initForm = function() {

	postForm.submit(function(event) {
		event.preventDefault();
		var url = sendURL.val();
		var textData = {};
		
		var dataType = is_sending_file ?
			'application/octet-stream' :
			'application/json';
		
		var loginForm = $(this).find('.textdata > input').serializeArray();
		// var loginForm = $(this).serializeArray();
		$.each(
			loginForm,
		    function(i, v) { textData[v.name] = v.value; }
		);
		var data = is_sending_file ?
			new FormData(postForm[0]) : 
			JSON.stringify(textData);

		// console.log(data);

		$.ajax({
		    method: 'POST',
		    url: url,
		    cache: false,
		    dataType: 'json',		// response's type from server
		    processData: false,
		    contentType: dataType,
		    data: data,
		})
		.done(function(response) {
		    console.log('success, response:', response);
		})
		.fail(function(response) {
		    console.log('failure, response:', response);
		})
		.always(function(response) {
		});
		return false;
	});
}

$(document).ready(function () {
	init();
});