from flask import render_template, abort, Flask

app = Flask(__name__)
@app.route('/')
def index():
    return render_template('konstruksi.html')

@app.errorhandler(404)
def page_not_found(error):
    return render_template('404Konstruksi.html'), 404

if __name__=='__main__':
    app.run('0.0.0.0',debug=True)