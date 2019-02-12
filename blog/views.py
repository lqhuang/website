from flask import render_template, Blueprint
from flask_flatpages import FlatPages

pages = FlatPages()

blog = Blueprint(
    'blog',
    __name__,
    template_folder='templates',  # Path for templates
    static_folder='static',  # Path for static files
)


@blog.route('/')
@blog.route('/index/')
def blog_index(name=None):
    return render_template('index.html')


@blog.route('/blog/')
def blog_blog(name=None):
    posts = (p for p in pages)
    return render_template('blog.html', posts=posts)


@blog.route('/photography/')
def blog_photography(name=None):
    return render_template('photography.html')


@blog.route('/login/')
def blog_login(name=None):
    return render_template('login.html')
