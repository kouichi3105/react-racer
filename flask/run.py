#Flaskとrender_template（HTMLを表示させるための関数）をインポート
from flask import Flask,render_template,request
from flask_cors import CORS

#Flaskオブジェクトの生成
app = Flask(__name__, static_folder="../build/static", template_folder="../build")
CORS(app)


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get")
def hello():
    return "Get Data"

@app.route("/post", methods=["POST"])
def data():
    return request.get_data()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)