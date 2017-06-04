# -*- coding: utf-8 -*-
from project import app
from flask import render_template, request, redirect, url_for, abort
from flask_wtf import FlaskForm

import json

@app.route('/')
def index():
	# model = ProjectsModel()
	return app.send_static_file('index.html')
	# return "Hello, World!"
	# return render_template('projects/index.html', model=model)


# curl -i -H "Content-Type: application/json" -X POST -d '{"userId":"1", "username": "fizz bizz"}' http://localhost:5000/post/
@app.route('/post/', methods=["POST"])
def post():
	received = request.get_data()
	print 'data is: %s' % received
	# print 'raw data is: %s' % request.stream.read()

	if not request.json:
		# abort(404)
		print 'no text data'
	return json.dumps(received)



