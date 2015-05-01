$(document).ready(function() {	
	$('#myModal').on('show.bs.modal', function(dbEntry) {
	    var getID = $(event.target).data('id');
		
		$.get("/wineFromID", {id: getID}, function(res) {
			$('#myModalLabel').html(res.wineName);
			$('#wineName').val(res.wineName);
			$('#wineType').val(res.type);
			$('#wineYear').val(res.year);
			$('#alcoholContent').val(res.alcoholContent);
			$('#wineCOO').val(res.country);
			$('#wineryID').val(res.wineryID);
			$('#wineID').val(res.id);
			$('#wineStyle').val(res.style);
			$('#wineVarterial').val(res.varterial);
			$('#wineRating').rating('update', res.rating);
		});
	});
	
	
	$('#favouriteButton').click(function() {
		var getID = $('#wineID').val();
		console.log(getID);
		if($(event.target).hasClass("active"))
			$(event.target).removeClass("active");
		else
			$(event.target).addClass("active");
		$.post("/starWine", {data: getID, user: 1}, function(res) {
			console.log(res);
		});
		
	});
	
	$('#wineryModal').on('show.bs.modal', function(dbEntry) {
	    var getID = $(event.target).data('id');
	    //make your ajax call populate items or what even you need
		$.get("/wineryFromID", {id: getID}, function(res) {
			$('.modal-title').html(res.wineName);
			$('#wineryNum').val(res.wineryID);
			$('#wineryName').val(res.wineryName);
			$('#wineryYear').val(res.yearFounded);
			$('#wineryLocation').val(res.location);
			
		});
	});
	
	$('#deleteButton').click(function() {
		var toDelete = confirm("Are you sure you wish to delete this item?");
		if(toDelete) {
			$.post("/deleteEntry", {data: document.getElementById('#myButton').getAttribute("data-id")});
			location.reload();		
		}

		else console.log("False");
	});
	

    $('#rating-input').rating({
          min: 0,
          max: 5,
          step: 1,
          size: 'lg'
       });
       
    $('#btn-rating-input').on('click', function() {
        var $a = self.$element.closest('.star-rating');
        var chk = !$a.hasClass('rating-disabled');
        $('#rating-input').rating('refresh', {showClear:!chk, disabled:chk});
    });
    
    
    $('.btn-danger').on('click', function() {
        $("#kartik").rating('destroy');
    });
    
    $('.btn-success').on('click', function() {
        $("#kartik").rating('create');
    });
    
    $('#rating-input').on('rating.change', function() {
        alert($('#rating-input').val());
    });
    
    $('.rb-rating').rating({'showCaption':true, 'stars':'3', 'min':'0', 'max':'3', 'step':'1', 'size':'xs', 'starCaptions': {0:'status:nix', 1:'status:wackelt', 2:'status:geht', 3:'status:laeuft'}});
	
})

