import React, { useEffect, useRef } from 'react';
import './CanvasClub.css';

const CanvasClub = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const c = canvasRef.current;
    const container = containerRef.current;
    if (!c || !container) return;
    
    const ctx = c.getContext("2d");
    let w = c.width = container.clientWidth;
    let h = c.height = container.clientHeight;
    const clearColor = 'rgba(0, 0, 0, 0.1)';
    const max = 30;
    let drops = [];
    let animationFrameId;
    let resizeTimeout;

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function O() {}

    O.prototype = {
      init: function() {
        this.x = random(0, w);
        this.y = 0;
        this.color = 'hsl(180, 100%, 50%)';
        this.w = 2;
        this.h = 1;
        this.vy = random(1.5, 2.5); // Slower animation
        this.vw = 3;
        this.vh = 1;
        this.size = 2;
        this.hit = random(h * .8, h * .9);
        this.a = 1;
        this.va = .96;
      },
      draw: function() {
        if (this.y > this.hit) {
          ctx.beginPath();
          ctx.moveTo(this.x, this.y - this.h / 2);

          ctx.bezierCurveTo(
            this.x + this.w / 2, this.y - this.h / 2,
            this.x + this.w / 2, this.y + this.h / 2,
            this.x, this.y + this.h / 2);

          ctx.bezierCurveTo(
            this.x - this.w / 2, this.y + this.h / 2,
            this.x - this.w / 2, this.y - this.h / 2,
            this.x, this.y - this.h / 2);

          ctx.strokeStyle = 'hsla(180, 100%, 50%, '+this.a+')';
          ctx.stroke();
          ctx.closePath();
          
        } else {
          ctx.fillStyle = this.color;
          ctx.fillRect(this.x, this.y, this.size, this.size * 5);
        }
        this.update();
      },
      update: function() {
        if(this.y < this.hit){
          this.y += this.vy;
        } else {
          if(this.a > .03){
            this.w += this.vw;
            this.h += this.vh;
            if(this.w > 100){
              this.a *= this.va;
              this.vw *= .98;
              this.vh *= .98;
            }
          } else {
            this.init();
          }
        }
      }
    };

    function resize(){
      w = c.width = container.clientWidth;
      h = c.height = container.clientHeight;
    }

    function setup(){
      for(let i = 0; i < max; i++){
        (function(j){
          setTimeout(function(){
            let o = new O();
            o.init();
            drops.push(o);
          }, j * 200)
        }(i));
      }
    }

    function anim() {
      // Use destination-out to create trails on transparent background
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = clearColor;
      ctx.fillRect(0,0,w,h);
      ctx.globalCompositeOperation = 'source-over';
      
      for(let i in drops){
        drops[i].draw();
      }
      animationFrameId = requestAnimationFrame(anim);
    }

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 100);
    };

    window.addEventListener("resize", handleResize);

    setup();
    anim();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="canvas-club-container">
      <canvas ref={canvasRef} id="canvas-club" />
    </div>
  );
};

export default CanvasClub;
