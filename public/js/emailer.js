/* global $,document,console,Parse */
$(document).ready(function() {

	var parseAPPID = "83aicdJHcXiSfn9vzzVWAeqMkmIqfoUJVreaNTob";
	var parseJSID = "aRco8dA9azBfAe54PpmIJLtakae1KHbJ9fumGqRC";

	Parse.initialize(parseAPPID, parseJSID);
	var emailObject = Parse.Object.extend("emailObject");


	$("#commentForm").on("submit", function(e) {
		e.preventDefault();

		console.log("Handling the submit");
		//add error handling here
		//gather the form data

		var data = {};

		data.name = $("#name").val();
		data.company = $("#company").val();
		data.email = $("#email").val();
		data.comments = $("#comments").val();

 		if (data.name.length > 0 && data.company.length > 0 )
 		{
		var comment = new emailObject();

		var fileUploadControl = $("#profilePhotoFileUpload")[0];

if (fileUploadControl.files.length > 0) {
  var file = fileUploadControl.files[0];
  var resume = data.name+" resume";

  var parseFile = new Parse.File(resume, file);


parseFile.save().then(function() {
	var jobApplication = new Parse.Object("JobApplication");
jobApplication.set("applicantName", data.name);
jobApplication.set("applicantEmail", data.email);
jobApplication.set("applicantMSG", data.comments);
jobApplication.set("applicantResumeFile", parseFile);
jobApplication.save();
	console.log("Success resume");
  // The file has been saved to Parse.
}, function(error) {
	console.log("error");
  // The file either could not be read, or could not be saved to Parse.
});

}
else{

	var companyApplication= new Parse.Object("companyApplication");
companyApplication.set("applicantName", data.name);
companyApplication.set("applicantEmail", data.email);
companyApplication.set("applicantMSG", data.comments);
companyApplication.set("applicantCompany", data.company);
companyApplication.save();
	console.log("Success company");
  // The file has been saved to Parse.

  // The file either could not be read, or could not be saved to Parse.
}


		comment.save(data, {
			success:function() {
				console.log("Success");
				$('#response').html('Email successful!').addClass('success').fadeIn('fast');
				// $('#successresume').html('Sit Back and let Jobs come to you!').addClass('success').fadeIn('fast');
				 $('form[name="contact-form"]').submit();

				 $('#PostCommentsModal').modal('hide');
$('#PostModal').modal('show');
$('#PostModalCompany').modal('show');
$('#PostModalContact').modal('show');
$('#commentForm').bootstrapValidator('resetForm', true);
  $('input[type="text"], textarea').val('');
  $('input[type="email"], textarea').val('');
   $('input[type="file"], textarea').val('');
$('button[type="submit"]').prop('disabled','disabled');
   //data-toggle="modal" data-target="#PostCommentsModal


			},
			error:function(e) {
				console.dir(e);
				$('#response').html('Error! Email unsuccessful!').addClass('error').fadeIn('fast');
			}

		});
 		}
	});

});
