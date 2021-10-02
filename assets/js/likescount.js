$(".likes").each(function () {
  $(this).on("click", function () {
    console.log("hello");
    let likevalue = $(this).find(' .post-likes-value');
    if(likevalue.text()==0)
    {
      likevalue.text('1')
      console.log(likevalue.text());
    }
    else{
      likevalue.text('0')

    }
  });
});
