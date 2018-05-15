const fs = require('fs');
const fbUpload = require('facebook-api-video-upload');

/*
* FB account: 01205284605/abc13579

* Go to: https://developers.facebook.com/tools/explorer/
* Choose : Lấy mã truy cập người dùng, chọn quyền publish_action, user_post, user_photo, user_videos
* Choose : Bấm Lấy mã truy cập
* (!IMPORTANT) Cho FB quyền đăng bài với Mọi người 
* Copy mã truy cập vào bên dưới. eg: EAACEdEose0cBAI8Xxezhq8ZBalHcWEBoH5x2hAXoJiLeLRQWqfbHdoKZBACsZBxaoGRIlxfI0eF6QgX65dmAZBUTgvp8OMoWVnIhyoIUZBW1Bq0907UvKQTqUFWTeQNmOwgk6za0ZCMPUxFPZBWAn2bNvxFVGQiO9MJuUhDd9XVgvfQA8u5pBVq5DZCwbt37b7ZBtX9jMBdhMuevXxKp2iw00ioXVB0NpZCZBYZD
* Dòng GET, nhập : /v2.6/me   
    ->response: 
    {
    "name": "Nguyen Duy",
    "id": "106820440195293"
    }
* Copy id này vào bên dưới. Chú ý: ứng với mỗi app Id của người dùng sẽ thay đổi
*
* Limit : https://developers.facebook.com/docs/graph-api/advanced/rate-limiting
* 200 API calls/ 1 user/ 1 hour
* 
* res:  { success: true, video_id: '106824343528236' }

Call: 
https://graph.facebook.com/v2.6/106824343528236?fields=embed_html,picture,embeddable
{
  "embed_html": "<iframe src=\"https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F100026020122480%2Fvideos%2F106824343528236%2F&width=854\" width=\"854\" height=\"480\" style=\"border:none;overflow:hidden\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\" allowFullScreen=\"true\"></iframe>",
  "picture": "https://scontent.xx.fbcdn.net/v/t15.0-10/p168x128/30833005_106826086861395_1119390188120834048_n.jpg?_nc_cat=0&oh=a0d17f4170ef3780454615e0d9a7781b&oe=5B9CD2E1",
  "embeddable": true,
  "id": "106824343528236"
}

* Dòng embed_html có thể nhúng vào bất kỳ trang nào
*/
const args = {
    token: "EAACEdEose0cBAI8Xxezhq8ZBalHcWEBoH5x2hAXoJiLeLRQWqfbHdoKZBACsZBxaoGRIlxfI0eF6QgX65dmAZBUTgvp8OMoWVnIhyoIUZBW1Bq0907UvKQTqUFWTeQNmOwgk6za0ZCMPUxFPZBWAn2bNvxFVGQiO9MJuUhDd9XVgvfQA8u5pBVq5DZCwbt37b7ZBtX9jMBdhMuevXxKp2iw00ioXVB0NpZCZBYZD", // with the permission to upload
    id: 106820440195293, //The id represent {page_id || user_id || event_id || group_id}
    stream: fs.createReadStream('2.mp4'), //path to the video
    title: "my video",
    description: "my description"
};
 
fbUpload(args).then((res) => {
    console.log('res: ', res);
    //res:  { success: true, video_id: '1838312909759132' }
}).catch((e) => {
    console.error(e);
});
