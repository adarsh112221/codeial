function createComment(e){let t=$(`#post-${e}-comments-form`);console.log(t),t.submit((function(t){t.preventDefault();$.ajax({type:"post",url:"/comments/create",data:$(this).serialize(),success:function(t){new Noty({theme:"relax",text:"Comment published!",type:"success",layout:"topRight",timeout:1500}).show();let n=newCommentDom(t.data.comment);$(`#post-comments-${e}`).prepend(n)},error:function(e){console.log(e.responseText)}})}))}let newCommentDom=function(e){return $(`<li id="comment-${e._id}">\n    <p>\n        \n        <small>\n            <a class="delete-comment-button" href="/comments/destroy/${e._id}">X</a>\n        </small>\n        \n        ${e.content}\n        <br>\n        <small>\n            ${e.user.name}\n        </small>\n    </p>    \n  \n  </li>`)},deleteComment=function(e){$(e).click((function(t){t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){new Noty({theme:"relax",text:"Comment udgaya",type:"success",layout:"topRight",timeout:1500}).show(),$(`#comment-${e.data.comment_id}`).remove()},error:function(e){console.log(e.responseText)}})}))};convertdeletetoAjax1=function(e){$(`#post-comments-${e}>li`).each((function(){let e=$(this),t=$(" .delete-comment-button",e);deleteComment(t)}))};