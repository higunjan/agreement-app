$(document).ready(function(){
	$( "#datepicker" ).datepicker();
	$( "#datepicker1" ).datepicker();
	gridBinding();

	$('#update').hide();
	$('#cancel').hide();

 	var agreementId = null;

	$(document).on('click', '#submit', function(){
		var obj = {
			name     : $("#name").val(),
			startDate: $('.startDate').val(),
			endDate  : $('.endDate').val(),
			value    : $('#aValue').val(),
			status   : $('#status').val()
		}
		console.log(obj);

		requestHandling('/saveAgreement', obj, "POST", function(err, response){
			if(err){
				alert(err);
				return 0;
			}else{
				if(response.status){
					gridBinding();
					alert("Successfully Added.");
				} else {
					alert(response.message);
					return 0;
				}
			}
		});
	});

	$(document).on('click', '.edit', function(){
		agreementId = $(this).attr('data-id');

		requestHandling('/getAgreement', { id: agreementId }, "POST", function(err, response){
			if(err){
				alert(err);
				return 0;
			}else{
				if(response.status){
					$("#name").val(response.data.name);
					$('.startDate').val(response.data.start_date);
					$('.endDate').val(response.data.end_date);
					$('#aValue').val(response.data.value);
					$('#status').val(response.data.status);
					
					$('#submit').hide();
					$('#update').show();
					$('#cancel').show();
				} else {
					alert(response.message);
					return 0;
				}
			}
		});
	});

	$(document).on('click', '#update', function(){
		var obj = {
			id       : agreementId,
			name     : $("#name").val(),
			startDate: $('.startDate').val(),
			endDate  : $('.endDate').val(),
			value    : $('#aValue').val(),
			status   : $('#status').val()
		}
		console.log(obj);

		requestHandling('/updateAgreement', obj, "POST", function(err, response){
			if(err){
				alert(err);
				return 0;
			}else{
				agreementId = null;
				if(response.status){
					gridBinding();
					$('#cancel').trigger('click');
					alert("Successfully Updated.");
				} else {
					alert(response.message);
					return 0;
				}
			}
		});
	});

	$(document).on('click', '#cancel', function(){
		$("#name").val("");
		$('.startDate').val("");
		$('.endDate').val("");
		$('#aValue').val("");
		$('#status').val("");

		$('#submit').show();
		$('#update').hide();
		$('#cancel').hide();
	});

	$(document).on('click', '.delete', function(){
		var id = $(this).attr('data-id');
		var flag = confirm("Are you sure?");
		if(flag){
			requestHandling('/deleteAgreement', { id: id }, "POST", function(err, response){
				if(err){
					alert(err);
					return 0;
				}else{
					agreementId = null;
					if(response.status){
						gridBinding();
						alert("Successfully deleted.");
					} else {
						alert(response.message);
						return 0;
					}
				}
			});
		}
	});

	$(document).on('click', '#search', function(){
		var fields = $('button.fields').text().trim(),
			operator = $('button.operator').text().trim(),
			inputValue = $('#sValue').val().trim();
		console.log(fields, operator, inputValue);

		if(fields == "Fields" || operator == "Operator" ||  inputValue.length == 0){
			alert("Please fill all details before search");
			return 0;
		}

		var fieldArr = ["Name", "Start Date", "End Date", "Value", "Status"],
			fieldName = ["name", "start_date", "end_date", "value", "status"];

		var obj = {
			fields: fieldName[fieldArr.indexOf(fields)],
			operator: operator,
			value: inputValue
		}
		requestHandling('/filterAgreement', obj, "POST", function(err, response){
			if(err){
				alert(err);
				return 0;
			}else{
				if(response.status){
					var $tbody = "";
					response.data.forEach(function(val, index){
						var $tr = '<tr>' +
								  '<th scope="row">'+(index+1)+'</th>';

						$tr = $tr + '<td>'+val.name+'</td>';
						$tr = $tr + '<td>'+val.start_date+'</td>';
						$tr = $tr + '<td>'+val.end_date+'</td>';
						$tr = $tr + '<td>'+val.value+'</td>';
						$tr = $tr + '<td>'+val.status+'</td>';
						$tr = $tr + '<td><a href="#" data-id='+val._id+' class="btn btn-primary a-btn-slide-text edit">' +
								        '<span><strong>Edit</strong></span>'+
								    '</a>'+
								    '<a href="#" data-id='+val._id+' class="btn btn-danger a-btn-slide-text delete">' +
								        '<span><strong>Delete</strong></span>' +
								    '</a></td>';
						$tr = $tr + '</tr>';

						$tbody = $tbody + $tr;
					})
					$('table.table tbody').html($tbody);
				} else {
					alert(response.message);
					return 0;
				}
			}
		});
	})

	$(".dropdown-menu li a").click(function(){
		var selText = $(this).text();
		$(this).parents('.btn-group').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');
	});
})


var gridBinding = function(){
	requestHandling('/getAgreements', {}, "GET", function(err, response){
		if(err){
			alert(err);
			return 0;
		}else{
			if(response.status){
				var $tbody = "";
				response.data.forEach(function(val, index){
					var $tr = '<tr>' +
							  '<th scope="row">'+(index+1)+'</th>';

					$tr = $tr + '<td>'+val.name+'</td>';
					$tr = $tr + '<td>'+val.start_date+'</td>';
					$tr = $tr + '<td>'+val.end_date+'</td>';
					$tr = $tr + '<td>'+val.value+'</td>';
					$tr = $tr + '<td>'+val.status+'</td>';
					$tr = $tr + '<td><a href="#" data-id='+val._id+' class="btn btn-primary a-btn-slide-text edit">' +
							        '<span><strong>Edit</strong></span>'+
							    '</a>'+
							    '<a href="#" data-id='+val._id+' class="btn btn-danger a-btn-slide-text delete">' +
							        '<span><strong>Delete</strong></span>' +
							    '</a></td>';
					$tr = $tr + '</tr>';

					$tbody = $tbody + $tr;
				})
				$('table.table tbody').html($tbody);
			} else {
				alert(response.message);
				return 0;
			}
		}
	});
}

var requestHandling = function(url, data, method, clbk){
	try{
		var settings = {
		  "async": true,
		  "crossDomain": true,
		  "url": url,
		  "method": method,
		  "cache": false,
		  "headers": {
		    "content-type": "application/x-www-form-urlencoded",
		    'Cache-Control': 'no-cache, no-store, must-revalidate', 
		    'Pragma': 'no-cache', 
		    'Expires': '0'
		  },
		  "data": data
		}

		$.ajax(settings)
		.done(function (response) {
			clbk(null, response);
		})
		.fail(function(jqXHR) {
			var errorObj = jqXHR.responseText;
			if(typeof jqXHR.responseText == "string")
				errorObj = JSON.parse(jqXHR.responseText);
			clbk(null, errorObj);
		});
	}catch(e){
		clbk(e);
	}
}
