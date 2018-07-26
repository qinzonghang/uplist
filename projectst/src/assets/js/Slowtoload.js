
//图片懒加载

export default (node)=>{
    node.forEach((item,index)=>{

       let rect = item.getBoundingClientRect();
            if((rect.left>0 && rect.top>0 && rect.top) <= window.innerHeight){
                let data_src = item.getAttribute('data-src');
                if (item.src != data_src){
                    item.src = data_src;
                }
            }
    })
     
}


