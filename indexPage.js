/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function(){
    $('input').click(function(){
        $('input').val('');
    });
    
    $('button').mouseenter(function(){
        $(this).addClass('btnactive');
    });
    $('button').mouseleave(function(){
        $(this).removeClass('btnactive');
    });
    $('#searchBtn').click(function(){
        var apiKey='604f2be2ece6762ce231f54a11d4cdaa';
        var keyword=$('input[name=getKeyword]').val();
        $.getJSON('https://api.flickr.com/services/rest/?format=json&'+
        'method=flickr.photos.search&api_key='+apiKey+'&tags='+keyword+
        '&per_page=1&jsoncallback=?',
        function(data){
            if(data.photos.total!=='0')
            $.each(data.photos.photo, function(i, pic){
                var url='https://farm' + pic.farm + '.static.flickr.com/'
                    + pic.server + '/' + pic.id + '_' + pic.secret+'_s.jpg';
                var picTag='<a title="'+pic.title+'" href="'+url+'">'
                            +'<img src="'+url+'"/>'
                            +'</a>';
                $('#flickr').html(picTag);
                $('tbody').prepend('<tr><td>'+keyword+'</td></tr>');
            });
            else
                alert('No match... Try again please!');
        });//function(data),$.getJSON
    });//button click
});