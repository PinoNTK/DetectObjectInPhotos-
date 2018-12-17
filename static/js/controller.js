angular.module('myApp', [])
.controller('HomeCtrl', function ($scope, $http) {
	console.log('Ok!');
		// http request syntax
        // $http({
        //     method: 'POST',
        //     url: '/login',
        //     data: params

        // }).then(function (response) {

        // }, function (error) {
        //     console.log(error);

        // });
        // end syntax

    var x,y,w,h;
    $scope.crop = function(){
        $('.object').hide();

        (function () {

        
        var div = document.getElementById('image');
        div.addEventListener('mousedown', mousedown);
        div.addEventListener('mouseup', mouseup);
        div.addEventListener('mousemove', mousemove);

        var grab = false;
        var rect = {
            x0: 0,
            y0: 0,
            x1: 0,
            y1: 0
        };

        function mousedown(e) {
            grab = true;
            rect.x0 = e.clientX;
            rect.y0 = e.clientY;

        }

        function mousemove(e) {
            if (grab) {
                rect.x1 = e.clientX;
                rect.y1 = e.clientY;
                showRect();

            }
        }

        function mouseup(e) {
            grab = false;


        }

        function showRect() {
            var rectDiv = document.getElementById('rect');
            rectDiv.style.display = 'block';
            rectDiv.style.position = 'absolute';
            rectDiv.style.left = parseInt(rect.x0 - 300)+ 'px';
            rectDiv.style.top = parseInt(rect.y0 - 60) + 'px';
            rectDiv.style.width = (rect.x1 - rect.x0) + 'px';
            rectDiv.style.height = (rect.y1 - rect.y0) + 'px';

            var boundsDiv = document.getElementById('bounds');
            // boundsDiv.innerText = 'crop rect: ' + rect.x0 + ',' + rect.y0 + ' to ' + rect.x1 + ',' + rect.y0;
            x=parseInt(rect.x0 - 300);
            y=parseInt(rect.y0 - 60);
            w=(rect.x1 - rect.x0);
            h=(rect.y1 - rect.y0);
        }

    })();

    }

    $scope.getListOfImages = function(){
    	$http({
            method: 'POST',
            url: '/images_list',
            //data: params
        }).then(function (response) {
        	console.log(response);
        	// alert(response);
            if(response.data.length !=0){
                var openDiv = '<div class="col-lg-2 col-md-4 col-sm-6 col-12">';
                var endDiv = '</div>'
                var openA = '<a class="place">';
                var endA = '</a>'
                for(i in response.data){
                   $('#imageList').append(openDiv+openA+'<img src="'+response.data[i][0]+'" alt="Image placeholder" id="image_'+i+'">'+'<h2>'+response.data[i][1]+'</h2>'+'<p>'+response.data[i][1]+'</p>'+ endA+ endDiv);
                   $('#image_'+i).css('cursor','pointer');
                   $('#image_'+i).click(function(event) {
                       // alert(i);
                       // 
                   });
                }
                $('.place').each(function(index, el) {
                    $(this).click(function(event) {
                        $('#myModal').modal();
                        var url = $(this).find('img').attr('src');
                        console.log(url);
                        $('#image').css('background-image','url("'+url+'")');
                        $('#image').css('background-repeat','no-repeat');
                        $('#image').css('background-size','cover');
                        $scope.params = url;
                        $http({
                            method: 'POST',
                            url: '/objects_dectection',
                            data: JSON.stringify($scope.params)
                        }).then(function (response) {
                            console.log(response);
                            var relatedObject=[];
                            for(i in response.data){
                                for(j in response.data[i]['urls']){
                                    relatedObject.push(response.data[i]['urls'][j]);
                                }
                            }
                            // render related lists with objects returned
                            for(i in relatedObject){
                                var openDiv = '<div class="row item" style="height: 100px; background-color: white">'
                                var endDiv = '</div>'
                                var image = '<div class="col-4 smallImg" ></div>'
                                var div_8 = '<div class="col-8">' 
                                $('#rightList').append(openDiv+image+div_8+'<h4>'+relatedObject[i][1]+'</h4>'+'<p>'+relatedObject[i][2]+'</p>'+ endDiv+ endDiv);
                            }
                            $('.smallImg').each(function(index, el) {

                                $(this).css('background-image','url("'+relatedObject[index][0]+'")');
                                $(this).css('background-repeat','no-repeat');
                                $(this).css('background-size','cover');
                            });
                            console.log(relatedObject);
                            // generate frames for objects
                            for(i in response.data){
                                var openDiv = '<div class="object" id="object_'+i+'">';
                                var endDiv = '</div>';
                                var rowDiv_up = '<div class="row"> <div class="col-6 upleft" style="height: 130px"></div> <div class="col-6 upright" style="height: 130px"></div> </div>'
                                var rowDiv_down = '<div class="row"> <div class="col-6 downleft" style="height: 130px"></div> <div class="col-6 downright" style="height: 130px"></div> </div>'
                                $('#modalBody').append(openDiv+rowDiv_up+rowDiv_down+endDiv);
    
                                var real_y= -parseInt($('#image').height()) + response.data[i]['y'];
                                var real_x= response.data[i]['x'];
                                var z_index= parseInt(i)+parseInt(100);
                        
                                // console.log( x.top, x.left, $('#object_'+i).position());
                                $('#object_'+i).css({'height':response.data[i]['h'],'width':response.data[i]['w'],'margin-top':real_y,'margin-left':real_x,'z-index':z_index});
                                // 
                            }
                        }, function (error) {
                            console.log(error);
                        });


                    });   
                });

            }
        }, function (error) {
            console.log(error);
        });
    }

    $scope.getListOfImages();
    $scope.submitLink=function (){
            // alert("clicked!");
            

    }
    $scope.info={};
    $("#autocomplete").on("keypress", function(e){
        if(e.keyCode==13){
            // alert("Submit link!");
            var imageUrl= $('#autocomplete').val();
            $scope.params = imageUrl;
            console.log($scope.params);
            $http({
                method: 'POST',
                url: '/objects_dectection',
                data: JSON.stringify($scope.params)
            }).then(function (response) {
                console.log(response);
                alert(response);
            }, function (error) {
                console.log(error);
            });
        }
    })
    $('#submit').click(function(event) {
        var imageUrl= $('#autocomplete').val();
            $scope.params = imageUrl;
            console.log($scope.params);
            if(imageUrl==''){
                alert('url is null!')
                event.preventDefault();
            }
            else{
                $http({
                method: 'POST',
                url: '/objects_dectection',
                data: JSON.stringify($scope.params)
            }).then(function (response) {
                console.log(response);
                alert(response);
            }, function (error) {
                console.log(error);
            });   
            }
            
    });
    $scope.submitCrop= function(){
        console.log(x,y,w,h);
        var info = [{'x':x},{'y':y},{'w':w},{'h':h}];
        $http({
            method: 'POST',
            url: '/cropped_objects_dectection',
            data: JSON.stringify(info )

        }).then(function (response) {
            console.log(response.data);
            $('body').remove('.item');
            var relatedObject=[];
            for(i in response.data){
                relatedObject.push(response.data[i]);
            }
            // render related lists with objects returned
            for(i in relatedObject){
                var openDiv = '<div class="row item" style="height: 100px; background-color: white">'
                var endDiv = '</div>'
                var image = '<div class="col-4 smallImg" ></div>'
                var div_8 = '<div class="col-8">' 
                $('#rightList').append(openDiv+image+div_8+'<h4>'+relatedObject[i][1]+'</h4>'+'<p>'+relatedObject[i][2]+'</p>'+ endDiv+ endDiv);
            }
            $('.smallImg').each(function(index, el) {

                $(this).css('background-image','url("'+relatedObject[index][0]+'")');
                $(this).css('background-repeat','no-repeat');
                $(this).css('background-size','cover');
            });
        }, function (error) {
            console.log(error);

        });
    }

});
