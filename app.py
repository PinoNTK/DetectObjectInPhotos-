from flask import Flask, render_template, jsonify, json, request, session, redirect, url_for, make_response
app = Flask(__name__)

@app.route("/")
def home():
  return render_template('index.html')
@app.route("/images_list", methods = ['POST'])
def getImagesList():
  list_of_photos = ['a', 'b', 'c']
  return jsonify(list_of_photos)
@app.route("/objects_dectection", methods = ['POST'])
def detectObject():
  url =request.get_json();
  json_details = ['b', 'c', 'd']
  return jsonify(json_details)
@app.route("/cropped_objects_dectection", methods = ['POST'])
def detectCroppedImage():
  json_details = ['e', 'f', 'h']
  return jsonify(json_details)
if __name__ == "__main__":
  app.run()