var r = [];
var g = [];
var b = [];
var a = [];
var Rectangles = [];
var x = [];
var test = false;
var drawing = true;
var img = new Image,
    //an image that has the proper CORS response header
    src = "https://4.imimg.com/data4/CF/VV/MY-23364860/panache-40-led-television-500x500.jpg",
    cvs = document.getElementById('myCvs'),
    ctx = cvs.getContext('2d');


img.crossOrigin = "Anonymous";




function Rectangle(i, j, r, g, b, a) {
    this.i = i;
    this.j = j;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
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
        console.log(x.data);

        createCanvas(100, 100);
        var r1 = 0;
        var r2 = 0;
        var g1 = 0;
        var g2 = 0;
        var b1 = 0;
        var b2 = 0;
        var a1 = 0;
        var a2 = 0;
        for(let i=0; i<100;i++){
          r[i] = new Array(100);
          g[i] = new Array(100);
          b[i] = new Array(100);
          a[i] = new Array(100);
        }
        for (let i = 0; i < 400; i++) {
            for (let j = 0; j < 100; j++) {
              switch((i*100+j)%4){
              case 0:
              r[r1][r2] = x.data[i*100+j];
                r2+=1;
                if(r2>99){
                  r1+=1;
                  r2=0;
                }
              break;
              case 1:
              g[g1][g2] = x.data[i*100+j];
                g2+=1;
                if(g2>99){
                  g1+=1;
                  g2=0;
                }
              break;
              case 2:
              b[b1][b2] = x.data[i*100+j];
                b2+=1;
                if(b2>99){
                  b1+=1;
                  b2=0;
                }
              break;
              case 3:
              a[a1][a2] = 255;
                a2+=1;
                if(a2>99){
                  a1+=1;
                  a2=0;
                }
              break;
              default:
              break;
          }
            }
          }
          for(let i=0; i<100; i++){
              for(let j=0; j<100; j++){
            Rectangles[i * 100 + j] = new Rectangle(j, i, r[i][j], g[i][j], b[i][j], 255);
        }
        }
          draw();

      }
      img.src = src;
      
      //resets cache on src of img if it comes back undefined, using a 1x1 blank gif dataURI
      if ( img.complete || img.complete === undefined ) {
          img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
          img.src = src;
      }
    console.log(r.length);

  }
  
  function draw() {
    if(drawing){
      if(Rectangles.length>0){
      for (let i = 0; i < 10000; i++) {
        Rectangles[i].display();
      }
      drawing = false;
      test = true;
    }
    
    }
     if(test){
      var data = tf.tensor3d([r, g, b, a], [4, 100, 100], "int32");
      console.log(data.toString());
       test = false;
     }
  
    //noLoop();
  } 
  