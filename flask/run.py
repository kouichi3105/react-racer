#Flaskとrender_template（HTMLを表示させるための関数）をインポート
from flask import Flask,render_template,request
from flask_cors import CORS

#jetracer
from jetracer.nvidia_racecar import NvidiaRacecar
car = NvidiaRacecar()

#Flaskオブジェクトの生成
app = Flask(__name__, static_folder="../react/build/static", template_folder="../react/build")
CORS(app)

def Map(x, in_min, in_max, out_min, out_max):
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/speed/<int:speed>", methods=["POST"])
def speed(speed):
    print(speed)
    throttle = Map(speed, 0, 100, 0, 1) * -1
    if(speed < 10):
        car.throttle = 0
    else:
        car.throttle = throttle
    print(throttle)
    return 'Speed: %d' % speed

@app.route("/steering/<int:steering>", methods=["POST"])
def steering(steering):
    print(steering)
    steering_map = Map(steering, 0, 100, -0.8, 0.8) 
    if(45 < steering < 55):
        car.steering = 0
    else:
        car.steering = steering_map
    print(steering_map)
    return 'Steering: %d' % steering

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
