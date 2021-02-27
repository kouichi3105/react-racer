#Flaskとrender_template（HTMLを表示させるための関数）をインポート
from flask import Flask,render_template,request
from flask_cors import CORS

#Flaskオブジェクトの生成
app = Flask(__name__, static_folder="../react/build/static", template_folder="../react/build")
CORS(app)


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/speed/<int:speed>", methods=["POST"])
def speed(speed):
    print(speed)
    return 'Speed: %d' % speed

@app.route("/steering/<int:steering>", methods=["POST"])
def steering(steering):
    print(steering)
    return 'Steering: %d' % steering

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
