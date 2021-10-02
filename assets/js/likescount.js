var postlikes = document.getElementsByClassName("post-user-likes");
var postlikesvalue = document.getElementsByClassName("post-user-likes-value");
var postlikescount = 0;
postlikes.addEventListener("click", function () {
  if (postlikescount == 0) {
    postlikescount++;
  } else {
    postlikescount--;
  }
  postlikesvalue.innerText = postlikescount;
});

var commentlikes = document.getElementsByClassName("comment-user-likes");
var commentlikesvalue = document.getElementsByClassName("comment-user-likes-value");
var commentlikescount = 0;
commentlikes.addEventListener("click", function () {
  if (commentlikescount == 0) {
    commentlikescount++;
  } else {
    commentlikescount--;
  }
  commentlikesvalue.innerText = commentlikescount;
});
