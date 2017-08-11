var express = require('express');
var router = express.Router();
var formidable = require("formidable");
var controller = require("../controllers");
var fs = require("fs");

// var renderer = function(containerDir, mainDir) {
//   var container = fs.readFileSync(containerDir , "utf8");
//   var main = fs.readFileSync(mainDir , "utf8");
//   var rendered = container.replace("<%temp%>", main);
//   return rendered;
// };

router.get("/", function(req, res) {
  res.render("index");
});
router.get("/about", function(req, res) {
  res.render("about");
});
router.get("/search", function(req, res) {
  res.render("search", controller.search);
});
router.get("/result", function(req, res) {
  res.render("result", {idols: controller.result.idols(req.query)});
})
router.get("/quicksearch", function(req, res) {
  req.query.name = req.query.term;
  res.send(controller.result.idols(req.query));
})
router.get("/admin", function(req, res) {
  res.render("login");
});
router.get("/success", function(req, res) {
  res.render("success");
});
router.get("/error", function(req, res) {
  res.render("error");
});

router.post("/admin", function(req, res) {
  var userinfo = req.body;
  // console.log(req.body)
  // console.log(global.admin)
  // console.log(req.session.userinfo);
  
  if (controller.admin.checkUser(req.session.userinfo, global.admin)) {
    console.log("already login")
    res.render("admin");
  } else if (controller.admin.checkUser(userinfo, global.admin)) {
    console.log("new login")
    req.session.userinfo = userinfo;
    res.render("admin");
  } else {
    console.log("need login")
    res.render("login");
  }
});
router.post("/upload/:file", function(req, res) {
  if (req.params.file === "json") {
    console.log("file")
    
    var form = new formidable.IncomingForm();
    form.uploadDir = __dirname + "/../upload";
    // 파일 전송 시 첫번째 chunk가 전달되면 호출
    form.on('fileBegin', function(name, file) {
      console.log('fileBegin - ' + name + ':' + JSON.stringify(file));
    })
    // 파일의 chunk가 전달될 때 마다 호출
    .on('progress', function(bytesReceived, bytesExpected) {
      console.log('progress: ' + bytesReceived + '/' + bytesExpected);
    })
    // 파일 전송도중 esc나 페이지 전환 등으로 중단될 때 호출
    .on('aborted', function() {
      console.log('aborted');
      res.render("error");
    })
    // error 발생 시 호출
    .on('error', function() {
      console.log('error');
      res.render("error");
    })
    // 파일 전송이 끝난 경우 호출
    .on('end', function() {
      console.log('end');
    });
    
    form.parse(req, function(err, fields, files) {
      console.log('parse - ' + JSON.stringify(files), err, fields);
      
      if (err === null) {
        var type = files.json.type;
        var oldpath = files.json.path;
        var filename = files.json.name;
        var newpath = "";
        
        if (type === "image/jpeg") {
          newpath += __dirname + "/../public/images/cardpicture/";
          fs.rename(oldpath, newpath + filename, function(err) {
            if (err) {
              res.render("error");
            } else {
              res.render("success");
            }
          });
          
        } else if (type === "application/octet-stream" && filename.indexOf("json") > 0) {
          newpath += __dirname + "/../db/";
          fs.rename(oldpath, newpath + "namuami.json", function(err) {
            /* Load DB */
            // console.log(global.db)
            var db = require("../db");
            global.db = db.idols();
            
            
            if (err) {
              res.redirect("/error");
            } else {
              res.redirect("/success");
            }
          });
        }
      }
    });
  }
  
})
/**/

// router.get("/voca", function(req, res) {
//   var containerDir = __dirname + "/../public/container.html";
//   var mainDir = __dirname + "/../public/voca.html";
//   var page = renderer(containerDir, mainDir);
//   res.send(page);
// });

module.exports = router;
