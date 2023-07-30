<template>
  <canvas ref="myCanvas" :class="[use]" id="nokey"></canvas>
</template>

<script setup>
let props = defineProps({
  use: {
    type: String,
    default: 'background', // background | robot_dance
    required: true,
  },
  height: {
    type: Number,
    default: window.innerHeight,
    required: false,
  },
})
let myCanvas = ref(null)
function backgroud(){
  var canvas = myCanvas.value || document.getElementById('myCanvas'),
    can_w = parseInt(canvas.getAttribute('width')),
    can_h = parseInt(canvas.getAttribute('height')),
    ctx = canvas.getContext('2d');
    
    var BALL_NUM = 30

    var ball = {
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          r: 0,
          alpha: 1,
          phase: 0
      },
      ball_color = {
          r: 207,
          g: 255,
          b: 4
      },
      R = 2,
      balls = [],
      alpha_f = 0.03,
      alpha_phase = 0,
        
    // Line
      link_line_width = 0.8,
      dis_limit = 260,
      add_mouse_point = true,
      mouse_in = false,
      mouse_ball = {
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          r: 0,
          type: 'mouse'
      };

    // Random speed
    function getRandomSpeed(pos){
        var  min = -1,
          max = 1;
        switch(pos){
            case 'top':
                return [randomNumFrom(min, max), randomNumFrom(0.1, max)];
                break;
            case 'right':
                return [randomNumFrom(min, -0.1), randomNumFrom(min, max)];
                break;
            case 'bottom':
                return [randomNumFrom(min, max), randomNumFrom(min, -0.1)];
                break;
            case 'left':
                return [randomNumFrom(0.1, max), randomNumFrom(min, max)];
                break;
            default:
                return;
                break;
        }
    }
    function randomArrayItem(arr){
        return arr[Math.floor(Math.random() * arr.length)];
    }
    function randomNumFrom(min, max){
        return Math.random()*(max - min) + min;
    }
    // Random Ball
    function getRandomBall(){
        var pos = randomArrayItem(['top', 'right', 'bottom', 'left']);
        switch(pos){
            case 'top':
                return {
                    x: randomSidePos(can_w),
                    y: -R,
                    vx: getRandomSpeed('top')[0],
                    vy: getRandomSpeed('top')[1],
                    r: R,
                    alpha: 1,
                    phase: randomNumFrom(0, 10)
                }
                break;
            case 'right':
                return {
                    x: can_w + R,
                    y: randomSidePos(can_h),
                    vx: getRandomSpeed('right')[0],
                    vy: getRandomSpeed('right')[1],
                    r: R,
                    alpha: 1,
                    phase: randomNumFrom(0, 10)
                }
                break;
            case 'bottom':
                return {
                    x: randomSidePos(can_w),
                    y: can_h + R,
                    vx: getRandomSpeed('bottom')[0],
                    vy: getRandomSpeed('bottom')[1],
                    r: R,
                    alpha: 1,
                    phase: randomNumFrom(0, 10)
                }
                break;
            case 'left':
                return {
                    x: -R,
                    y: randomSidePos(can_h),
                    vx: getRandomSpeed('left')[0],
                    vy: getRandomSpeed('left')[1],
                    r: R,
                    alpha: 1,
                    phase: randomNumFrom(0, 10)
                }
                break;
        }
    }
    function randomSidePos(length){
        return Math.ceil(Math.random() * length);
    }

    // Draw Ball
    function renderBalls(){
        Array.prototype.forEach.call(balls, function(b){
          if(!b.hasOwnProperty('type')){
              ctx.fillStyle = 'rgba('+ball_color.r+','+ball_color.g+','+ball_color.b+','+b.alpha+')';
              ctx.beginPath();
              ctx.arc(b.x, b.y, R, 0, Math.PI*2, true);
              ctx.closePath();
              ctx.fill();
          }
        });
    }

    // Update balls
    function updateBalls(){
        var new_balls = [];
        Array.prototype.forEach.call(balls, function(b){
            b.x += b.vx;
            b.y += b.vy;
            
            if(b.x > -(50) && b.x < (can_w+50) && b.y > -(50) && b.y < (can_h+50)){
              new_balls.push(b);
            }
            
            // alpha change
            b.phase += alpha_f;
            b.alpha = Math.abs(Math.cos(b.phase));
        });
        
        balls = new_balls.slice(0);
    }

    // loop alpha
    function loopAlphaInf(){
        
    }

    // Draw lines
    function renderLines(){
        var fraction, alpha;
        for (var i = 0; i < balls.length; i++) {
            for (var j = i + 1; j < balls.length; j++) {
              
              fraction = getDisOf(balls[i], balls[j]) / dis_limit;
                
              if(fraction < 1){
                  alpha = (1 - fraction).toString();

                  ctx.strokeStyle = 'rgba(150,150,150,'+alpha+')';
                  ctx.lineWidth = link_line_width;
                  
                  ctx.beginPath();
                  ctx.moveTo(balls[i].x, balls[i].y);
                  ctx.lineTo(balls[j].x, balls[j].y);
                  ctx.stroke();
                  ctx.closePath();
              }
            }
        }
    }

    // calculate distance between two points
    function getDisOf(b1, b2){
        var  delta_x = Math.abs(b1.x - b2.x),
          delta_y = Math.abs(b1.y - b2.y);
        
        return Math.sqrt(delta_x*delta_x + delta_y*delta_y);
    }

    // add balls if there a little balls
    function addBallIfy(){
        if(balls.length < BALL_NUM){
            balls.push(getRandomBall());
        }
    }

    // Render
    function render(){
        ctx.clearRect(0, 0, can_w, can_h);
        
        renderBalls();
        
        renderLines();
        
        updateBalls();
        
        addBallIfy();
        
        window.requestAnimationFrame(render);
    }

    // Init Balls
    function initBalls(num){
        for(var i = 1; i <= num; i++){
            balls.push({
                x: randomSidePos(can_w),
                y: randomSidePos(can_h),
                vx: getRandomSpeed('top')[0],
                vy: getRandomSpeed('top')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            });
        }
    }
    // Init Canvas
    function initCanvas(){
        canvas.setAttribute('width', window.innerWidth);
        // canvas.setAttribute('height', window.innerHeight);
        canvas.setAttribute('height', props.height || window.innerHeight);
        
        can_w = parseInt(canvas.getAttribute('width'));
        can_h = parseInt(canvas.getAttribute('height'));
    }
    window.addEventListener('resize', function(e){
        initCanvas();
    });

    function goMovie(){
        initCanvas();
        initBalls(BALL_NUM);
        window.requestAnimationFrame(render);
    }
    goMovie();

    // Mouse effect
    canvas.addEventListener('mouseenter', function(){
        mouse_in = true;
        balls.push(mouse_ball);
    });
    canvas.addEventListener('mouseleave', function(){
        mouse_in = false;
        var new_balls = [];
        Array.prototype.forEach.call(balls, function(b){
            if(!b.hasOwnProperty('type')){
                new_balls.push(b);
            }
        });
        balls = new_balls.slice(0);
    });
    canvas.addEventListener('mousemove', function(e){
        var e = e || window.event;
        mouse_ball.x = e.pageX;
        mouse_ball.y = e.pageY;
    });
}

function robot_dance(){
    "use strict";
    ///////////////// worker thread code ///////////////////
    const theLastExperience = noWorkers => {
        "use strict";
        // ---- robot structure ----
        const struct = {
            points: [
                {
                    x: 0,
                    y: -4,
                    f(s, d) {
                        this.y -= 0.01 * s * ts;
                    }
                },
                {
                    x: 0,
                    y: -16,
                    f(s, d) {
                        this.y -= 0.02 * s * d * ts;
                    }
                },
                {
                    x: 0,
                    y: 12,
                    f(s, d) {
                        this.y += 0.02 * s * d * ts;
                    }
                },
                { x: -12, y: 0 },
                { x: 12, y: 0 },
                {
                    x: -3,
                    y: 34,
                    f(s, d) {
                        if (d > 0) {
                            this.x += 0.01 * s * ts;
                            this.y -= 0.015 * s * ts;
                        } else {
                            this.y += 0.02 * s * ts;
                        }
                    }
                },
                {
                    x: 3,
                    y: 34,
                    f(s, d) {
                        if (d > 0) {
                            this.y += 0.02 * s * ts;
                        } else {
                            this.x -= 0.01 * s * ts;
                            this.y -= 0.015 * s * ts;
                        }
                    }
                },
                {
                    x: -28,
                    y: 0,
                    f(s, d) {
                        this.x += this.vx * 0.025 * ts;
                        this.y -= 0.001 * s * ts;
                    }
                },
                {
                    x: 28,
                    y: 0,
                    f(s, d) {
                        this.x += this.vx * 0.025 * ts;
                        this.y -= 0.001 * s * ts;
                    }
                },
                {
                    x: -3,
                    y: 64,
                    f(s, d) {
                        this.y += 0.015 * s * ts;
                        if (d > 0) {
                            this.y -= 0.01 * s * ts;
                        } else {
                            this.y += 0.05 * s * ts;
                        }
                    }
                },
                {
                    x: 3,
                    y: 64,
                    f(s, d) {
                        this.y += 0.015 * s * ts;
                        if (d > 0) {
                            this.y += 0.05 * s * ts;
                        } else {
                            this.y -= 0.01 * s * ts;
                        }
                    }
                }
            ],
            links: [
                { p0: 3, p1: 7, size: 12, lum: 0.5 },
                { p0: 1, p1: 3, size: 24, lum: 0.5 },
                { p0: 1, p1: 0, size: 60, lum: 0.5, disk: 1 },
                { p0: 5, p1: 9, size: 16, lum: 0.5 },
                { p0: 2, p1: 5, size: 32, lum: 0.5 },
                { p0: 1, p1: 2, size: 50, lum: 1 },
                { p0: 6, p1: 10, size: 16, lum: 1.5 },
                { p0: 2, p1: 6, size: 32, lum: 1.5 },
                { p0: 4, p1: 8, size: 12, lum: 1.5 },
                { p0: 1, p1: 4, size: 24, lum: 1.5 }
            ]
        };
        class Robot {
            constructor(color, light, size, x, y, struct) {
                this.x = x;
                this.points = [];
                this.links = [];
                this.frame = 0;
                this.dir = 1;
                this.size = size;
                this.color = Math.round(color);
                this.light = light;
                // ---- create points ----
                for (const p of struct.points) {
                    this.points.push(new Robot.Point(size * p.x + x, size * p.y + y, p.f));
                }
                // ---- create links ----
                for (const link of struct.links) {
                    const p0 = this.points[link.p0];
                    const p1 = this.points[link.p1];
                    const dx = p0.x - p1.x;
                    const dy = p0.y - p1.y;
                    this.links.push(
                        new Robot.Link(
                            this,
                            p0,
                            p1,
                            Math.sqrt(dx * dx + dy * dy),
                            link.size * size / 3,
                            link.lum,
                            link.force,
                            link.disk
                        )
                    );
                }
            }
            update() {
                if (++this.frame % Math.round(20 / ts) === 0) this.dir = -this.dir;
                if (this === pointer.dancerDrag && this.size < 16 && this.frame > 600) {
                    pointer.dancerDrag = null;
                    dancers.push(
                        new Robot(
                            this.color + 90,
                            this.light * 1.25,
                            this.size * 2,
                            pointer.x,
                            pointer.y - 100 * this.size * 2,
                            struct
                        )
                    );
                    dancers.sort(function(d0, d1) {
                        return d0.size - d1.size;
                    });
                }
                // ---- update links ----
                for (const link of this.links) link.update();
                // ---- update points ----
                for (const point of this.points) point.update(this);
                // ---- ground ----
                for (const link of this.links) {
                    const p1 = link.p1;
                    if (p1.y > canvas.height * ground - link.size * 0.5) {
                        p1.y = canvas.height * ground - link.size * 0.5;
                        p1.x -= p1.vx;
                        p1.vx = 0;
                        p1.vy = 0;
                    }
                }
                // ---- center position ----
                this.points[3].x += (this.x - this.points[3].x) * 0.001;
            }
            draw() {
                for (const link of this.links) {
                    if (link.size) {
                        const dx = link.p1.x - link.p0.x;
                        const dy = link.p1.y - link.p0.y;
                        const a = Math.atan2(dy, dx);
                        // ---- shadow ----
                        ctx.save();
                        ctx.translate(link.p0.x + link.size * 0.25, link.p0.y + link.size * 0.25);
                        ctx.rotate(a);
                        ctx.drawImage(
                            link.shadow,
                            -link.size * 0.5,
                            -link.size * 0.5
                        );
                        ctx.restore();
                        // ---- stroke ----
                        ctx.save();
                        ctx.translate(link.p0.x, link.p0.y);
                        ctx.rotate(a);
                        ctx.drawImage(
                            link.image,
                            -link.size * 0.5,
                            -link.size * 0.5
                        );
                        ctx.restore();
                    }
                }
            }
        }
        Robot.Link = class Link {
            constructor(parent, p0, p1, dist, size, light, force, disk) {
                this.p0 = p0;
                this.p1 = p1;
                this.distance = dist;
                this.size = size;
                this.light = light || 1.0;
                this.force = force || 0.5;
                this.image = this.stroke(
                    "hsl(" + parent.color + " ,30%, " + parent.light * this.light + "%)",
                    true, disk, dist, size
                );
                this.shadow = this.stroke("rgba(0,0,0,0.5)", false, disk, dist, size);
            }
            update() {
                const p0 = this.p0;
                const p1 = this.p1;
                const dx = p1.x - p0.x;
                const dy = p1.y - p0.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist > 0.0) {
                    const tw = p0.w + p1.w;
                    const r1 = p1.w / tw;
                    const r0 = p0.w / tw;
                    const dz = (this.distance - dist) * this.force;
                    const sx = dx / dist * dz;
                    const sy = dy / dist * dz;
                    p1.x += sx * r0;
                    p1.y += sy * r0;
                    p0.x -= sx * r1;
                    p0.y -= sy * r1;
                }
            }
            stroke(color, axis, disk, dist, size) {
                let image;
                if (noWorkers) {
                    image = document.createElement("canvas");
                    image.width = dist + size;
                    image.height = size;
                } else {
                    image = new OffscreenCanvas(dist + size, size);
                }
                const ict = image.getContext("2d");
                ict.beginPath();
                ict.lineCap = "round";
                ict.lineWidth = size;
                ict.strokeStyle = color;
                if (disk) {
                    ict.arc(size * 0.5 + dist, size * 0.5, size * 0.5, 0, 2 * Math.PI);
                    ict.fillStyle = color;
                    ict.fill();
                } else {
                    ict.moveTo(size * 0.5, size * 0.5);
                    ict.lineTo(size * 0.5 + dist, size * 0.5);
                    ict.stroke();
                }
                if (axis) {
                    const s = size / 10;
                    ict.fillStyle = "#000";
                    ict.fillRect(size * 0.5 - s, size * 0.5 - s, s * 2, s * 2);
                    ict.fillRect(size * 0.5 - s + dist, size * 0.5 - s, s * 2, s * 2);
                }
                return image;
            }
        };
        Robot.Point = class Point {
            constructor(x, y, fn, w) {
                this.x = x;
                this.y = y;
                this.w = w || 0.5;
                this.fn = fn || null;
                this.px = x;
                this.py = y;
                this.vx = 0.0;
                this.vy = 0.0;
            }
            update(robot) {
                // ---- dragging ----
                if (robot === pointer.dancerDrag && this === pointer.pointDrag) {
                    this.x += (pointer.x - this.x) * 0.1;
                    this.y += (pointer.y - this.y) * 0.1;
                }
                // ---- dance ----
                if (robot !== pointer.dancerDrag) {
                    this.fn && this.fn(16 * Math.sqrt(robot.size), robot.dir);
                }
                // ---- verlet integration ----
                this.vx = this.x - this.px;
                this.vy = this.y - this.py;
                this.px = this.x;
                this.py = this.y;
                this.vx *= 0.995;
                this.vy *= 0.995;
                this.x += this.vx;
                this.y += this.vy + 0.01 * ts;
            }
        };
        // ---- init ----
        const dancers = [];
        let ground = 1.0;
        let canvas = { width: 0, height: 0, resize: true };
        let ctx = null;
        let pointer = { x: 0, y: 0, dancerDrag: null, pointDrag: null };
        let ts = 1;
        let lastTime = 0;
        // ---- messages from the main thread ----
        const message = e => {
            switch (e.data.msg) {
                case "start":
                    canvas.elem = e.data.elem;
                    canvas.width = canvas.elem.width;
                    canvas.height = canvas.elem.height;
                    ctx = canvas.elem.getContext("2d");
                    initRobots();
                    requestAnimationFrame(run);
                    break;
                case "resize":
                    canvas.width = e.data.width;
                    canvas.height = e.data.height;
                    canvas.resize = true;
                    break;
                case "pointerMove":
                    pointer.x = e.data.x;
                    pointer.y = e.data.y;
                    break;
                case "pointerDown":
                    pointer.x = e.data.x;
                    pointer.y = e.data.y;
                    for (const dancer of dancers) {
                        for (const point of dancer.points) {
                            const dx = pointer.x - point.x;
                            const dy = pointer.y - point.y;
                            const d = Math.sqrt(dx * dx + dy * dy);
                            if (d < 60) {
                                pointer.dancerDrag = dancer;
                                pointer.pointDrag = point;
                                dancer.frame = 0;
                            }
                        }
                    }
                    break;
                case "pointerUp":
                    pointer.dancerDrag = null;
                    break;
            }
        };
        // ---- resize screen ----
        const resize = () => {
            canvas.elem.width = canvas.width;
            canvas.elem.height = canvas.height;
            canvas.resize = false;
            ground = canvas.height > 500 ? 0.85 : 1.0;
            for (let i = 0; i < dancers.length; i++) {
                dancers[i].x = (i + 2) * canvas.width / 9;
            }
        }
        // ---- main loop ----
        const run = (time) => {
            requestAnimationFrame(run);
            if (canvas.resize === true) resize();
            // ---- adjust speed to screen freq ----
            if (lastTime !== 0) {
                const t = (time - lastTime) / 16;
                ts += (t - ts) * 0.1;
                if (ts > 1) ts = 1;
            }
            lastTime = time;
            // ---- clear screen ----
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#222";
            ctx.fillRect(0, 0, canvas.width, canvas.height * 0.15);
            ctx.fillRect(0, canvas.height * 0.85, canvas.width, canvas.height * 0.15);
            // ---- animate robots ----
            for (const dancer of dancers) {
                dancer.update();
                dancer.draw();
            }
        };
        const initRobots = () => {
            // ---- instanciate robots ----
            ground = canvas.height > 500 ? 0.85 : 1.0;
            for (let i = 0; i < 6; i++) {
                dancers.push(
                    new Robot(
                        i * 360 / 7,
                        80,
                        Math.sqrt(Math.min(canvas.width, canvas.height)) / 6,
                        (i + 2) * canvas.width / 9,
                        canvas.height * 0.5 - 100,
                        struct
                    )
                );
            }
        };
        // ---- main thread vs. worker
        if (noWorkers) {
            // ---- emulate postMessage interface ----
            return {
                postMessage(data) {
                    message({ data: data });
                }
            };
        } else {
            // ---- worker messaging ----
            onmessage = message;
        }
    };
    ///////////////// main thread code ///////////////////
    let worker = null;
    const createWorker = fn => {
        const URL = window.URL || window.webkitURL;
        return new Worker(URL.createObjectURL(new Blob(["(" + fn + ")()"])));
    };
    // ---- init canvas ----
    const canvas = document.querySelector("canvas");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    // ---- instanciate worker ----
    if (window.Worker && window.OffscreenCanvas) {
        // instanciating background worker from a function
        worker = createWorker(theLastExperience);
        // cloning OffscreenCanvas
        const offscreen = canvas.transferControlToOffscreen();
        // sending data to worker
        worker.postMessage({ msg: "start", elem: offscreen }, [offscreen]);
    } else {
        // falling back execution to the main thread
        worker = theLastExperience(true);
        worker.postMessage({ msg: "start", elem: canvas });
    }
    // ---- resize event ----
    window.addEventListener(
        "resize",
        () => {
            worker.postMessage({
                msg: "resize",
                width: canvas.offsetWidth,
                height: canvas.offsetHeight
            });
        },
        false
    );
    // ---- pointer events ----
    const pointer = {
        x: 0,
        y: 0,
        down(e) {
            this.move(e);
            worker.postMessage({
                msg: "pointerDown",
                x: this.x,
                y: this.y
            });
        },
        up(e) {
            worker.postMessage({
                msg: "pointerUp"
            });
        },
        move(e) {
            if (e.targetTouches) {
                e.preventDefault();
                this.x = e.targetTouches[0].clientX;
                this.y = e.targetTouches[0].clientY;
            } else {
                this.x = e.clientX;
                this.y = e.clientY;
            }
            worker.postMessage({
                msg: "pointerMove",
                x: this.x,
                y: this.y
            });
        }
    };
    window.addEventListener("mousemove", e => pointer.move(e), false);
    canvas.addEventListener("touchmove", e => pointer.move(e), false);
    window.addEventListener("mousedown", e => pointer.down(e), false);
    window.addEventListener("touchstart", e => pointer.down(e), false);
    window.addEventListener("mouseup", e => pointer.up(e), false);
    window.addEventListener("touchend", e => pointer.up(e), false);

}
onMounted(() => {
    setTimeout(() => {      
      if(props.use=='background'){
        backgroud()
      }
      else if(props.use == 'robot_dance'){
        robot_dance()
      }
    }, 100);
  
})
</script>

<style scoped>
canvas.background{
  background-color: #000;
  position: fixed;
  top: 0px;
  left: 0px;
}
canvas.robot_dance{
}
</style>
