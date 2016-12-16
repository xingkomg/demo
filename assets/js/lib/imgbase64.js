import $ from './jquery.2.1.4.js';

export default function(input,size,fn){
	let compressImg = function(imgData,maxWidth,onCompress){
		if(!imgData)return;
		onCompress = onCompress || function(){};
		maxWidth = maxWidth || 300;
		let img = new Image();
		img.onload = function(){ 					
			if(img.width > maxWidth) {
				img.height = maxWidth * (img.height / img.width);
				img.width = maxWidth;
			}
			let canvas = document.createElement('canvas');
			canvas.width = img.width;
			canvas.height = img.height;
			let ctx = canvas.getContext("2d");
			ctx.fillStyle="#ffffff";
			ctx.fillRect(0,0,canvas.width,canvas.height);
			// ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(img, 0, 0, img.width, img.height);
			let imgType = img.src.split(';')[0].split(':')[1];
			onCompress(canvas.toDataURL(imgType));
		};
		// 记住必须先绑定事件，才能设置src属性，否则img没内容可以画到canvas
		img.src = imgData;
	}
    let file = $(input).get(0).files[0];
    if( file ){
        let fr = new FileReader();
        fr.readAsDataURL(file);
        fr.onload = function(e){
        	if( e.total > size ){	//超过规定大小进行压缩
                compressImg(e.target.result,640,function(res){
                	fn.call(input,res);
                })
            }else{
            	fn.call(input,e.target.result);
            }
        }
    }
}