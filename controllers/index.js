const cheerio = require("cheerio");
const request = require("request");
fetchBlogPosts = async (tag) => {
  const url = `https://medium.com/search?q=${tag}`;
  let arr = [];

  return new Promise((resolve, reject) => {
    request(url, (error, res, html) => {
      if (!error && res.statusCode == 200) {
        const $ = cheerio.load(html);
        const blogs = $(".js-postListHandle");

        for (let i = 1; i <= 10; i++) {
          // $(`div:nth-child(${i})`, blogs).html();

          let creater = $(`div:nth-child(${i})`, blogs)
            .find(
              "div > div.u-clearfix.u-marginBottom15.u-paddingTop5 > div > div > div.postMetaInline.postMetaInline-authorLockup.ui-captionStrong.u-flex1.u-noWrapWithEllipsis > a"
            )
            .html();

          if (creater === null) {
            break;
          }
          creater = $.parseHTML(creater)[0].data;

          let title = $(`div:nth-child(${i})`, blogs)
            .find(".graf--title")
            .html();
          title = $.parseHTML(title)[0].data;

          let readingTime = $(`div:nth-child(${i})`, blogs)
            .find(".readingTime")
            .attr("title");
          readingTime = $.parseHTML(readingTime)[0].data;

          let date = $(`div:nth-child(${i})`, blogs).find("time").html();
          date = $.parseHTML(date)[0].data;
          arr.push({
            creater: creater,
            readingTime: readingTime,
            date: date,
            title: title,
          });

          // arr.push({
          //   creater: $(`div:nth-child(${i})`, blogs).find()
          // })
        }
      }
      resolve({ data: arr });
    });
  }).then((result) => {
    if (result) {
      // console.log(result);
      return result;
    }
  });
};
module.exports.scrap = async (req, res) => {
  let arr = await fetchBlogPosts(req.params.tags);

  return res.json({
    arr,
  });
};
