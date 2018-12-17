from flask import Flask, render_template, jsonify, json, request, session, redirect, url_for, make_response
app = Flask(__name__)

@app.route("/")
def home():
  return render_template('index.html')
@app.route("/images_list", methods = ['POST'])
def getImagesList():
  list_of_photos = [
        ["static/img/img_1.jpg","name1","description_1"],
        ["static/img/img_1.jpg","name3","description_2"],
	["static/img/img_1.jpg","name4","description_3"],
	["static/img/img_1.jpg","name5","description_4"],
	["static/img/img_1.jpg","name6","description_5"]
      ]
  return jsonify(list_of_photos)
@app.route("/objects_dectection", methods = ['POST'])
def detectObject():
  url =request.get_json();
  json_details = [
    {
      "x": 10,
      "y": 10,
      "w": 50,
      "h": 50,
      "urls": [
        ["static/img/img_1.jpg","name1","description"],
        ["static/img/img_1.jpg","name3","description"],
		["static/img/img_1.jpg","name4","description"],
		["static/img/img_1.jpg","name5","description"],
		["static/img/img_1.jpg","name6","description"]
      ],
      "color":"yelow",
      "label":"person"
    },
    {
      "x": 20,
      "y": 50,
      "w": 200,
      "h": 200,
      "urls": [
        ["static/img/img_1.jpg","name1","description"],
        ["static/img/img_1.jpg","name2","description"],
		["static/img/img_1.jpg","name2","description"],
		["static/img/img_1.jpg","name2","description"],
		["static/img/img_1.jpg","name2","description"]
      ],
      "color":"yelow",
      "label":"dog"
    }
  ]
  
  return jsonify(json_details)
@app.route("/cropped_objects_dectection", methods = ['POST'])
def detectCroppedImage():
  crop_info = request.get_json();
  json_details = [
        ["static/img/img_1.jpg","name1","description"],
        ["static/img/img_1.jpg","name3","description"],
	["static/img/img_1.jpg","name4","description"],
	["static/img/img_1.jpg","name5","description"],
	["static/img/img_1.jpg","name6","description"]
      ]
  return jsonify(json_details)
if __name__ == "__main__":
  app.run()