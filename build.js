var r = [];
var g = [];
var b = [];
var a = [];
var Rectangles = [];
var x = [];
var drawing = true;
var img = new Image,
    //an image that has the proper CORS response header
    src = "https://ih1.redbubble.net/image.596543172.4810/flat,1000x1000,075,f.u2.jpg",
    cvs = document.getElementById('myCvs'),
    ctx = cvs.getContext('2d');


img.crossOrigin = "Anonymous";




function Rectangle(i, j, r, g, b, a) {
    this.i = i;
    this.j = j;
    this.r = r;
    this.display = function() {
      fill(color(r, g, b, a));
      noStroke(0);
      rect(this.i, this.j, 1, 1);
    };
  }

  function setup() {
    img.onload = function() {
        ctx.drawImage(img, 0, 0, 100, 100);
        var imgTag = document.getElementById('myImg');
        var dataURL = cvs.toDataURL();
        imgTag.src = dataURL;
        var x = [];
        x = ctx.getImageData(0,0,100,100);
        console.log(x);

        createCanvas(100, 100);
        var r1 = 0;
        var r2 = 0;
        var g1 = 0;
        var g2 = 0;
        var b1 = 0;
        var b2 = 0;
        var a1 = 0;
        var a2 = 0;
        for (let i = 0; i < 100; i++) {
            r[i] = new Array(100);
            g[i] = new Array(100);
            b[i] = new Array(100);
            a[i] = new Array(100);
            r1 = i;
            g1 = i;
            b1 = i;
            a1 = i;
            r2 = 0;
            g2 = 0;
            b2 = 0;
            a2 = 0;
            for (let j = 0; j < 100; j++) {
              switch((i*100+j)%4){
              case 0:
              r[r1][r2] = x.data[i*100+j];
                r2+=1;
              break;
              case 1:
              g[g1][g2] = x.data[i*100+j];
                g2+=1;
              break;
              case 2:
              b[b1][b2] = x.data[i*100+j];
                b2+=1;
              break;
              case 3:
              a[a1][a2] = x.data[i*100+j];
                a2+=1;
              break;
              default:
              break;
          }
            }
          }
          for(let i=0; i<100; i++){
              for(let j=0; j<100; j++){
            Rectangles[i * 100 + j] = new Rectangle(j, i, r[i][j], g[i][j], b[i][j], a[i][j]);
        }
        }
          console.log(r);
          draw();

      }
      img.src = src;
      
      //resets cache on src of img if it comes back undefined, using a 1x1 blank gif dataURI
      if ( img.complete || img.complete === undefined ) {
          img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
          img.src = src;
      }
  
    //var data = tf.tensor3d([r, g, b, a], [4, 100, 100], "int32");
    
  //  console.log(data.toString());
  console.log(Rectangles);
  }
  
  function draw() {
    if(drawing){
      for (let i = 0; i < 10000; i++) {
        Rectangles[i].display();
      }
    drawing = false;
    }
    else{}
  
    //noLoop();
  } 
  